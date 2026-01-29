import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // استدعاء دالة login الحقيقية التي تتصل بـ MongoDB
      await login(data.email, data.password);
      
      toast.success('Connexion réussie !');
      reset();
      // التوجيه يتم عادة داخل دالة login في الـ context، 
      // ولكن للتأكيد يمكنك تركه هنا أيضاً: navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-blue-500/10">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-2">Connexion</h2>
            <p className="text-slate-400">Accédez à votre espace AutoExpert</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Adresse email *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all`}
                  {...register('email', { 
                    required: 'Email obligatoire',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email non valide' }
                  })}
                  disabled={loading}
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Mot de passe *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3.5 bg-slate-900/50 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all`}
                  {...register('password', { required: 'Mot de passe obligatoire' })}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1.5">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-700"></div>
            <span className="px-4 text-sm text-slate-500">OU</span>
            <div className="flex-1 border-t border-slate-700"></div>
          </div>

          <p className="text-center text-slate-400 mb-4">
            Pas encore de compte ?{' '}
            <button onClick={() => navigate('/register')} className="text-blue-400 font-semibold hover:text-blue-300">
              Créer un compte
            </button>
          </p>

          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 border-2 border-slate-700 text-slate-300 rounded-xl font-semibold hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;