// src/pages/client/DashboardPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data (remplacer plus tard par vrais appels API)
  const stats = [
    { 
      title: 'Mes véhicules', 
      value: '2', 
      icon: '🚗', 
      path: '/vehicles',
      gradient: 'from-blue-600 to-cyan-500',
      bgGlow: 'bg-blue-500/10'
    },
    { 
      title: 'RDV en cours', 
      value: '1', 
      icon: '📅', 
      path: '/reservations',
      gradient: 'from-purple-600 to-pink-500',
      bgGlow: 'bg-purple-500/10'
    },
    { 
      title: 'Devis en attente', 
      value: '3', 
      icon: '💰', 
      path: '/devis',
      gradient: 'from-amber-600 to-orange-500',
      bgGlow: 'bg-amber-500/10'
    },
    { 
      title: 'Assistant IA', 
      value: '24/7', 
      icon: '🤖', 
      path: '/chat-ai',
      gradient: 'from-green-600 to-emerald-500',
      bgGlow: 'bg-green-500/10'
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'reservation', 
      title: 'Vidange programmée', 
      date: '25 Jan 2024',
      time: '10:00',
      status: 'confirmed',
      vehicle: 'Renault Clio',
      icon: '📅',
      color: 'blue'
    },
    { 
      id: 2, 
      type: 'devis', 
      title: 'Devis réparation freins', 
      date: '23 Jan 2024',
      amount: '450 TND',
      status: 'pending',
      vehicle: 'Peugeot 208',
      icon: '💰',
      color: 'amber'
    },
    { 
      id: 3, 
      type: 'completed', 
      title: 'Révision complète terminée', 
      date: '20 Jan 2024',
      status: 'completed',
      vehicle: 'Renault Clio',
      icon: '✅',
      color: 'green'
    }
  ];

  const quickActions = [
    { 
      title: 'Nouveau RDV', 
      icon: '➕', 
      path: '/new-reservations', 
      gradient: 'from-blue-600 to-cyan-500',
      description: 'Prendre rendez-vous'
    },
    { 
      title: 'Ajouter véhicule', 
      icon: '🚗', 
      path: '/vehicles', 
      gradient: 'from-purple-600 to-pink-500',
      description: 'Enregistrer un nouveau véhicule'
    },
    { 
      title: 'Parler à l\'IA', 
      icon: '🤖', 
      path: '/chat-ai', 
      gradient: 'from-green-600 to-emerald-500',
      description: 'Assistant disponible 24/7'
    },
    { 
      title: 'Mon profil', 
      icon: '👤', 
      path: '/profile', 
      gradient: 'from-amber-600 to-orange-500',
      description: 'Gérer mes informations'
    }
  ];

  const getStatusStyle = (status) => {
    const styles = {
      confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return styles[status] || styles.pending;
  };

  const getStatusLabel = (status) => {
    const labels = {
      confirmed: 'Confirmé',
      pending: 'En attente',
      completed: 'Terminé',
      cancelled: 'Annulé'
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-black text-2xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white">
                Tableau de bord
              </h1>
              <p className="text-xl text-slate-400">
                Bienvenue, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">{user?.name}</span> 👋
              </p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* STATS GRID */}
        {/* ============================================ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <button
              key={i}
              onClick={() => navigate(stat.path)}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:scale-105 text-left overflow-hidden"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-3xl">{stat.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-sm text-slate-400 mb-1 font-medium uppercase tracking-wide">
                  {stat.title}
                </h3>
                <p className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                  {stat.value}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* ============================================ */}
        {/* MAIN CONTENT GRID */}
        {/* ============================================ */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* ============================================ */}
          {/* RECENT ACTIVITIES (2/3) */}
          {/* ============================================ */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                  Activités récentes
                </h2>
                <button 
                  onClick={() => navigate('/reservations')}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group"
                >
                  Voir tout
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="group p-5 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br from-${activity.color}-600 to-${activity.color}-500 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg`}>
                        {activity.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors text-lg">
                            {activity.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(activity.status)} whitespace-nowrap`}>
                            {getStatusLabel(activity.status)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-slate-300 mb-2 font-medium">{activity.vehicle}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            {activity.date}
                          </span>
                          {activity.time && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                              {activity.time}
                            </span>
                          )}
                          {activity.amount && (
                            <span className="flex items-center gap-1 text-amber-400 font-semibold">
                              💰 {activity.amount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* SIDEBAR (1/3) */}
          {/* ============================================ */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                Actions rapides
              </h2>
              
              <div className="space-y-3">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(action.path)}
                    className={`group w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-slate-600 hover:bg-slate-800/50 transition-all hover:scale-105 text-left`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-lg`}>
                        {action.icon}
                      </div>
                      <span className="font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                        {action.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 ml-13">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Assistant Banner */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse shadow-lg shadow-purple-500/50">
                  🤖
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">Assistant IA</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Posez vos questions 24/7
                </p>
                <button 
                  onClick={() => navigate('/chat-ai')}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-bold hover:scale-105 transition-all shadow-lg"
                >
                  Démarrer une conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;