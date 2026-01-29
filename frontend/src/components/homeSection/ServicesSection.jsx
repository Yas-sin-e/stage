import { services } from "../../data/services";
import { useNavigate } from "react-router-dom";

const ServicesSection = () => {
    const navigate = useNavigate();

  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-900 to-black overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-4">
            NOS EXPERTISES
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Services Professionnels
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Des solutions complètes pour tous vos besoins automobiles
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all" />

              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <span className="text-5xl group-hover:scale-110 transition-transform">
                    {service.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* CTA Link */}
              <button  
              onClick={() => navigate('/services')}
              className="group/btn inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all">
                En savoir plus
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 p-10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl backdrop-blur-sm text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Un service sur mesure pour chaque besoin
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Nos techniciens certifiés utilisent des équipements de pointe pour garantir la meilleure qualité de service
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
              ✓ Garantie 12 mois
            </span>
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
              ✓ Pièces d'origine
            </span>
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
              ✓ Devis gratuit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;