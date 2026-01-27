require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connexion DB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/services', require('./routes/services'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/devis', require('./routes/devis'));
app.use('/api/reparations', require('./routes/reparations'));
app.use('/api/admin', require('./routes/admin'));

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});