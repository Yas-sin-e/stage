import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Import pages
import ContactPage from "./pages/AppPages/ContactPage";
import HomePage from "./pages/AppPages/HomePage";
import LoginPage from "./pages/AppPages/LoginPage";
import RegisterPage from "./pages/AppPages/RegisterPage";
import AboutPage from "./pages/AppPages/AboutPage";
import ServicesPage from "./pages/AppPages/ServicesPage";
// page de client :
import DashboardPage from "./pages/client/DashboardPage";
// import MyVehiclesPage from "./pages/client/MyVehiclePage";
// import ReservationsPage from "./pages/client/ReservationPage";
// import NewReservationPage from "./pages/client/NewReservationPage";
// import DevisPage from "./pages/client/DevisPage";
// import ProfilePage from "./pages/client/ProfilePage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />}/>
          {/* CLIENT */}
          {/* <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<MyVehiclesPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/new-reservations" element={<NewReservationPage />} />
          <Route path="/devis" element={<DevisPage />} />
          <Route path="/profile" element={<ProfilePage />} /> */}

          {/* TODO Admin plus tard */}
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}

          {/* 404 simple */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
