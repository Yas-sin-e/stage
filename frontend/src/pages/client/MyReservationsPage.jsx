import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api/axios";

const MyReservationsPage = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data } = await api.get("/reservations");
      setReservations(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        border: "border-amber-500/30",
        label: "En attente",
        icon: "⏳",
      },
      accepted: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        label: "Acceptée",
        icon: "✓",
      },
      rejected: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        label: "Refusée",
        icon: "✕",
      },
    };
    return badges[status] || badges.pending;
  };

  const handleCancel = async (id) => {
    if (window.confirm("Annuler cette réservation ?")) {
      try {
        await api.delete(`/reservations/${id}`);
        alert("Réservation annulée");
        fetchReservations();
      } catch (error) {
        alert("Erreur lors de l'annulation");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Mes Réservations
          </h1>
          <p className="text-slate-400 text-lg">
            Consultez l'état de vos rendez-vous
          </p>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📅</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Aucune réservation
            </h2>
            <p className="text-slate-400 mb-6 text-lg">
              Vous n'avez pas encore de rendez-vous
            </p>
            <button
              onClick={() => navigate("/reservations/new")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all"
            >
              Prendre un rendez-vous
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => {
              const badge = getStatusBadge(reservation.status);
              return (
                <div
                  key={reservation._id}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {reservation.serviceId?.name || "Problème personnalisé"}
                      </h3>
                      <div className="text-slate-400 text-sm">
                        📅 {new Date(reservation.date).toLocaleDateString("fr-FR")} à {reservation.time}
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
                    >
                      {badge.icon} {badge.label}
                    </span>
                  </div>

                  {/* Véhicule */}
                  {reservation.vehicleId && (
                    <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">
                        Véhicule
                      </h4>
                      <div className="text-white font-bold">
                        {reservation.vehicleId.brand} {reservation.vehicleId.model}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {reservation.vehicleId.plate}
                      </div>
                    </div>
                  )}

                  {/* Problème personnalisé */}
                  {reservation.customProblem && (
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">
                        Problème décrit
                      </h4>
                      <p className="text-slate-300 text-sm">
                        {reservation.customProblem}
                      </p>
                    </div>
                  )}

                  {/* Notes */}
                  {reservation.notes && (
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">
                        Notes
                      </h4>
                      <p className="text-slate-300 text-sm">
                        {reservation.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {reservation.status === "pending" && (
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleCancel(reservation._id)}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-bold transition-all"
                      >
                        Annuler
                      </button>
                    </div>
                  )}

                  {reservation.status === "accepted" && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm">
                        ✓ Votre rendez-vous a été accepté. Un devis vous sera envoyé prochainement.
                      </p>
                    </div>
                  )}

                  {reservation.status === "rejected" && reservation.adminNotes && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm font-bold mb-1">
                        Raison du refus:
                      </p>
                      <p className="text-red-300 text-sm">
                        {reservation.adminNotes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationsPage;
