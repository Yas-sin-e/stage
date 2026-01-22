// src/pages/client/MyVehiclesPage.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyVehiclesPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      brand: 'Renault',
      model: 'Clio',
      year: 2020,
      plate: '123 TU 4567',
      color: 'Gris',
      lastService: '15 Jan 2024',
      nextService: '15 Avr 2024'
    },
    {
      id: 2,
      brand: 'Peugeot',
      model: '208',
      year: 2019,
      plate: '456 TU 7890',
      color: 'Blanc',
      lastService: '10 Déc 2023',
      nextService: '10 Mar 2024'
    }
  ]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const newVehicle = {
      id: Date.now(),
      ...data,
      lastService: 'Aucun',
      nextService: 'À planifier'
    };
    setVehicles([...vehicles, newVehicle]);
    toast.success('Véhicule ajouté avec succès !');
    reset();
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast.success('Véhicule supprimé');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour au Dashboard
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              Mes Véhicules
            </h1>
            <p className="text-slate-400">Gérez votre parc automobile</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
            Ajouter un véhicule
          </button>
        </div>

        {/* Vehicles Grid */}
        {vehicles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-white mb-2">Aucun véhicule</h3>
            <p className="text-slate-400 mb-6">Ajoutez votre premier véhicule pour commencer</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Ajouter un véhicule
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div 
                key={vehicle.id}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all hover:scale-[1.02]"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-lg">
                    🚗
                  </div>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <h3 className="text-2xl font-bold text-white mb-1">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{vehicle.year}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Immatriculation</span>
                    <span className="text-white font-semibold">{vehicle.plate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Couleur</span>
                    <span className="text-white font-semibold">{vehicle.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dernier service</span>
                    <span className="text-white font-semibold">{vehicle.lastService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Prochain service</span>
                    <span className="text-blue-400 font-semibold">{vehicle.nextService}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-700 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg font-semibold transition-all text-sm">
                    Historique
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 rounded-lg font-semibold transition-all text-sm">
                    RDV
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Ajouter Véhicule */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white">Ajouter un véhicule</h3>
              <button 
                onClick={() => {
                  setShowModal(false);
                  reset();
                }}
                className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid md:grid-cols-2 gap-5">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Marque <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('brand', { required: 'Marque obligatoire' })}
                    placeholder="Renault, Peugeot..."
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.brand ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                  {errors.brand && <p className="text-red-400 text-sm mt-1">{errors.brand.message}</p>}
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Modèle <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('model', { required: 'Modèle obligatoire' })}
                    placeholder="Clio, 208..."
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.model ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                  {errors.model && <p className="text-red-400 text-sm mt-1">{errors.model.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Year */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Année <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    {...register('year', { 
                      required: 'Année obligatoire',
                      min: { value: 1900, message: 'Année invalide' },
                      max: { value: new Date().getFullYear() + 1, message: 'Année invalide' }
                    })}
                    placeholder="2020"
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.year ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                  {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>}
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Couleur <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('color', { required: 'Couleur obligatoire' })}
                    placeholder="Blanc, Noir..."
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.color ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                  {errors.color && <p className="text-red-400 text-sm mt-1">{errors.color.message}</p>}
                </div>
              </div>

              {/* Plate */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Immatriculation <span className="text-red-400">*</span>
                </label>
                <input
                  {...register('plate', { required: 'Immatriculation obligatoire' })}
                  placeholder="123 TU 4567"
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${
                    errors.plate ? 'border-red-500' : 'border-slate-700'
                  } rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                />
                {errors.plate && <p className="text-red-400 text-sm mt-1">{errors.plate.message}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                  className="flex-1 px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all hover:scale-105"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVehiclesPage;