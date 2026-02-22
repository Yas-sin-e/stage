# Documentation Technique - AutoExpert Frontend

## Table des Matières
1. [Structure du Projet](#structure-du-projet)
2. [Point d'Entrée](#point-dentrée)
3. [Configuration API](#configuration-api)
4. [Context Authentification](#context-authentification)
5. [Composants Layout](#composants-layout)
6. [Pages Publiques](#pages-publiques)
7. [Pages Client](#pages-client)
8. [Pages Admin](#pages-admin)

---

## Structure du Projet

```
frontend/src/
├── App.jsx                    # Application principale avec les routes
├── main.jsx                   # Point d'entrée React
├── index.css                  # Styles globaux
├── App.css                    # Styles de App
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Navigation principale
│   │   ├── Footer.jsx         # Pied de page
│   │   └── ScrollToTop.jsx    # Remonter en haut
│   └── homeSection/
│       ├── HeroSection.jsx    # Section hero page d'accueil
│       └── ServicesSection.jsx # Section services
├── context/
│   └── auth/
│       ├── AuthContext.js     # Contexte authentification
│       ├── AuthProvider.jsx   # Provider authentification
│       ├── useAuth.js         # Hook custom
│       └── index.js           # Export centralisé
├── data/
│   └── services.js            # Données statiques services
├── pages/
│   ├── AppPages/              # Pages publiques
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── client/                # Pages client
│   │   ├── DashboardPage.jsx
│   │   ├── MyVehiclePage.jsx
│   │   ├── ReservationsPage.jsx
│   │   ├── DevisPage.jsx
│   │   └── ChatAIPage.jsx
│   └── admin/                 # Pages admin
│       ├── DashboardAdmin.jsx
│       ├── GestionClients.jsx
│       ├── GestionReservations.jsx
│       ├── GestionDevis.jsx
│       ├── GestionReparations.jsx
│       ├── GestionServices.jsx
│       └── GestionVehicules.jsx
└── services/
    └── api/
        └── axios.js           # Configuration axios
```

---

## 1. Point d'Entrée - main.jsx

```
javascript
import { StrictMode } from 'react';
```
**Pourquoi:** StrictMode est un outil de développement qui active des vérifications supplémentaires pour identifier les problèmes potentiels dans l'application (legacy APIs, effets secondaires, etc.).

```
javascript
import { createRoot } from 'react-dom/client';
```
**Pourquoi:** createRoot est la nouvelle API React 18 pour le rendu du composant racine. Remplace ReactDOM.render().

```
javascript
import { BrowserRouter } from 'react-router-dom';
```
**Pourquoi:** BrowserRouter est le composant de routage qui utilise l'API History HTML5 pour garder l'URL synchronisée avec la vue.

```
javascript
import { Toaster } from 'react-hot-toast';
```
**Pourquoi:** Toaster est une bibliothèque pour afficher des notifications toast (messages temporaires). Permet d'afficher des succès, erreurs, etc.

```
javascript
import App from './App.jsx';
import { AuthProvider } from './context/auth';
import ScrollToTop from './components/layout/ScrollToTop';
import './index.css';
```
**Pourquoi:** 
- App: Le composant principal de l'application
- AuthProvider: Fournit le contexte d'authentification à toute l'app
- ScrollToTop: Component qui remet la page en haut à chaque changement de route
- index.css: Styles globaux de l'application

```
javascript
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Toaster position="top-center" toastOptions={{...}} />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
```
**Pourquoi:** Structure hierarchy:
1. StrictMode → Mode développement
2. BrowserRouter → Gestion des URLs
3. AuthProvider → Contexte authentification
4. ScrollToTop → Comportement navigation
5. Toaster → Notifications
6. App → Application principale

---

## 2. Application Principale - App.jsx

### Importations

```
javascript
import { Routes, Route, Navigate } from "react-router-dom";
```
**Pourquoi:** 
- Routes: Conteneur pour toutes les routes
- Route: Définit une route individuelle
- Navigate: Redirige vers une autre URL

```
javascript
import { useAuth } from "./context/auth";
```
**Pourquoi:** Hook custom pour accéder au contexte d'authentification (user, login, logout, etc.)

```
javascript
import { Toaster } from "react-hot-toast";
```
**Pourquoi:** Notifications toast pour les messages de succès/erreur

### Importations des Composants

```
javascript
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
```
**Pourquoi:** Composants de mise en page (header et footer)

```
javascript
import ChatAIPage from "./pages/client/ChatAIPage";
import HomePage from "./pages/AppPages/HomePage";
// ... autres pages
```
**Pourquoi:** Importation de toutes les pages de l'application

### Composant ProtectedRoute

```
javascript
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Chargement...</div>;
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (adminOnly && user.role !== "admin")
    return <Navigate to="/dashboard" replace />;
    
  return children;
};
```
**Pourquoi:** 
- `children`: Le contenu à afficher si l'accès est autorisé
- `adminOnly`: Booléen pour 指定er si uniquement les admins peuvent accéder
- `loading`: Attend que les données d'authentification soient chargées
- `user`: Vérifie si l'utilisateur est connecté
- `user.role`: Vérifie si l'utilisateur est admin
- `Navigate`: Redirige vers la page appropriée

### Composant PublicRoute

```
javascript
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (user) return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} replace />;
  
  return children;
};
```
**Pourquoi:** 
- Empêche les utilisateurs connectés d'accéder aux pages publiques (login, register)
- Redirige vers le dashboard approprié selon le rôle

### Structure des Routes

```
javascript
<Routes>
  {/* Routes publiques */}
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/services" element={<ServicesPage />} />
  <Route path="/contact" element={<ContactPage />} />
  
  {/* Routes d'authentification */}
  <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
  <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
  
  {/* Routes client */}
  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
  <Route path="/my-vehicles" element={<ProtectedRoute><MyVehiclePage /></ProtectedRoute>} />
  
  {/* Routes admin */}
  <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><DashboardAdmin /></ProtectedRoute>} />
</Routes>
```
**Pourquoi:** Définit toutes les URLs accessibles et leurs composants associés avec protection par rôle

---

## 3. Configuration API - services/api/axios.js

```
javascript
import axios from 'axios';
```
**Pourquoi:** Import d'axios, bibliothèque pour faire des requêtes HTTP

```
javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});
```
**Pourquoi:** 
- `baseURL`: URL de base du backend (localhost:5000)
- `timeout`: Timeout de 10 secondes pour les requêtes

```
javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userInfo');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
  }
  return config;
});
```
**Pourquoi:** Intercepteur qui ajoute automatiquement le token JWT dans le header de chaque requête

```
javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```
**Pourquoi:** 
- Intercepte les erreurs de réponse
- Si 401 (non autorisé), supprime le token et redirige vers login
- Propage l'erreur pour que le composant puisse la gérer

```
javascript
export default api;
```
**Pourquoi:** Exporte l'instance axios configurée pour l'utiliser dans les services

---

## 4. Context d'Authentification

### index.js

```
javascript
export { AuthProvider, useAuth } from './AuthProvider';
export { AuthContext } from './AuthContext';
```
**Pourquoi:** Export centralisé pour faciliter les imports

### AuthContext.js

```
javascript
import { createContext } from 'react';
export const AuthContext = createContext(null);
```
**Pourquoi:** Crée le contexte React pour partager l'état d'authentification

### AuthProvider.jsx

```
javascript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
```
**Pourquoi:** 
- `user`: Stocke les infos de l'utilisateur connecté
- `loading`: Indique si les données sont en cours de chargement

```
javascript
useEffect(() => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    setUser(JSON.parse(userInfo));
  }
  setLoading(false);
}, []);
```
**Pourquoi:** Au chargement, récupère le token depuis localStorage pour maintenir la session

```
javascript
const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  setUser(data);
};
```
**Pourquoi:** Fonction de connexion qui appelle l'API et stocke les infos utilisateur

```
javascript
const logout = () => {
  localStorage.removeItem('userInfo');
  setUser(null);
};
```
**Pourquoi:** Fonction de déconnexion qui supprimer le token

---

## 5. Composants Layout

### Navbar.jsx

```
javascript
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
```
**Pourquoi:** 
- Link: Navigation sans rechargement de page
- useNavigate: Programmation de la navigation
- useAuth: Accès au contexte utilisateur
- toast: Notifications

```
javascript
<nav className="bg-slate-900 text-white">
```
**Pourquoi:** Barre de navigation avec fond sombre (Tailwind CSS)

```
javascript
{user ? (
  <div className="flex items-center gap-4">
    {user.role === 'admin' ? (
      <Link to="/admin/dashboard">Admin</Link>
    ) : (
      <Link to="/dashboard">Dashboard</Link>
    )}
    <button onClick={logout}>Déconnexion</button>
  </div>
) : (
  <Link to="/login">Connexion</Link>
)}
```
**Pourquoi:** Affiche des liens différents selon que l'utilisateur est connecté ou non

### Footer.jsx

```
javascript
<footer className="bg-slate-900 text-slate-400 py-8">
```
**Pourquoi:** Pied de page avec fond sombre

```
javascript
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
```
**Pourquoi:** Grille responsive avec 3 colonnes sur desktop

### ScrollToTop.jsx

```
javascript
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```
**Pourquoi:** Remonte automatiquement en haut de la page quand l'URL change

---

## 6. Pages Publiques

### HomePage.jsx

```
javascript
import HeroSection from '../../components/homeSection/HeroSection';
import ServicesSection from '../../components/homeSection/ServicesSection';
```
**Pourquoi:** Importe les sections de la page d'accueil

```
javascript
return (
  <div>
    <HeroSection />
    <ServicesSection />
  </div>
);
```
**Pourquoi:** Assemble les sections pour former la page d'accueil

### LoginPage.jsx

```
javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```
**Pourquoi:** États pour stocker les inputs du formulaire

```
javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login(email, password);
    navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    toast.success('Connexion réussie!');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Erreur de connexion');
  }
};
```
**Pourquoi:** 
- `e.preventDefault()`: Empêche le rechargement de la page
- Appelle la fonction login du contexte
- Redirige selon le rôle utilisateur
- Affiche un toast de succès ou d'erreur

### RegisterPage.jsx

```
javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  phone: ''
});
```
**Pourquoi:** État objet pour gérer tous les champs du formulaire

```
javascript
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```
**Pourquoi:** Met à jour le champ correspondant dans l'objet formData

---

## 7. Pages Client

### DashboardPage.jsx

```
javascript
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';
```
**Pourquoi:** Accès aux infos utilisateur et navigation

```
javascript
return (
  <div className="p-6">
    <h1>Bienvenue, {user.name}</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link to="/my-vehicles" className="card">Mes Véhicules</Link>
      <Link to="/reservations/new" className="card">Réservations</Link>
      <Link to="/devis" className="card">Devis</Link>
    </div>
  </div>
);
```
**Pourquoi:** Dashboard avec cartes de navigation vers les fonctionnalités

### MyVehiclePage.jsx

```
javascript
const [vehicles, setVehicles] = useState([]);
const [loading, setLoading] = useState(true);
```
**Pourquoi:** 
- `vehicles`: Stocke la liste des véhicules
- `loading`: Indicateur de chargement

```
javascript
useEffect(() => {
  const fetchVehicles = async () => {
    const { data } = await api.get('/vehicles');
    setVehicles(data);
    setLoading(false);
  };
  fetchVehicles();
}, []);
```
**Pourquoi:** Au chargement, récupère les véhicules de l'API

```
javascript
const handleDelete = async (id) => {
  if (window.confirm('Voulez-vous supprimer ce véhicule?')) {
    await api.delete(`/vehicles/${id}`);
    setVehicles(vehicles.filter(v => v._id !== id));
    toast.success('Véhicule supprimé');
  }
};
```
**Pourquoi:** 
- Confirme la suppression
- Appelle l'API de suppression
- Met à jour l'état local

### ReservationsPage.jsx

```
javascript
const [formData, setFormData] = useState({
  vehicleId: '',
  serviceId: '',
  date: '',
  notes: ''
});
```
**Pourquoi:** État pour le formulaire de réservation

```
javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  await api.post('/reservations', formData);
  toast.success('Réservation créée!');
  navigate('/dashboard');
};
```
**Pourquoi:** Crée une réservation et redirige

### DevisPage.jsx

```
javascript
const [devis, setDevis] = useState([]);
```
**Pourquoi:** État pour stocker les devis de l'utilisateur

```
javascript
const { data } = await api.get('/devis');
```
**Pourquoi:** Récupère les devis depuis l'API

### ChatAIPage.jsx

```
javascript
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');
```
**Pourquoi:** 
- `messages`: Historique des messages
- `input`: Message en cours de saisie

```
javascript
const sendMessage = async () => {
  const newMessage = { role: 'user', content: input };
  setMessages([...messages, newMessage]);
  
  const { data } = await api.post('/chat', { message: input });
  setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
};
```
**Pourquoi:** Envoie le message à l'API et affiche la réponse

---

## 8. Pages Admin

### DashboardAdmin.jsx

```
javascript
const [stats, setStats] = useState({
  users: 0,
  vehicles: 0,
  reservations: 0,
  devis: 0
});
```
**Pourquoi:** État pour les statistiques du dashboard

```
javascript
useEffect(() => {
  const fetchStats = async () => {
    const [users, vehicles, reservations, devis] = await Promise.all([
      api.get('/admin/users'),
      api.get('/admin/vehicles'),
      api.get('/admin/reservations'),
      api.get('/admin/devis')
    ]);
    setStats({
      users: users.data.length,
      vehicles: vehicles.data.length,
      reservations: reservations.data.length,
      devis: devis.data.length
    });
  };
  fetchStats();
}, []);
```
**Pourquoi:** Charge toutes les statistiques en parallèle

```
javascript
return (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="bg-blue-500 p-4 rounded text-white">
      <h3>Utilisateurs</h3>
      <p className="text-2xl">{stats.users}</p>
    </div>
  </div>
);
```
**Pourquoi:** Affiche les statistiques dans des cartes

### GestionClients.jsx

```
javascript
const [clients, setClients] = useState([]);
```
**Pourquoi:** État pour la liste des clients

```
javascript
useEffect(() => {
  api.get('/admin/users').then(res => setClients(res.data));
}, []);
```
**Pourquoi:** Charge la liste des utilisateurs

```
javascript
const handleRoleChange = async (userId, newRole) => {
  await api.put(`/admin/users/${userId}`, { role: newRole });
  toast.success('Rôle mis à jour');
};
```
**Pourquoi:** Met à jour le rôle d'un utilisateur

### GestionReservations.jsx

```
javascript
const updateStatus = async (id, status) => {
  await api.put(`/admin/reservations/${id}`, { status });
  setReservations(reservations.map(r => 
    r._id === id ? { ...r, status } : r
  ));
  toast.success('Statut mis à jour');
};
```
**Pourquoi:** Met à jour le statut d'une réservation (confirmée, terminée, annulée)

### GestionDevis.jsx

```
javascript
const acceptDevis = async (id) => {
  await api.put(`/admin/devis/${id}`, { status: 'accepted' });
  toast.success('Devis accepté');
};
```
**Pourquoi:** Accepte un devis (action admin)

### GestionServices.jsx

```
javascript
const [services, setServices] = useState([]);
```
**Pourquoi:** Liste des services proposés par le garage

```
javascript
const handleAdd = async (serviceData) => {
  await api.post('/admin/services', serviceData);
  setServices([...services, newService]);
};
```
**Pourquoi:** Ajoute un nouveau service

### GestionVehicules.jsx

```
javascript
const [vehicles, setVehicles] = useState([]);
```
**Pourquoi:** Liste de tous les véhicules de tous les utilisateurs

---

## 9. Données Statiques - data/services.js

```
javascript
export const servicesData = [
  {
    id: 1,
    name: "Réparation Moteur",
    description: "Diagnostique et répare les problèmes de moteur...",
    price: "À partir de 150€",
    icon: "🔧"
  },
  // ...
];
```
**Pourquoi:** Données statiques pour l'affichage des services sur la page d'accueil (non issues de la DB)

---

## Flux de Données Frontend

1. **Chargement App** → main.jsx charge AuthProvider
2. **AuthProvider** → Vérifie localStorage pour token
3. **App.jsx** → Définit les routes avec protection
4. **Navigation** → Click sur un lien
5. **ProtectedRoute** → Vérifie si user connecté
6. **Page** → useEffect charge données via API
7. **API** → axios ajoute token et appelle backend
8. **Affichage** → Données affichées dans le composant

---

## Commandes Utiles

```
bash
# Démarrer le frontend
cd frontend
npm run dev

# Build pour production
npm run build
```

---

*Document généré automatiquement pour AutoExpert - Garage Management System*
