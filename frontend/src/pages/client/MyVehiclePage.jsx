import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../services/api/axios";
import Toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";
import ConfirmModal from "../../components/ConfirmModal";
import { useConfirm } from "../../hooks/useConfirm";

const VehiclesPage = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const { toasts, showToast, removeToast } = useToast();
  const { confirmState, showConfirm, handleConfirm, handleCancel } = useConfirm();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      plate: "",
      vin: "",
      color: "",
      mileage: "",
    },
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data } = await api.get("/vehicles");
      setVehicles(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingVehicle) {
        await api.put(`/vehicles/${editingVehicle._id}`, data);
        showToast('Véhicule modifié avec succès', 'success');
      } else {
        await api.post("/vehicles", data);
        showToast('Véhicule ajouté avec succès', 'success');
      }
      fetchVehicles();
      handleCloseModal();
    } catch (error) {
      showToast(error.response?.data?.message || "Erreur lors de la sauvegarde", 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirm("Supprimer ce véhicule ?", 'danger');
    if (confirmed) {
      try {
        await api.delete(`/vehicles/${id}`);
        setVehicles(vehicles.filter((v) => v._id !== id));
        showToast('Véhicule supprimé avec succès', 'success');
      } catch (error) {
        showToast("Erreur lors de la suppression", 'error');
      }
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setValue("brand", vehicle.brand);
    setValue("model", vehicle.model);
    setValue("year", vehicle.year);
    setValue("plate", vehicle.plate);
    setValue("vin", vehicle.vin);
    setValue("color", vehicle.color || "");
    setValue("mileage", vehicle.mileage || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVehicle(null);
    reset();
  };

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
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              Mes Véhicules
            </h1>
            <p className="text-slate-400">Gérez vos véhicules</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Ajouter un véhicule
          </button>
        </div>

        {/* LISTE VÉHICULES */}
        {vehicles.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Aucun véhicule
            </h3>
            <p className="text-slate-400 mb-6">
              Ajoutez votre premier véhicule pour commencer
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold"
            >
              Ajouter un véhicule
            </button>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-900/60 text-slate-400 text-xs uppercase font-bold">
                <tr>
                  <th className="py-4 px-6">Véhicule</th>
                  <th className="py-4 px-6">Immatriculation</th>
                  <th className="py-4 px-6">Année</th>
                  <th className="py-4 px-6">Couleur</th>
                  <th className="py-4 px-6">Kilométrage</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle._id}
                    className="hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-lg shadow-lg">
                          🚗
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {vehicle.brand} {vehicle.model}
                          </div>
                          <div className="text-slate-400 text-xs font-mono">
                            {vehicle.vin}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono bg-slate-700/50 px-2 py-1 rounded text-white">
                        {vehicle.plate}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{vehicle.year}</td>
                    <td className="py-4 px-6 text-slate-300">
                      {vehicle.color || "-"}
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      {vehicle.mileage
                        ? `${vehicle.mileage.toLocaleString()} km`
                        : "-"}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(vehicle)}
                          className="p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg transition-all"
                          title="Modifier"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          className="p-2 bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-400 hover:text-white rounded-lg transition-all group"
                          title="Supprimer"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL AJOUT/MODIFICATION */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {editingVehicle
                    ? "Modifier le véhicule"
                    : "Ajouter un véhicule"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Marque *
                    </label>
                    <input
                      type="text"
                      {...register("brand", {
                        required: "La marque est obligatoire",
                        minLength: {
                          value: 2,
                          message:
                            "La marque doit contenir au moins 2 caractères",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "La marque ne peut pas dépasser 50 caractères",
                        },
                      })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: Renault"
                    />
                    {errors.brand && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.brand.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Modèle *
                    </label>
                    <input
                      type="text"
                      {...register("model", {
                        required: "Le modèle est obligatoire",
                        minLength: {
                          value: 1,
                          message: "Le modèle est obligatoire",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "Le modèle ne peut pas dépasser 50 caractères",
                        },
                      })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: Clio"
                    />
                    {errors.model && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.model.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Année *
                    </label>
                    <input
                      type="number"
                      {...register("year", {
                        required: "L'année est obligatoire",
                        min: {
                          value: 1900,
                          message: "L'année doit être supérieure à 1900",
                        },
                        max: {
                          value: new Date().getFullYear() + 1,
                          message: "L'année ne peut pas être dans le futur",
                        },
                      })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: 2020"
                    />
                    {errors.year && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.year.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Immatriculation *
                    </label>
                    <input
                      type="text"
                      {...register("plate", {
                        required: "L'immatriculation est obligatoire",
                        pattern: {
                          value: /^[A-Z0-9\s-]+$/i,
                          message: "Format d'immatriculation invalide",
                        },
                        minLength: {
                          value: 4,
                          message:
                            "L'immatriculation doit contenir au moins 4 caractères",
                        },
                        maxLength: {
                          value: 15,
                          message:
                            "L'immatriculation ne peut pas dépasser 15 caractères",
                        },
                      })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Ex: 123 TU 4567"
                    />
                    {errors.plate && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.plate.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      VIN *
                    </label>
                    <input
                      type="text"
                      {...register("vin", {
                        required: "Le VIN est obligatoire",
                        pattern: {
                          value: /^[A-HJ-NPR-Z0-9]{17}$/i,
                          message:
                            "Le VIN doit contenir exactement 17 caractères alphanumériques (sans I, O, Q)",
                        },
                      })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Ex: VF1RFD00123456789"
                    />
                    {errors.vin && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.vin.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Couleur
                    </label>
                    <input
                      type="text"
                      {...register("color", {
                        maxLength: {
                          value: 30,
                          message:
                            "La couleur ne peut pas dépasser 30 caractères",
                        },
                      })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: Blanc"
                    />
                    {errors.color && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.color.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Kilométrage
                    </label>
                    <input
                      type="number"
                      {...register("mileage", {
                        min: {
                          value: 0,
                          message: "Le kilométrage ne peut pas être négatif",
                        },
                        max: {
                          value: 9999999,
                          message: "Kilométrage trop élevé",
                        },
                      })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: 50000"
                    />
                    {errors.mileage && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.mileage.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:from-blue-500 hover:to-cyan-500 transition-all"
                  >
                    {editingVehicle ? "Mettre à jour" : "Ajouter"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-600 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {toasts.map(toast => (
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

export default VehiclesPage;
