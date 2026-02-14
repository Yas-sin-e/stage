import { useState, useEffect } from "react";
import api from "../../services/api/axios";
import Swal from "sweetalert2";
const GestionReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data } = await api.get("/admin/reservations");
      // t1: console.log(data);
      setReservations(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await api.put(`/admin/reservations/${id}/accept`);
      fetchReservations();
      Swal.fire({
        title: "Succès",
        text: "Réservation acceptée et devis créé",
        icon: "success",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#10b981"
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erreur lors de l'acceptation";
      Swal.fire({
        title: "Erreur",
        text: errorMessage,
        icon: "error",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#dc2626"
      });
    }
  };

  const handleReject = async (id) => {
    const { value: reason } = await Swal.fire({
      title: "Refuser la réservation",
      input: "textarea",
      inputLabel: "Raison du refus",
      inputPlaceholder: "Écrivez la raison هنا...",
      showCancelButton: true,
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      background: "#0f172a", // لون متناسق مع تصميمك الـ Slate-900
      color: "#ffffff",
      confirmButtonColor: "#dc2626", // لون أحمر للرفض
      inputAttributes: {
        autocapitalize: "off",
      },
    });
    if (reason) {
      try {
        await api.put(`/admin/reservations/${id}/reject`, { reason });
        fetchReservations();
      } catch (error) {
        alert("Erreur");
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        border: "border-amber-500/30",
        label: "En attente",
      },
      accepted: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        label: "Acceptée",
      },
      rejected: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        label: "Refusée",
      },
    };
    return badges[status];
  };

  const filteredReservations =
    filter === "all"
      ? reservations
      : reservations.filter((r) => r.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              Gestion des Réservations
            </h1>
            <p className="text-slate-400">
              {reservations.length} réservation(s)
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filter === "pending"
                  ? "bg-amber-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              En attente
            </button>
            <button
              onClick={() => setFilter("accepted")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filter === "accepted"
                  ? "bg-green-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Acceptées
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filter === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Refusées
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Client
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Véhicule
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Service
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Heure
                  </th>
                  <th className="text-center py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Statut
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredReservations.map((rdv) => {
                  const badge = getStatusBadge(rdv.status);
                  return (
                    <tr
                      key={rdv._id}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-bold text-white">
                            {rdv.userId?.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {rdv.userId?.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-bold text-white">
                            {rdv.vehicleId?.brand} {rdv.vehicleId?.model}
                          </div>
                          <div className="font-mono text-sm text-slate-400">
                            {rdv.vehicleId?.plate}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        {rdv.serviceId?.name}
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-sm">
                        {rdv.date
                          ? new Date(rdv.date).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "Non défini"}
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-sm font-mono">
                        {rdv.time}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {rdv.status === "pending" && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleAccept(rdv._id)}
                              className="px-3 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-400 rounded-lg text-xs font-semibold transition-all"
                            >
                              Accepter
                            </button>
                            <button
                              onClick={() => handleReject(rdv._id)}
                              className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-semibold transition-all"
                            >
                              Refuser
                            </button>
                          </div>
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
  );
};

export default GestionReservations;
