# HIERARCHIE COMPLÈTE AutoExpert - كل الفايلات 📁

## Arborescence Projet كاملة (de environment_details + tools)

```
c:/Users/yassi/OneDrive/Bureau/autoexpert/
├── backend/ [Node.js/Express API]
│   ├── package.json (Express 5.2.1, Mongoose 9.1.5, JWT...)
│   ├── server.js (Main server + routes)
│   ├── config/db.js (MongoDB connect)
│   ├── middleware/authMiddleware.js (JWT protect)
│   │   └── adminMiddleware.js (role admin)
│   ├── models/ [Mongo Schemas]
│   │   ├── User.js (bcrypt pre-save)
│   │   ├── Vehicle.js
│   │   ├── Service.js
│   │   ├── Reservation.js
│   │   ├── Devis.js
│   │   └── Reparation.js
│   ├── routes/ [ALL ROUTES]
│   │   ├── auth.js (register/login/forgot FULL)
│   │   ├── vehicles.js (CRUD client)
│   │   ├── services.js (cache public)
│   │   ├── reservations.js (create/modify)
│   │   ├── devis.js (accept/reject)
│   │   ├── reparations.js (status workflow)
│   │   ├── admin.js (CRUD full + stats AGGREGATE)
│   │   └── chatAI.js (Ollama IA)
│   └── utils/sendEmail.js (nodemailer reset)
│
├── frontend/ [React/Vite/Tailwind]
│   ├── package.json (React 19.2, Router 7.13, Tailwind 3.4)
│   ├── vite.config.js (Build rapide)
│   ├── tailwind.config.js (CSS)
│   ├── src/main.jsx (Bootstrap + AuthProvider)
│   ├── src/App.jsx (Routes + Guards ProtectedRoute)
│   ├── src/context/auth/ [useAuth global]
│   │   ├── AuthProvider.jsx (login/checkAuth)
│   │   └── useAuth.js (hook)
│   ├── src/components/layout/
│   │   ├── Navbar.jsx (role menus responsive)
│   │   ├── Footer.jsx
│   │   └── ChatAssistantFloat.jsx
│   ├── src/pages/client/ [Client dashboard]
│   │   ├── DashboardPage.jsx
│   │   ├── MyVehiclePage.jsx
│   │   ├── ReservationsPage.jsx
│   │   ├── DevisPage.jsx
│   │   └── ChatAIPage.jsx (localStorage Ollama)
│   ├── src/pages/admin/ [Admin panels]
│   │   ├── DashboardAdmin.jsx (stats Recharts)
│   │   ├── GestionClients.jsx (CRUD)
│   │   ├── GestionServices.jsx
│   │   └── ... (Devis/Reparations/Réservations)
│   ├── src/services/api/axios.js (interceptors token)
│   └── src/hooks/ (useToast/useConfirm)
│
└── Documentation générée [6 files]:
    ├── backend-explanation.md (sections bilingual)
    ├── frontend-explanation.md
    ├── autoexpert-complete-code-guide.md (all code)
    ├── autoexpert-ultimate-learning-guide.md (plan basics)
    ├── all-backend-functions-complete.md (syntax)
    └── backend-all-routes-complete-bilingual.md (routes FULL)

## Fonctions Principales par Dossier - ملخص المهام

### Backend Routes (10 routes files)
```
auth.js → Login/Register/Forgot/Reset (JWT + bcrypt + email)
vehicles.js → Client CRUD voitures
services.js → Public services + cache
reservations.js → Create/Modify réservations
devis.js → Quotes accept/reject → Reparation auto
reparations.js → Status workflow (pending→delivered)
admin.js → Admin CRUD ALL + stats aggregate
chatAI.js → Ollama IA diagnostic
```

### Frontend Pages (20+ components)
```
AppPages/ → Public (Home/Login/Register)
client/ → Dashboard/Vehicles/Reservations/Devis/ChatAI
admin/ → Gestion panels (Clients/Services...)
```

### Models (6 Mongo schemas)
```
User → role/client/admin, bcrypt hash
Vehicle → brand/model/plate
Service → name/price/category/archivedAt
Reservation → vehicle/service/date/status
Devis → amount/date/status
Reparation → devis/totalAmount/workflow
```

**Total: 50+ files** - Garage management + IA Ollama local.

**Print hierarchy:**
```
tree /f
```

Hierarchy complète pour jury/portfolio! 📊
