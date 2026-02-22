import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUserAction } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registerUserAction({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      if (response.success) {
        toast.success("Compte créé avec succès !");
        navigate("/login");
        reset();
      } else {
        toast.error(response.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      toast.error("Problème de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-2">
              Créer un compte
            </h2>
            <p className="text-slate-400">
              Rejoignez AutoExpert dès aujourd'hui
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Nom complet *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  {...register("name", {
                    required: "Nom obligatoire",
                    minLength: { value: 2, message: "Minimum 2 caractères" },
                  })}
                  placeholder="Entrez votre nom complet"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border ${errors.name ? "border-red-500" : "border-slate-700"} rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all`}
                  disabled={loading}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email obligatoire",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email non valide",
                    },
                  })}
                  placeholder="Entrez votre email"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border ${errors.email ? "border-red-500" : "border-slate-700"} rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all`}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Téléphone *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  {...register("phone", { required: "Téléphone obligatoire" })}
                  placeholder="Entrez votre numéro de téléphone"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border ${errors.phone ? "border-red-500" : "border-slate-700"} rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all`}
                  disabled={loading}
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1.5">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Mot de passe obligatoire",
                    minLength: { value: 6, message: "Minimum 6 caractères" },
                  })}
                  placeholder="Entrez votre mot de passe"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border ${errors.password ? "border-red-500" : "border-slate-700"} rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all`}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Confirmer mot de passe *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirmez le mot de passe",
                    validate: (value) =>
                      value === password ||
                      "Les mots de passe ne correspondent pas",
                  })}
                  placeholder="Confirmez votre mot de passe"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border ${errors.confirmPassword ? "border-red-500" : "border-slate-700"} rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all`}
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1.5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? "Création en cours..." : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-6">
            Déjà inscrit ?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 font-semibold hover:text-blue-300"
            >
              Se connecter
            </button>
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 px-6 py-3 border-2 border-slate-700 text-slate-300 rounded-xl font-semibold hover:bg-slate-700/50 transition-all"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
