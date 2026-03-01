require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db');

// Connexion DB
//ici le serveur se connecte à la base de données avant de démarrer, assurant que tout est prêt pour les requêtes entrantes.
connectDB();

const app = express(); 

// Middlewares:
// Les middlewares sont des fonctions qui s’exécutent avant d’arriver aux routes, pour préparer ou vérifier les requêtes.
app.use(cors());//permet aux requêtes provenant du frontend de passer sans être bloquées par les politiques de même origine du navigateur. C'est essentiel pour que le frontend puisse communiquer avec le backend, surtout si ils sont hébergés sur des domaines ou ports différents.
app.use(express.json());// transforme les données JSON envoyées par le client en un objet JavaScript accessible via req.body dans les routes. C'est essentiel pour traiter les données d'authentification, de réservation, etc. envoyées depuis le frontend.
app.use(express.urlencoded({ extended: true }));// Permet de traiter les données envoyées via des formulaires HTML (utile pour les routes d'admin qui pourraient utiliser des formulaires classiques).url

// Routes
app.use('/api/auth', require('./routes/auth'));
///api/auth → URL que le frontend va appeler (par exemple via Axios).
//Axios est une bibliothèque JavaScript utilisée pour faire des requêtes HTTP depuis le frontend vers le backend. 
//require('./routes/auth') → récupère le fichier auth.js qui contient toutes les fonctions pour l’authentification (login, register, etc.).
app.use('/api/vehicles', require('./routes/vehicles'));//les sont organiser de manier modulaire : modulaire signifie que chaque fonctionnalité (authentification, gestion des véhicules, services, etc.) est séparée dans des fichiers différents. Cela rend le code plus propre, plus facile à maintenir et à faire évoluer.
app.use('/api/services', require('./routes/services'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/devis', require('./routes/devis'));
app.use('/api/reparations', require('./routes/reparations'));
app.use('/api/admin', require('./routes/admin'));

app.use('/api/chat',require('./routes/chatAI'));

// Route de test
app.get('/', (req, res) => {
  
  res.json({ message: '🚗 API Garage - Fonctionnelle' });
  
});

// Gestion erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});
app.use((err, req, res, next) => {
  console.error(err.stack); // Pour voir l'erreur réelle dans ton terminal
  res.status(500).json({ 
    message: "Erreur interne du serveur",
    error: err.message // Ça t'aidera à débugger le vrai problème (DB, Token, etc.)
  });
});
// Fonction pour pré-chauffer le modèle Ollama
const warmUpOllama = async () => {
  try {
    console.log("🤖 Initialisation du modèle Ollama en cours...");
    // On envoie une requête vide juste pour charger le modèle en RAM
    await axios.post('http://localhost:11434/api/generate', {
      model: "autoexpert", // Le nom du modèle utilisé dans le projet
      prompt: "Hello",
      keep_alive: -1 // OPTION CRITIQUE : Garde le modèle en mémoire indéfiniment
    });
    console.log("✅ Modèle Ollama chargé et prêt (Latence réduite).");
  } catch (error) {
    console.error("⚠️ Ollama non disponible (mode chat AI désactivé):", error.message);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  warmUpOllama(); // On lance le chargement dès que le serveur démarre
});
