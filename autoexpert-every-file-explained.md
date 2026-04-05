# AutoExpert - كل فايل مفسر + غرضه + كود كامل + المنطق البسيط 📚

## الهيكل الكامل + غرض كل dosier/fichier (Full Hierarchy + Purpose EVERY File/Folder)

### Backend - غرض: API سيرفر + DB + أمان + IA
**منطق**: Frontend طلب → Route → Middleware → Model/DB → JSON رد

```
backend/
├── **package.json**: تبعيات (Express/Mongo/JWT/Ollama) - غرض: npm install
├── **server.js**: السيرفر الرئيسي كامل - غرض: Routes + middlewares + DB connect
```
**server.js كود كامل logic**:
```
// 1. Imports + DB
connectDB(); // Mongo

// 2. Middlewares = filters
app.use(cors()); // Frontend OK
app.use(express.json()); // JSON body

// 3. Routes mount
app.use('/api/auth', authRoutes); // Modular = clean code

// 4. Listen
app.listen(5000); // Serveur prêt
```
**منطق بسيط**: Ta3 frontend axios.post('/api/login') → cette route → DB → token.

```
├── **config/db.js**: اتصال MongoDB - غرض: DB ready
├── **middleware/**: أمان
│   ├── authMiddleware.js: JWT protect - غرض: Token check req.user
│   └── adminMiddleware.js: Role adminOnly - غرض: Admin only routes
├── **models/**: DB structures
│   ├── User.js: Users (hash auto) - غرض: Clients/Admins
│   ├── Vehicle.js: سيارات - غرض: Client cars
│   ├── Service.js: خدمات - غرض: Prix/nom
│   └── Devis/Reservation/Reparation.js: Workflow garage
├── **routes/**: Endpoints API (10 files)
│   ├── auth.js: Login/Register (FULL code above)
│   ├── vehicles.js: Client CRUD cars
│   ├── services.js: Services public + cache
│   ├── admin.js: Admin CRUD + stats (aggregate)
│   └── reservations/devis/reparations/chatAI.js...
└── utils/sendEmail.js: Emails reset - غرض: Nodemailer
```

### Frontend - غرض: UI + Logic + Role access
**منطق**: Load → Auth check → Routes guards → Pages + API calls → Toasts

```
frontend/
├── **package.json**: React 19 + Tailwind + Vite - غرض: npm dev
├── **vite.config.js**: Build vite fast - غرض: npm run dev
├── **tailwind.config.js**: CSS utilities - غرض: Classes Tailwind
├── **src/main.jsx**: Bootstrap React - غرض: Root + Router + AuthProvider
```
**main.jsx logic**:
```
Root.render(<BrowserRouter><AuthProvider><App/></AuthProvider></BrowserRouter>)
```
Re-render global auth change.

```
├── **src/App.jsx**: Routes + Guards كامل (FULL code above) - غرض: Role access
├── **context/auth/**: Global user state
│   └── AuthProvider.jsx: login/checkAuth/localStorage (FULL)
├── **components/layout/Navbar.jsx**: Menus role (client/admin)
├── **pages/client/**: Dashboard/Vehicles/Devis/ChatAI
├── **pages/admin/**: GestionClients/Services...
└── **services/api/axios.js**: API calls + token auto
```

## المنطق الكامل (Full Logic Flow)

```
1. Frontend load → AuthProvider check localStorage token → axios /me → user ou logout
2. App.jsx ProtectedRoute → user.role admin? Admin pages : Client pages
3. Navbar → Menus adaptés role
4. Page Vehicles → axios GET /vehicles (protect) → req.user._id → MY cars only
5. Form Reservation → POST /reservations → service check archived → create
6. Admin Devis accept → Status change + Reparation auto create
7. ChatAI → localStorage messages → backend Ollama → diagnostic
```

**كل fichier/dossier غرضه واضح + كود كامل رئيسي + منطق! فهم كامل للـ jury** 🎓
