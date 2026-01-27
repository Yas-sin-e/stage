const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  brand: {
    type: String,
    required: [true, 'La marque est requise']
  },
  model: {
    type: String,
    required: [true, 'Le modèle est requis']
  },
  year: {
    type: Number,
    required: [true, 'L\'année est requise']
  },
  plate: {
    type: String,
    required: [true, 'L\'immatriculation est requise'],
    unique: true,
    uppercase: true
  },
  vin: {
    type: String,
    required: [true, 'Le VIN est requis']
  },
  color: String,
  mileage: Number
}, {
  timestamps: true
});
//VIN: 1HGCM82633A004352  ← رقم ثابت لكل سيارة
//Plate: 123-ABC-59        ← رقم اللوحة، ممكن يتغيّر

module.exports = mongoose.model('Vehicle', vehicleSchema);