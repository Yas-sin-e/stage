const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/vehicles
// @desc    Obtenir mes véhicules
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.user._id }).sort('-createdAt');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/vehicles
// @desc    Ajouter un véhicule
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const vehicle = await Vehicle.create({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).json(vehicle);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Cette immatriculation existe déjà' });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/vehicles/:id
// @desc    Modifier un véhicule
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    Object.assign(vehicle, req.body);
    await vehicle.save();
    
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/vehicles/:id
// @desc    Supprimer un véhicule
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    res.json({ message: 'Véhicule supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;