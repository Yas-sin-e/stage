import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
        setLoading(false);
        return;
      }

      await authService.register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      });

      toast.success("Compte créé avec succès !");
      reset();
      

    } catch (err) {
      toast.error(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* <Toaster position="top-center" /> */}
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-2">Créer un compte</h2>
            <p className="text-slate-400">Rejoignez AutoExpert dès aujourd'hui</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Nom complet <span className="text-red-400">*</span>
              </label>
              <input
                {...register('name', { 
                  required: 'Nom obligatoire',
                  minLength: { value: 2, message: 'Minimum 2 caractères' }
                })}
                placeholder="John Doe"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                  errors.name ? 'border-red-500' : 'border-slate-700'
                } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 transition-all`}
                disabled={loading}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1.5">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email obligatoire',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email non valide'
                  }
                })}
                placeholder="john@example.com"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                  errors.email ? 'border-red-500' : 'border-slate-700'
                } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 transition-all`}
                disabled={loading}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Téléphone <span className="text-red-400">*</span>
              </label>
              <input
                {...register('phone', { 
                  required: 'Téléphone obligatoire',
                  pattern: {
                    value: /^[0-9+\s()-]+$/,
                    message: 'Numéro invalide'
                  }
                })}
                placeholder="+216 12 345 678"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                  errors.phone ? 'border-red-500' : 'border-slate-700'
                } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 transition-all`}
                disabled={loading}
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1.5">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Mot de passe <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                {...register('password', { 
                  required: 'Mot de passe obligatoire', 
                  minLength: { value: 6, message: 'Minimum 6 caractères' } 
                })}
                placeholder="••••••••"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                  errors.password ? 'border-red-500' : 'border-slate-700'
                } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 transition-all`}
                disabled={loading}
              />
              {errors.password && <p className="text-red-400 text-sm mt-1.5">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Confirmer mot de passe <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                {...register('confirmPassword', { 
                  required: 'Confirmez le mot de passe',
                  validate: value => value === password || 'Les mots de passe ne correspondent pas'
                })}
                placeholder="••••••••"
                className={`w-full px-4 py-3.5 bg-slate-900/50 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-slate-700'
                } rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-500 transition-all`}
                disabled={loading}
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1.5">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-400 mt-6">
            Déjà inscrit ?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              Se connecter
            </button>
          </p>

          {/* Back to Home */}
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 px-6 py-3 border-2 border-slate-700 hover:bg-slate-700/50 text-slate-300 rounded-xl font-semibold transition-all duration-300"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;