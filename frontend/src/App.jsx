import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/auth';

// استيراد المكونات الأساسية
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// استيراد الصفحات العامة
import HomePage from './pages/AppPages/HomePage';
import AboutPage from './pages/AppPages/AboutPage';
import ServicesPage from './pages/AppPages/ServicesPage';
import ContactPage from './pages/AppPages/ContactPage';
import LoginPage from './pages/AppPages/LoginPage';
import RegisterPage from './pages/AppPages/RegisterPage';
import ProfilePage from './pages/AppPages/ProfilePage';

// صفحات العميل
import DashboardPage from './pages/client/DashboardPage';
import MyVehiclePage from './pages/client/MyVehiclePage';
import ReservationsPage from './pages/client/ReservationsPage';

// صفحات المسؤول
import DashboardAdmin from './pages/admin/DashboardAdmin';
import GestionClients from './pages/admin/GestionClients';
import GestionReservations from './pages/admin/GestionReservations';
import GestionDevis from './pages/admin/GestionDevis';
import GestionReparations from './pages/admin/GestionReparations';
import GestionServices from './pages/admin/GestionServices';

// مكون حماية المسارات
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

// مكون المسارات العامة
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  return children;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. الـ Navbar يظهر في كل الصفحات */}
      <Navbar />

      {/* 2. محتوى الصفحات المتغير */}
      <main className="flex-grow">
        <Routes>
          {/* المسارات العامة */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          
          {/* مسارات تسجيل الدخول */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

          {/* مسارات العميل */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/my-vehicles" element={<ProtectedRoute><MyVehiclePage /></ProtectedRoute>} />
          <Route path="/reservations/new" element={<ProtectedRoute><ReservationsPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* مسارات المسؤول (Admin) */}
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><DashboardAdmin /></ProtectedRoute>} />
          <Route path="/admin/clients" element={<ProtectedRoute adminOnly><GestionClients /></ProtectedRoute>} />
          <Route path="/admin/reservations" element={<ProtectedRoute adminOnly><GestionReservations /></ProtectedRoute>} />
          <Route path="/admin/devis" element={<ProtectedRoute adminOnly><GestionDevis /></ProtectedRoute>} />
          <Route path="/admin/reparations" element={<ProtectedRoute adminOnly><GestionReparations /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute adminOnly><GestionServices /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 3. الـ Footer يظهر في أسفل كل الصفحات */}
      <Footer />
    </div>
  );
}

export default App;