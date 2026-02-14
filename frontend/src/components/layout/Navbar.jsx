import { useState } from "react";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Déconnexion",
      text: "Voulez-vous vraiment nous quitter ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, déconnexion",
      cancelButtonText: "Annuler",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await logout();
        navigate("/");
        setMobileMenuOpen(false);
        toast.success("Déconnecté avec succès");
      } catch (error) {
        console.error("Erreur lors de la déconnexion", error);
      }
    }
  };

  const mainMenuItems = [
    { title: "Accueil", path: "/" },
    { title: "Services", path: "/services" },
    { title: "À propos", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const clientSubmenuItems = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Mes Véhicules", path: "/my-vehicles" },
    { title: "Mes Devis", path: "/devis" },
    { title: " New Réservations", path: "/reservations/new" },
    { title: " Chat IA", path: "/chat-ai" },
  ];

  const adminMenuItems = [
    
    { title: "👥 Gestion Clients", path: "/admin/clients" },
    { title: "📅 Réservations", path: "/admin/reservations" },
    { title: "🛠️ Services", path: "/admin/services" },
    { title: "📑 Devis", path: "/admin/devis" },
    { title: "🔧 Réparations", path: "/admin/reparations" },
  ];

  const currentMenu =
    user?.role === "admin" ? adminMenuItems : clientSubmenuItems;

  if (isLoading) {
    return (
      <nav className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-slate-400 font-medium">Chargement...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg border-b border-slate-800">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-20">
          {/* LOGO - À GAUCHE */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                {isAuthenticated && (
                  <div
                    className={`absolute -top-1 -right-1 w-4 h-4 ${user?.role === "admin" ? "bg-purple-500" : "bg-green-500"} rounded-full border-2 border-slate-900 animate-pulse`}
                  ></div>
                )}
              </div>

              <div className="hidden md:block">
                <div className="text-xl font-black tracking-tight">
                  Auto
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Expert
                  </span>
                </div>
                <div className="text-xs text-slate-500 -mt-1 font-medium">
                  {isAuthenticated
                    ? user?.role === "admin"
                      ? "⚡ Admin Panel"
                      : "🤖 IA Assistant"
                    : "Performance Intelligente"}
                </div>
              </div>
            </Link>
          </div>

          {/* MENU DESKTOP - AU CENTRE */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center gap-2 list-none m-0 p-0">
              {mainMenuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="relative block px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-800/50 group"
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-3/4 transition-all duration-300"></span>
                  </Link>
                </li>
              ))}

              {isAuthenticated && (
                <>
                  <li className="h-6 w-px bg-slate-700 mx-2"></li>

                  <li className="relative">
                    <button
                      onMouseEnter={() => setShowClientDropdown(true)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-800/50"
                    >
                      Mon Espace
                      <svg
                        className={`w-4 h-4 transition-transform ${showClientDropdown ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {showClientDropdown && (
                      <ul
                        className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 list-none z-50"
                        onMouseEnter={() => setShowClientDropdown(true)}
                        onMouseLeave={() => setShowClientDropdown(false)}
                      >
                        {currentMenu.map((subItem, j) => (
                          <li key={j}>
                            <Link
                              to={subItem.path}
                              onClick={() => setShowClientDropdown(false)}
                              className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>

                  {user?.role === "admin" && (
                    <>
                      <li className="h-6 w-px bg-slate-700 mx-2"></li>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="relative block px-4 py-2 text-sm font-semibold text-purple-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-purple-800/20 group"
                        >
                          ⚡ Dashboard Admin
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300"></span>
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* USER ACTIONS - À DROITE */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User Info (desktop only) */}
                <div className="hidden xl:flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${user?.role === "admin" ? "from-purple-500 to-pink-500" : "from-blue-500 to-purple-500"} flex items-center justify-center font-bold text-sm`}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">
                      {user?.role === "admin" ? "Administrateur" : "Client"}
                    </div>
                    <div
                      className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${user?.role === "admin" ? "from-purple-400 to-pink-400" : "from-blue-400 to-purple-400"}`}
                    >
                      {user?.name}
                    </div>
                  </div>
                </div>

                {/* Profile Button (Client only) */}
                {user?.role === "client" && (
                  <Link
                    to="/profile"
                    className="hidden lg:block p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
                    title="Mon profil"
                  >
                    <svg
                      className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors"
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
                  </Link>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-red-600/10 hover:bg-red-600 border border-red-600/50 hover:border-red-600 text-red-400 hover:text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden xl:inline">Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={() => navigate("/login")}
                  className="hidden lg:block px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-300 border border-transparent hover:border-slate-700"
                >
                  Connexion
                </button>

                {/* Register Button */}
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  S'inscrire
                </button>
              </>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors ml-2"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 animate-slide-down">
            {/* Menu principal mobile */}
            <ul className="space-y-1 mb-4 list-none">
              <li className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Navigation
              </li>
              {mainMenuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sous-menu CLIENT mobile */}
            {isAuthenticated && user?.role === "client" && (
              <ul className="space-y-1 mb-4 pt-4 border-t border-slate-800 list-none">
                <li className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Mon Espace
                </li>
                {clientSubmenuItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Lien ADMIN mobile */}
            {isAuthenticated && user?.role === "admin" && (
              <ul className="space-y-1 mb-4 pt-4 border-t border-slate-800 list-none">
                <li className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Administration
                </li>
                {adminMenuItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-purple-300 hover:text-white hover:bg-purple-800/20 rounded-lg transition-all duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* User Actions Mobile */}
            <div className="pt-4 border-t border-slate-800">
              {isAuthenticated ? (
                <div className="space-y-3">
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-lg">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${user?.role === "admin" ? "from-purple-500 to-pink-500" : "from-blue-500 to-purple-500"} flex items-center justify-center font-bold`}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">
                        {user?.role === "admin" ? "Administrateur" : "Client"}
                      </div>
                      <div
                        className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${user?.role === "admin" ? "from-purple-400 to-pink-400" : "from-blue-400 to-purple-400"}`}
                      >
                        {user?.name}
                      </div>
                    </div>
                  </div>

                  {/* Profile Link (Client only) */}
                  {user?.role === "client" && (
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all font-semibold"
                    >
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Mon profil
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-semibold"
                  >
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Login Button Mobile */}
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all font-semibold"
                  >
                    Connexion
                  </button>

                  {/* Register Button Mobile */}
                  <button
                    onClick={() => {
                      navigate("/register");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all font-semibold"
                  >
                    S'inscrire gratuitement
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gradient Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </nav>
  );
};

export default Navbar;
