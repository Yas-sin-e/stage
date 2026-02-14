const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/reservations
// @desc    Obtenir mes réservations
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id })
      .populate('vehicleId', 'brand model plate')
      .populate('serviceId', 'name')
      .sort('-createdAt');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/reservations
// @desc    Créer une réservation
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      userId: req.user._id
    });
    
    const populated = await reservation.populate([
      { path: 'vehicleId', select: 'brand model plate' },
      { path: 'serviceId', select: 'name' }
    ]);
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/reservations/:id
// @desc    Modifier une réservation
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    if (reservation.status !== 'pending') {
      return res.status(400).json({ message: 'Impossible de modifier une réservation déjà acceptée' });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate([
      { path: 'vehicleId', select: 'brand model plate' },
      { path: 'serviceId', select: 'name' }
    ]);

    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/reservations/:id
// @desc    Supprimer une réservation
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    await reservation.deleteOne();
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;