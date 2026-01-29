import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api/axios";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClients: 0,
    totalVehicules: 0,
    totalReservations: 0,
    reservationsPending: 0,
    totalDevis: 0,
    devisPending: 0,
    reparationsInProgress: 0,
    reparationsCompleted: 0,
    totalRevenue: 0, // تم الربط مع الـ Backend الجديد
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  // تعريف البطاقات مع إضافة بطاقة الأرباح المالية
  const cards = [
    {
      title: "Chiffre d'Affaires",
      value: `${stats.totalRevenue?.toLocaleString("fr-FR")} DT`,
      icon: "💰",
      color: "from-yellow-500 to-orange-500",
      path: "/admin/reparations",
    },
    {
      title: "Clients",
      value: stats.totalClients,
      icon: "👥",
      color: "from-blue-600 to-cyan-500",
      path: "/admin/clients",
    },
    {
      title: "Véhicules",
      value: stats.totalVehicules,
      icon: "🚗",
      color: "from-purple-600 to-pink-500",
      path: "/admin/vehicles",
    },
    {
      title: "RDV en attente",
      value: stats.reservationsPending,
      icon: "⏰",
      color: "from-amber-600 to-orange-500",
      path: "/admin/reservations",
    },
    {
      title: "Devis en attente",
      value: stats.devisPending,
      icon: "📄",
      color: "from-pink-600 to-rose-500",
      path: "/admin/devis",
    },
    {
      title: "Réparations en cours",
      value: stats.reparationsInProgress,
      icon: "🔧",
      color: "from-cyan-600 to-blue-500",
      path: "/admin/reparations",
    },
    {
      title: "Réparations terminées",
      value: stats.reparationsCompleted,
      icon: "✅",
      color: "from-emerald-600 to-green-500",
      path: "/admin/reparations",
    },
    {
      title: "Total Réservations",
      value: stats.totalReservations,
      icon: "📅",
      color: "from-slate-600 to-slate-400",
      path: "/admin/reservations",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">
            Chargement du tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              Dashboard <span className="text-blue-500">Admin</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium">
              Gestion et indicateurs de performance
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/profile")}
            className="group px-6 py-3 bg-slate-800/40 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 text-white rounded-2xl font-bold transition-all flex items-center gap-3 backdrop-blur-xl shadow-lg shadow-black/20"
          >
            <div className="p-2 bg-slate-700 group-hover:bg-blue-500 rounded-xl transition-colors">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span>Mon Profil</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => navigate(card.path)}
              className="group cursor-pointer relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-[2.5rem] p-8 overflow-hidden hover:border-slate-600 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Decorative Gradient Glow */}
              <div
                className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${card.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`}
              />

              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} mb-6 shadow-2xl shadow-black/40 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl">{card.icon}</span>
                </div>

                <h3 className="text-xs text-slate-500 mb-2 font-black uppercase tracking-widest">
                  {card.title}
                </h3>
                <p
                  className={`text-4xl font-black text-white tracking-tighter`}
                >
                  {card.value}
                </p>

                <div className="mt-4 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold">
                  <span>Voir détails</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
