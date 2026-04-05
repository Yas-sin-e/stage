require('dotenv').config();
const { Ollama } = require('ollama');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const ollamaWarm = new Ollama({ host: 'http://localhost:11434' });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/services', require('./routes/services'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/devis', require('./routes/devis'));
app.use('/api/reparations', require('./routes/reparations'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/chat', require('./routes/chatAI'));

app.get('/', (req, res) => {
  res.json({ message: 'API Garage - Fonctionnelle' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${err.stack}`);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Token invalide' });
  }
  res.status(500).json({ message: "Erreur interne", error: err.message });
});

const warmUpOllama = async () => {
  try {
    console.log("Initialisation du modèle Ollama...");
    await ollamaWarm.chat({
      model: 'autoexpert',
      messages: [{ role: 'user', content: 'init' }],
      keep_alive: -1,
      stream: false
    });
    console.log("Modèle prêt en mémoire.");
  } catch (error) {
    console.error("Ollama indisponible:", error.message);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  warmUpOllama();
});