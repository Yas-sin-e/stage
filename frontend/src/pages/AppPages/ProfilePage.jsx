import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import api from "../../services/api/axios";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // تحديد الـ Theme بناءً على الرول
  const isAdmin = user?.role === "admin";
  const themeColor = isAdmin ? "purple" : "blue";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const {
    register: regPass,
    handleSubmit: handlePass,
    watch,
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
    }
  }, [user, setValue]);

  const onUpdateProfile = async (data) => {
    setLoading(true);
    try {
      const res = await api.put("/auth/profile", data);
      localStorage.setItem("user", JSON.stringify({ ...user, ...res.data }));
      alert("Profil mis à jour avec succès ! ✨");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header الديناميكي */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">
              Mon <span className={`text-${themeColor}-500`}>Profil</span>
            </h1>
            <p className="text-slate-500 text-sm">
              Informations de compte {isAdmin ? "Administrateur" : "Client"}
            </p>
          </div>
          <div
            className={`px-4 py-1 rounded-full border border-${themeColor}-500/30 bg-${themeColor}-500/10 text-${themeColor}-400 text-xs font-bold uppercase`}
          >
            {isAdmin ? "👑 High Access" : "👤 Standard"}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div
              className={`bg-slate-900/50 border border-slate-800 rounded-3xl p-6 text-center`}
            >
              <div
                className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-${themeColor}-600 to-slate-800 flex items-center justify-center text-3xl text-white font-black mb-4 shadow-lg`}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-white font-bold">{user?.name}</h3>
              <p className="text-slate-500 text-xs mb-6">{user?.email}</p>
              <button
                onClick={logout}
                className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
              >
                Déconnexion
              </button>
            </div>
          </div>

          {/* Formulaire */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-8">
              {!isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-400 ml-1 tracking-wider">
                        Nom complet
                      </label>
                      <div className="w-full bg-slate-800/60 border border-slate-600 rounded-xl p-4 text-white">
                        {user?.name}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-400 ml-1 tracking-wider">
                        Téléphone
                      </label>
                      <div className="w-full bg-slate-800/60 border border-slate-600 rounded-xl p-4 text-white">
                        {user?.phone}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-slate-400 ml-1 tracking-wider">
                      Email
                    </label>
                    <div className="w-full bg-slate-800/60 border border-slate-600 rounded-xl p-4 text-white">
                      {user?.email}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`w-full py-4 bg-${themeColor}-600 text-white rounded-xl font-black shadow-lg hover:opacity-90 transition-all`}
                  >
                    ✎ Modifier le profil
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onUpdateProfile)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-400 ml-1 tracking-wider">
                        Nom complet
                      </label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full bg-slate-800/60 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-400 ml-1 tracking-wider">
                        Téléphone
                      </label>
                      <input
                        {...register("phone", {
                          required: "Téléphone obligatoire",
                          pattern: {
                            value: /^\d{8}$/,
                            message:
                              "Le numéro doit contenir exactement 8 chiffres",
                          },
                        })}
                        className={`w-full bg-slate-800/60 border rounded-xl p-4 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base ${errors.phone ? "border-red-500" : "border-slate-600 focus:border-blue-400"}`}
                        placeholder="Votre numéro de téléphone"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-slate-400 ml-1 tracking-wider">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email requis",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email invalide",
                        },
                        validate: async (value) => {
                          if (value === user?.email) return true; // Same email, no check needed
                          try {
                            const response = await api.post(
                              "/auth/check-email",
                              {
                                email: value,
                              },
                            );
                            return (
                              response.data.available ||
                              "Cet email est déjà utilisé"
                            );
                          } catch (error) {
                            return "Erreur de vérification email";
                          }
                        },
                      })}
                      className={`w-full bg-slate-800/60 border rounded-xl p-4 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base ${errors.email ? "border-red-500" : "border-slate-600 focus:border-blue-400"}`}
                      placeholder="votre.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 py-4 bg-${themeColor}-600 text-white rounded-xl font-black shadow-lg hover:opacity-90 transition-all`}
                    >
                      {loading ? "Sauvegarde..." : "Enregistrer"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        if (user) {
                          setValue("name", user.name);
                          setValue("email", user.email);
                          setValue("phone", user.phone);
                        }
                      }}
                      className="flex-1 py-4 bg-slate-700 text-white rounded-xl font-black hover:bg-slate-600 transition-all"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}

              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full mt-4 py-3 border border-slate-700 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
              >
                🔒 Modifier le mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Password - استعمل نفس المنطق مع useForm */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-8">
            <h2 className="text-xl font-black text-white mb-6 uppercase">
              Sécurité <span className={`text-${themeColor}-500`}>Account</span>
            </h2>
            <form
              onSubmit={handlePass(async (data) => {
                try {
                  await api.put("/auth/change-password", data);
                  alert("Mot de passe changé !");
                  setShowPasswordModal(false);
                  reset();
                } catch (err) {
                  alert(err.response?.data?.message);
                }
              })}
              className="space-y-4"
            >
              <div className="space-y-1">
                <input
                  type="password"
                  {...regPass("currentPassword", {
                    required: "Mot de passe actuel requis",
                  })}
                  placeholder="Mot de passe actuel"
                  className="w-full bg-black border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 transition-all"
                />
                {errors.currentPassword && (
                  <p className="text-red-400 text-xs">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="password"
                  {...regPass("newPassword", {
                    required: "Mot de passe requis",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 caractères",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message:
                        "Doit contenir majuscule, minuscule, chiffre et caractère spécial",
                    },
                  })}
                  placeholder="Nouveau mot de passe"
                  className="w-full bg-black border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 transition-all"
                />
                {errors.newPassword && (
                  <p className="text-red-400 text-xs">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="password"
                  {...regPass("confirmPassword", {
                    required: "Confirmation requise",
                    validate: (v) =>
                      v === watch("newPassword") ||
                      "Les mots de passe ne correspondent pas",
                  })}
                  placeholder="Confirmer le nouveau"
                  className="w-full bg-black border border-slate-800 rounded-xl p-4 text-white focus:border-blue-500 transition-all"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className={`flex-1 py-4 bg-${themeColor}-600 text-white rounded-xl font-bold`}
                >
                  Confirmer
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-6 py-4 bg-slate-800 text-white rounded-xl"
                >
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
