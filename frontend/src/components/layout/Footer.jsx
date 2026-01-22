import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Footer = () => {
  const currentYear = new Date().getFullYear();
   const { isAuthenticated } = useAuth();
  const services = [
    { name: 'Tôlerie & Carrosserie', path: '/services' },
    { name: 'Mécanique Générale', path: '/services' },
    { name: 'Électricité Auto', path: '/services' },
    { name: 'Diagnostic IA', path: '/services' }
  ];

  const quickLinks = [
    { name: 'À propos', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Connexion', path: '/login' }
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: '📘' },
    { name: 'Instagram', url: '#', icon: '📸' },
    { name: 'LinkedIn', url: '#', icon: '💼' },
    { name: 'Twitter', url: '#', icon: '🐦' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white mt-auto border-t border-slate-800">
      
      {/* Gradient Top Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Grille principale */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* ============================================ */}
          {/* Colonne 1 : Logo & Description */}
          {/* ============================================ */}
          <div>
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div>
                <div className="text-xl font-black tracking-tight">
                  Auto<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Expert</span>
                </div>
                <div className="text-xs text-slate-500 -mt-1">Plateforme Intelligente</div>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              La plateforme digitale propulsée par IA pour simplifier la gestion de vos véhicules en temps réel.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold">
                🤖 IA Intégrée
              </span>
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-semibold">
                ✓ Sécurisé
              </span>
            </div>
          </div>
          
          {/* ============================================ */}
          {/* Colonne 2 : Services */}
          {/* ============================================ */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <Link 
                    to={service.path} 
                    className="group flex items-center text-sm text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* ============================================ */}
          {/* Colonne 3 : Liens rapides */}
          {/* ============================================ */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Liens rapides
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center text-sm text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* ============================================ */}
          {/* Colonne 4 : Contact & Horaires */}
          {/* ============================================ */}
          
          <div>
            
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Assistance
            </h3>
            
            {/* Assistant IA */}
            {!isAuthenticated&&
            <div className="mb-6 p-4 bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <span className="text-sm font-bold text-white">Assistant IA</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Disponible 24/7 pour vous aider</p>
              <Link 
                to="/register"
                className="block text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold transition-all hover:scale-105"
              >
                Essayer maintenant
              </Link>
            </div>
              }
            {/* Horaires */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                <span className="text-slate-400">Lun - Ven</span>
                <span className="text-white font-semibold">8h - 18h</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                <span className="text-slate-400">Samedi</span>
                <span className="text-white font-semibold">8h - 17h</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                <span className="text-slate-400">Dimanche</span>
                <span className="text-red-400 font-semibold">Fermé</span>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

    
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <p className="text-slate-500 text-sm">
            © {currentYear} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">AutoExpert</span>. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 rounded-lg transition-all duration-300 hover:scale-105"
                aria-label={social.name}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{social.icon}</span>
                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>

      
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;