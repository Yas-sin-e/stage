const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  // Prix supprimé - le prix dépend du véhicule, sera calculé lors du devis/réservation
  estimatedTime: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Entretien', 'Réparation', 'Diagnostic', 'Carrosserie', 'Autre'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
