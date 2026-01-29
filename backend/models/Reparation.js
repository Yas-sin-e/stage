const mongoose = require('mongoose');

const reparationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  devisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Devis',
    required: true
  },
   totalAmount: {
    type: Number,
    required: true 
  },
  service: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'delivered'],
    default: 'pending'
  },
  startDate: Date,
  estimatedEndDate: Date,
  completedAt: Date,
  deliveredAt: Date,
  notes: String,
  technicianNotes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Reparation', reparationSchema);