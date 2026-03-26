const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
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
  // Service prédéfini (optionnel - peut être null si problème personnalisé)
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  // Champ pour problème personnalisé si pas dans la liste des services
  customProblem: {
    type: String,
    default: ''
  },
  // Diagnostic IA - stocké ici pour être lié à la réservation

 
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  adminNotes: String,
  // Prix calculé après diagnostic (sera renseigné par l'admin)
  finalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
