# AutoExpert Frontend - Guide Débutant Complet 🚀

## Aperçu Général Frontend
**AutoExpert** est une app React pour clients/admins garage.
- **Langages**: JavaScript (ES6+), JSX
- **Framework**: React v19.2.0 + React Router v7.13.0
- **Build**: Vite v7.2.4 (ultra-rapide)
- **CSS**: TailwindCSS v3.4.19 + PostCSS/Autoprefixer
- **State**: Context API (auth custom)
- **Forms**: react-hook-form v7.71.1
- **UI**: react-hot-toast, react-icons, recharts, sweetalert2
- **API**: Axios v1.13.3
- **Dépendances clés** (package.json):
```
react: UI components
react-router-dom: Routage
tailwindcss: Styles utilitaires
react-hook-form: Forms validation
react-hot-toast: Notifications
axios: HTTP backend
```
- **Fonctionnalités**: Home/Services, Auth (login/reg/profil/reset), Client (dashboard/vehicles/reserv/devis/chat-ai), Admin (gestion CRUD).

**Lancer**:
```
cd frontend
npm install
npm run dev  # http://localhost:5173
```

**Structure**:
```
frontend/
├── src/
│   ├── main.jsx ← Entry point
│   ├── App.jsx ← Routes + Guards
│   ├── context/auth/ (Provider, Context, hooks)
│   ├── components/layout/ (Navbar, Footer, ChatFloat)
│   ├── components/homeSection/ (Hero, Services)
│   ├── pages/AppPages/ (Home, Login, etc.)
│   ├── pages/client/ (Dashboard, Vehicles...)
│   ├── pages/admin/ (Gestion...)
│   ├── hooks/ (useToast, useConfirm)
│   └── services/api/axios.js
├── vite.config.js, tailwind.config.js
└── package.json
```

## 1. src/main.jsx - تحميل التطبيق (Bootstrap)

**بالعربية**: هاد الملف كيبدأ الـ React App ديالك. كيجيب الـ Router والـ Auth والـ Toasts.

**Français**: Ce fichier lance l'app React. Router + Auth + Toasts.

```jsx
import { StrictMode } from 'react'; // Dev checks
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Routage
import { Toaster } from 'react-hot-toast'; // Notifications
import App from './App.jsx';
import { AuthProvider } from './context/auth'; // Auth global
import ScrollToTop from './components/layout/ScrollToTop';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>  {/* Wrap tout pour useAuth() */}
        <ScrollToTop />
        <Toaster position='top-center' ... />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
```
**بالعربية - الهدف**: تحميل React + التنقل + Auth + إشعارات. **الوظيفة**: بداية التطبيق، scroll أوتو.

**Français - But**: Monte React + Router + Auth + Toasts. **Fonction**: App boot, auto-scroll routes.


## 2. src/App.jsx - التنقل + الحراسة (سطر بسطر)

**بالعربية**: هنا كنشوفو كيفاش نتحكمو فالصفحات حسب الرول (عميل/أدمن).

**Français**: Routage avec guards par rôle (client/admin).

```jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/auth'; // Hook global

// Guards personnalisés
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to='/login' />;
  if (adminOnly && user.role !== 'admin') return <Navigate to='/dashboard' />;
  return children;
};

const PublicRoute = ({ children, blockAdmin = false }) => {
  const { user } = useAuth();
  if (user?.role === 'admin' && blockAdmin) return <Navigate to='/admin/dashboard' />;
  return children;
};

function App() {
  return (
    <div className='min-h-screen'>  {/* Tailwind full height */}
      <Navbar />
      <main>
        <Routes>
          {/* Public */}
          <Route path='/' element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />

          {/* Client */}
          <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path='/my-vehicles' element={<ProtectedRoute><MyVehiclePage /></ProtectedRoute>} />
          {/* ... autres */}

          {/* Admin */}
          <Route path='/admin/dashboard' element={<ProtectedRoute adminOnly><DashboardAdmin /></ProtectedRoute>} />
          {/* 404 */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
```
**بالعربية - الهدف**: تنقل حسب الرول. **الاستعمال**: `useNavigate()`، الحراسة كتحجب الوصول.

**Français - But**: Routage rôle-based (client/admin). **Utilisation**: `useNavigate()`, guards bloquent accès.


## 3. context/auth/ - إدارة المصادقة العامة

**بالعربية**: كونtekst كيخزن معلومات اليوزر فكل الصفحات (useAuth()).

**Français**: Context pour auth partagé partout.

**AuthProvider.jsx**:
```jsx
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => checkAuth(), []); // Check token au load

const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const { data } = await api.get('/auth/me'); // Backend verify
      setUser(data);
    } catch { logout(); }
  }
  setLoading(false);
};

const login = async (email, pass) => {
  const data = await authService.login(email, pass);
  localStorage.setItem('token', data.token);
  setUser(data.user);
  navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
};
```
**useAuth.js**: `useContext(AuthContext)` → {user, login, logout, isAuthenticated}.

**بالعربية - الهدف**: حالة المصادقة مشتركة، حفظ التوكن. **الاستعمال**: `useAuth()` فكل مكان.

**Français - But**: State auth partagé, persist token. **Utilisation**: `const { user, login } = useAuth()` partout.


## 4. components/layout/Navbar.jsx - Navigation Responsive
- States: mobileMenuOpen, showClientDropdown.
- Menus rôle-based: Public (home/services), Client (dashboard/vehicles), Admin (gestion).
- Mobile: Hamburger → dropdowns.
- Logout: Swal confirm + toast.
**But**: Nav dynamique par rôle. **Tailwind**: Gradients, hover, responsive lg:hidden.

## 5. Pages Types
**LoginPage.jsx** (react-hook-form):
```jsx
const { register, handleSubmit } = useForm();
const onSubmit = data => login(data.email, data.password);
```
**DashboardPage.jsx** (client): Fetch vehicles/reservations/devis via axios → cards/stats.
**GestionServices.jsx** (admin): CRUD table + modals (create/edit/delete/archive).

## 6. Hooks & Services
- **useToast/useConfirm**: Custom wrappers react-hot-toast/sweetalert2.
- **services/api/axios.js**: Instance axios + interceptors (token auto Headers).

## 7. Composants UI
- **ChatAssistantFloat.jsx**: Bouton flottant → /chat-ai.
- **HeroSection/ServicesSection**: Home landing avec fetch services.

## Flux Frontend
1. Load → AuthProvider checkAuth → token? → /auth/me → user.
2. Navbar + Routes guards → rôle → pages.
3. Forms → api calls (axios.get/post) → toast feedback.
4. ChatAI: localStorage messages + Ollama via backend.

**Debug**: React DevTools, Network tab (tokens), Console toasts/erreurs.

---

**Projet Complet Expliqué! Backend + Frontend = Garage Digital 🔧🤖**
