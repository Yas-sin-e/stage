import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import api from "../../services/api/axios";
import { useNavigate } from "react-router-dom";

const DevisPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevis();
  }, []);

  const fetchDevis = async () => {
    try {
      const response = await api.get("/devis");
      setDevis(response.data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    if (window.confirm("Accepter ce devis ?")) {
      try {
        await api.put(`/devis/${id}/accept`);
        alert("✓ Devis accepté ! Une réparation a été créée.");
        fetchDevis();
      } catch (error) {
        alert(error.response?.data?.message || "Erreur");
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Refuser ce devis ?")) {
      try {
        await api.put(`/devis/${id}/reject`);
        alert("✕ Devis refusé");
        fetchDevis();
      } catch (error) {
        alert("Erreur");
      }
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: {
        bg: "bg-amber-500/20",
        text: "text-amber-500",
        border: "border-amber-500/30",
        label: "En attente",
        icon: "⏳",
      },
      accepted: {
        bg: "bg-green-500/20",
        text: "text-green-500",
        border: "border-green-500/30",
        label: "Accepté",
        icon: "✓",
      },
      rejected: {
        bg: "bg-red-500/20",
        text: "text-red-500",
        border: "border-red-500/30",
        label: "Refusé",
        icon: "✕",
      },
    };
    return styles[status] || styles.pending;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Mes Devis
          </h1>
          <p className="text-slate-400 text-lg">
            Consultez l'état de vos demandes de devis
          </p>
        </div>

        {devis.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📄</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Aucun devis trouvé
            </h2>
            <p className="text-slate-400 mb-6 text-lg">
              Vous n'avez pas encore de devis. Demandez un devis pour vos
              réparations !
            </p>
            <button
              onClick={() => navigate("/services")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all"
            >
              Demander un devis
            </button>
          </div>
        ) : (
          /* Devis List */
          <div className="space-y-6">
            {devis.map((d) => {
              const style = getStatusStyle(d.status);
              return (
                <div
                  key={d._id}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
                >
                  {/* Header Card */}
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {d.serviceLabel || "Devis"}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-base text-slate-400">
                        <span>📅 Créé le: {formatDate(d.createdAt)}</span>
                        {d.dateDebut && (
                          <span>🏁 Début: {formatDate(d.dateDebut)}</span>
                        )}
                        {d.dateFin && (
                          <span>🏁 Fin: {formatDate(d.dateFin)}</span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-base font-bold border ${style.bg} ${style.text} ${style.border}`}
                    >
                      {style.icon} {style.label}
                    </span>
                  </div>

                  {/* Vehicle Info */}
                  {d.vehicleId && (
                    <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
                      <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">
                        Véhicule
                      </h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                          🚗
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg">
                            {d.vehicleId.brand} {d.vehicleId.model}
                          </div>
                          <div className="text-slate-400 text-base">
                            {d.vehicleId.plate} • {d.vehicleId.year}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {d.description && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">
                        Description
                      </h4>
                      <p className="text-slate-300 text-base leading-relaxed">
                        {d.description}
                      </p>
                    </div>
                  )}

                  {/* Items Table */}
                  {d.items && d.items.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">
                        Détail des prestations
                      </h4>
                      <div className="bg-slate-900/50 rounded-xl overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-slate-800">
                            <tr>
                              <th className="text-left py-3 px-4 text-slate-400 font-bold text-sm">
                                Désignation
                              </th>
                              <th className="text-center py-3 px-4 text-slate-400 font-bold text-sm">
                                Qté
                              </th>
                              <th className="text-right py-3 px-4 text-slate-400 font-bold text-sm">
                                Prix
                              </th>
                              <th className="text-right py-3 px-4 text-slate-400 font-bold text-sm">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700">
                            {d.items.map((item, index) => (
                              <tr key={index}>
                                <td className="py-3 px-4 text-slate-300 text-base">
                                  {item.name || "-"}
                                </td>
                                <td className="py-3 px-4 text-center text-slate-300 text-base">
                                  {item.quantity || 1}
                                </td>
                                <td className="py-3 px-4 text-right text-slate-300 text-base">
                                  {Number(item.price || 0).toFixed(2)} TND
                                </td>
                                <td className="py-3 px-4 text-right text-white font-bold text-base">
                                  {Number(
                                    (item.price || 0) * (item.quantity || 1),
                                  ).toFixed(2)}{" "}
                                  TND
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-xl px-6 py-4">
                      <span className="text-slate-400 text-base mr-4">
                        Montant Total:
                      </span>
                      <span className="text-3xl font-black text-amber-500">
                        {d.amount} TND
                      </span>
                    </div>
                  </div>

                  {/* Status-specific message */}
                  {d.status === "accepted" && (
                    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <p className="text-green-400 text-base">
                        ✓ Votre devis a été accepté. Vous pouvez maintenant
                        prendre rendez-vous pour effectuer les réparations.
                      </p>
                      <button
                        onClick={() => navigate("/reservations/new")}
                        className="mt-3 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all"
                      >
                        Prendre rendez-vous
                      </button>
                    </div>
                  )}

                  {d.status === "rejected" && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <p className="text-red-400 text-base">
                        ✕ Votre devis a été refusé. Veuillez nous contacter pour
                        plus d'informations.
                      </p>
                    </div>
                  )}

                  {d.status === "pending" && (
                    <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                      <p className="text-amber-400 text-base mb-4">
                        ⏳ Devis en attente de votre décision
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAccept(d._id)}
                          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all"
                        >
                          ✓ Accepter le devis
                        </button>
                        <button
                          onClick={() => handleReject(d._id)}
                          className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all"
                        >
                          ✕ Refuser
                        </button>
                      </div>
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

export default DevisPage;
