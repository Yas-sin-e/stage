const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const { Error } = require("mongoose");

// Générer JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });//ici le sign  est une methode de jsonweb pour cree un emprinte numerique (token) et je donne l id de l'utilsateur comme une payload :payload est une information que tu veux inclure dans le token, dans ce cas l'id de l'utilisateur. Le secret est une clé secrète utilisée pour signer le token, et expiresIn définit la durée de validité du token (ici 30 jours). Ce token sera ensuite envoyé au client après une connexion ou une inscription réussie, et le client devra l'inclure dans les en-têtes des requêtes futures pour accéder aux routes protégées du backend.exmple de token : id: "64b8f1c2e4b0a5d6f7g8h9i" (l'id de l'utilisateur) et le token lui même ressemblera à une chaîne de caractères alphanumérique générée par JWT, qui encapsule cette information de manière sécurisée.
};

// @route   POST /api/auth/register
// @desc    Inscription
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;//ici {name, email, password, phone} sont extraits de req.body, qui contient les données envoyées par le client lors de l'inscription. Ces champs sont nécessaires pour créer un nouvel utilisateur dans la base de données. Le backend s'assure que toutes les informations requises sont présentes avant de procéder à la création du compte. cette notation d'uilser {} est appelée "destructuring" en JavaScript, elle permet d'extraire facilement les propriétés d'un objet (ici req.body) et de les assigner à des variables individuelles (name, email, password, phone) pour une utilisation plus simple dans le code qui suit.

    // Vérifier si l'utilisateur existe
    const userExists = await User.findOne({ email });//findone est une méthode de Mongoose qui recherche un document dans la collection des utilisateurs (User) qui correspond à la condition spécifiée (ici, un utilisateur avec l'email fourni). Si un utilisateur avec cet email existe déjà dans la base de données, userExists contiendra cet utilisateur, sinon il sera null. Cette vérification est essentielle pour éviter les doublons d'utilisateurs avec le même email, ce qui pourrait causer des problèmes de sécurité et de gestion des comptes.
    if (userExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer utilisateur
    const user = await User.create({// le create relier au modèle User, qui est un schéma Mongoose pour la collection des utilisateurs dans MongoDB. Lorsque tu appelles User.create(), Mongoose va automatiquement appliquer les validations définies dans le schéma (comme les champs requis, les formats, etc.) et aussi exécuter les middlewares pré-save (comme le hashage du mot de passe) avant de sauvegarder le nouvel utilisateur dans la base de données. Donc, en utilisant User.create(), tu bénéficies de toutes les fonctionnalités et sécurités que tu as mises en place dans ton modèle User, ce qui rend le processus de création d'utilisateur plus sûr et plus fiable.
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
    const user = await User.findOne({ email }).select('+password'); // Par défaut, le champ password est exclu (select: false) dans le modèle User pour des raisons de sécurité. En utilisant .select('+password'), tu demandes explicitement à Mongoose d'inclure le champ password dans le résultat de la requête. Cela te permet de comparer le mot de passe fourni par l'utilisateur lors de la connexion avec le mot de passe stocké dans la base de données, qui est nécessaire pour vérifier les informations d'identification de l'utilisateur.
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
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

//ici la route /me est protégée par le middleware protect, ce qui signifie que l'utilisateur doit être authentifié (avoir un token JWT valide) pour accéder à cette route. Lorsque le middleware protect vérifie le token et trouve l'utilisateur correspondant, il attache les informations de cet utilisateur à req.user. Ainsi, lorsque tu accèdes à req.user dans la route /me, tu obtiens les détails de l'utilisateur actuellement connecté, que tu peux ensuite renvoyer au client. C'est une manière courante de fournir une route qui permet aux utilisateurs de voir leurs propres informations après s'être connectés avec succès.

// ... (code existant)

// @route   PUT /api/auth/profile
// @desc    Mettre à jour le profil
// @access  Private
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email !== req.user.email) {
      const emailExists = await User.findOne({//le findone est une methode de mongoose pour retouner un utilsatuer avec ses attribut
        email,
        _id: { $ne: req.user._id },// ici %ne est un operatuer de monogdb  qui va Cherche un document dont l’_id est différent de l’ID de l’utilisateur connecté 
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

    // 1. يجب جلب المستخدم من قاعدة البيانات مع كلمة المرور يدوياً
    // لأن req.user القادم من protect غالباً لا يحتوي على حقل password
    const user = await User.findById(req.user._id);

    // 2. التحقق من وجود كلمة المرور الحالية في الطلب وفي قاعدة البيانات
    if (!currentPassword || !user.password) {
       return res.status(400).json({ message: "Données manquantes" });
    }

    // 3. استخدام الدالة الموجودة في السكيما (comparePassword)
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    }

    // 4. التحقق من طول كلمة المرور الجديدة
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Minimum 6 caractères requis" });
    }

    // 5. تحديث كلمة المرور (الـ Middleware pre-save سيهتم بالتشفير تلقائياً)
    user.password = newPassword;
    await user.save();

    res.json({ message: "Mot de passe changé avec succès" });
  } catch (error) {
    console.error("DEBUG ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/auth/profile
// @desc    Supprimer le compte
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

module.exports = router;
