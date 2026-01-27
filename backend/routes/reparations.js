const express = require('express');
const router = express.Router();
const Reparation = require('../models/Reparation');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/reparations
// @desc    Obtenir mes réparations
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const reparations = await Reparation.find({ userId: req.user._id })
      .populate('vehicleId', 'brand model plate')
      .populate('devisId')
      .sort('-createdAt');
    res.json(reparations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/reparations/:id/recuperer
// @desc    Marquer véhicule comme récupéré
// @access  Private
router.put('/:id/recuperer', protect, async (req, res) => {
  try {
    const reparation = await Reparation.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!reparation) {
      return res.status(404).json({ message: 'Réparation non trouvée' });
    }

    if (reparation.status !== 'completed') {
      return res.status(400).json({ message: 'La réparation n\'est pas terminée' });
    }

    reparation.status = 'delivered';
    reparation.deliveredDate = new Date();
    await reparation.save();

    res.json(reparation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;