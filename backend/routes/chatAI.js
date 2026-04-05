const { Ollama } = require('ollama');
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Vehicle = require('../models/Vehicle');

const ollama = new Ollama({
  host: 'http://localhost:11434',
  timeout: 60000
});

// Nettoyer les balises <thought>...</thought> des réponses IA
function stripThoughtTags(text) {
  return text.replace(/<thought>[\s\S]*?<\/thought>/gi, '').trim();
}


router.get('/ai/status', async (req, res) => {
  try {
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
      return res.status(400).json({ message: 'Les messages sont requis' });
    }

    // L'intelligence artificielle (Ollama) prendra désormais en charge
    // la vérification conversationnelle des informations du véhicule
    // grâce aux instructions du Modelfile.


    const MAX_MESSAGES = 20;
    const recentMessages = messages.slice(-MAX_MESSAGES);

    const ollamaMessages = recentMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text.trim()
    }));

    const response = await ollama.chat({
      model: 'autoexpert',
      messages: ollamaMessages,
      stream: false
    });

    res.json({ reply: stripThoughtTags(response.message.content) });

  } catch (error) {
    console.error('Erreur Ollama:', error);
    res.status(500).json({ message: 'Erreur de communication avec AutoExpert' });
  }
});

router.post('/diagnose', protect, async (req, res) => {
  try {
    const { problem, vehicleId } = req.body;

    if (!problem || !vehicleId) {
      return res.status(400).json({
        message: 'Le problème et l\'ID du véhicule sont requis'
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    const prompt = `[INSTRUCTION: Réponds UNIQUEMENT en JSON valide. Aucun texte avant ou après. Aucun emoji.]

Véhicule:
- Marque: ${vehicle.brand}
- Modèle: ${vehicle.model}
- Année: ${vehicle.year || 'Non spécifiée'}
- Kilométrage: ${vehicle.kilometrage || 'Non spécifié'} km
- Problème: ${problem}

Format JSON obligatoire:
{
  "description": "description courte du problème",
  "suggestedServices": [
    {"serviceName": "nom", "estimatedPrice": 0, "estimatedTime": "durée"}
  ],
  "severity": "low|medium|high"
}`;

    const response = await ollama.chat({
      model: 'autoexpert',
      messages: [{ role: 'user', content: prompt }],
      stream: false
    });

    function extractJSON(text) {
      const matches = [...text.matchAll(/\{[\s\S]*?\}/g)];
      for (const match of [...matches].reverse()) {
        try {
          const parsed = JSON.parse(match[0]);
          if (parsed.description && parsed.severity) return parsed;
        } catch {
          continue;
        }
      }
      return null;
    }

    const cleanContent = stripThoughtTags(response.message.content);
    const diagnosis = extractJSON(cleanContent) || {
      description: cleanContent.substring(0, 200),
      suggestedServices: [
        { serviceName: 'Diagnostic complet', estimatedPrice: 50, estimatedTime: '1h' }
      ],
      severity: 'medium'
    };

    diagnosis.analyzedAt = new Date();
    res.json(diagnosis);

  } catch (error) {
    console.error('Erreur Ollama diagnose:', error);
    res.status(500).json({ message: 'Erreur lors du diagnostic IA' });
  }
});

module.exports = router;