const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { protect } = require("../middleware/authMiddleware");
const { Error } = require("mongoose");
const sendEmail = require("../utils/sendEmail");

// Générer JWBT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @route   POST /api/auth/register
// @desc    Inscription
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Vérifier si l'utilisateur existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer utilisateur
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "client",
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Connexion
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier l'utilisateur
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier si actif 
    if (!user.isActive) {
      return res.status(403).json({ message: "Compte désactivé" });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Obtenir utilisateur connecté
// @access  Private
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

// @route   PUT /api/auth/profile
// @desc    Mettre à jour le profil
// @access  Private
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email !== req.user.email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: req.user._id },
      });
      if (emailExists) {
        return res.status(400).json({ message: "Cet email est déjà utilisé" });
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
      role: req.user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/check-email
// @desc    Vérifier la disponibilité de l'email
// @access  Private
router.post("/check-email", protect, async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user._id },
    });

    res.json({ available: !emailExists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Changer le mot de passe
// @access  Private
router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!currentPassword || !user.password) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Minimum 6 caractères requis" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Mot de passe changé avec succès" });
  } catch (error) {
    console.error("DEBUG ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/auth/profile
// @desc    Supprimer le compte  (mais pas encore cree dans le frontend)
// @access  Private
router.delete("/profile", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Supprimer tous les véhicules de l'utilisateur
    await require("../models/Vehicle").deleteMany({ userId });

    // Supprimer toutes les réservations de l'utilisateur
    await require("../models/Reservation").deleteMany({ userId });

    // Supprimer tous les devis de l'utilisateur
    await require("../models/Devis").deleteMany({ userId });

    // Supprimer toutes les réparations de l'utilisateur
    await require("../models/Reparation").deleteMany({ userId });

    // Supprimer l'utilisateur
    await User.findByIdAndDelete(userId);

    res.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Demander réinitialisation mot de passe
// @access  Public
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body; 

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Aucun compte avec cet email" });
    }

    // Générer token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 3600000; // 1 heure
    await user.save();

    // URL de réinitialisation
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    const message = `
      <h2>Réinitialisation de mot de passe</h2>
      <p>Vous avez demandé une réinitialisation de mot de passe.</p>
      <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Réinitialiser mon mot de passe</a>
      <p>Ce lien expire dans 1 heure.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Réinitialisation de mot de passe - AutoExpert",
        message
      });
      res.json({ message: "Email de réinitialisation envoyé" });
    } catch (emailError) {
      // En cas d'erreur d'email, afficher le lien dans la console (dev only)
      console.log("\n===========================================");
      console.log(" LIEN DE RÉINITIALISATION (DÉVELOPPEMENT):");
      console.log("===========================================");
      console.log(`Email: ${user.email}`);
      console.log(`Lien: ${resetUrl}`);
      console.log("===========================================\n");
      
      res.json({ message: "Email de réinitialisation envoyé (lien affiché en console pour test)" });
    }
  } catch (error) {
    console.error("Erreur forgot-password:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
});

// @route   POST /api/auth/reset-password/:token
// @desc    Réinitialiser le mot de passe
// @access  Public
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Minimum 6 caractères requis" });
    }

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now()  } 

    });

    if (!user) {
      return res.status(400).json({ message: "Token invalide " });
    }
    if (user.resetPasswordExpire < Date.now()) {
  return res.status(400).json({ message: "Token expiré — faites une nouvelle demande" });
}

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
