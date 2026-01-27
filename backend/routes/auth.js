const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');
const { Error } = require('mongoose');

// Générer JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Inscription
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Vérifier si l'utilisateur existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer utilisateur
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'client'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
   
  }
});

// @route   POST /api/auth/login
// @desc    Connexion
// @access  Public
router.post('/login', async (req, res,next) => {
  try {
    const { email, password } = req.body;

    // Vérifier l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier si actif
    if (!user.isActive) {
      return res.status(403).json({ message: 'Compte désactivé' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
});

// @route   GET /api/auth/me
// @desc    Obtenir utilisateur connecté
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

// ... (code existant)

// @route   PUT /api/auth/profile
// @desc    Mettre à jour le profil
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email !== req.user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (emailExists) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
    }

    // Mettre à jour l'utilisateur
    req.user.name = name || req.user.name;
    req.user.email = email || req.user.email;
    req.user.phone = phone || req.user.phone;
    
    await req.user.save();

    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Changer le mot de passe
// @access  Private
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Vérifier le mot de passe actuel
    const isMatch = await req.user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }

    // Vérifier la longueur du nouveau mot de passe
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    // Mettre à jour le mot de passe
    req.user.password = newPassword;
    await req.user.save();

    res.json({ message: 'Mot de passe changé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/auth/profile
// @desc    Supprimer le compte
// @access  Private
router.delete('/profile', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Supprimer tous les véhicules de l'utilisateur
    await require('../models/Vehicle').deleteMany({ userId });

    // Supprimer toutes les réservations de l'utilisateur
    await require('../models/Reservation').deleteMany({ userId });

    // Supprimer tous les devis de l'utilisateur
    await require('../models/Devis').deleteMany({ userId });

    // Supprimer toutes les réparations de l'utilisateur
    await require('../models/Reparation').deleteMany({ userId });

    // Supprimer l'utilisateur
    await User.findByIdAndDelete(userId);

    res.json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



