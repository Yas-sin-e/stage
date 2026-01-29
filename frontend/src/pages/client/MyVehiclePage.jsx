import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api/axios';

const VehiclesPage = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    plate: '',
    vin: '',
    color: '',
    mileage: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data } = await api.get('/vehicles');
      setVehicles(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        await api.put(`/vehicles/${editingVehicle._id}`, formData);
      } else {
        await api.post('/vehicles', formData);
      }
      fetchVehicles();
      handleCloseModal();
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce véhicule ?')) {
      try {
        await api.delete(`/vehicles/${id}`);
        setVehicles(vehicles.filter(v => v._id !== id));
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      plate: vehicle.plate,
      vin: vehicle.vin,
      color: vehicle.color || '',
      mileage: vehicle.mileage || ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVehicle(null);
    setFormData({
      brand: '',
      model: '',
      year: '',
      plate: '',
      vin: '',
      color: '',
      mileage: ''
    });
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
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Mes Véhicules</h1>
            <p className="text-slate-400">Gérez vos véhicules</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un véhicule
          </button>
        </div>

        {/* LISTE VÉHICULES */}
        {vehicles.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-bold text-white mb-2">Aucun véhicule</h3>
            <p className="text-slate-400 mb-6">Ajoutez votre premier véhicule pour commencer</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold"
            >
              Ajouter un véhicule
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle._id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-3xl shadow-lg">
                    🚗
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{vehicle.brand} {vehicle.model}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="font-semibold">📅 Année:</span>
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="font-semibold">🔢 Immat:</span>
                    <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">{vehicle.plate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="font-semibold">🔑 VIN:</span>
                    <span className="font-mono text-xs">{vehicle.vin}</span>
                  </div>
                  {vehicle.color && (
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className="font-semibold">🎨 Couleur:</span>
                      <span>{vehicle.color}</span>
                    </div>
                  )}
                  {vehicle.mileage && (
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className="font-semibold">📊 Kilométrage:</span>
                      <span>{vehicle.mileage.toLocaleString()} km</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL AJOUT/MODIFICATION */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {editingVehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
                </h2>
                <button onClick={handleCloseModal} className="text-slate-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Marque *</label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: Renault"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Modèle *</label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: Clio"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Année *</label>
                    <input
                      type="number"
                      required
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: 2020"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Immatriculation *</label>
                    <input
                      type="text"
                      required
                      value={formData.plate}
                      onChange={(e) => setFormData({...formData, plate: e.target.value.toUpperCase()})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Ex: 123 TU 4567"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-300 mb-2">VIN *</label>
                    <input
                      type="text"
                      required
                      value={formData.vin}
                      onChange={(e) => setFormData({...formData, vin: e.target.value.toUpperCase()})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Ex: VF1RFD00123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Couleur</label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: Blanc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Kilométrage</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.mileage}
                      onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Ex: 50000"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:from-blue-500 hover:to-cyan-500 transition-all"
                  >
                    {editingVehicle ? 'Mettre à jour' : 'Ajouter'}
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
    </div>
  );
};

export default VehiclesPage;