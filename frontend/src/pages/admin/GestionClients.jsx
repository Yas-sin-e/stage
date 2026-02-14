import { useState, useEffect } from "react";
import api from "../../services/api/axios";

const GestionClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // الحالة الخاصة بالنافذة المنبثقة والعميل المختار
  const [selectedClient, setSelectedClient] = useState(null);
  const [showVehiclesModal, setShowVehiclesModal] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data } = await api.get("/admin/clients");
      setClients(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (client) => {
    try {
      await api.put(`/admin/clients/${client._id}`, {
        isActive: !client.isActive,
      });
      setClients(
        clients.map((c) =>
          c._id === client._id ? { ...c, isActive: !c.isActive } : c,
        ),
      );
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Supprimer ce client ? (Tous ses véhicules et réservations seront également supprimés)",
      )
    ) {
      try {
        await api.delete(`/admin/clients/${id}`);
        setClients(clients.filter((c) => c._id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  // دالة لفتح نافذة السيارات
  const handleOpenVehicles = (client) => {
    setSelectedClient(client);
    setShowVehiclesModal(true);
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
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Gestion des Clients
          </h1>
          <p className="text-slate-400">
            {clients.length} client(s) enregistré(s)
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Nom
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Téléphone
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase">
                    Inscrit le
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
                {clients.map((client) => (
                  <tr
                    key={client._id}
                    className="hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-bold text-white">
                        {client.name}
                      </span>
                      <div className="text-xs text-slate-400 mt-1">
                        Véhicules: {client.vehicles?.length || 0}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{client.email}</td>
                    <td className="py-4 px-6 text-slate-300">{client.phone}</td>
                    <td className="py-4 px-6 text-slate-400 text-sm">
                      {new Date(client.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          client.isActive
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {client.isActive ? "Actif" : "Inactif"}
                      </span>
                    </td>

                    <td
                      className="py-4 px-6 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleStatus(client)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            client.isActive
                              ? "bg-amber-600/20 text-amber-400 border-amber-500/30 hover:bg-amber-600/30"
                              : "bg-green-600/20 text-green-400 border-green-500/30 hover:bg-green-600/30"
                          }`}
                        >
                          {client.isActive ? "Bannir" : "Activer"}
                        </button>

                        <button
                          onClick={() => handleDelete(client._id)}
                          className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-semibold transition-all"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal لبيانات السيارات - يستخدم نفس ستايل Modal الخدمات الخاص بك */}
        {showVehiclesModal && selectedClient && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  Véhicules de {selectedClient.name}
                </h2>
                <button
                  onClick={() => setShowVehiclesModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                {selectedClient.vehicles &&
                selectedClient.vehicles.length > 0 ? (
                  <div className="overflow-hidden rounded-xl border border-slate-700">
                    <table className="w-full text-left">
                      <thead className="bg-slate-900/50">
                        <tr>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase">
                            Marque / Modèle
                          </th>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase">
                            Matricule
                          </th>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase text-center">
                            Année
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {selectedClient.vehicles.map((v, index) => (
                          <tr
                            key={index}
                            className="bg-slate-800/30 hover:bg-slate-700/20"
                          >
                            <td className="p-4 font-bold text-white">
                              {v.brand} {v.model}
                            </td>
                            <td className="p-4">
                              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700 text-blue-400 font-mono text-sm">
                                {v.licensePlate}
                              </span>
                            </td>
                            <td className="p-4 text-center text-slate-400">
                              {v.year || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-500 italic text-lg">
                      Aucun véhicule enregistré pour ce client.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-slate-700 flex justify-end">
                <button
                  onClick={() => setShowVehiclesModal(false)}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all text-white"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionClients;
