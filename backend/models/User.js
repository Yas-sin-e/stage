const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
  type: String,
  required: [true, 'Le mot de passe est requis'],
  minlength: 6,
  select: false 
},
  phone: {
    type: String,
    required: [true, 'Le téléphone est requis']
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  },
  isActive: {//pour faire bloquer (ban)periodique sans supprimer
    type: Boolean,
    default: true
  }
}, {
  timestamps: true//pour Mongodb ajout automatiquement les createdAt,updatedAt
});

// Hash password avant sauvegarde
//la difrencer entre pre et une methode normale c'est que pre est un middleware qui s'exécute avant une action spécifique (comme save), tandis qu'une méthode normale est une fonction que tu appelles explicitement sur une instance du modèle. Le middleware pre('save') est automatiquement déclenché chaque fois que tu sauvegardes un document, ce qui garantit que le mot de passe est toujours hashé avant d'être stocké dans la base de données, sans que tu aies à te souvenir de le faire manuellement à chaque fois.
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});//ici cette fonction  veffier si le modepass est modifier c'est a dire lors de  la creation un nouveua user ou le miseajour de motde pass danc je veut faire un hashage du mot de pass avant de le sauvegarder dans la base de données. Si le mot de passe n'est pas modifié, la fonction retourne immédiatement sans faire de hashage, ce qui évite de re-hasher un mot de passe qui est déjà hashé. Cela garantit que les mots de passe sont toujours stockés de manière sécurisée dans la base de données, même lors des mises à jour du mot de passe.

// Comparer mot de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);