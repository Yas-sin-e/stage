const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: __dirname + '/../.env' });

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connecté');

    // Créer un utilisateur client
   

    // Créer un utilisateur admin
    const adminUser = await User.create({
      name: 'Test Admin',
      email: `admin${Date.now()}@gmail.com`,
      phone: '22123457',
      password: 'admin123',
      role: 'admin'
    });

    console.log('✅ Admin créé :', adminUser);
    process.exit();
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

createUser();
