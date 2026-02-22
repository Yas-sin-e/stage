const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Cache simple en mémoire (5 minutes)
let servicesCache = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// @route   GET /api/services
// @desc    Obtenir tous les services actifs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    
    // Vérifier si le cache est valide
    if (servicesCache && (now - cacheTime) < CACHE_DURATION) {
      return res.json(servicesCache);
    }
    
    const services = await Service.find({ isActive: true }).sort('category name');
    
    // Mettre à jour le cache
    servicesCache = services;
    cacheTime = now;
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

