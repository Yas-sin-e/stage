import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api/axios";

const GestionDevis = () => {
  const [devis, setDevis] = useState([]);
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingDevis, setEditingDevis] = useState(null);

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      userId: "",
      vehicleId: "",
      serviceLabel: "",
      amount: "",
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

  // Fonction pour calculer le montant total
  const calculateTotal = () => {
    const items = watch("items") || [];
    const total = items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
    setValue("amount", total.toString());
    toast.success(`Montant calculé: ${total.toFixed(2)} TND`);
  };

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
      toast.success(
        `Le devis a été ${newStatus === "accepted" ? "accepté" : "refusé"}`,
      );
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce devis ?")) {
      try {
        await api.delete(`/admin/devis/${id}`);
        toast.success("Devis supprimé avec succès");
        fetchData();
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        amount: Number(data.amount) || 0,
      };

      if (editingDevis) {
        await api.put(`/admin/devis/${editingDevis._id}`, dataToSend);
        toast.success("Devis modifié avec succès !");
      } else {
        await api.post("/admin/devis", dataToSend);
        toast.success("Devis créé avec succès !");
      }
      await fetchData();
      handleCloseModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la sauvegarde",
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDevis(null);
    reset({
      userId: "",
      vehicleId: "",
      serviceLabel: "",
      amount: "",
      estimatedTime: "",
      dateDebut: "",
      dateFin: "",
      description: "",
      items: [{ name: "", quantity: 1, price: 0 }],
    });
  };

  const handleEdit = (devisItem) => {
    setEditingDevis(devisItem);
    setValue("userId", devisItem.userId?._id || "");
    setValue("vehicleId", devisItem.vehicleId?._id || "");
    setValue("serviceLabel", devisItem.serviceLabel || "");
    setValue("estimatedTime", devisItem.estimatedTime || "");
    setValue(
      "dateDebut",
      devisItem.dateDebut
        ? new Date(devisItem.dateDebut).toISOString().split("T")[0]
        : "",
    );
    setValue(
      "dateFin",
      devisItem.dateFin
        ? new Date(devisItem.dateFin).toISOString().split("T")[0]
        : "",
    );
    setValue("description", devisItem.description || "");
    setValue("amount", devisItem.amount?.toString() || "");
    setValue("items", devisItem.items || [{ name: "", quantity: 1, price: 0 }]);
    setShowModal(true);
  };

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

  if (loading)
    return <div className="text-white p-10 text-lg">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-4 md:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              Gestion des Devis
            </h1>
            <p className="text-slate-400 text-lg">
              {devis.length} devis enregistrés
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl font-bold transition-all hover:scale-105 text-lg"
          >
            + Créer un devis
          </button>
        </div>

        {/* Tableau principal */}
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/60 text-slate-400 uppercase font-bold">
                <tr>
                  <th className="py-4 px-4 md:px-6 text-sm">
                    Client & Véhicule
                  </th>
                  <th className="py-4 px-4 md:px-6 text-sm">Service</th>
                  <th className="py-4 px-4 md:px-6 text-right text-sm">
                    Montant
                  </th>
                  <th className="py-4 px-4 md:px-6 text-center text-sm">
                    Statut
                  </th>
                  <th className="py-4 px-4 md:px-6 text-center text-sm">
                    Actions
                  </th>
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
                      <td className="py-4 px-4 md:px-6">
                        <div className="font-bold text-base">
                          {d.userId?.name || "N/A"}
                        </div>
                        <div className="text-sm text-slate-500">
                          {d.vehicleId?.brand} ({d.vehicleId?.plate})
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6 text-base">
                        {d.serviceLabel}
                      </td>
                      <td className="py-4 px-4 md:px-6 text-right font-black text-xl text-amber-500">
                        {d.amount} TND
                      </td>
                      <td className="py-4 px-4 md:px-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold border ${style.bg} ${style.text} ${style.border}`}
                        >
                          {style.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 md:px-6 text-center">
                        <div className="flex justify-center gap-2 flex-wrap">
                          {d.status !== "accepted" && (
                            <button
                              onClick={() => handleEdit(d)}
                              className="text-sm bg-blue-600/20 px-3 py-1.5 rounded border border-blue-500/50 text-blue-500 hover:bg-blue-600 hover:text-white transition-all"
                            >
                              ✏️ Éditer
                            </button>
                          )}

                          {d.status === "accepted" && (
                            <span className="text-green-500 font-bold flex items-center gap-1 text-sm">
                              <span className="text-lg">✓</span> Confirmé
                            </span>
                          )}

                          {d.status === "rejected" && (
                            <span className="text-red-500 font-bold flex items-center gap-1 text-sm">
                              <span className="text-lg">✕</span> Refusé
                            </span>
                          )}

                          {d.status === "pending" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(d._id, "accepted")
                              }
                              className="text-sm bg-green-600/20 px-3 py-1.5 rounded border border-green-500/50 text-green-500 hover:bg-green-600 hover:text-white transition-all"
                            >
                              ✓ Accepter
                            </button>
                          )}

                          {d.status !== "accepted" && (
                            <button
                              onClick={() => handleDelete(d._id)}
                              className="text-sm bg-red-600/20 px-3 py-1.5 rounded border border-red-500/50 text-red-500 hover:bg-red-600 hover:text-white transition-all"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {devis.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-lg">
              Aucun devis trouvé
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">
                {editingDevis ? "Modifier le devis" : "Nouveau Devis"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase">
                      Client *
                    </label>
                    <select
                      {...register("userId", { required: true })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg"
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
                    <label className="text-sm font-bold text-slate-400 uppercase">
                      Véhicule *
                    </label>
                    <select
                      {...register("vehicleId", { required: true })}
                      disabled={!watchUserId}
                      className={`w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg ${!watchUserId ? "opacity-50" : ""}`}
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase">
                      Service *
                    </label>
                    <input
                      {...register("serviceLabel", { required: true })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg"
                      placeholder="Ex: Réparation moteur"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase">
                      Temps Estimé *
                    </label>
                    <input
                      {...register("estimatedTime", { required: true })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg"
                      placeholder="Ex: 48h"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase">
                      Date Début *
                    </label>
                    <input
                      type="date"
                      {...register("dateDebut", { required: true })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase">
                      Date Fin *
                    </label>
                    <input
                      type="date"
                      {...register("dateFin", { required: true })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg"
                    />
                  </div>
                </div>

                {/* Pièces et Main d'oeuvre */}
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 space-y-4">
                  <h3 className="text-base font-black text-amber-500 uppercase">
                    Pièces et Main d'oeuvre
                  </h3>
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-2">
                      <input
                        {...register(`items.${index}.name`)}
                        className="col-span-5 bg-slate-800 p-3 rounded-lg text-base"
                        placeholder="Désignation"
                      />
                      <input
                        type="number"
                        {...register(`items.${index}.quantity`)}
                        className="col-span-2 bg-slate-800 p-3 rounded-lg text-base"
                        placeholder="Qté"
                      />
                      <input
                        type="number"
                        step="0.01"
                        {...register(`items.${index}.price`)}
                        className="col-span-4 bg-slate-800 p-3 rounded-lg text-base"
                        placeholder="Prix"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 text-xl p-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append({ name: "", quantity: 1, price: 0 })}
                    className="text-sm bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600 transition-all"
                  >
                    + Ajouter une ligne
                  </button>
                </div>

                {/* Bouton Calculer */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={calculateTotal}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <span>🧮</span> Calculer le montant
                  </button>
                </div>

                {/* Montant Total */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase">
                    Montant Total (TND) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("amount", { required: true })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-xl font-bold text-amber-500"
                    placeholder="Le montant sera calculé ci-dessus"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg"
                    rows="3"
                    placeholder="Description du devis..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-600 py-4 rounded-xl font-bold text-lg hover:bg-amber-500 transition-all"
                  >
                    {editingDevis ? "Sauvegarder" : "Enregistrer"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-8 bg-slate-700 rounded-xl font-bold text-lg hover:bg-slate-600 transition-all"
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
