const express = require('express');
const router = express.Router();
const Devis = require('../models/Devis');
const Reparation = require('../models/Reparation');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// @route   GET /api/devis
// @desc    Obtenir mes devis
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const devis = await Devis.find({ userId: req.user._id })
      .populate('vehicleId', 'brand model plate')
      .sort('-createdAt');
    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/devis/:id
// @desc    Modifier un devis (admin)
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { amount, estimatedTime, dateDebut, dateFin, description, items, serviceLabel } = req.body;
    
    const devis = await Devis.findById(req.params.id);
    if (!devis) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }
    
    if (devis.status !== 'pending') {
      return res.status(400).json({ message: 'Impossible de modifier un devis déjà accepté ou refusé' });
    }
    
    if (amount !== undefined) devis.amount = amount;
    if (estimatedTime) devis.estimatedTime = estimatedTime;
    if (dateDebut) devis.dateDebut = dateDebut;
    if (dateFin) devis.dateFin = dateFin;
    if (description !== undefined) devis.description = description;
    if (items) devis.items = items;
    if (serviceLabel) devis.serviceLabel = serviceLabel;
    
    await devis.save();
    
    const populated = await devis.populate('vehicleId', 'brand model plate');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/devis/:id/accept
// @desc    Accepter un devis
// @access  Private
router.put('/:id/accept', protect, async (req, res) => {
  try {
    const devis = await Devis.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!devis) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }
    if (devis.status === 'accepted') {
  return res.status(400).json({ message: 'Ce devis est déjà accepté' });
}

    devis.status = 'accepted';
    await devis.save();

    // Créer une réparation
    const reparation = await Reparation.create({
      userId: req.user._id,
      vehicleId: devis.vehicleId,
      devisId: devis._id,
      service: devis.serviceLabel,
      totalAmount: devis.amount,
      status: 'pending',
      startDate: devis.dateDebut,
      estimatedEndDate: devis.dateFin,
      notes: devis.description
    });

    res.json({ devis, reparation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/devis/:id/reject
// @desc    Refuser un devis
// @access  Private
router.put('/:id/reject', protect, async (req, res) => {
  try {
    const devis = await Devis.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!devis) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }

    devis.status = 'rejected';
    await devis.save();

    res.json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/devis/:id
// @desc    Supprimer un devis
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const devis = await Devis.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!devis) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }

    await Devis.findByIdAndDelete(req.params.id);
    res.json({ message: 'Devis supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
