import { useState, useEffect } from "react";
import api from "../../services/api/axios";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import ConfirmModal from "../../components/ConfirmModal";
import { useConfirm } from "../../hooks/useConfirm";

const GestionReparations = () => {
  const [reparations, setReparations] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { toasts, showToast, removeToast } = useToast();
  const { confirmState, showConfirm, handleConfirm, handleCancel } =
    useConfirm();

  useEffect(() => {
    fetchReparations();
  }, []);

  const fetchReparations = async () => {
    try {
      const { data } = await api.get("/admin/reparations");
      setReparations(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async (id) => {
    try {
      await api.put(`/admin/reparations/${id}/start`);
      fetchReparations();
      showToast("Réparation démarrée", "success");
    } catch (error) {
      showToast("Erreur", "error");
    }
  };

  const handleComplete = async (id) => {
    const technicianNotes = prompt("Notes de fin de réparation:");
    if (technicianNotes === null) return; // Annuler si dialogueclosé
    try {
      await api.put(`/admin/reparations/${id}/complete`, { technicianNotes });
      fetchReparations();
      showToast("Réparation terminée", "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de la terminaison";
      showToast(errorMessage, "error");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirm(
      "Supprimer cette réparation terminée ?",
      "danger",
    );
    if (confirmed) {
      try {
        await api.delete(`/admin/reparations/${id}`);
        fetchReparations();
        showToast("Réparation supprimée", "success");
      } catch (error) {
        showToast("Erreur lors de la suppression", "error");
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
        icon: "⏰",
      },
      in_progress: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/30",
        label: "En cours",
        icon: "🔧",
      },
      completed: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        label: "Terminé",
        icon: "✅",
      },
      delivered: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-500/30",
        label: "Récupéré",
        icon: "🚗",
      },
    };
    return badges[status];
  };

  const filteredReparations =
    filter === "all"
      ? reparations
      : reparations.filter((r) => r.status === filter);

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
              Gestion des Réparations
            </h1>
            <p className="text-slate-400">{reparations.length} réparation(s)</p>
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
              onClick={() => setFilter("in_progress")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filter === "in_progress"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              En cours
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                filter === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Terminées
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
                    Montant
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Date début
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Date fin prévue
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
                {filteredReparations.map((rep) => {
                  const badge = getStatusBadge(rep.status);
                  return (
                    <tr
                      key={rep._id}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-bold text-white">
                            {rep.userId?.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {rep.userId?.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-bold text-white">
                            {rep.vehicleId?.brand} {rep.vehicleId?.model}
                          </div>
                          <div className="font-mono text-sm text-slate-400">
                            {rep.vehicleId?.plate}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        {rep.service}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                            {rep.totalAmount || rep.devisId?.amount || 0} TND
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                            Prix Fixé
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-sm">
                        {rep.startDate
                          ? new Date(rep.startDate).toLocaleDateString("fr-FR")
                          : "-"}
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-sm">
                        {rep.endDate
                          ? new Date(rep.estimatedEndDate).toLocaleDateString(
                              "fr-FR",
                            )
                          : "-"}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          <span className="text-lg">{badge.icon}</span>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {rep.status === "pending" && (
                          <button
                            onClick={() => handleStart(rep._id)}
                            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-semibold transition-all"
                          >
                            Démarrer
                          </button>
                        )}
                        {rep.status === "in_progress" && (
                          <button
                            onClick={() => handleComplete(rep._id)}
                            className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-400 rounded-lg text-sm font-semibold transition-all"
                          >
                            Terminer
                          </button>
                        )}
                        {rep.status === "completed" && (
                          <span className="px-4 py-2 bg-slate-700/50 text-slate-400 rounded-lg text-sm font-semibold inline-block">
                            En attente du client
                          </span>
                        )}
                        {rep.status === "delivered" && (
                          <button
                            onClick={() => handleDelete(rep._id)}
                            className="px-4 py-2 bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-400 rounded-lg text-sm font-semibold transition-all w-full"
                          >
                            Supprimer
                          </button>
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
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      {confirmState.isOpen && (
        <ConfirmModal
          message={confirmState.message}
          type={confirmState.type}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default GestionReparations;
