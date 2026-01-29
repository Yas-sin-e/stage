import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import api, { authService } from "../../services/api/axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ هذا هو المفتاح
  const isAuthenticated = !!user;

  // ===============================
  // Vérifier si l'utilisateur est déjà connecté
  // ===============================
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      setUser(data); // data = user
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Login
  // ===============================
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      // data = { user, token }

      setUser(data.user);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  // ===============================
  // Register
  // ===============================
  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Erreur d'inscription",
      };
    }
  };

  // ===============================
  // Logout
  // ===============================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,// ✅ condition ajoutée
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
