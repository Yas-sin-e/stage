const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Cache simple en mémoire (5 minutes)
let servicesCache = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fonction pour invalider le cache
const invalidateCache = () => {
  servicesCache = null;
  cacheTime = 0;
};

// @route   GET /api/services
// @desc    Obtenir tous les services NON archivés (actifs et disponibles pour réservation)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    
    // Vérifier si le cache est valide
    if (servicesCache && (now - cacheTime) < CACHE_DURATION) {
      return res.json(servicesCache);
    }
    
    // Afficher uniquement les services non archivés (archivedAt === null)
    const services = await Service.find({ archivedAt: null }).sort('category name');
    
    // Mettre à jour le cache
    servicesCache = services;
    cacheTime = now;
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajouter la fonction au router pour l'exporter
router.invalidateCache = invalidateCache;

module.exports = router;

