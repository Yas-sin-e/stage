import { useState, useEffect } from "react";
import api from "../../services/api/axios";

const GestionClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);
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

                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* زر التفعيل/الحظر */}
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

                        {/* زر الحذف */}
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
      </div>
    </div>
  );
};

export default GestionClients;
