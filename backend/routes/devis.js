const express = require('express');
const router = express.Router();
const Devis = require('../models/Devis');
const Reparation = require('../models/Reparation');
const { protect } = require('../middleware/authMiddleware');

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

module.exports = router;