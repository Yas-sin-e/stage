# Documentation Technique - AutoExpert Backend

## Table des Matières
1. [Structure du Projet](#structure-du-projet)
2. [Fichiers de Configuration](#fichiers-de-configuration)
3. [Modèles de Données](#modèles-de-données)
4. [Middleware](#middleware)
5. [Routes API](#routes-api)
6. [Script de Seed](#script-de-seed)

---

## Structure du Projet

```
backend/
├── config/
│   └── db.js              # Connexion à MongoDB
├── middleware/
│   ├── adminMiddleware.js # Vérification droits admin
│   └── authMiddleware.js   # Authentification JWT
├── models/
│   ├── Devis.js           # Modèle devis
│   ├── Reparation.js     # Modèle réparation
│   ├── Reservation.js    # Modèle réservation
│   ├── Service.js        # Modèle service
│   ├── User.js           # Modèle utilisateur
│   └── Vehicle.js        # Modèle véhicule
├── routes/
│   ├── admin.js          # Routes administration
│   ├── auth.js          # Routes authentification
│   ├── chatAI.js       # Routes chat IA
│   ├── devis.js        # Routes devis
│   ├── reparations.js  # Routes réparations
│   ├── reservations.js  # Routes réservations
│   ├── services.js     # Routes services
│   └── vehicles.js     # Routes véhicules
├── seedServices.js     # Script seed services
├── server.js           # Point d'entrée serveur
└── package.json        # Dépendances npm
```

---

## 1. Fichiers de Configuration

### config/db.js - Connexion à MongoDB

```
javascript
const mongoose = require('mongoose');
```
**Pourquoi:** Importation de Mongoose, la bibliothèque ODM (Object Data Modeling) pour MongoDB. Elle permet de définir des schémas et de interagir avec la base de données de manière structurée.

```
javascript
const connectDB = async () => {
```
**Pourquoi:** Déclaration d'une fonction asynchrone pour connecter à la DB. Async/await est utilisé car la connexion à MongoDB est une opération asynchrone.

```
javascript
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
```
**Pourquoi:** Établit la connexion à MongoDB en utilisant l'URI stockée dans les variables d'environnement (.env). `process.env` permet de sécuriser les informations sensibles.

```
javascript
    console.log(`MongoDB Connected: ${conn.connection.host}`);
```
**Pourquoi:** Affiche un message de confirmation avec l'adresse du serveur MongoDB connecté.

```
javascript
  } catch (error) {
    console.error(`Error: ${error.message}`);
```
**Pourquoi:** Attrape et affiche les erreurs de connexion pour le débogage.

```
javascript
    process.exit(1);
```
**Pourquoi:** Termine le processus Node.js avec un code d'erreur (1) si la connexion échoue. Le serveur ne peut pas fonctionner sans base de données.

```
javascript
module.exports = connectDB;
```
**Pourquoi:** Exporte la fonction pour l'utiliser dans server.js.

---

## 2. Modèles de Données (Models)

### models/User.js - Modèle Utilisateur

```
javascript
const mongoose = require('mongoose');
```
**Pourquoi:** Importation de Mongoose pour créer le schéma de données.

```
javascript
const userSchema = mongoose.Schema({
```
**Pourquoi:** Définition du schéma utilisateur avec les champs nécessaires.

```
javascript
  name: { type: String, required: true },
```
**Pourquoi:** Champ name de type String, obligatoire (required: true).

```
javascript
  email: { type: String, required: true, unique: true },
```
**Pourquoi:** Email unique pour éviter les doublons, obligatoire.

```
javascript
  password: { type: String, required: true },
```
**Pourquoi:** Mot de passe chiffré (ne stockez jamais les mots de passe en clair!).

```
javascript
  phone: { type: String },
```
**Pourquoi:** Numéro de téléphone optionnel.

```
javascript
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
```
**Pourquoi:** Rôle utilisateur avec valeurs limitées (client ou admin). Par défaut, tout nouvel utilisateur est 'client'.

```
javascript
}, { timestamps: true });
```
**Pourquoi:** Ajoute automatiquement les champs createdAt et updatedAt à chaque document.

```
javascript
userSchema.pre('save', async function(next) {
```
**Pourquoi:** Middleware Mongoose qui s'execute AVANT la sauvegarde du document. Utilisé pour hasher le mot de passe.

```
javascript
  if (!this.isModified('password')) {
    next();
  }
```
**Pourquoi:** Si le mot de passe n'a pas été modifié, passer au middleware suivant (ne pas le hasher deux fois).

```
javascript
  const salt = await bcrypt.genSalt(10);
```
**Pourquoi:** Génère un "salt" (grain de sel) de 10 caractères. Le salt ajoute des caractères aléatoires au mot de passe avant le hash pour renforcer la sécurité.

```
javascript
  this.password = await bcrypt.hash(this.password, salt);
```
**Pourquoi:** Hashe le mot de passe avec le salt généré. bcrypt est un algorithme de hachage sécurisé.

```
javascript
userSchema.methods.matchPassword = async function(enteredPassword) {
```
**Pourquoi:** Méthode personnalisée pour comparer un mot de passe entré avec le hash stocké.

```
javascript
  return await bcrypt.compare(enteredPassword, this.password);
```
**Pourquoi:** Compare le mot de passe entré avec le hash stocké. Retourne true/false.

```
javascript
module.exports = mongoose.model('User', userSchema);
```
**Pourquoi:** Crée et exporte le modèle 'User' basé sur le schéma.

---

### models/Vehicle.js - Modèle Véhicule

```javascript
const vehicleSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
```
**Pourquoi:** Référence vers le modèle User (relation parent-enfant). Chaque véhicule appartient à un utilisateur.

```
javascript
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
```
**Pourquoi:** Marque, modèle et année du véhicule - tous obligatoires.

```
javascript
  licensePlate: { type: String, required: true, unique: true },
```
**Pourquoi:** Immatriculation unique pour identifier chaque véhicule.

```
javascript
  mileage: { type: Number },
```
**Kilométrage:** Optionnel, permet de suivre l'usure du véhicule.

```
javascript
}, { timestamps: true });
```
**Pourquoi:** Horodatage automatique.

---

### models/Service.js - Modèle Service

```
javascript
const serviceSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
```
**Pourquoi:** Nom et description du service proposés par le garage.

```
javascript
  basePrice: { type: Number, required: true },
```
**Prix de base:** Prix minimum pour ce service.

```
javascript
  estimatedTime: { type: String },
```
**Durée estimée:** Ex: "2-3 jours" pour informer le client.

```
javascript
  category: { type: String, required: true },
```
**Catégorie:** Permet de regrouper les services (Carrosserie, Mécanique, etc.).

```
javascript
  isActive: { type: Boolean, default: true },
```
**Statut actif:** Permet de désactiver un service sans le supprimer.

---

### models/Reservation.js - Modèle Réservation

```
javascript
const reservationSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
```
**Pourquoi:** Liens vers l'utilisateur et le véhicule concernés.

```
javascript
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
```
**Pourquoi:** Service réservé par le client.

```
javascript
  date: { type: Date, required: true },
```
**Date du rendez-vous:** Obligatoire.

```
javascript
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending' 
  },
```
**Statut:** Enumération qui gère le cycle de vie de la réservation.
- pending: En attente de confirmation
- confirmed: Confirmé par le garage
- completed: Terminé
- cancelled: Annulé

```
javascript
  notes: { type: String }
```
**Notes:** Observations supplémentaires.

---

### models/Devis.js - Modèle Devis

```
javascript
const devisSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
```
**Pourquoi:** Lien vers client et véhicule.

```
javascript
  services: [{
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    price: { type: Number }
  }],
```
**Pourquoi:** Tableau de services avec prix individuels (un devis peut inclure plusieurs services).

```
javascript
  totalPrice: { type: Number, required: true },
```
**Prix total:** Somme de tous les services.

```
javascript
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending' 
  },
```
**Statut du devis:** En attente, accepté ou rejeté par le client.

```
javascript
  validUntil: { type: Date, required: true }
```
**Date validité:** Le devis n'est plus valide après cette date.

---

### models/Reparation.js - Modèle Réparation

```
javascript
const reparationSchema = mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
```
**Pourquoi:** Véhicule en réparation.

```
javascript
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
```
**Pourquoi:** Services effectués sur le véhicule.

```
javascript
  status: { 
    type: String, 
    enum: ['in_progress', 'completed', 'delivered'],
    default: 'in_progress' 
  },
```
**Statut:**
- in_progress: En cours
- completed: Réparations terminées
- delivered: Véhicule rendu au client

```
javascript
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
```
**Dates:** Début et fin prévue de la réparation.

---

## 3. Middleware

### middleware/authMiddleware.js - Authentification

```
javascript
const jwt = require('jsonwebtoken');
```
**Pourquoi:** Import JWT pour vérifier les tokens d'authentification.

```
javascript
const User = require('../models/User');
```
**Pourquoi:** Import du modèle User pour récupérer les données utilisateur.

```
javascript
const protect = async (req, res, next) => {
```
**Pourquoi:** Middleware de protection des routes. Vérifie que l'utilisateur est connecté.

```
javascript
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
```
**Pourquoi:** Vérifie si le header Authorization est présent et commence par "Bearer" (format standard JWT).

```
javascript
    try {
      token = req.headers.authorization.split(' ')[1];
```
**Pourquoi:** Extrait le token du header "Bearer TOKEN". split(' ') sépare "Bearer" du token.

```
javascript
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
```
**Pourquoi:** Vérifie et décode le token avec le secret stocké dans .env. Si le token est invalide, une erreur est lancée.

```
javascript
      req.user = await User.findById(decoded.id).select('-password');
```
**Pourquoi:** Récupère l'utilisateur correspondant à l'ID du token, exclut le mot de passe pour la sécurité.

```
javascript
      next();
```
**Pourquoi:** Passe au middleware/route suivant si l'authentification est réussie.

```
javascript
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
```
**Pourquoi:** Erreur 401 si le token est invalide.

```
javascript
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
```
**Pourquoi:** Erreur 401 si pas de token fourni.

```
javascript
module.exports = { protect };
```
**Pourquoi:** Exporte la fonction protect.

---

### middleware/adminMiddleware.js - Droits Admin

```
javascript
const protect = require('./authMiddleware').protect;
```
**Pourquoi:** Réutilise le middleware d'authentification pour vérifier d'abord que l'utilisateur est connecté.

```
javascript
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};
```
**Pourquoi:** Vérifie si l'utilisateur a le rôle 'admin'. Retourne 403 Forbidden si non.

```
javascript
module.exports = { admin };
```
**Pourquoi:** Exporte la fonction admin.

---

## 4. Routes API

### routes/auth.js - Authentification

#### Génération du token JWT:
```
javascript
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
```
**Pourquoi:** Crée un JWT contenant l'ID utilisateur. expireIn définit la durée de validité (30 jours).

#### Inscription (register):
```
javascript
router.post("/register", async (req, res) => {
```
**Pourquoi:** Route POST pour créer un nouveau compte utilisateur.

```
javascript
  const { name, email, password, phone } = req.body;
```
**Pourquoi:** Extrait les données du corps de la requête. destructuring pour plus de lisibilité.

```
javascript
  const userExists = await User.findOne({ email });
```
**Pourquoi:** Vérifie si un utilisateur avec cet email existe déjà.

```
javascript
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
```
**Pourquoi:** Empêche la création de doublons.

```
javascript
  const user = await User.create({ name, email, password, phone });
```
**Reasons Why:** Creates a new user in the database. The password will be automatically hashed by the pre-save middleware.

```
javascript
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  }
```
**Why:** Returns user information and JWT token upon successful registration. The token is needed for subsequent authenticated requests.

#### Connexion (login):
```
javascript
router.post("/login", async (req, res) => {
```
**Why:** POST route to authenticate an existing user.

```
javascript
  const { email, password } = req.body;
  const user = await User.findOne({ email });
```
**Why:** Searches for user by email.

```
javascript
  if (user && (await user.matchPassword(password))) {
```
**Why:** Uses custom method to compare entered password with hashed password in database.

```
javascript
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
```
**Why:** Returns user data and token if credentials are valid, otherwise returns 401 error.

---

### routes/vehicles.js - Gestion des Véhicules

```
javascript
router.get('/', protect, async (req, res) => {
```
**Why:** GET route to retrieve all vehicles for the authenticated user. 'protect' ensures only logged-in users can access.

```
javascript
  const vehicles = await Vehicle.find({ userId: req.user._id }).sort('-createdAt');
```
**Why:** Finds all vehicles belonging to the user, sorted by creation date (newest first).

```
javascript
router.post('/', protect, async (req, res) => {
```
**Why:** POST route to add a new vehicle for the authenticated user.

```
javascript
  const vehicle = await Vehicle.create({
    ...req.body,
    userId: req.user._id
  });
```
**Why:** Creates vehicle with all provided data and associates it with the current user.

```
javascript
  if (error.code === 11000) {
    return res.status(400).json({ message: 'Cette immatriculation existe déjà' });
  }
```
**Why:** Handles duplicate license plate error (MongoDB error code 11000).

---

### routes/services.js - Services du Garage

```
javascript
let servicesCache = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;
```
**Why:** Implements simple in-memory caching. Stores services for 5 minutes to reduce database queries.

```
javascript
  if (servicesCache && (now - cacheTime) < CACHE_DURATION) {
    return res.json(servicesCache);
  }
```
**Why:** Returns cached data if still valid, avoiding unnecessary database calls.

---

### routes/reservations.js - Réservations

```
javascript
router.post('/', protect, async (req, res) => {
```
**Why:** Creates a new reservation for the authenticated user.

```
javascript
  const { vehicleId, serviceId, date, notes } = req.body;
```
**Why:** Extracts reservation details from request body.

---

### routes/admin.js - Administration

```
javascript
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
```
**Why:** Imports authentication and admin middleware for protected routes.

```
javascript
router.get('/users', protect, admin, async (req, res) => {
```
**Why:** Route accessible only to authenticated admins. Lists all users.

---

## 5. Script de Seed

### seedServices.js

```
javascript
const services = [
  {
    name: "Tôlerie",
    description: "Réparation complète de carrosserie...",
    basePrice: 200,
    estimatedTime: "2-3 jours",
    category: "Carrosserie",
    isActive: true
  },
  // ... autres services
];
```
**Why:** Defines initial service data to populate the database.

```
javascript
const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
```
**Why:** Connects to MongoDB to perform seed operation.

```
javascript
    await Service.deleteMany({});
```
**Why:** Clears existing services before inserting new ones (avoids duplicates).

```
javascript
    await Service.insertMany(services);
```
**Why:** Bulk inserts all services into the database.

```
javascript
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};
```
**Why:** Exits process with success (0) or error (1) code.

```
javascript
seedServices();
```
**Why:** Executes the seed function immediately when script is run.

---

## 6. Point d'Entrée - server.js

```
javascript
require('dotenv').config();
```
**Why:** Loads environment variables from .env file into process.env.

```
javascript
const express = require('express');
const cors = require('cors');
```
**Why:** Express is the web framework. CORS allows frontend to communicate with backend.

```
javascript
connectDB();
```
**Why:** Calls the database connection function before starting the server.

```
javascript
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```
**Why:** 
- cors: Enables Cross-Origin Resource Sharing
- express.json(): Parses incoming JSON requests
- express.urlencoded(): Parses URL-encoded form data

```
javascript
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
// ... autres routes
```
**Why:** Registers all route files with their URL prefixes.

```
javascript
app.get('/', (req, res) => {
  res.json({ message: '🚗 API Garage - Fonctionnelle' });
});
```
**Why:** Test route to verify server is running.

```
javascript
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});
```
**Why:** 404 handler for undefined routes.

```
javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});
```
**Why:** Global error handler to catch and respond to server errors.

```
javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
```
**Why:** Starts the Express server on the configured port (default 5000).

---

## Commandes Utiles

```
bash
# Démarrer le serveur en mode développement
npm run dev

# Exécuter le seed des services
node seedServices.js

# Tester une route (avec curl)
curl http://localhost:5000/api/services
```

---

## Flux de Données Typical

1. **Client** envoie une requête HTTP (ex: login)
2. **Server.js** reçoit la requête et la redirige vers la route appropriée
3. **Middleware** vérifie l'authentification (si protégé)
4. **Route** traite la requête, interagit avec le **Modèle**
5. **Modèle** exécute les opérations MongoDB
6. **Réponse** JSON est renvoyée au client

---

*Document généré automatiquement pour AutoExpert - Garage Management System*
