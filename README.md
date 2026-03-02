
```
autoexpert
├─ backend
│  ├─ .env
│  ├─ config
│  │  └─ db.js
│  ├─ middleware
│  │  ├─ adminMiddleware.js
│  │  └─ authMiddleware.js
│  ├─ Modelfile
│  ├─ models
│  │  ├─ Devis.js
│  │  ├─ Reparation.js
│  │  ├─ Reservation.js
│  │  ├─ Service.js
│  │  ├─ User.js
│  │  └─ Vehicle.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ admin.js
│  │  ├─ auth.js
│  │  ├─ chatAI.js
│  │  ├─ devis.js
│  │  ├─ reparations.js
│  │  ├─ reservations.js
│  │  ├─ services.js
│  │  └─ vehicles.js
│  ├─ server.js
│  └─ test
│     └─ user.js
└─ frontend
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.js
   ├─ public
   │  └─ vite.svg
   ├─ README.md
   ├─ src
   │  ├─ App.css
   │  ├─ App.jsx
   │  ├─ components
   │  │  ├─ homeSection
   │  │  │  ├─ HeroSection.jsx
   │  │  │  └─ ServicesSection.jsx
   │  │  └─ layout
   │  │     ├─ Footer.jsxa
   │  │     ├─ Navbar.jsx
   │  │     └─ ScrollToTop.jsx
   │  ├─ context
   │  │  └─ auth
   │  │     ├─ AuthContext.js
   │  │     ├─ AuthProvider.jsx
   │  │     ├─ index.js
   │  │     └─ useAuth.js
   │  ├─ data
   │  │  └─ services.js
   │  ├─ index.css
   │  ├─ main.jsx
   │  ├─ pages
   │  │  ├─ admin
   │  │  │  ├─ DashboardAdmin.jsx
   │  │  │  ├─ GestionClients.jsx
   │  │  │  ├─ GestionDevis.jsx
   │  │  │  ├─ GestionReparations.jsx
   │  │  │  ├─ GestionReservations.jsx
   │  │  │  └─ GestionServices.jsx
   │  │  ├─ AppPages
   │  │  │  ├─ AboutPage.jsx
   │  │  │  ├─ ContactPage.jsx
   │  │  │  ├─ HomePage.jsx
   │  │  │  ├─ LoginPage.jsx
   │  │  │  ├─ ProfilePage.jsx
   │  │  │  ├─ RegisterPage.jsx
   │  │  │  └─ ServicesPage.jsx
   │  │  └─ client
   │  │     ├─ ChatAIPage.jsx
   │  │     ├─ DashboardPage.jsx
   │  │     ├─ DevisPage.jsx
   │  │     ├─ MyVehiclePage.jsx
   │  │     └─ ReservationsPage.jsx
   │  └─ services
   │     └─ api
   │        └─ axios.js
   ├─ tailwind.config.js
   └─ vite.config.js

```@startuml UseCaseGlobal_AutoExpert_Final
skinparam actorStyle awesome
skinparam usecase {
  BackgroundColor #D6E4F7
  BorderColor #2E5DA8
  FontSize 11
}
skinparam packageStyle rectangle
skinparam shadowing false

' ===== ACTEURS AVEC HIÉRARCHIE =====
actor "Visiteur" as V
actor "Utilisateur\nAuthentifié" as UA
actor "Client" as C
actor "Administrateur" as A
actor "Serveur Mail\n(Nodemailer)" as MAIL

' ===== HIÉRARCHIE D'HÉRITAGE =====
' Niveau 1 : Utilisateur Authentifié hérite de Visiteur
V <|-- UA

' Niveau 2 : Client et Admin héritent de Utilisateur Authentifié
UA <|-- C
UA <|-- A

' ===== SYSTÈME AUTOEXPERT =====
rectangle "AutoExpert" {
 
  package "Accès Public" {
    usecase "Consulter l'accueil" as UC_HOME
    usecase "Consulter les services" as UC_SERV
    usecase "S'inscrire" as UC_REG
    usecase "Se connecter" as UC_LOG
    usecase "Demander réinitialisation MDP" as UC_FORGOT
    usecase "Envoyer email réinitialisation" as UC_SEND_EMAIL
    usecase "Réinitialiser le mot de passe" as UC_RESET
  }
 
  package "Fonctionnalités Authentifiées" {
    usecase "Gérer son Profil" as UC_PROFIL
  }
 
  package "Espace Client" {
    usecase "Gérer ses Véhicules" as UC_VEHI
    usecase "Créer une Réservation" as UC_RESA
    usecase "Consulter ses Réservations" as UC_RESA_V
    usecase "Annuler une Réservation" as UC_RESA_C
    usecase "Demander un Devis" as UC_DV_REQ
    usecase "Accepter / Refuser un Devis" as UC_DV_ACC
    usecase "Suivre ses Réparations" as UC_REP
    usecase "Chat IA Automobile" as UC_CHAT
  }
 
  package "Espace Administration" {
    usecase "Tableau de Bord" as UC_DASH
    usecase "Gérer les Clients" as UC_AD_CLI
    usecase "Gérer les Services" as UC_AD_SRV
    usecase "Valider les Réservations" as UC_AD_RES
    usecase "Créer un Devis" as UC_AD_DV
    usecase "Gérer les Réparations" as UC_AD_REP
  }
  
  package "Intelligence Artificielle" {
    usecase "Analyser symptômes" as UC_IA_ANALYZE
    usecase "Générer pré-diagnostic" as UC_IA_DIAG
  }
}

' ===== RELATIONS VISITEUR (Non authentifié) =====
V --> UC_HOME
V --> UC_SERV
V --> UC_REG
V --> UC_LOG
V --> UC_FORGOT

' ===== RELATIONS RÉINITIALISATION MDP =====
UC_FORGOT ..> UC_SEND_EMAIL : <<include>>
UC_SEND_EMAIL --> MAIL : utilise
UC_RESET ..> UC_SEND_EMAIL : <<extend>>\ncondition: lien cliqué

' ===== RELATIONS UTILISATEUR AUTHENTIFIÉ (Commun à tous) =====
UA --> UC_PROFIL

' ===== RELATIONS CLIENT =====
C --> UC_VEHI
C --> UC_RESA
C --> UC_RESA_V
C --> UC_RESA_C
C --> UC_DV_REQ
C --> UC_DV_ACC
C --> UC_REP
C --> UC_CHAT

' ===== RELATIONS ADMINISTRATEUR =====
A --> UC_DASH
A --> UC_AD_CLI
A --> UC_AD_SRV
A --> UC_AD_RES
A --> UC_AD_DV
A --> UC_AD_REP

' ===== RELATIONS IA INTERNE =====
UC_CHAT ..> UC_IA_ANALYZE : <<include>>
UC_IA_ANALYZE ..> UC_IA_DIAG : <<include>>

' ===== NOTES EXPLICATIVES =====
note right of UC_RESET
  Extension conditionnelle :
  S'exécute uniquement si
  l'utilisateur clique sur
  le lien dans l'email
end note

note bottom of UA
  Utilisateur Authentifié :
  Hérite des capacités du Visiteur
  + accès aux fonctionnalités privées
end note

note right of UC_CHAT
  Le Chat IA analyse les symptômes
  et génère un pré-diagnostic
  automatique pour le client
end note

@enduml