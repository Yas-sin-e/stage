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
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client supprimé' });
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
    const reservation = await Reservation.findById(req.params.id);
    reservation.status = 'accepted';
    await reservation.save();
    res.json(reservation);
  } catch (error) {
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
      .sort('-createdAt');
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/devis', protect, adminOnly, async (req, res) => {
  try {
    const devis = await Devis.create(req.body);
    const populated = await devis.populate([
      { path: 'userId', select: 'name email' },
      { path: 'vehicleId', select: 'brand model plate' }
    ]);
    res.status(201).json(populated);
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

router.put('/reparations/:id/complete', protect, adminOnly, async (req, res) => {
  try {
    const reparation = await Reparation.findById(req.params.id);
    reparation.status = 'completed';
    reparation.completedDate = new Date();
    reparation.technicianNotes = req.body.notes || '';
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
    const stats = {
      totalClients: await User.countDocuments({ role: 'client' }),
      totalVehicules: await Vehicle.countDocuments(),
      totalReservations: await Reservation.countDocuments(),
      reservationsPending: await Reservation.countDocuments({ status: 'pending' }),
      totalDevis: await Devis.countDocuments(),
      devisPending: await Devis.countDocuments({ status: 'pending' }),
      totalReparations: await Reparation.countDocuments(),
      reparationsInProgress: await Reparation.countDocuments({ status: 'in_progress' }),
      reparationsCompleted: await Reparation.countDocuments({ status: 'completed' })
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;