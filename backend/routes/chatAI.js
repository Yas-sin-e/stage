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

// @route   POST /api/chat/diagnose
// @desc    Analyser un problème de véhicule avec l'IA
// @access  Private
router.post('/diagnose', protect, async (req, res) => {
  try {
    const { problem, vehicleId } = req.body;

    if (!problem || !vehicleId) {
      return res.status(400).json({
        message: 'Le problème et l\'ID du véhicule sont requis'
      });
    }

    // Récupérer les infos du véhicule
    const Vehicle = require('../models/Vehicle');
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    // Créer le prompt pour le diagnostic
    const prompt = `Tu es un expert en mécanique automobile. Un client décrit un problème avec son véhicule:
- Marque: ${vehicle.brand}
- Modèle: ${vehicle.model}
- Année: ${vehicle.year || 'Non spécifiée'}
- Kilométrage: ${vehicle.kilometrage || 'Non spécifié'} km
- Problème décrit: ${problem}

Analyse ce problème et fournis:
1. Une description courte du problème probable
2. Les services suggérés (nom du service, prix estimé en TND, durée estimée)
3. Le niveau de gravité (low, medium, high)

Réponds en JSON avec ce format exact:
{
  "description": "texte court",
  "suggestedServices": [
    {"serviceName": "nom", "estimatedPrice": nombre, "estimatedTime": "durée"}
  ],
  "severity": "low|medium|high"
}`;

    const response = await ollama.chat({
      model: 'autoexpert',
      messages: [{ role: 'user', content: prompt }],
      stream: false
    });

    // Parser la réponse JSON
    let diagnosis;
    try {
      const jsonMatch = response.message.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        diagnosis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Pas de JSON trouvé');
      }
    } catch (parseError) {
      // Si le parsing échoue, créer une réponse par défaut
      diagnosis = {
        description: response.message.content.substring(0, 200),
        suggestedServices: [
          { serviceName: 'Diagnostic complet', estimatedPrice: 50, estimatedTime: '1h' }
        ],
        severity: 'medium'
      };
    }

    // Ajouter la date d'analyse
    diagnosis.analyzedAt = new Date();

    res.json(diagnosis);

  } catch (error) {
    console.error('Erreur Ollama diagnose:', error);
    res.status(500).json({
      message: 'Erreur lors du diagnostic IA'
    });
  }
});

module.exports = router;
