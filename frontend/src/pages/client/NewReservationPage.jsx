// src/pages/client/NewReservationPage.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";
const NewReservationPage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleIdFromState = location.state?.vehicleId;

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      vehicleId: vehicleIdFromState || ''
    }
  });

  // Mock vehicles
  const vehicles = [
    { id: 1, name: 'Renault Clio (123 TU 4567)' },
    { id: 2, name: 'Peugeot 208 (456 TU 7890)' }
  ];

  const services = [
    { id: 'vidange', name: 'Vidange complète', duration: '1h' },
    { id: 'freins', name: 'Réparation freins', duration: '2h' },
    { id: 'revision', name: 'Révision complète', duration: '3h' },
    { id: 'diagnostic', name: 'Diagnostic électronique', duration: '1h' },
    { id: 'climatisation', name: 'Climatisation', duration: '2h' }
  ];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => {
    console.log('Réservation créée:', data);
    toast.success('Rendez-vous créé avec succès !');
    navigate('/dashboard');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black py-8 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux réservations
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-20 h-1 ${step > s ? 'bg-blue-600' : 'bg-slate-700'}`}></div>}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Step 1: Véhicule + Service */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Choisir le véhicule et le service</h2>
                
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Véhicule <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('vehicleId', { required: 'Sélectionnez un véhicule' })}
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.vehicleId ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl text-white`}
                  >
                    <option value="">Sélectionnez un véhicule</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                  {errors.vehicleId && <p className="text-red-400 text-sm mt-1">{errors.vehicleId.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Service <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('service', { required: 'Sélectionnez un service' })}
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.service ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl text-white`}
                  >
                    <option value="">Sélectionnez un service</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (Durée: {s.duration})</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service.message}</p>}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-all"
                >
                  Suivant
                </button>
              </div>
            )}

            {/* Step 2: Date + Heure */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Choisir la date et l'heure</h2>
                
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    {...register('date', { required: 'Date obligatoire' })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.date ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl text-white`}
                  />
                  {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Heure <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('time', { required: 'Heure obligatoire' })}
                    className={`w-full px-4 py-3 bg-slate-900/50 border ${
                      errors.time ? 'border-red-500' : 'border-slate-700'
                    } rounded-xl text-white`}
                  >
                    <option value="">Sélectionnez une heure</option>
                    {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold"
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Confirmer la réservation</h2>
                
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Commentaires (optionnel)
                  </label>
                  <textarea
                    {...register('comments')}
                    rows={4}
                    placeholder="Décrivez le problème ou ajoutez des précisions..."
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold"
                  >
                    Précédent
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Confirmer le RDV
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewReservationPage;