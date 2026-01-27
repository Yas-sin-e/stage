// src/pages/client/DashboardPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ============================================
  // DONNÉES MOCK
  // ============================================

  // Stats Cards
  const stats = [
    { title: 'Mes véhicules', value: '2', icon: '🚗', path: '/vehicles', gradient: 'from-blue-600 to-cyan-500' },
    { title: 'RDV total', value: '5', icon: '📅', gradient: 'from-purple-600 to-pink-500' },
    { title: 'Devis en attente', value: '2', icon: '💰', gradient: 'from-amber-600 to-orange-500' }
  ];

  // Réservations (acceptées, refusées, en attente)
  const [reservations, setReservations] = useState([
    { 
      id: 1, 
      vehicle: 'Renault Clio', 
      plate: '123 TU 4567',
      service: 'Vidange complète', 
      date: '2024-02-15', 
      time: '10:00',
      status: 'accepted'
    },
    { 
      id: 2, 
      vehicle: 'Peugeot 208', 
      plate: '456 TU 7890',
      service: 'Révision 20 000 km', 
      date: '2024-02-20', 
      time: '14:00',
      status: 'pending'
    },
    { 
      id: 3, 
      vehicle: 'Renault Clio', 
      plate: '123 TU 4567',
      service: 'Réparation freins', 
      date: '2024-02-10', 
      time: '09:00',
      status: 'rejected'
    }
  ]);

  // Devis en attente
  const [devis, setDevis] = useState([
    { 
      id: 1, 
      vehicle: 'Renault Clio',
      plate: '123 TU 4567',
      service: 'Réparation freins', 
      amount: '450 TND',
      estimatedTime: '3 heures',
      dateDebut: '2024-01-23T09:00',
      dateFin: '2024-01-23T12:00'
    },
    { 
      id: 2, 
      vehicle: 'Peugeot 208',
      plate: '456 TU 7890',
      service: 'Changement embrayage', 
      amount: '850 TND',
      estimatedTime: '5 heures',
      dateDebut: '2024-01-20T08:00',
      dateFin: '2024-01-21T13:00'
    }
  ]);

  // Suivi des véhicules (en cours / terminé)
  const [suiviVehicules, setSuiviVehicules] = useState([
    { 
      id: 1, 
      vehicle: 'Renault Clio',
      plate: '123 TU 4567',
      service: 'Vidange complète', 
      status: 'completed',
      startDate: '25/01/2024',
      endDate: '25/01/2024'
    },
    { 
      id: 2, 
      vehicle: 'Peugeot 208',
      plate: '456 TU 7890',
      service: 'Révision complète', 
      status: 'in_progress',
      startDate: '26/01/2024',
      endDate: 'En cours...'
    }
  ]);

  // ============================================
  // HELPERS
  // ============================================

  // Calculer le temps restant entre deux dates
  const calculateRemainingTime = (dateDebut, dateFin) => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diff = fin - debut;

    const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
    const heures = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (jours > 0) {
      return `${jours}j ${heures}h`;
    } else {
      return `${heures}h`;
    }
  };

  const getReservationBadge = (status) => {
    const badges = {
      accepted: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'Acceptée' },
      rejected: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'Refusée' },
      pending: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'En attente' }
    };
    return badges[status];
  };

  const getSuiviBadge = (status) => {
    const badges = {
        pending: {
      bg: 'bg-amber-500/20',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      label: 'En attente',
      icon: '🕓'
    },
      in_progress: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'En cours', icon: '⏳' },
      completed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'Terminé', icon: '✅' }
    };
    return badges[status];
  };

  // ============================================
  // HANDLERS
  // ============================================

  const handleDeleteReservation = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      setReservations(reservations.filter(r => r.id !== id));
    }
  };

  const handleAcceptDevis = (devisItem) => {
    // Créer un nouvel élément pour le suivi avec statut "en attente"
    const newSuivi = {
      id: Date.now(),
      vehicle: devisItem.vehicle,
      plate: devisItem.plate,
      service: devisItem.service,
      status: 'pending', // Nouveau statut "en attente"
      startDate: new Date(devisItem.dateDebut).toLocaleDateString('fr-FR'),
      endDate: new Date(devisItem.dateFin).toLocaleDateString('fr-FR')
    };

    // Ajouter au suivi
    setSuiviVehicules([...suiviVehicules, newSuivi]);
    
    // Supprimer du tableau devis
    setDevis(devis.filter(d => d.id !== devisItem.id));
    
    alert('Devis accepté ! Le véhicule est maintenant en attente de réparation.');
  };

  const handleRejectDevis = (id) => {
    setDevis(devis.filter(d => d.id !== id));
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  // NOUVEAU: Récupérer le véhicule (supprime du suivi)
  const handleRecuperVehicule = (id) => {
    if (window.confirm('Confirmez-vous avoir récupéré votre véhicule ?')) {
      setSuiviVehicules(suiviVehicules.filter(s => s.id !== id));
      alert('Véhicule récupéré avec succès ! Merci de votre confiance. 🚗');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/50">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white">Tableau de bord</h1>
              <p className="text-xl text-slate-400">
                Bienvenue, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">{user?.name}</span> 👋
              </p>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-lg`}>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <h3 className="text-sm text-slate-400 mb-1 font-medium uppercase tracking-wide">{stat.title}</h3>
                <p className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* TABLEAUX */}
        <div className="space-y-8">

          {/* ================================================ */}
          {/* TABLEAU 1 : RÉSERVATIONS */}
          {/* ================================================ */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                Mes Réservations
              </h2>
              <button
                onClick={() => navigate('/new-reservations')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un RDV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Véhicule</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Immatriculation</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Service</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Heure</th>
                    <th className="text-center py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Statut</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {reservations.map((rdv) => {
                    const badge = getReservationBadge(rdv.status);
                    return (
                      <tr key={rdv.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-bold text-white">{rdv.vehicle}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm text-slate-300 bg-slate-700/50 px-3 py-1 rounded">{rdv.plate}</span>
                        </td>
                        <td className="py-4 px-6 text-slate-300">{rdv.service}</td>
                        <td className="py-4 px-6 text-slate-400 text-sm">{new Date(rdv.date).toLocaleDateString('fr-FR')}</td>
                        <td className="py-4 px-6 text-slate-400 text-sm font-mono">{rdv.time}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteReservation(rdv.id)}
                            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-semibold transition-all"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================================================ */}
          {/* TABLEAU 2 : DEVIS EN ATTENTE */}
          {/* ================================================ */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
                Devis en Attente
              </h2>
            </div>

            {devis.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-slate-400">Aucun devis en attente</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Véhicule</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Immatriculation</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Service</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Période</th>
                      <th className="text-center py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Durée</th>
                      <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Montant</th>
                      <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {devis.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-bold text-white">{d.vehicle}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm text-slate-300 bg-slate-700/50 px-3 py-1 rounded">{d.plate}</span>
                        </td>
                        <td className="py-4 px-6 text-slate-300">{d.service}</td>
                        <td className="py-4 px-6">
                          <div className="text-slate-400 text-sm space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-green-400">🟢</span>
                              <span>{new Date(d.dateDebut).toLocaleString('fr-FR', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-red-400">🔴</span>
                              <span>{new Date(d.dateFin).toLocaleString('fr-FR', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1 bg-purple-500/20 px-3 py-1 rounded-full text-purple-400 font-bold border border-purple-500/30">
                            ⏱️ {calculateRemainingTime(d.dateDebut, d.dateFin)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                            {d.amount}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleAcceptDevis(d)}
                              className="px-3 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-semibold transition-all"
                            >
                              Accepter
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Voulez-vous refuser ce devis ?')) {
                                  handleRejectDevis(d.id);
                                  if (window.confirm('Souhaitez-vous nous contacter pour expliquer le motif ?')) {
                                    handleContactUs();
                                  }
                                }
                              }}
                              className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-semibold transition-all"
                            >
                              Refuser
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ================================================ */}
          {/* TABLEAU 3 : SUIVI DES VÉHICULES */}
          {/* ================================================ */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                Suivi des Véhicules
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Véhicule</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Immatriculation</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Service</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date début</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date fin</th>
                    <th className="text-center py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Statut</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {suiviVehicules.map((suivi) => {
                    const badge = getSuiviBadge(suivi.status);
                    return (
                      <tr key={suivi.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-bold text-white">{suivi.vehicle}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-sm text-slate-300 bg-slate-700/50 px-3 py-1 rounded">{suivi.plate}</span>
                        </td>
                        <td className="py-4 px-6 text-slate-300">{suivi.service}</td>
                        <td className="py-4 px-6 text-slate-400 text-sm">{suivi.startDate}</td>
                        <td className="py-4 px-6 text-slate-400 text-sm">{suivi.endDate}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                            <span className="text-lg">{badge.icon}</span>
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {suivi.status === 'completed' ? (
                            <button
                              onClick={() => handleRecuperVehicule(suivi.id)}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-green-500/30"
                            >
                              Récupérer
                            </button>
                          ) : (
                            <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-semibold inline-block">
                              {suivi.status === 'pending' ? 'En attente' : 'En cours'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;