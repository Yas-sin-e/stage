import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import api from "../../services/api/axios";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    vehicles: 0,
    reservations: 0,
    devis: 0,
  });
  const [reservations, setReservations] = useState([]);
  const [devis, setDevis] = useState([]);
  const [reparations, setReparations] = useState([]);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // جلب البيانات بشكل متوازي لسرعة الأداء
      const [
        vehiclesRes,
        reservationsRes,
        devisRes,
        reparationsRes,
        servicesRes,
      ] = await Promise.all([
        api.get("/vehicles"),
        api.get("/reservations"),
        api.get("/devis"),
        api.get("/reparations"),
        api.get("/services"),
      ]);

      setStats({
        vehicles: vehiclesRes.data.length,
        reservations: reservationsRes.data.length,
        devis: devisRes.data.filter((d) => d.status === "pending").length,
      });

      setReservations(
        reservationsRes.data.filter(
          (r) => r.status !== "delivered" && r.status !== "completed",
        ),
      );
      setDevis(devisRes.data.filter((d) => d.status === "pending"));
      // نعرض فقط الإصلاحات التي لم يتم تسليمها بعد (Active Tracking)
      setReparations(
        reparationsRes.data.filter((r) => r.status !== "delivered"),
      );
      setServices(servicesRes.data);
      setVehicles(vehiclesRes.data);
      console.log("Vehicles loaded:", vehiclesRes.data); // Debug log
      console.log("Services loaded:", servicesRes.data); // Debug log
    } catch (error) {
      console.error("Erreur chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- العمليات (Handlers) ---

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

  const handleRecuperVehicule = async (id) => {
    if (window.confirm("Confirmer que vous avez récupéré votre véhicule ?")) {
      try {
        await api.put(`/reparations/${id}/recuperer`);
        alert("Merci de votre confiance ! 🚗");
        fetchData();
      } catch (error) {
        alert("Erreur lors της validation");
      }
    }
  };

  const handleEditReservation = (reservation) => {
    setEditingReservation(reservation);
    setShowEditModal(true);
  };

  const handleUpdateReservation = async (data) => {
    try {
      await api.put(`/reservations/${editingReservation._id}`, data);
      alert("Rendez-vous modifié avec succès !");
      setShowEditModal(false);
      setEditingReservation(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de la modification");
    }
  };

  const handleDeleteReservation = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
      try {
        await api.delete(`/reservations/${id}`);
        alert("Rendez-vous annulé avec succès !");
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || "Erreur lors de l'annulation");
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
        label: "Validé",
        icon: "✔️",
      },
      in_progress: {
        bg: "bg-blue-500/10",
        text: "text-blue-500",
        border: "border-blue-500/20",
        label: "En cours",
        icon: "🔧",
      },
      completed: {
        bg: "bg-green-500/10",
        text: "text-green-500",
        border: "border-green-500/20",
        label: "Prêt",
        icon: "✨",
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
                DASHBOARD <span className="text-blue-500">CLIENT</span>
              </h1>
              <p className="text-slate-400 font-medium">
                Content de vous revoir, {user?.name} 👋
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="px-5 py-3 bg-slate-800/50 hover:bg-slate-800 text-white rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>👤</span> Profil
            </button>
            <button
              onClick={() => navigate("/reservations/new")}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <span>➕</span> Nouveau RDV
            </button>
          </div>
        </div>
        <button
          onClick={() => navigate("/chat-ai")}
          className="w-full px-6 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-3xl transition-all shadow-xl flex items-center gap-4"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
            🤖
          </div>
          <div className="text-left flex-1">
            <h3 className="text-2xl font-black text-white">Assistant IA</h3>
            <p className="text-white/80 text-sm">
              Diagnostics automobiles instantanés
            </p>
          </div>
        </button>
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Véhicules",
              value: stats.vehicles,
              color: "blue",
              icon: "🚗",
            },
            {
              label: "Rendez-vous",
              value: stats.reservations,
              color: "purple",
              icon: "📅",
            },
            {
              label: "Devis à valider",
              value: stats.devis,
              color: "amber",
              icon: "💰",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-colors"
            >
              <div className={`text-2xl mb-2`}>{stat.icon}</div>
              <div className="text-slate-500 text-xs font-black uppercase tracking-widest">
                {stat.label}
              </div>
              <div
                className={`text-4xl font-black text-${stat.color}-500 mt-1`}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: DEVIS & REPARATIONS */}
          <div className="space-y-8">
            {/* SECTION DEVIS */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
              <div className="p-6 border-b border-slate-800 bg-white/5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 italic">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  Devis en attente de décision
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {devis.length === 0 ? (
                  <p className="text-center py-8 text-slate-500 italic">
                    Aucun devis à valider pour le moment.
                  </p>
                ) : (
                  devis.map((d) => (
                    <div
                      key={d._id}
                      className="bg-black/40 border border-slate-800 p-5 rounded-3xl flex items-center justify-between"
                    >
                      <div>
                        <div className="text-white font-bold">
                          {d.vehicleId?.brand} {d.vehicleId?.model}
                        </div>
                        <div className="text-amber-500 font-black text-lg">
                          {d.amount} TND
                        </div>
                        <div className="text-slate-500 text-xs mt-1">
                          Estimé : {calculateDuration(d.dateDebut, d.dateFin)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAcceptDevis(d._id)}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all"
                      >
                        Accepter
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SECTION SUIVI (REPARATIONS) */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
              <div className="p-6 border-b border-slate-800 bg-white/5 font-bold text-white italic">
                🛠️ Suivi en temps réel
              </div>
              <div className="p-6">
                {reparations.length === 0 ? (
                  <p className="text-slate-500 text-center">
                    Aucune réparation en cours.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {reparations.map((rep) => {
                      const style = getStatusStyle(rep.status);
                      return (
                        <div
                          key={rep._id}
                          className="relative pl-6 border-l border-slate-800"
                        >
                          <div
                            className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full ${style.text} bg-current shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                          ></div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-bold">
                                {rep.vehicleId?.brand} {rep.vehicleId?.model}
                              </h4>
                              <p className="text-slate-500 text-sm">
                                {rep.service}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${style.bg} ${style.text} ${style.border}`}
                            >
                              {style.icon} {style.label}
                            </span>
                          </div>
                          {rep.status === "completed" && (
                            <button
                              onClick={() => handleRecuperVehicule(rep._id)}
                              className="mt-4 w-full py-3 bg-white text-black rounded-xl font-black hover:bg-blue-400 transition-colors"
                            >
                              RÉCUPÉRER MON VÉHICULE
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RÉSERVATIONS */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-white/5 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white italic">
                📅 Mes Prochains RDV
              </h2>
              <span className="text-slate-500 text-xs font-mono">
                {reservations.length} total
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black/20 text-slate-500 text-[10px] uppercase font-black">
                  <tr>
                    <th className="p-6">Véhicule</th>
                    <th className="p-6">Date & Heure</th>
                    <th className="p-6 text-center">Status</th>
                    <th className="p-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {reservations.map((rdv) => (
                    <tr
                      key={rdv._id}
                      className="group hover:bg-white/5 transition-all"
                    >
                      <td className="p-6">
                        <div className="text-white font-bold">
                          {rdv.vehicleId?.brand}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {rdv.serviceId?.name}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="text-slate-300 text-sm font-medium">
                          {new Date(rdv.date).toLocaleDateString()}
                        </div>
                        <div className="text-blue-500 text-xs font-bold font-mono">
                          {rdv.time}
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <div
                          className={`inline-block w-2 h-2 rounded-full ${getStatusStyle(rdv.status).text} bg-current`}
                        ></div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex gap-2 justify-center">
                          {rdv.status === "pending" && (
                            <button
                              onClick={() => handleEditReservation(rdv)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg font-bold transition-all"
                              title="Modifier le RDV"
                            >
                              ✏️
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteReservation(rdv._id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded-lg font-bold transition-all"
                            title="Supprimer le RDV"
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* EDIT MODAL */}
        {showEditModal && editingReservation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">
                Modifier le RDV
              </h3>

              <form onSubmit={handleSubmit(handleUpdateReservation)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Véhicule *
                    </label>
                    <select
                      {...register("vehicleId")}
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white"
                      required
                    >
                      {vehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                          {vehicle.brand} {vehicle.model} - {vehicle.plate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Service *
                    </label>
                    <select
                      {...register("serviceId")}
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white"
                      required
                    >
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      {...register("date")}
                      min={new Date().toISOString().split("T")[0]} // Today or later
                      max={
                        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[0]
                      } // 1 year from now
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Heure *
                    </label>
                    <input
                      type="time"
                      {...register("time")}
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Notes
                    </label>
                    <textarea
                      {...register("notes")}
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white"
                      rows="3"
                      placeholder="Notes supplémentaires..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingReservation(null);
                    }}
                    className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
