const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Non autorisé, pas de token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    if (!req.user.isActive) {
  return res.status(403).json({ message: 'Compte désactivé' });
}

    return next();

  } catch (error) {
     if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expiré' });
  }
  return res.status(401).json({ message: 'Token invalide' });
}
};
