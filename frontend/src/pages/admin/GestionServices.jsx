import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // استيراد المكتبة
import api from "../../services/api/axios";

const GestionServices = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Services de démonstration depuis ServicesPage
  const demoServices = [
    {
      name: "Tôlerie",
      description:
        "Réparation complète de carrosserie, débosselage et peinture automobile professionnelle",
      basePrice: 200,
      estimatedTime: "2-3 jours",
      category: "Tôlerie",
    },
    {
      name: "Mécanique",
      description:
        "Entretien moteur, révision complète et diagnostic électronique de précision",
      basePrice: 70,
      estimatedTime: "1-2 jours",
      category: "Mécanique",
    },
    {
      name: "Électricité",
      description:
        "Système électrique, climatisation et diagnostic électronique automobile",
      basePrice: 30,
      estimatedTime: "30 min - 2h",
      category: "Électrique",
    },
  ];

  // إعداد useForm
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

  // دالة الإرسال باستخدام react-hook-form
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
    // تعبئة الحقول يدوياً عند التعديل
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
      category: "Entretien",
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

  const seedDemoServices = async () => {
    if (window.confirm("Ajouter les services de démonstration ?")) {
      try {
        for (const service of demoServices) {
          await api.post("/admin/services", service);
        }
        fetchServices();
        alert("Services de démonstration ajoutés avec succès !");
      } catch (error) {
        alert("Erreur lors de l'ajout des services de démonstration");
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Mécanique: "from-blue-600 to-cyan-500",
      Électrique: "from-purple-600 to-pink-500",
      Tôlerie: "from-green-600 to-emerald-500",
    };
    return colors[category] || "from-slate-600 to-slate-500";
  };

  if (loading)
    return <div className="text-white p-10 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2">Gestion des Services</h1>
            <p className="text-slate-400">
              {services.length} service(s) disponible(s)
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={seedDemoServices}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
            >
              📋 Ajouter Services Démo
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
            >
              + Ajouter un service
            </button>
          </div>
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
                  className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(service.category)}`}
                >
                  {service.category}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 bg-blue-600/20 text-blue-400 rounded-lg"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 bg-red-600/20 text-red-400 rounded-lg"
                  >
                    🗑
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>
              <div className="flex justify-between pt-4 border-t border-slate-700">
                <span className="text-xl font-black text-amber-500">
                  {service.basePrice} TND
                </span>
                <span className="text-sm text-blue-400 font-bold">
                  ⏱ {service.estimatedTime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-700 flex justify-between">
                <h2 className="text-2xl font-bold">
                  {editingService ? "Modifier" : "Ajouter"} Service
                </h2>
                <button onClick={handleCloseModal}>✕</button>
              </div>

              {/* استخدام handleSubmit من react-hook-form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Nom du service *
                  </label>
                  <input
                    {...register("name", { required: "Nom obligatoire" })}
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl focus:outline-none ${errors.name ? "border-red-500" : "border-slate-700 focus:border-blue-500"}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description obligatoire",
                    })}
                    rows="3"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Prix (TND) *
                    </label>
                    <input
                      type="number"
                      {...register("basePrice", {
                        required: "Prix obligatoire",
                      })}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl focus:outline-none ${errors.basePrice ? "border-red-500" : "border-slate-700 focus:border-blue-500"}`}
                    />
                    {errors.basePrice && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.basePrice.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Temps *
                    </label>
                    <input
                      {...register("estimatedTime", {
                        required: "Temps obligatoire",
                      })}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl focus:outline-none ${errors.estimatedTime ? "border-red-500" : "border-slate-700 focus:border-blue-500"}`}
                    />
                    {errors.estimatedTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.estimatedTime.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Catégorie *
                    </label>
                    <select
                      {...register("category", {
                        required: "Catégorie obligatoire",
                      })}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl focus:outline-none ${errors.category ? "border-red-500" : "border-slate-700 focus:border-blue-500"}`}
                    >
                      <option value="Mécanique">Mécanique</option>
                      <option value="Électrique">Électrique</option>
                      <option value="Tôlerie">Tôlerie</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 rounded-xl font-bold"
                  >
                    {editingService ? "Mettre à jour" : "Enregistrer"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 bg-slate-700 rounded-xl font-bold"
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
