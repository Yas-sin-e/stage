# Cahier de Charges - AutoExpert

## 1. Présentation du Projet

### 1.1 Nom du Projet
**AutoExpert** - Application Web de Gestion de Garage Automobile

### 1.2 Type d'Application
Application Full-Stack MERN (MongoDB, Express, React, Node.js)

### 1.3 Description Résumée
AutoExpert est une plateforme de gestion de garage automobile permettant aux clients de prendre rendez-vous, gérer leurs véhicules, demander des devis et suivre les réparations. Les administrateurs peuvent gérer les clients, services, réservations, devis et réparations.

---

## 2. Objectifs du Projet

### 2.1 Objectifs Principaux
- Permettre aux clients de s'inscrire et se connecter
- Permettre aux clients de gérer leurs véhicules
- Permettre aux clients de prendre des rendez-vous pour des services
- Permettre aux clients de demander des devis
- Permettre aux administrateurs de gérer l'ensemble du garage

### 2.2 Fonctionnalités Clés
- Authentification utilisateurs (JWT)
- Gestion des rôles (client/admin)
- Gestion des véhicules (CRUD)
- Gestion des services (CRUD)
- Gestion des réservations (CRUD)
- Gestion des devis (CRUD)
- Gestion des réparations (CRUD)
- Chat IA pour assistance
- Tableau de bord administratif

---

## 3. Spécifications Techniques

### 3.1 Stack Technique

#### Backend
| Technologie | Version |
|------------|---------|
| Node.js | - |
| Express | ^5.2.1 |
| MongoDB | ^7.0.0 |
| Mongoose | ^9.1.5 |
| JWT | ^9.0.3 |
| bcryptjs | ^3.0.3 |
| cors | ^2.8.6 |
| dotenv | ^17.2.3 |
| ollama (AI) | ^0.6.3 |

#### Frontend
| Technologie | Version |
|------------|---------|
| React | ^19.2.0 |
| Vite | ^7.2.4 |
| React Router | ^7.13.0 |
| Tailwind CSS | ^3.4.19 |
| Axios | ^1.13.3 |
| React Hook Form | ^7.71.1 |
| React Hot Toast | ^2.6.0 |
| Recharts | ^3.7.0 |
| SweetAlert2 | ^11.26.17 |

### 3.2 Structure des Répertoires

```
autoexpert/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Devis.js
│   │   ├── Reparation.js
│   │   ├── Reservation.js
│   │   ├── Service.js
│   │   ├── User.js
│   │   └── Vehicle.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── chatAI.js
│   │   ├── devis.js
│   │   ├── reparations.js
│   │   ├── reservations.js
│   │   ├── services.js
│   │   └── vehicles.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── homeSection/
    │   │   │   ├── HeroSection.jsx
    │   │   │   └── ServicesSection.jsx
    │   │   └── layout/
    │   │       ├── Footer.jsx
    │   │       ├── Navbar.jsx
    │   │       └── ScrollToTop.jsx
    │   ├── context/
    │   │   └── auth/
    │   │       ├── AuthContext.js
    │   │       ├── AuthProvider.jsx
    │   │       ├── index.js
    │   │       └── useAuth.js
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── DashboardAdmin.jsx
    │   │   │   ├── GestionClients.jsx
    │   │   │   ├── GestionDevis.jsx
    │   │   │   ├── GestionReparations.jsx
    │   │   │   ├── GestionReservations.jsx
    │   │   │   ├── GestionServices.jsx
    │   │   │   └── GestionVehicules.jsx
    │   │   ├── AppPages/
    │   │   │   ├── AboutPage.jsx
    │   │   │   ├── ContactPage.jsx
    │   │   │   ├── HomePage.jsx
    │   │   │   ├── LoginPage.jsx
    │   │   │   ├── ProfilePage.jsx
    │   │   │   ├── RegisterPage.jsx
    │   │   │   └── ServicesPage.jsx
    │   │   └── client/
    │   │       ├── ChatAIPage.jsx
    │   │       ├── DashboardPage.jsx
    │   │       ├── DevisPage.jsx
    │   │       ├── MyVehiclePage.jsx
    │   │       └── ReservationsPage.jsx
    │   ├── services/
    │   │   └── api/
    │   │       └── axios.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 4. Spécifications Fonctionnelles

### 4.1 Authentification

#### Inscription (Register)
- **URL**: `POST /api/auth/register`
- **Paramètres**: name, email, password, phone
- **Réponse**: token JWT, user object
- **Validation**: Email unique, mot de passe min 6 caractères

#### Connexion (Login)
- **URL**: `POST /api/auth/login`
- **Paramètres**: email, password
- **Réponse**: token JWT, user object

#### Profil Utilisateur
- **URL**: `GET /api/auth/me` (protégé)
- **URL**: `PUT /api/auth/profile` (protégé)
- **URL**: `PUT /api/auth/change-password` (protégé)

### 4.2 Gestion des Véhicules

#### Liste des Véhicules
- **URL**: `GET /api/vehicles` (protégé)
- **URL**: `GET /api/vehicles/:id` (protégé)

#### Créer un Véhicule
- **URL**: `POST /api/vehicles` (protégé)
- **Paramètres**: brand, model, year, licensePlate, VIN, mileage

#### Mettre à jour un Véhicule
- **URL**: `PUT /api/vehicles/:id` (protégé)

#### Supprimer un Véhicule
- **URL**: `DELETE /api/vehicles/:id` (protégé)

### 4.3 Gestion des Services

#### Liste des Services
- **URL**: `GET /api/services`
- **URL**: `GET /api/services/:id`

#### Services (Admin)
- **URL**: `POST /api/services` (admin)
- **URL**: `PUT /api/services/:id` (admin)
- **URL**: `DELETE /api/services/:id` (admin)

### 4.4 Gestion des Réservations

#### Liste des Réservations
- **URL**: `GET /api/reservations` (protégé)
- **URL**: `GET /api/admin/reservations` (admin)

#### Créer une Réservation
- **URL**: `POST /api/reservations` (protégé)
- **Paramètres**: vehicleId, serviceId, date, notes

#### Mettre à jour une Réservation
- **URL**: `PUT /api/reservations/:id` (protégé)

#### Annuler une Réservation
- **URL**: `DELETE /api/reservations/:id` (protégé)

### 4.5 Gestion des Devis

#### Liste des Devis
- **URL**: `GET /api/devis` (protégé)
- **URL**: `GET /api/admin/devis` (admin)

#### Créer un Devis
- **URL**: `POST /api/devis` (protégé)
- **Paramètres**: vehicleId, services[], description

#### Mettre à jour un Devis
- **URL**: `PUT /api/devis/:id` (admin)
- **Paramètres**: status, price, notes

### 4.6 Gestion des Réparations

#### Liste des Réparations
- **URL**: `GET /api/reparations` (protégé)
- **URL**: `GET /api/admin/reparations` (admin)

#### Créer une Réparation
- **URL**: `POST /api/reparations` (admin)
- **Paramètres**: vehicleId, devisId, serviceId, startDate, status

#### Mettre à jour une Réparation
- **URL**: `PUT /api/reparations/:id` (admin)
- **Paramètres**: status, endDate, notes

### 4.7 Chat IA

#### Assistant Virtuel
- **URL**: `POST /api/chat` (protégé)
- **Paramètres**: message
- **Réponse**: message de l'IA

### 4.8 Administration

#### Dashboard Admin
- **URL**: `/admin/dashboard`
- **Fonctionnalités**:
  - Statistiques globales
  - Graphiques des reservations
  - Revenus

#### Gestion des Clients
- **URL**: `/admin/clients`
- **Fonctionnalités**:
  - Liste des clients
  - Rechercher un client
  - Voir les details du client

---

## 5. Modèles de Données

### 5.1 User
```
javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  role: String (enum: ['client', 'admin']),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 5.2 Vehicle
```
javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  brand: String (required),
  model: String (required),
  year: Number,
  licensePlate: String,
  VIN: String,
  mileage: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.3 Service
```
javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  basePrice: Number,
  estimatedTime: String,
  category: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 5.4 Reservation
```
javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  vehicleId: ObjectId (ref: Vehicle),
  serviceId: ObjectId (ref: Service),
  date: Date,
  status: String (enum: ['pending', 'confirmed', 'completed', 'cancelled']),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.5 Devis
```
javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  vehicleId: ObjectId (ref: Vehicle),
  services: [ObjectId (ref: Service)],
  description: String,
  status: String (enum: ['pending', 'accepted', 'rejected']),
  totalPrice: Number,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.6 Reparation
```
javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  vehicleId: ObjectId (ref: Vehicle),
  devisId: ObjectId (ref: Devis),
  serviceId: ObjectId (ref: Service),
  status: String (enum: ['in_progress', 'completed', 'delivered']),
  startDate: Date,
  endDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 6. Routes API

| Méthode | URL | Description | Accès |
|---------|-----|-------------|-------|
| GET | / | Route de test | Public |
| POST | /api/auth/register | Inscription | Public |
| POST | /api/auth/login | Connexion | Public |
| GET | /api/auth/me | Profil utilisateur | Protected |
| PUT | /api/auth/profile | Modifier profil | Protected |
| PUT | /api/auth/change-password | Changer mot de passe | Protected |
| GET | /api/services | Liste services | Public |
| POST | /api/services | Créer service | Admin |
| GET | /api/vehicles | Liste véhicules | Protected |
| POST | /api/vehicles | Créer véhicule | Protected |
| GET | /api/reservations | Liste réservations | Protected |
| POST | /api/reservations | Créer réservation | Protected |
| GET | /api/devis | Liste devis | Protected |
| POST | /api/devis | Créer devis | Protected |
| GET | /api/reparations | Liste réparations | Protected |
| POST | /api/reparations | Créer réparation | Admin |
| GET | /api/admin/* | Routes admin | Admin |
| POST | /api/chat | Chat IA | Protected |

---

## 7. Pages Frontend

### 7.1 Pages Publiques
- **/** - Page d'accueil
- **/about** - À propos
- **/services** - Services
- **/contact** - Contact
- **/login** - Connexion
- **/register** - Inscription

### 7.2 Pages Client (Protégées)
- **/dashboard** - Tableau de bord client
- **/profile** - Profil utilisateur
- **/my-vehicles** - Mes véhicules
- **/reservations/new** - Nouvelle réservation
- **/devis** - Mes devis
- **/chat-ai** - Chat IA

### 7.3 Pages Admin (Admin uniquement)
- **/admin/dashboard** - Tableau de bord admin
- **/admin/clients** - Gestion clients
- **/admin/vehicles** - Gestion véhicules
- **/admin/services** - Gestion services
- **/admin/reservations** - Gestion réservations
- **/admin/devis** - Gestion devis
- **/admin/reparations** - Gestion réparations

---

## 8. Sécurité

### 8.1 Authentification
- JWT (JSON Web Token) avec expiration de 30 jours
- Stockage du token dans localStorage
- Headers Authorization: Bearer <token>

### 8.2 Autorisation
- Middleware de protection des routes
- Vérification du rôle admin pour les routes administratives

### 8.3 Validation
- Validation des données utilisateur
- Hachage des mots de passe avec bcryptjs

---

## 9. Tests Effectués

### 9.1 Tests API
| Test | Statut |
|------|--------|
| Root API | ✅ OK |
| Register User | ✅ OK |
| Login | ✅ OK |
| Get Services | ✅ OK (23 services) |
| Get Profile | ✅ OK |
| Get Vehicles | ✅ OK |
| Get Reservations | ✅ OK |
| Get Devis | ✅ OK |
| Get Reparations | ✅ OK |
| Frontend | ✅ OK |

### 9.2 Résultats
- **Backend**: Fonctionne sur port 5000
- **Frontend**: Fonctionne sur port 5174
- **MongoDB**: Connecté
- **Services seeded**: 23 services disponibles

---

## 10. Configuration Requise

### 10.1 Variables d'Environnement (Backend)
```
MONGO_URI=mongodb://localhost:27017/autoexpert
JWT_SECRET=votre_secret_jwt
PORT=5000
```

### 10.2 Installation
```
bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

---

## 11. Améliorations Futures Potentielles

1. ** Paiement en ligne** - Intégration Stripe
2. **Notifications** - Email/SMS
3. **Application mobile** - React Native
4. **Multi-langue** - i18n
5. **Dark mode** - Thème sombre
6. **PWA** - Progressive Web App

---

## 12. Conclusion

L'application **AutoExpert** est une solution complète de gestion de garage automobile avec:
- Une architecture moderne MERN
- Une interface utilisateur réactive avec React
- Une authentification sécurisée JWT
- Une gestion complète des utilisateurs, véhicules, services, réservations, devis et réparations
- Un système de chat IA pour l'assistance
- Un tableau de bord administratif complet

L'application est fonctionnelle et prête à être utilisée en production après configuration supplémentaire (SSL, deployment, etc.).
