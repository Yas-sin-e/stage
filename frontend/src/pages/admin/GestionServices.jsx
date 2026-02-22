import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api/axios";

const GestionServices = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      basePrice: "",
      estimatedTime: "",
      category: "Mécanique",
    },
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get("/admin/services");
      setServices(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingService) {
        await api.put(`/admin/services/${editingService._id}`, data);
      } else {
        await api.post("/admin/services", data);
      }
      fetchServices();
      handleCloseModal();
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    reset(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    reset({
      name: "",
      description: "",
      basePrice: "",
      estimatedTime: "",
      category: "Mécanique",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce service ?")) {
      try {
        await api.delete(`/admin/services/${id}`);
        fetchServices();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Mécanique: "from-blue-600 to-cyan-500",
      Électrique: "from-purple-600 to-pink-500",
      Tôlerie: "from-green-600 to-emerald-500",
      Carrosserie: "from-blue-600 to-cyan-500",
      Réparation: "from-purple-600 to-pink-500",
      Entretien: "from-green-600 to-emerald-500",
      Diagnostic: "from-amber-600 to-orange-500",
    };
    return colors[category] || "from-slate-600 to-slate-500";
  };

  if (loading)
    return (
      <div className="text-white p-10 text-center text-lg">Chargement...</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-4 md:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              Gestion des Services
            </h1>
            <p className="text-slate-400 text-lg">
              {services.length} service(s) disponible(s)
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-all shadow-lg text-lg"
          >
            + Ajouter un service
          </button>
        </div>

        {/* Grid View */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getCategoryColor(service.category)}`}
                >
                  {service.category}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                  >
                    🗑
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-slate-400 text-base mb-4 line-clamp-2">
                {service.description}
              </p>
              <div className="flex justify-between pt-4 border-t border-slate-700">
                <span className="text-2xl font-black text-amber-500">
                  {service.basePrice} TND
                </span>
                <span className="text-base text-blue-400 font-bold">
                  ⏱ {service.estimatedTime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh] shadow-2xl">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-800">
                <h2 className="text-2xl font-bold">
                  {editingService ? "Modifier" : "Ajouter"} Service
                </h2>
                <button onClick={handleCloseModal} className="text-2xl">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div>
                  <label className="block text-base font-semibold text-slate-300 mb-2">
                    Nom du service *
                  </label>
                  <input
                    {...register("name", { required: "Nom obligatoire" })}
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl focus:outline-none text-lg ${errors.name ? "border-red-500" : "border-slate-700 focus:border-blue-500"}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-base font-semibold text-slate-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description obligatoire",
                    })}
                    rows="3"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-base font-semibold text-slate-300 mb-2">
                      Prix (TND) *
                    </label>
                    <input
                      type="number"
                      {...register("basePrice", {
                        required: "Prix obligatoire",
                      })}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl focus:outline-none text-lg ${errors.basePrice ? "border-red-500" : "border-slate-700 focus:border-blue-500"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-slate-300 mb-2">
                      Temps *
                    </label>
                    <input
                      {...register("estimatedTime", {
                        required: "Temps obligatoire",
                      })}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl focus:outline-none text-lg ${errors.estimatedTime ? "border-red-500" : "border-slate-700 focus:border-blue-500"}`}
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-slate-300 mb-2">
                      Catégorie *
                    </label>
                    <select
                      {...register("category", {
                        required: "Catégorie obligatoire",
                      })}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl focus:outline-none text-lg ${errors.category ? "border-red-500" : "border-slate-700 focus:border-blue-500"}`}
                    >
                      <option value="Mécanique">Mécanique</option>
                      <option value="Électrique">Électrique</option>
                      <option value="Tôlerie">Tôlerie</option>
                      <option value="Carrosserie">Carrosserie</option>
                      <option value="Réparation">Réparation</option>
                      <option value="Entretien">Entretien</option>
                      <option value="Diagnostic">Diagnostic</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-blue-600 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all"
                  >
                    {editingService ? "Mettre à jour" : "Enregistrer"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-4 bg-slate-700 rounded-xl font-bold text-lg hover:bg-slate-600 transition-all"
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

export default GestionServices;
