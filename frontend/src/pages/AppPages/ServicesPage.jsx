import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/auth"

const ServicesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const services = [
    {
      title: 'Tôlerie',
      icon: '🔨',
      gradient: 'from-blue-600 to-cyan-500',
      bgGlow: 'bg-blue-500/10',
      description: 'Réparation complète de carrosserie, débosselage et peinture automobile professionnelle',
      features: [
        'Débosselage sans peinture',
        'Réparation de carrosserie',
        'Peinture complète au four',
        'Polish et rénovation',
        'Remplacement de pare-chocs'
      ],
      price: 'À partir de 200 TND'
    },
    {
      title: 'Mécanique',
      icon: '⚙️',
      gradient: 'from-purple-600 to-pink-500',
      bgGlow: 'bg-purple-500/10',
      description: 'Entretien moteur, révision complète et diagnostic électronique de précision',
      features: [
        'Vidange et entretien complet',
        'Diagnostic moteur avancé',
        'Réparation transmission',
        'Freinage et suspension',
        'Distribution et embrayage',
        'Échappement'
      ],
      price: 'À partir de 70 TND'
    },
    {
      title: 'Électricité',
      icon: '⚡',
      gradient: 'from-amber-600 to-orange-500',
      bgGlow: 'bg-amber-500/10',
      description: 'Système électrique, climatisation et diagnostic électronique automobile',
      features: [
        'Diagnostic électronique complet',
        'Réparation climatisation',
        'Système électrique',
        'Installation accessoires',
        'Batterie et alternateur',
        'Éclairage LED'
      ],
      price: 'À partir de 30 TND'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')} 
            className="group mb-8 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-white font-medium">Retour à l'accueil</span>
          </button>

          {/* Title Section */}
          <div className="max-w-3xl mb-6">
            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6">
              NOS SERVICES
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                Services Automobiles
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Des solutions complètes pour tous vos besoins automobiles avec des experts qualifiés
            </p>
          </div>

          
        </div>
      </section>

      {/* Services Cards */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
              >
                {/* Animated Background Glow */}
                <div className={`absolute inset-0 ${service.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Badge */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <span className="text-5xl">{service.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wide">
                      Nos prestations
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-start group/item">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center mr-3 mt-0.5 group-hover/item:scale-110 transition-transform`}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-slate-300 text-sm leading-relaxed group-hover/item:text-white transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Price & CTA */}
                  <div className="pt-6 border-t border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400 text-sm">Tarif</span>
                      <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${service.gradient}`}>
                        {service.price}
                      </span>
                    </div>
                    {isAuthenticated?
                    <button 
                      onClick={() => navigate('/newreservations')}
                      className={`group/btn w-full px-6 py-4 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105 relative overflow-hidden`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Prendre rendez-vous
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </button>:
                    <button 
                      onClick={() => navigate('/register')}
                      className={`group/btn w-full px-6 py-4 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105 relative overflow-hidden`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        creé un compte
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </button>
                    
                    }
                    
                  </div>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 rounded-bl-full`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
            <div className="w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Besoin d'un service automobile ?
          </h2>
          <p className="text-2xl text-slate-300 mb-12 leading-relaxed">
            Prenez rendez-vous dès maintenant et bénéficiez de notre expertise professionnelle
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated&&
            <button 
              onClick={() => navigate('/register')}
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Réserver maintenant
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
}
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-5 bg-white/5 border-2 border-white/20 hover:bg-white hover:text-slate-900 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;