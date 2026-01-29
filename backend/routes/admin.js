const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Reservation = require('../models/Reservation');
const Devis = require('../models/Devis');
const Reparation = require('../models/Reparation');
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// ✅ NE PAS utiliser router.use() ici
// Appliquer les middlewares sur chaque route

// ============================================
// GESTION CLIENTS
// ============================================

router.get('/clients', protect, adminOnly, async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' })
      .select('-password')
      .sort('-createdAt');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/clients/:id', protect, adminOnly, async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. حذف جميع سيارات العميل
    await Vehicle.deleteMany({ userId });

    // 2. حذف جميع حجوزات العميل
    await Reservation.deleteMany({ userId });

    // 3. حذف جميع الـ Devis (اختياري حسب منطق عملك)
    await Devis.deleteMany({ userId });

    // 4. أخيراً حذف العميل نفسه
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ message: 'Client non trouvé' });

    res.json({ message: 'Client et toutes ses données ont été supprimés' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/clients/:id', protect, adminOnly, async (req, res) => {
  try {
    const { isActive } = req.body;
    const client = await User.findByIdAndUpdate(
      req.params.id, 
      { isActive }, 
      { new: true }
    ).select('-password');
    
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ============================================
// GESTION VÉHICULES
// ============================================

router.get('/vehicles', protect, adminOnly, async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate('userId', 'name email phone')
      .sort('-createdAt');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// GESTION RÉSERVATIONS
// ============================================

router.get('/reservations', protect, adminOnly, async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('userId', 'name email phone')
      .populate('vehicleId', 'brand model plate')
      .populate('serviceId', 'name basePrice')
      .sort('-createdAt');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/reservations/:id/accept', protect, adminOnly, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('serviceId'); 

    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });

    reservation.status = 'accepted';
    await reservation.save();

    // حساب تاريخ نهاية افتراضي (مثلاً بعد يومين من البداية)
    const defaultEndDate = new Date(reservation.date);
    defaultEndDate.setDate(defaultEndDate.getDate() + 2);

    
    const newDevis = await Devis.create({
      userId: reservation.userId,
      vehicleId: reservation.vehicleId,
      serviceId: reservation.serviceId._id, 
      serviceLabel: reservation.serviceId.name,
      amount: reservation.serviceId.basePrice || 0,
      status: 'pending',
      description: reservation.notes || 'Devis généré suite à une réservation',
      dateDebut: reservation.date,
       dateFin: req.body.dateFin || defaultEndDate,
      estimatedTime: reservation.serviceId.estimatedTime || "48h", 
      items: [
        {
          name: reservation.serviceId.name,
          quantity: 1,
          price: reservation.serviceId.basePrice || 0
        }
      ]
    });

    res.json({ reservation, devis: newDevis });
  } catch (error) {
    // إذا حدث خطأ في الـ Validation سيظهر هنا
    res.status(500).json({ message: error.message });
  }
});

router.put('/reservations/:id/reject', protect, adminOnly, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    reservation.status = 'rejected';
    reservation.adminNotes = req.body.reason || '';
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// GESTION DEVIS
// ============================================

router.get('/devis', protect, adminOnly, async (req, res) => {
  try {
    const devis = await Devis.find()
      .populate('userId', 'name email phone')
      .populate('vehicleId', 'brand model plate')
      .populate('serviceId', 'name category')
      .sort('-createdAt');
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/devis', protect, adminOnly, async (req, res) => {
  try {
    const devis = await Devis.create(req.body);
    
    // في Mongoose 6، هذا السطر صحيح تماماً
    const populated = await devis.populate([
      { path: 'userId', select: 'name email phone' },
      { path: 'vehicleId', select: 'brand model plate' },
      { path: 'serviceId', select: 'name category icon' } 
    ]);
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/devis/:id/accept', protect, adminOnly, async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    if (!devis) return res.status(404).json({ message: "Devis non trouvé" });
    if (devis.status === 'accepted') {
  return res.status(400).json({ message: "Ce devis est déjà accepté et une réparation existe déjà." });
}
    devis.status = 'accepted';
    await devis.save();
    const reparation = await Reparation.create({
      userId: devis.userId,
      vehicleId: devis.vehicleId,
      devisId: devis._id,
      service: devis.serviceLabel,
      totalAmount: devis.amount, // نقل المبلغ الذي اتفقنا عليه
      status: 'pending',
      startDate: devis.dateDebut,
      estimatedEndDate: devis.dateFin,
      notes: devis.description
    });
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ تحديث حالة الديفـي إلى مرفوض (Rejected)
router.put('/devis/:id/reject', protect, adminOnly, async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    if (!devis) return res.status(404).json({ message: "Devis non trouvé" });

    devis.status = 'rejected';
    await devis.save();
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ============================================
// GESTION RÉPARATIONS
// ============================================

router.get('/reparations', protect, adminOnly, async (req, res) => {
  try {
    const reparations = await Reparation.find()
      .populate('userId', 'name email phone')
      .populate('vehicleId', 'brand model plate')
      .populate('devisId')
      .sort('-createdAt');
    res.json(reparations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/reparations/:id/start', protect, adminOnly, async (req, res) => {
  try {
    const reparation = await Reparation.findById(req.params.id);
    reparation.status = 'in_progress';
    reparation.startDate = new Date();
    await reparation.save();
    res.json(reparation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/reparations/:id/Livre', protect, adminOnly, async (req, res) => {
  try {
    const reparation = await Reparation.findById(req.params.id);
    reparation.status = 'delivered';
    reparation.deliveredAt = new Date();
    reparation.technicianNotes = req.body.technicianNotes || '';
    await reparation.save();
    res.json(reparation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/reparations/:id/complete', protect, adminOnly, async (req, res) => {
  try {
    const reparation = await Reparation.findById(req.params.id);
    reparation.status = 'completed';
    reparation.completedAt = new Date();
    reparation.technicianNotes = req.body.technicianNotes || '';
    await reparation.save();
    res.json(reparation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// GESTION SERVICES
// ============================================

router.get('/services', protect, adminOnly, async (req, res) => {
  try {
    const services = await Service.find().sort('category name');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/services', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/services/:id', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/services/:id', protect, adminOnly, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// STATISTIQUES
// ============================================

router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    
    const revenue = await Reparation.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    
    const stats = {
      totalClients: await User.countDocuments({ role: 'client' }),
      totalVehicules: await Vehicle.countDocuments(),
      totalReservations: await Reservation.countDocuments(),
      reservationsPending: await Reservation.countDocuments({ status: 'pending' }),
      totalDevis: await Devis.countDocuments(),
      devisPending: await Devis.countDocuments({ status: 'pending' }),
      totalReparations: await Reparation.countDocuments(),
      reparationsInProgress: await Reparation.countDocuments({ status: 'in_progress' }),
      reparationsCompleted: await Reparation.countDocuments({ status: 'completed' }),
      
      // إضافة الأرباح هنا:
      totalRevenue: revenue[0]?.total || 0 
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;