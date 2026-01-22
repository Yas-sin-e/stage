import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 animate-grid-flow" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59 130 246 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59 130 246 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        
        
     

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400 animate-gradient">
            Gestion Automobile
          </span>
          <span className="block text-5xl md:text-7xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Intelligente
          </span>
          
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-3xl text-slate-300 mb-4 font-light tracking-wide">
          Plateforme digitale propulsée par IA
        </p>

        <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Suivez vos réparations en temps réel • Obtenez des devis instantanés • Discutez avec l'IA
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          {!isAuthenticated&&
          <button 

            onClick={() => navigate('/register')}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Commencer gratuitement
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>}
          
          <button 
            onClick={() => navigate('/services')}
            className="group px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:bg-white hover:text-slate-900 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Découvrir les fonctionnalités
              <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Stats Grid - Version Plateforme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { value: '100%', label: "Suivi en temps réel",  gradient: 'from-blue-400 to-cyan-400' },
            { value: '24/7', label: 'Assistant IA disponible',  gradient: 'from-purple-400 to-pink-400' },
            { value: 'Gratuit', label: 'Inscription & essai',  gradient: 'from-amber-400 to-orange-400' }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient.replace('from-', 'from-').replace('to-', 'to-')}/10 opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                
                <div className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {[
           
            '✓ Sécurisé',
            '✓ Devis instantanés',
            '✓ Support 24/7'
          ].map((badge, i) => (
            <span 
              key={i}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      
    </section>
  );
};

export default HeroSection;