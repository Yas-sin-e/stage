const express = require('express');
const router = express.Router();
const { Ollama } = require('ollama');
const { protect } = require('../middleware/authMiddleware');

const ollama = new Ollama({
  host: 'http://localhost:11434'
});

// Vérifier le statut d'Ollama et du modèle
router.get('/ai/status', async (req, res) => {
  try {
    // Vérifier si Ollama est accessible
    const listResponse = await ollama.list();
    const modelExists = listResponse.models.some(model => model.name.includes('autoexpert'));

    res.json({
      success: true,
      modelExists,
      models: listResponse.models.map(m => m.name)
    });
  } catch (error) {
    console.error('Erreur Ollama status:', error);
    res.status(503).json({
      success: false,
      message: 'Service Ollama indisponible'
    });
  }
});

router.post('/ai', protect, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        message: 'Les messages sont requis'
      });
    }

    // Convertir les messages frontend en format Ollama
    const ollamaMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text.trim()
    }));

    const response = await ollama.chat({
      model: 'autoexpert',
      messages: ollamaMessages,
      stream: false
    });

    res.json({
      reply: response.message.content
    });

  } catch (error) {
    console.error('Erreur Ollama:', error);

    res.status(500).json({
      message: 'Erreur de communication avec AutoExpert'
    });
  }
});

module.exports = router;
