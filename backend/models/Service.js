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
  basePrice: {
    type: Number,
    required: true
  },
  estimatedTime: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Entretien', 'Réparation', 'Diagnostic', 'Carrosserie', 'Mécanique', 'Électrique', 'Tôlerie'],
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
