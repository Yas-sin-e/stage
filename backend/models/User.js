const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
  type: String,
  required: [true, 'Le mot de passe est requis'],
  minlength: 6,
  select: false 
},
  phone: {
    type: String,
    required: [true, 'Le téléphone est requis']
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  },
  isActive: {//pour faire bloquer (ban)periodique sans supprimer
    type: Boolean,
    default: true
  }
}, {
  timestamps: true//pour Mongodb ajout automatiquement les createdAt,updatedAt
});

// Hash password avant sauvegarde
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparer mot de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);