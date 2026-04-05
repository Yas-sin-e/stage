# AutoExpert Backend - Guide Complet Débutant 🚗🔧

## Aperçu Général du Projet Backend
**AutoExpert** est une API Node.js/Express pour gérer un garage automobile. 
- **Langages**: JavaScript (Node.js v20+)
- **Framework**: Express.js v5.2.1
- **Base de données**: MongoDB (via Mongoose v9.1.5)
- **Authentification**: JWT (jsonwebtoken v9.0.3) + bcryptjs v3.0.3
- **Email**: Nodemailer v8.0.1
- **IA**: Ollama v0.6.3 (modèle 'autoexpert' local)
- **Dépendances clés** (de package.json):
```
express: Serveur web
mongoose: ORM MongoDB
bcryptjs: Hashage mots de passe
jsonwebtoken: Tokens JWT
cors: Autoriser frontend
dotenv: Variables d'environnement
nodemon: Auto-reload dev
ollama: Chat IA local
```
- **Fonctionnalités**: Users (client/admin), Vehicles, Services, Reservations, Devis (quotes), Reparations, Admin CRUD, Chat IA diagnostic.

**Comment lancer**:
```
cd backend
npm install
npm run dev  # nodemon server.js
```

**Structure fichiers** (du CWD):
```
backend/
├── server.js ← Point d'entrée (lire en 1er)
├── config/db.js
├── middleware/authMiddleware.js + adminMiddleware.js
├── models/ (User.js, Vehicle.js, Service.js, Reservation.js, Devis.js, Reparation.js)
├── routes/ (auth.js, vehicles.js, services.js, reservations.js, devis.js, reparations.js, admin.js, chatAI.js)
├── utils/sendEmail.js
└── package.json
```

## 1. server.js - قلب السيرفر (اقرأ سطر بسطر)

**بالعربية**: هاد الملف هو البوابة الرئيسية ديال الـ API. كلشي يبدأ من هنا: الاتصال بالداتا بيز، تثبيت الـ middlewares، وتحميل الـ routes.

**Français**: Ce fichier est le cœur de l'API. Tout commence ici : connexion DB, middlewares, routes.

```js
require('dotenv').config(); // Charge .env (MONGO_URI, JWT_SECRET, etc.)
const express = require('express'); // Framework web
const cors = require('cors'); // Autorise frontend (localhost:5173)
const connectDB = require('./config/db'); // Connexion MongoDB

connectDB(); // Se connecte AVANT démarrage

const app = express(); // Crée l'app Express

// MIDDLEWARES (s'exécutent sur TOUTES les requêtes)
app.use(cors()); // ✅ Permet req frontend → backend
app.use(express.json()); // ✅ Transforme JSON body → req.body
app.use(express.urlencoded({ extended: true })); // Formulaires HTML

// ROUTES MODULAIRES (chaque dossier = fonctionnalité)
app.use('/api/auth', require('./routes/auth'));     // Login/Register
app.use('/api/vehicles', require('./routes/vehicles')); // Voitures client
app.use('/api/services', require('./routes/services')); // Services garage
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/devis', require('./routes/devis'));
app.use('/api/reparations', require('./routes/reparations'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/chat', require('./routes/chatAI'));   // IA Ollama

app.get('/', (req, res) => res.json({ message: '🚗 API OK' })); // Test

// ERREURS
app.use((req, res) => res.status(404).json({ message: 'Route 404' }));
app.use((err, req, res) => res.status(500).json({ message: err.message }));

// Pré-chauffe Ollama (IA locale)
const warmUpOllama = async () => { /* Charge modèle en RAM */ };

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Port ${PORT}`); warmUpOllama(); });
```
**بالعربية - الهدف**: تشغيل السيرفر، الاتصال بالداتا بيز، تثبيت الـ routes. **كيفاش تستعمل**: `npm run dev` → http://localhost:5000

**Français - But**: Démarre serveur, connecte DB, monte routes/middlewares. **Utilisation**: `npm run dev` → http://localhost:5000


## 2. config/db.js - اتصال MongoDB

**بالعربية**: هاد الفونكسيون كتوصل بالداتا بيز MongoDB (محلي أو Atlas).

**Français**: Cette fonction connecte à MongoDB (local/Atlas).

```js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // 'mongodb://localhost/autoexpert'
    console.log('MongoDB OK');
  } catch (error) {
    process.exit(1); // Arrête serveur si DB KO
  }
};
```
**بالعربية - الهدف**: اتصال تلقائي بالـ MongoDB. **الاستعمال**: Auto dans server.js.

**Français - But**: Connecte à MongoDB Atlas/local. **Utilisation**: Auto-appelé dans server.js.


## 3. models/User.js - مخطط المستخدم (سطر بسطر)

**بالعربية**: هنا كنشوفو كيفاش نصممو model ديال User مع تشفير الباسوورد أوتوماتيك.

**Français**: Schéma User avec hash password automatique.

```js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false }, // Caché par défaut
  phone: { type: String, required: true },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  isActive: { type: Boolean, default: true }, // Pour ban
  resetPasswordToken: String, resetPasswordExpire: Date
}, { timestamps: true }); // createdAt/updatedAt auto

// MIDDLEWARE PRE-SAVE: تشفير الباسوورد أوتو - بالعربية
// كل مرة نحفظو user، كيتشوف الباسوورد تغير ولا لا. إلا تغير → hash
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return; // ما تغيرش → skip
  this.password = await bcrypt.hash(this.password, 10); // تشفير + salt
});

// Français: MIDDLEWARE PRE-SAVE - Hash auto à chaque save si password modifié


// MÉTHODE: Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```
**بالعربية - الهدف**: Model آمن للمستخدمين. **الاستعمال**: `User.create(...)` → hash أوتو.

**Français - But**: Modèle User sécurisé. **Utilisation**: `User.create({name, email, password, phone})` → hash auto.


## 4. middleware/authMiddleware.js - Protection JWT
```js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // 'Bearer eyJ...'
  }
  if (!token) return res.status(401).json({ message: 'Pas de token' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // { id: 'userId' }
  req.user = await User.findById(decoded.id).select('-password'); // User sans pass
  if (!req.user?.isActive) return res.status(403).json({ message: 'Compte KO' });
  next(); // ✅ Continue vers route
};
```
**But**: Vérifie token JWT, attache `req.user`. **Utilisation**: `router.get('/', protect, handler)`.

**adminMiddleware.js**: `adminOnly = (req, res, next) => req.user.role === 'admin' ? next() : 403`.

## 5. routes/auth.js - Authentification Complète
**Fonctions clés** (simplifiées):
- `POST /register`: Crée user → hash pass → JWT → return token/user.
- `POST /login`: Find user → comparePassword → JWT si OK.
- `GET /me` (protect): Return `req.user`.
- `PUT /profile` (protect): Update name/email/phone.
- `POST /forgot-password`: Génère token reset → email lien.
- `POST /reset-password/:token`: Hash new pass si token valide.

**Exemple login**:
```js
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.comparePassword(password))) {
    res.json({ token: generateToken(user._id), user });
  }
});
```
**generateToken**: `jwt.sign({ id }, SECRET, { expiresIn: '30d' })`.

## 6. Autres Models (Similaires)
- **Vehicle.js**: Marque/modèle/immatriculation/userId.
- **Service.js**: Nom/prix/description/catégorie.
- **Reservation.js**: Vehicle/service/date/userId/status.
- **Devis.js/Reparation.js**: Liés à vehicle/user, status (pending/accepted/complete).

## 7. Routes Types (Pattern Commun)
Ex: `routes/reservations.js`:
```js
const router = require('express').Router();
router.use(protect); // TOUS privés

router.get('/', async (req, res) => { // Mes réservations
  const reservations = await Reservation.find({ userId: req.user._id });
  res.json(reservations);
});
router.post('/', async (req, res) => { /* Create */ });
```
**Admin**: CRUD full + accept/reject.

## 8. utils/sendEmail.js + chatAI.js
- **sendEmail**: Nodemailer pour reset pass.
- **chatAI**: POST /api/chat/ai → Ollama local pour diagnostic.

## Flux Complet Projet
1. Frontend → POST /api/auth/register → User.create() → JWT.
2. Stocke token localStorage → Headers: Bearer token.
3. Routes protect → middleware → req.user → DB ops.
4. Admin CRUD sur tout.

**Débogage**: Console.log dans middlewares/routes. Erreurs 401/403 = auth KO.

---

**Fin Backend. Prochain: Frontend!** 📱
