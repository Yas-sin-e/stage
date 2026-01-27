const mongoose = require('mongoose');

const devisSchema = new mongoose.Schema({
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
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation'
  },
  service: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  estimatedTime: {
    type: String,
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  description: String,
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Devis', devisSchema);