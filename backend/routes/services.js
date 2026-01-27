const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// @route   GET /api/services
// @desc    Obtenir tous les services actifs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort('category name');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;