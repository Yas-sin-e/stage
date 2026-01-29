import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import api from "../../services/api/axios";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // تحديد الـ Theme بناءً على الرول
  const isAdmin = user?.role === "admin";
  const themeColor = isAdmin ? "purple" : "blue";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
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
      <div className="max-w-4xl mx-auto">
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
              <form
                onSubmit={handleSubmit(onUpdateProfile)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">
                      Nom complet
                    </label>
                    <input
                      {...register("name", { required: true })}
                      className="w-full bg-black/40 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">
                      Téléphone
                    </label>
                    <input
                      {...register("phone", { required: true })}
                      className="w-full bg-black/40 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    className="w-full bg-black/40 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <button
                  disabled={loading}
                  className={`w-full py-4 bg-${themeColor}-600 text-white rounded-xl font-black shadow-lg hover:opacity-90 transition-all`}
                >
                  {loading ? "Sauvegarde..." : "Mettre à jour le profil"}
                </button>
              </form>

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
              <input
                type="password"
                {...regPass("currentPassword", { required: true })}
                placeholder="Mot de passe actuel"
                className="w-full bg-black border border-slate-800 rounded-xl p-4 text-white"
              />
              <input
                type="password"
                {...regPass("newPassword", { required: true, minLength: 6 })}
                placeholder="Nouveau mot de passe"
                className="w-full bg-black border border-slate-800 rounded-xl p-4 text-white"
              />
              <input
                type="password"
                {...regPass("confirmPassword", {
                  validate: (v) =>
                    v === watch("newPassword") || "Non identique",
                })}
                placeholder="Confirmer le nouveau"
                className="w-full bg-black border border-slate-800 rounded-xl p-4 text-white"
              />
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
