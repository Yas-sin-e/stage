import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api/axios";

// Icônes pour les catégories
const categoryIcons = {
  Carrosserie: "🔨",
  Réparation: "⚙️",
  Entretien: "🛠️",
  Diagnostic: "🔍",
};

// Couleurs pour les catégories
const categoryGradients = {
  Carrosserie: "from-blue-600 to-cyan-500",
  Réparation: "from-purple-600 to-pink-500",
  Entretien: "from-green-600 to-emerald-500",
  Diagnostic: "from-amber-600 to-orange-500",
};

const ServicesSection = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get("/services");
      // Prendre les 4 premiers services pour l'affichage
      setServices(data.slice(0, 4));
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header - Entièrement cliquable vers la page des services */}
        <div className="w-full text-center mb-20 group">
          <Link to="/services" className="inline-block">
            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-4 group-hover:bg-blue-500/20 transition-colors">
              NOS EXPERTISES
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 group-hover:text-blue-400 transition-colors">
              Services Professionnels
            </h2>
            {/* Description - Taille augmentée */}
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 group-hover:text-blue-300 transition-colors">
              Des solutions complètes pour tous vos besoins automobiles avec des
              experts qualifiés
            </p>
          </Link>
          {/* Bouton cliquable visible pour aller à la page des services */}
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
          >
            Voir les autres services
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>

        {/* Services Grid - Thème sombre */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all" />

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${categoryGradients[service.category] || "from-slate-600 to-slate-500"} border border-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <span className="text-5xl group-hover:scale-110 transition-transform">
                      {categoryIcons[service.category] || "🔧"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h3>
                {/* Description - Taille augmentée */}
                <p className="text-base text-slate-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${categoryGradients[service.category] || "from-slate-600 to-slate-500"} opacity-10 rounded-bl-full`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner - Thème sombre */}
        <div className="mt-20 p-10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl backdrop-blur-sm text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Un service sur mesure pour chaque besoin
          </h3>
          {/* Description - Taille augmentée */}
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Nos techniciens certifiés utilisent des équipements de pointe pour
            garantir la meilleure qualité de service
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
