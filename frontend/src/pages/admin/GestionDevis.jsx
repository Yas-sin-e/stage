import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import api from "../../services/api/axios";

const GestionDevis = () => {
  const [devis, setDevis] = useState([]);
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. إعداد React Hook Form
  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      userId: "",
      vehicleId: "",
      serviceLabel: "",
      amount: 0,
      estimatedTime: "",
      dateDebut: "",
      dateFin: "",
      description: "",
      items: [{ name: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const watchItems = watch("items");
  const watchUserId = watch("userId");

  // 2. حساب المجموع التلقائي
  useEffect(() => {
    const total = watchItems.reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);
    setValue("amount", total);
  }, [watchItems, setValue]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [devisRes, clientsRes, vehiclesRes] = await Promise.all([
        api.get("/admin/devis"),
        api.get("/admin/clients"),
        api.get("/admin/vehicles"),
      ]);
      setDevis(devisRes.data);
      setClients(clientsRes.data);
      setVehicles(vehiclesRes.data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const endpoint = newStatus === "accepted" ? "accept" : "reject";

      await api.put(`/admin/devis/${id}/${endpoint}`);

      alert(
        `Le devis a été ${newStatus === "accepted" ? "accepté" : "refusé"}`,
      );
      fetchData();
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const onSubmit = async (data) => {
    try {
      await api.post("/admin/devis", data);
      alert("Devis créé avec succès !");
      fetchData();
      handleCloseModal();
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de la création");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  // 4. دالة الألوان والحالات
  const getStatusStyle = (status) => {
    const styles = {
      pending: {
        bg: "bg-amber-500/20",
        text: "text-amber-500",
        border: "border-amber-500/30",
        label: "En attente",
      },
      accepted: {
        bg: "bg-green-500/20",
        text: "text-green-500",
        border: "border-green-500/30",
        label: "Accepté",
      },
      rejected: {
        bg: "bg-red-500/20",
        text: "text-red-500",
        border: "border-red-500/30",
        label: "Refusé",
      },
    };
    return styles[status] || styles.pending;
  };

  if (loading) return <div className="text-white p-10">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2">Gestion des Devis</h1>
            <p className="text-slate-400">{devis.length} devis enregistrés</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl font-bold transition-all hover:scale-105"
          >
            + Créer un devis
          </button>
        </div>

        {/* الجدول الرئيسي */}
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-900/60 text-slate-400 text-xs uppercase font-bold">
              <tr>
                <th className="py-4 px-6">Client & Véhicule</th>
                <th className="py-4 px-6">Service</th>
                <th className="py-4 px-6 text-right">Montant</th>
                <th className="py-4 px-6 text-center">Statut</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {devis.map((d) => {
                const style = getStatusStyle(d.status);
                return (
                  <tr
                    key={d._id}
                    className="hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold">{d.userId?.name}</div>
                      <div className="text-xs text-slate-500">
                        {d.vehicleId?.brand} ({d.vehicleId?.plate})
                      </div>
                    </td>
                    <td className="py-4 px-6">{d.serviceLabel}</td>
                    <td className="py-4 px-6 text-right font-black text-amber-500">
                      {d.amount} TND
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border ${style.bg} ${style.text} ${style.border}`}
                      >
                        {style.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {d.status === "accepted" && (
                        <span className="text-green-500 font-bold flex items-center justify-center gap-1">
                          <span className="text-lg">✓</span> Confirmé par client
                        </span>
                      )}

                      {d.status === "rejected" && (
                        <span className="text-red-500 font-bold flex items-center justify-center gap-1">
                          <span className="text-lg">✕</span> Refusé par client
                        </span>
                      )}

                      {d.status === "pending" && (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleUpdateStatus(d._id, "accepted")
                            }
                            className="text-[10px] bg-green-600/20 px-2 py-1 rounded border border-green-500/50 text-green-500 hover:bg-green-600 hover:text-white"
                          >
                            Accepter manuellement
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

        {/* Modal Création */}
        {showModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Nouveau Devis</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">
                      Client *
                    </label>
                    <select
                      {...register("userId", { required: true })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3"
                    >
                      <option value="">Sélectionner...</option>
                      {clients.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">
                      Véhicule *
                    </label>
                    <select
                      {...register("vehicleId", { required: true })}
                      disabled={!watchUserId}
                      className={`w-full bg-slate-900 border border-slate-700 rounded-xl p-3 ${!watchUserId ? "opacity-50" : ""}`}
                    >
                      <option value="">Sélectionner...</option>
                      {vehicles
                        .filter((v) => v.userId?._id === watchUserId)
                        .map((v) => (
                          <option key={v._id} value={v._id}>
                            {v.brand} - {v.plate}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* تفاصيل القطع */}
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 space-y-4">
                  <h3 className="text-sm font-black text-amber-500 uppercase">
                    Pièces et Main d'oeuvre
                  </h3>
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-2">
                      <input
                        {...register(`items.${index}.name`)}
                        className="col-span-6 bg-slate-800 p-2 rounded-lg"
                        placeholder="Désignation"
                      />
                      <input
                        type="number"
                        {...register(`items.${index}.quantity`)}
                        className="col-span-2 bg-slate-800 p-2 rounded-lg"
                        placeholder="Qté"
                      />
                      <input
                        type="number"
                        {...register(`items.${index}.price`)}
                        className="col-span-3 bg-slate-800 p-2 rounded-lg"
                        placeholder="Prix"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append({ name: "", quantity: 1, price: 0 })}
                    className="text-xs bg-slate-700 px-3 py-1 rounded-lg"
                  >
                    + Ligne
                  </button>
                </div>

                <div className="flex justify-between items-center bg-amber-600/10 p-4 rounded-xl border border-amber-600/30">
                  <span className="font-bold text-amber-500 uppercase">
                    Total Global
                  </span>
                  <span className="text-2xl font-black">
                    {watch("amount")} TND
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-600 py-4 rounded-xl font-bold hover:bg-amber-500"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-8 bg-slate-700 rounded-xl"
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

export default GestionDevis;
