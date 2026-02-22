import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const AboutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const stats = [
    {
      number: "2026",
      label: "Année de lancement",
      icon: "🚀",
      color: "from-blue-600 to-cyan-500",
    },
    {
      number: "500+",
      label: "Véhicules réparés",
      icon: "🔧",
      color: "from-green-600 to-emerald-500",
    },
    {
      number: "98%",
      label: "Clients satisfaits",
      icon: "⭐",
      color: "from-amber-600 to-orange-500",
    },
    {
      number: "24/7",
      label: "Assistant IA",
      icon: "🤖",
      color: "from-purple-600 to-pink-500",
    },
  ];

  const benefits = [
    {
      icon: "🤖",
      title: "Assistant IA intelligent",
      description:
        "Un chatbot expert disponible 24/7 pour diagnostiquer vos problèmes, vous conseiller et vous orienter vers les bonnes solutions.",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      icon: "🔍",
      title: "Diagnostic précis",
      description:
        "L'IA analyse votre véhicule et fournit un diagnostic détaillé. Notre équipe prépare le devis final après examen.",
      gradient: "from-purple-600 to-pink-500",
    },
    {
      icon: "📊",
      title: "Suivi en temps réel",
      description:
        "Suivez l'avancement de la réparation de votre véhicule en direct depuis votre espace personnel.",
      gradient: "from-amber-600 to-orange-500",
    },
  ];

  const aiFeatures = [
    {
      icon: "🔧",
      title: "Diagnostic automatique",
      description:
        "Décrivez votre problème à l'IA : bruits suspects, voyants allumés, pannes... Elle identifie les causes possibles.",
    },
    {
      icon: "💡",
      title: "Conseils personnalisés",
      description:
        "Obtenez des recommandations sur mesure : entretien préventif, urgence de la réparation, estimation tarifaire.",
    },
    {
      icon: "📋",
      title: "Devis par l'équipe",
      description:
        "Après le diagnostic IA, notre équipe prépare un devis détaillé et personnalisé pour votre véhicule.",
    },
  ];

  const features = [
    {
      year: "🚗",
      title: "Gestion de vos véhicules",
      description:
        "Centralisez toutes les informations de vos véhicules : entretiens, réparations, documents",
    },
    {
      year: "📱",
      title: "Notifications instantanées",
      description:
        "Soyez alerté à chaque étape : prise en charge, diagnostic, devis, fin de réparation",
    },
    {
      year: "📂",
      title: "Historique complet",
      description:
        "Accédez à tout moment à l'historique détaillé de toutes vos interventions",
    },
    {
      year: "🤝",
      title: "Communication directe",
      description:
        "Échangez facilement avec votre garage partenaire via la messagerie intégrée",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="group mb-8 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-white font-medium">Retour à l'accueil</span>
          </button>

          {/* Title */}
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6">
              À PROPOS
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400">
                AutoExpert
              </span>
            </h1>
            <p className="text-2xl text-slate-300 leading-relaxed mb-4">
              La plateforme digitale intelligente pour la gestion de vos
              véhicules
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl backdrop-blur-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-purple-300 font-semibold text-lg">
                Propulsé par Intelligence Artificielle
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story */}
            <div>
              <h2 className="text-5xl font-black text-white mb-8">
                Notre Mission
              </h2>
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p className="text-lg">
                  AutoExpert est une{" "}
                  <span className="text-blue-400 font-bold">
                    plateforme digitale révolutionnaire
                  </span>{" "}
                  qui combine gestion automobile et intelligence artificielle
                  pour vous offrir une expérience inédite.
                </p>
                <p className="text-lg">
                  Grâce à notre{" "}
                  <span className="text-purple-400 font-bold">
                    assistant IA disponible 24/7
                  </span>
                  , vous得到 :
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🤖</span>
                    <span>
                      <span className="text-blue-400 font-semibold">
                        Diagnostic automatique
                      </span>{" "}
                      de vos problèmes mécaniques
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <span>
                      <span className="text-purple-400 font-semibold">
                        Conseils personnalisés
                      </span>{" "}
                      selon votre véhicule et votre budget
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📋</span>
                    <span>
                      <span className="text-amber-400 font-semibold">
                        Devis détaillé
                      </span>{" "}
                      préparé par notre équipe
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <span>
                      <span className="text-green-400 font-semibold">
                        Suivi en temps réel
                      </span>{" "}
                      de toutes vos réparations
                    </span>
                  </li>
                </ul>
                <p className="text-lg mt-6">
                  Notre objectif : vous offrir une{" "}
                  <span className="text-white font-semibold">
                    expérience transparente, intelligente et sans stress
                  </span>{" "}
                  pour la gestion complète de vos véhicules.
                </p>
              </div>
              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/register")}
                  className="group mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 inline-flex items-center gap-2"
                >
                  Essayer l'assistant IA gratuitement
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              )}
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center hover:scale-105 hover:border-slate-600 transition-all duration-300 overflow-hidden"
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />

                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{stat.icon}</div>
                    <div
                      className={`text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-slate-400 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900/50 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              Votre Assistant IA Personnel
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Une technologie qui comprend vos besoins et vous accompagne à
              chaque étape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, i) => (
              <div
                key={i}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* CTA IA */}
          {!isAuthenticated && (
            <div className="mt-12 text-center">
              <div className="inline-block bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm max-w-3xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center animate-pulse">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Essayez l'assistant IA maintenant
                  </h3>
                </div>
                <p className="text-slate-300 mb-6">
                  Posez vos questions, obtenez un diagnostic gratuit, puis notre
                  équipe vous préparera un devis détaillé !
                </p>

                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-bold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
                >
                  Commencer la conversation
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6">
              AVANTAGES
            </span>
            <h2 className="text-5xl font-black text-white mb-4">
              Pourquoi choisir AutoExpert ?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Une solution complète alliant technologie IA et gestion
              intelligente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-slate-600 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.gradient} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}
                  >
                    <span className="text-5xl">{benefit.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              Fonctionnalités complètes
            </h2>
            <p className="text-xl text-slate-400">
              Tout ce dont vous avez besoin, au même endroit
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {feature.year}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section - Réservation */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold mb-6">
              COMMENT ÇA MARCHE
            </span>
            <h2 className="text-5xl font-black text-white mb-4">
              Réservez votre intervention en 3 étapes
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Simple, rapide et efficace - Prenez rendez-vous avec votre garage
              en quelques clics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Décrivez votre problème",
                desc: "Utilisez notre assistant IA pour décrire votre problème véhicule. L'IA effectue un diagnostic précis et recommande le service adapté.",
                icon: "🤖",
                color: "from-blue-600 to-cyan-500",
              },
              {
                step: "2",
                title: "Recevez le diagnostic",
                desc: "L'IA vous fournit un diagnostic détaillé. Notre équipe prépare le devis final après examen de votre véhicule.",
                icon: "📊",
                color: "from-purple-600 to-pink-500",
              },
              {
                step: "3",
                title: "Confirmez la réservation",
                desc: "Choisissez la date et l'heure qui vous arrangent. Vous recevez une confirmation et notre équipe finalise le devis.",
                icon: "✅",
                color: "from-green-600 to-emerald-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 hover:scale-105 transition-all text-center"
              >
                {/* Step Number */}
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-lg shadow-lg`}
                >
                  {item.step}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-6 mt-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button
              onClick={() => navigate("/register")}
              className="group px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Réserver maintenant
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </span>
            </button>

            <button
              onClick={() => navigate("/services")}
              className="px-10 py-5 bg-white/5 border-2 border-white/20 hover:bg-white hover:text-slate-900 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Voir tous les services
            </button>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6">
              NOS SERVICES
            </span>
            <h2 className="text-5xl font-black text-white mb-4">
              Tout pour votre véhicule
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Des services complets pour tous vos besoins automobiles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔧",
                title: "Réparation mécanique",
                desc: "Moteur, boîte de vitesses, suspension, direction...",
                color: "from-blue-600 to-cyan-500",
              },
              {
                icon: "⚡",
                title: "Électricité auto",
                desc: "Batterie, alternateur, démarreur, câblage...",
                color: "from-yellow-600 to-orange-500",
              },
              {
                icon: "🛑",
                title: "Système de freinage",
                desc: "Plaquettes, discs, liquide de frein, ABS...",
                color: "from-red-600 to-pink-500",
              },
              {
                icon: "❄️",
                title: "Climatisation",
                desc: "Recharge gaz, réparation fuite, désembuage...",
                color: "from-cyan-600 to-blue-500",
              },
              {
                icon: "🚗",
                title: "Carrosserie",
                desc: "Peinture, raccord, pare-chocs, vitrages...",
                color: "from-purple-600 to-pink-500",
              },
              {
                icon: "📊",
                title: "Diagnostic OBD",
                desc: "Lecture codes erreur, programmation, calibration...",
                color: "from-green-600 to-emerald-500",
              },
            ].map((service, i) => (
              <div
                key={i}
                onClick={() => navigate("/services")}
                className="group cursor-pointer relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 hover:scale-[1.02] transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/services")}
              className="group px-8 py-4 bg-white/10 border border-white/20 hover:bg-white hover:text-slate-900 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 backdrop-blur-sm inline-flex items-center gap-2"
            >
              Voir tous nos services
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
        </div>
      </section>

      {/* Final CTA Section */}
      {!isAuthenticated && (
        <section className="relative py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
              <div className="w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse mx-auto" />
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full mb-8">
              <span className="text-2xl">🎉</span>
              <span className="text-green-400 font-semibold">
                Inscription gratuite - Sans engagement
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Votre véhicule mérite le meilleur !
            </h2>
            <p className="text-2xl text-slate-300 mb-12 leading-relaxed">
              Rejoignez{" "}
              <span className="text-green-400 font-bold">
                500+ clients satisfaits
              </span>{" "}
              et profitez d'un service professionnel avec diagnostic IA gratuit
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="group px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  Réserver ma réparation
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                </span>
              </button>

              <button
                onClick={() => navigate("/services")}
                className="px-10 py-5 bg-white/5 border-2 border-white/20 hover:bg-white hover:text-slate-900 text-white rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Découvrir les services
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[
                "✓ Diagnostic IA gratuit",
                "✓ Devis détaillé par l'équipe",
                "✓ Sans engagement",
                "✓ Réparateur certifié",
              ].map((badge, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutPage;
