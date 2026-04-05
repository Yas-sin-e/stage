const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Reservation = require('../models/Reservation');
const Devis = require('../models/Devis');
const Reparation = require('../models/Reparation');
const Service = require('../models/Service');
const { protect, adminOnly } = require('../middleware/adminMiddleware');
const servicesRoute = require('./services');

// Accéder à la fonction invalidateCache depuis le router des services
const invalidateCache = servicesRoute.invalidateCache;



// ============================================
// GESTION VÉHICULES (pour l'admin)
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
// GESTION CLIENTS supprimer/lister(client+vehile)
// ============================================

router.get('/clients', protect, adminOnly, async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' })
      .select('-password')
      .sort('-createdAt');

    // Fetch vehicles for each client
    const clientsWithVehicles = await Promise.all(
      clients.map(async (client) => {
        const vehicles = await Vehicle.find({ userId: client._id }).sort('-createdAt');
        return {
          ...client.toObject(),
          vehicles: vehicles
        };
      })
    );

    res.json(clientsWithVehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/clients/:id', protect, adminOnly, async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. Supprimer tous les véhicules du client
    await Vehicle.deleteMany({ userId });

    // 2. Supprimer toutes les réservations du client
    await Reservation.deleteMany({ userId });

    // 3. Supprimer tous les devis du client
    await Devis.deleteMany({ userId });

    // 4. Supprimer toutes les réparations du client
    await Reparation.deleteMany({ userId });

    // 5. Supprimer le client
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
// GESTION RÉSERVATIONS accepter +devis /rejecter
// ============================================

router.get('/reservations', protect, adminOnly, async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('userId', 'name email phone')
      .populate('vehicleId', 'brand model plate')
      .populate('serviceId', 'name basePrice category archivedAt')
      .sort('-createdAt');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/reservations/:id/accept', protect, adminOnly, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('serviceId', 'name basePrice estimatedTime')
      .populate('vehicleId');

    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });

    reservation.status = 'accepted';
    await reservation.save();

    // Créer le devis après acceptation de la réservation
    const serviceLabel = reservation.customProblem || reservation.serviceId?.name || 'Service non spécifié';
    
    // Utiliser le prix de base du service comme estimation initiale
    const estimatedAmount = reservation.serviceId?.basePrice || 0;
    const estimatedTime = reservation.serviceId?.estimatedTime || '24h';
    
    // Calculer la date de fin estimée (par défaut +2 jours)
    const dateFin = new Date(reservation.date);
    dateFin.setDate(dateFin.getDate() + 2);

    const devis = await Devis.create({
      userId: reservation.userId,
      vehicleId: reservation.vehicleId,
      serviceId: reservation.serviceId?._id || null,
      serviceLabel,
      amount: estimatedAmount,
      estimatedTime: estimatedTime,
      dateDebut: reservation.date,
      dateFin: dateFin,
      status: 'pending',
      description: reservation.aiDiagnosis?.description || reservation.customProblem || reservation.notes || ''
    });

    // Populate the created devis to return full details
    const populatedDevis = await Devis.findById(devis._id)
      .populate('userId', 'name email phone')
      .populate('vehicleId', 'brand model plate')
      .populate('serviceId', 'name category');

    res.json({
      reservation,
      devis: populatedDevis,
      message: 'Réservation acceptée et devis créé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de l\'acceptation de la réservation:', error);
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
      .populate('serviceId', 'name category archivedAt')
      .sort('-createdAt');
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/devis', protect, adminOnly, async (req, res) => {
  try {
    const { dateDebut, dateFin } = req.body;

    // Validation des dates
    if (dateDebut && dateFin) {
      const startDate = new Date(dateDebut);
      const endDate = new Date(dateFin);

      if (startDate > endDate) {
        return res.status(400).json({
          message: 'La date de début ne peut pas être supérieure à la date de fin'
        });
      }
    }

    const devis = await Devis.create(req.body);

    // في Mongoose 6، هذا السطر صحيح تماماً
    const populated = await devis.populate([
      { path: 'userId', select: 'name email phone' },
      { path: 'vehicleId', select: 'brand model plate' },
      { path: 'serviceId', select: 'name category icon archivedAt' }
    ]);

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/devis/:id', protect, adminOnly, async (req, res) => {
  try {
    const { dateDebut, dateFin } = req.body;

    // Validation des dates
    if (dateDebut && dateFin) {
      const startDate = new Date(dateDebut);
      const endDate = new Date(dateFin);

      if (startDate > endDate) {
        return res.status(400).json({
          message: 'La date de début ne peut pas être supérieure à la date de fin'
        });
      }
    }

    const devis = await Devis.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate([
      { path: 'userId', select: 'name email phone' },
      { path: 'vehicleId', select: 'brand model plate' },
      { path: 'serviceId', select: 'name category icon' }
    ]);

    if (!devis) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }

    res.json(devis);
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

    // Ensure dateFin exists
    if (!devis.dateFin) {
      const defaultEndDate = new Date(devis.dateDebut);
      defaultEndDate.setDate(defaultEndDate.getDate() + 2);
      devis.dateFin = defaultEndDate;
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
    console.error('Erreur lors de l\'acceptation du devis:', error);
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

router.delete('/devis/:id', protect, adminOnly, async (req, res) => {
  try {
    const devis = await Devis.findByIdAndDelete(req.params.id);
    if (!devis) return res.status(404).json({ message: 'Devis non trouvé' });

    res.json({ message: 'Devis supprimé avec succès' });
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
    
    if (!reparation) {
      return res.status(404).json({ message: 'Réparation non trouvée' });
    }
    
    if (reparation.status === 'delivered') {
      return res.status(400).json({ message: 'Le véhicule est déjà livré' });
    }
    
    if (reparation.status !== 'completed') {
      return res.status(400).json({ message: 'La réparation doit être terminée avant livraison' });
    }
    
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

// DELETE /admin/reparations/:id - Admin delete delivered repair
router.delete('/reparations/:id', protect, adminOnly, async (req, res) => {
  try {
    const reparation = await Reparation.findById(req.params.id);
    if (!reparation) {
      return res.status(404).json({ message: 'Réparation non trouvée' });
    }
    if (reparation.status !== 'delivered') {
      return res.status(400).json({ message: "Seule les réparations livrées peuvent être supprimées" });
    }
    await Reparation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Réparation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// GESTION SERVICES
// ============================================

router.get('/services', protect, adminOnly, async (req, res) => {
  try {
    // Afficher TOUS les services (archivés inclus) pour l'admin
    const services = await Service.find().sort('category name');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/services', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    invalidateCache();  
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
      { new: true, runValidators: true }// le runValidators est important pour s'assurer que les données mises à jour respectent les contraintes du modèle (ex: price >= 0)
    );
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }
    invalidateCache();  // ✅ Invalider le cache
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Archive ou supprime un service intelligemment
// Si des réservations actives existent → Archivage (archivedAt = now)
// Sinon → Suppression complète
router.delete('/services/:id', protect, adminOnly, async (req, res) => {
  try {
    const serviceId = req.params.id;

    // 1. Vérifier s'il y a des réservations actives avec ce service
    const activeReservations = await Reservation.findOne({
      serviceId: serviceId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (activeReservations) {
      // 2. Si oui → Archiver au lieu de supprimer (marquer avec date)
      const service = await Service.findByIdAndUpdate(
        serviceId,
        { archivedAt: new Date() },
        { new: true }
      );
      invalidateCache();  // ✅ Invalider le cache
      return res.json({
        message: 'Service archivé (réservations actives détectées)',
        service,
        archived: true 
      });
    }

    // 3. Si non → Supprimer complètement
    await Service.findByIdAndDelete(serviceId);
    invalidateCache();  // ✅ Invalider le cache
    res.json({ 
      message: 'Service supprimé complètement',
      deleted: true 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route spécifique pour archiver un service (marquer avec archivedAt)
router.put('/services/:id/archive', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { archivedAt: new Date() },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }
    invalidateCache();  // Invalider le cache
    res.json({ 
      message: 'Service archivé avec succès',
      service 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour réactiver un service archivé
router.put('/services/:id/reactivate', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { archivedAt: null },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }
    invalidateCache();  // ✅ Invalider le cache
    res.json({ 
      message: 'Service réactivé avec succès',
      service 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// STATISTIQUES
// ============================================

router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    
    const revenue = await Reparation.aggregate([// ici c'est meacnisme d eaggrgation pipline (filtrage + groupement) pour calculer le total des revenus générés par les réparations livrées
      { $match: { status: 'delivered' } },// c'est filtrage de doucument suelement les repations livrees .
      // Une réparation génère du revenu uniquement si elle est livrée
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      //ici on fait un regroupment des documents avec application des calcul
      //_id:null c'est a dire le id de groupement est null parce que on veut le total global et pas par catégorie ou autre critère et le total c'est le nom du champ calculé qui va contenir la somme de tous les montants totaux des réparations livrées
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
    //KPI métier : Chiffre d’affaires total 

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;