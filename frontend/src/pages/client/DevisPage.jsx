import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import api from "../../services/api/axios";

const DevisPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [devis, setDevis] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [devisRes, vehiclesRes] = await Promise.all([
        api.get("/devis"),
        api.get("/vehicles"),
      ]);

      setDevis(devisRes.data);
      setVehicles(vehiclesRes.data);
    } catch (error) {
      console.error("Erreur chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptDevis = async (id) => {
    if (
      window.confirm(
        "Voulez-vous accepter ce devis ? Les travaux commenceront après.",
      )
    ) {
      try {
        await api.put(`/devis/${id}/accept`);
        alert("Devis accepté ! Votre véhicule passera en réparation. ✅");
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || "Erreur lors de l'acceptation");
      }
    }
  };

  const handleRejectDevis = async (id) => {
    if (
      window.confirm(
        "Voulez-vous refuser ce devis ? Cette action est irréversible.",
      )
    ) {
      try {
        await api.put(`/devis/${id}/reject`);
        alert("Devis refusé.");
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || "Erreur lors du refus");
      }
    }
  };

  const handleDeleteDevis = async (id) => {
    if (
      window.confirm(
        "Voulez-vous supprimer ce devis ? Cette action est irréversible.",
      )
    ) {
      try {
        await api.delete(`/devis/${id}`);
        alert("Devis supprimé.");
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || "Erreur lors de la suppression");
      }
    }
  };

  // مساعد لحساب مدة الإصلاح المتوقعة
  const calculateDuration = (debut, fin) => {
    const diff = new Date(fin) - new Date(debut);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    return days > 0 ? `${days}j ${hours % 24}h` : `${hours}h`;
  };

  // نظام الـ Badges الملون حسب الحالة
  const getStatusStyle = (status) => {
    const styles = {
      pending: {
        bg: "bg-amber-500/10",
        text: "text-amber-500",
        border: "border-amber-500/20",
        label: "En attente",
        icon: "⏰",
      },
      accepted: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-500",
        border: "border-emerald-500/20",
        label: "Accepté",
        icon: "✔️",
      },
      rejected: {
        bg: "bg-red-500/10",
        text: "text-red-500",
        border: "border-red-500/20",
        label: "Refusé",
        icon: "❌",
      },
    };
    return styles[status] || styles.pending;
  };

  // Group devis by vehicle
  const devisByVehicle = vehicles.map((vehicle) => ({
    vehicle,
    devis: devis.filter((d) => d.vehicleId._id === vehicle._id),
  }));

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Chargement...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-blue-500/20 rotate-3">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                MES <span className="text-amber-500">DEVIS</span>
              </h1>
              <p className="text-slate-400 font-medium">
                Historique des devis par véhicule
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-3 bg-slate-800/50 hover:bg-slate-800 text-white rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>⬅️</span> Retour
            </button>
          </div>
        </div>

        {/* VEHICLES WITH DEVIS */}
        <div className="space-y-8">
          {devisByVehicle.map(({ vehicle, devis: vehicleDevis }) => (
            <div
              key={vehicle._id}
              className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden"
            >
              {/* VEHICLE HEADER */}
              <div className="p-6 border-b border-slate-800 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-lg font-black text-white">
                      🚗
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {vehicle.brand} {vehicle.model}
                      </h2>
                      <p className="text-slate-400 text-sm">
                        Immatriculation: {vehicle.plate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-500 text-xs font-mono">
                      {vehicleDevis.length} devis
                    </div>
                  </div>
                </div>
              </div>

              {/* DEVIS LIST */}
              <div className="p-6">
                {vehicleDevis.length === 0 ? (
                  <p className="text-center py-8 text-slate-500 italic">
                    Aucun devis pour ce véhicule.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {vehicleDevis.map((d) => {
                      const style = getStatusStyle(d.status);
                      return (
                        <div
                          key={d._id}
                          className="bg-black/40 border border-slate-800 p-6 rounded-3xl"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-white">
                                  {d.serviceLabel}
                                </h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${style.bg} ${style.text} ${style.border}`}
                                >
                                  {style.icon} {style.label}
                                </span>
                              </div>
                              <div className="text-slate-400 text-sm mb-2">
                                Créé le{" "}
                                {new Date(d.createdAt).toLocaleDateString()}
                              </div>
                              {d.description && (
                                <p className="text-slate-300 text-sm mb-3">
                                  {d.description}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black text-amber-500 mb-1">
                                {d.amount} TND
                              </div>
                              {d.dateDebut && d.dateFin && (
                                <div className="text-slate-500 text-xs">
                                  Durée estimée:{" "}
                                  {calculateDuration(d.dateDebut, d.dateFin)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* ITEMS LIST */}
                          {d.items && d.items.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase">
                                Détails des travaux
                              </h4>
                              <div className="space-y-2">
                                {d.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl"
                                  >
                                    <div className="flex-1">
                                      <span className="text-white font-medium">
                                        {item.name}
                                      </span>
                                      {item.quantity > 1 && (
                                        <span className="text-slate-400 text-sm ml-2">
                                          (x{item.quantity})
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-amber-500 font-bold">
                                      {item.price} TND
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* ACTIONS */}
                          <div className="flex gap-3">
                            {d.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleAcceptDevis(d._id)}
                                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold transition-all"
                                >
                                  Accepter le devis
                                </button>
                                <button
                                  onClick={() => handleRejectDevis(d._id)}
                                  className="px-6 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold transition-all"
                                >
                                  Refuser
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeleteDevis(d._id)}
                              className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-xl font-bold transition-all"
                              title="Supprimer le devis"
                            >
                              🗑️ Supprimer
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {devisByVehicle.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Aucun devis trouvé
            </h3>
            <p className="text-slate-400">
              Vous n'avez pas encore reçu de devis pour vos véhicules.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevisPage;
