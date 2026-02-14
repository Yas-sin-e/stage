import { useState, useEffect } from "react";
import api from "../../services/api/axios";

const GestionVehicules = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    // Filter vehicles based on search term (client name)
    if (searchTerm.trim() === "") {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter((vehicle) =>
        vehicle.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredVehicles(filtered);
    }
  }, [vehicles, searchTerm]);

  const fetchVehicles = async () => {
    try {
      const { data } = await api.get("/admin/vehicles");
      setVehicles(data);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vehicleId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      try {
        await api.delete(`/admin/vehicles/${vehicleId}`);
        setVehicles(vehicles.filter((v) => v._id !== vehicleId));
        alert("Véhicule supprimé avec succès");
      } catch (error) {
        alert("Erreur lors de la suppression du véhicule");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">
            Chargement des véhicules...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">Gestion des Véhicules</h1>
          <p className="text-slate-400">
            {vehicles.length} véhicules enregistrés
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par nom de client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-3 text-slate-400">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-900/60 text-slate-400 text-xs uppercase font-bold">
              <tr>
                <th className="py-4 px-6">Propriétaire</th>
                <th className="py-4 px-6">Marque & Modèle</th>
                <th className="py-4 px-6">Plaque</th>
                <th className="py-4 px-6">Année</th>
                <th className="py-4 px-6">Couleur</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle._id}
                  className="hover:bg-slate-700/20 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-bold">{vehicle.userId?.name}</div>
                    <div className="text-xs text-slate-500">
                      {vehicle.userId?.email}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold">{vehicle.brand}</div>
                    <div className="text-xs text-slate-500">
                      {vehicle.model}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-amber-500">
                    {vehicle.plate}
                  </td>
                  <td className="py-4 px-6">{vehicle.year}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-slate-600"
                        style={{ backgroundColor: vehicle.color }}
                      ></div>
                      <span>{vehicle.color}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg text-xs font-semibold transition-all"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionVehicules;
