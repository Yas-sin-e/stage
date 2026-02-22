const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {//
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];//Authorization: Bearer <token>
    }

    if (!token) {
      return res.status(401).json({ message: 'Non autorisé, pas de token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);//verfier le token avec le secret pour s'assurer qu'il est valide .si valide alors la il reoutouner l'id qui dans le token et on peut uitliser pour torouver le utilsateur correspondant dans la base de données.danc decoded contienit {id}
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    if (!req.user.isActive) {
  return res.status(403).json({ message: 'Compte désactivé' });
}

    return next();//ici le next continue vers la route suivante si le token est valide et que l'utilisateur existe, sinon il renvoie une réponse d'erreur appropriée (401 pour non autorisé ou 403 pour compte désactivé). Le middleware protect est utilisé pour sécuriser les routes qui nécessitent une authentification, en s'assurant que seules les requêtes avec un token JWT valide peuvent accéder à ces routes.

  } catch (error) {
     if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expiré' });
  }
  return res.status(401).json({ message: 'Token invalide' });
}
};
