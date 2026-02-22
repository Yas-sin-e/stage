const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

const services = [
  // Tôlerie / Carrosserie
  {
    name: "Tôlerie",
    description: "Réparation complète de carrosserie, débosselage et peinture automobile professionnelle",
    basePrice: 200,
    estimatedTime: "2-3 jours",
    category: "Carrosserie",
    isActive: true
  },
  {
    name: "Débosselage",
    description: "Technique de débosselage sans peinture pour préserver l'origine du véhicule",
    basePrice: 80,
    estimatedTime: "1-2 heures",
    category: "Carrosserie",
    isActive: true
  },
  {
    name: "Peinture",
    description: "Peinture professionnelle au four, rénovation complète de la carrosserie",
    basePrice: 350,
    estimatedTime: "3-5 jours",
    category: "Carrosserie",
    isActive: true
  },
  {
    name: "Remplacement pare-chocs",
    description: "Remplacement et réparation de pare-chocs avant et arrière",
    basePrice: 150,
    estimatedTime: "1 jour",
    category: "Carrosserie",
    isActive: true
  },
  
  // Mécanique / Réparation
  {
    name: "Mécanique",
    description: "Entretien moteur, révision complète et diagnostic électronique de précision",
    basePrice: 70,
    estimatedTime: "1-2 jours",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Vidange",
    description: "Vidange moteur avec huile de qualité, remplacement filtre à huile",
    basePrice: 60,
    estimatedTime: "30 min",
    category: "Entretien",
    isActive: true
  },
  {
    name: "Diagnostic moteur",
    description: "Diagnostic électronique complet du moteur avec équipement de pointe",
    basePrice: 50,
    estimatedTime: "1-2 heures",
    category: "Diagnostic",
    isActive: true
  },
  {
    name: "Freinage",
    description: "Réparation du système de freinage : plaquettes, disques, liquide",
    basePrice: 100,
    estimatedTime: "2-4 heures",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Suspension",
    description: "Réparation et remplacement des amortisseurs, ressorts et éléments de suspension",
    basePrice: 150,
    estimatedTime: "3-4 heures",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Distribution",
    description: "Remplacement de la chaîne ou courroie de distribution",
    basePrice: 250,
    estimatedTime: "4-6 heures",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Embrayage",
    description: "Remplacement d'embrayage complet : disque, mécanisme, butée",
    basePrice: 300,
    estimatedTime: "4-5 heures",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Échappement",
    description: "Réparation et remplacement du système d'échappement",
    basePrice: 120,
    estimatedTime: "2-3 heures",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Transmission",
    description: "Réparation de la boîte de vitesses et différentiel",
    basePrice: 350,
    estimatedTime: "1-2 jours",
    category: "Réparation",
    isActive: true
  },
  
  // Électricité
  {
    name: "Électricité",
    description: "Système électrique, climatisation et diagnostic électronique automobile",
    basePrice: 30,
    estimatedTime: "30 min - 2h",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Diagnostic électronique",
    description: "Diagnostic complet avec valise multimarque pour tous les systèmes",
    basePrice: 40,
    estimatedTime: "1-2 heures",
    category: "Diagnostic",
    isActive: true
  },
  {
    name: "Climatisation",
    description: "Réparation et recharge de climatisation automobile",
    basePrice: 80,
    estimatedTime: "2-3 heures",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Batterie",
    description: "Test batterie, remplacement et diagnostic du système de charge",
    basePrice: 50,
    estimatedTime: "30 min",
    category: "Entretien",
    isActive: true
  },
  {
    name: "Alternateur",
    description: "Réparation et remplacement d'alternateur",
    basePrice: 150,
    estimatedTime: "2-3 heures",
    category: "Réparation",
    isActive: true
  },
  {
    name: "Éclairage",
    description: "Remplacement d'ampoules, LEDs et réparation du système d'éclairage",
    basePrice: 30,
    estimatedTime: "30 min",
    category: "Entretien",
    isActive: true
  },
  {
    name: "Installation accessoires",
    description: "Installation de gadgets et accessoires électroniques",
    basePrice: 50,
    estimatedTime: "1-3 heures",
    category: "Entretien",
    isActive: true
  },
  
  // Diagnostic
  {
    name: "Diagnostic complet",
    description: "Analyse complète du véhicule avec rapport détaillé",
    basePrice: 60,
    estimatedTime: "2-3 heures",
    category: "Diagnostic",
    isActive: true
  },
  {
    name: "Contrôle technique",
    description: "Préparation et contrôle avant le contrôle technique officiel",
    basePrice: 80,
    estimatedTime: "3-4 heures",
    category: "Diagnostic",
    isActive: true
  },
  {
    name: "Évaluation véhicule",
    description: "Expertise et évaluation de l'état général du véhicule",
    basePrice: 50,
    estimatedTime: "1-2 heures",
    category: "Diagnostic",
    isActive: true
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/autoexpert');
    console.log('✅ Connecté à MongoDB');
    
    // Supprimer les services existants
    await Service.deleteMany({});
    console.log('🗑️ Anciens services supprimés');
    
    // Insérer les nouveaux services
    await Service.insertMany(services);
    console.log(`✅ ${services.length} services ajoutés avec succès!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

seedServices();
