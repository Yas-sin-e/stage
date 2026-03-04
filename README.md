
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







@startuml SeqInscription
title Séquence d'Inscription

actor "Visiteur" as V
participant "Interface Web (React)" as FE
participant "Serveur Applicatif (API)" as API
database "Base de Données" as DB

V -> FE : Remplit formulaire d'inscription
FE -> API : Envoie données d'inscription
API -> DB : Vérifier existence email
DB --> API : Email disponible

API -> DB : Créer nouveau compte (rôle Client)
DB --> API : Compte créé

API --> FE : Confirmation + Token
FE --> V : Redirection vers Dashboard

@enduml

@startuml SeqResetPassword
title Séquence de Réinitialisation du Mot de Passe

skinparam ArrowColor #1E90FF
skinparam ActorBorderColor #1E90FF
skinparam ActorBackgroundColor #E6F2FF
skinparam ParticipantBorderColor #1E90FF
skinparam ParticipantBackgroundColor #E6F2FF
skinparam DatabaseBorderColor #1565C0
skinparam DatabaseBackgroundColor #BBDEFB

actor "Utilisateur" as U
participant "Interface Web (React)" as FE
participant "Serveur Applicatif (API)" as API
participant "Service Email" as MAIL
database "Base de Données" as DB

U -> FE : Clique "Mot de passe oublié"
FE -> API : Envoie email

API -> DB : Vérifier utilisateur

alt Email valide
    API -> DB : Générer et enregistrer token temporaire
    API -> MAIL : Envoyer lien de réinitialisation
    API --> FE : Confirmation envoi email
end

U -> FE : Accède au lien + nouveau mot de passe
FE -> API : Envoie nouveau mot de passe

API -> DB : Vérifier validité du token

alt Token valide
    API -> DB : Mettre à jour mot de passe
    API --> FE : Confirmation
    FE --> U : Redirection vers Login
end

@startuml SeqInscription
title Séquence d'Inscription

skinparam ArrowColor #1E90FF
skinparam ActorBorderColor #1E90FF
skinparam ActorBackgroundColor #E6F2FF
skinparam ParticipantBorderColor #1E90FF
skinparam ParticipantBackgroundColor #E6F2FF
skinparam DatabaseBorderColor #1565C0
skinparam DatabaseBackgroundColor #BBDEFB

actor "Visiteur" as V
participant "Interface Web (React)" as FE
participant "Serveur Applicatif (API)" as API
database "Base de Données" as DB

V -> FE : Remplit formulaire d'inscription
FE -> API : Envoie données d'inscription
API -> DB : Vérifier existence email
DB --> API : Email disponible

API -> DB : Créer nouveau compte (rôle Client)
DB --> API : Compte créé

API --> FE : Confirmation + Token
FE --> V : Redirection vers Dashboard

@enduml


@startuml SeqResetPassword
title Séquence de Réinitialisation du Mot de Passe

actor "Utilisateur" as U
participant "Interface Web (React)" as FE
participant "Serveur Applicatif (API)" as API
participant "Service Email" as MAIL
database "Base de Données" as DB

U -> FE : Clique "Mot de passe oublié"
FE -> API : Envoie email

API -> DB : Vérifier utilisateur

alt Email valide
    API -> DB : Générer et enregistrer token temporaire
    API -> MAIL : Envoyer lien de réinitialisation
    API --> FE : Confirmation envoi email
end

U -> FE : Accède au lien + nouveau mot de passe
FE -> API : Envoyer nouveau mot de passe

API -> DB : Vérifier validité du token

alt Token valide
    API -> DB : Mettre à jour mot de passe
    API --> FE : Confirmation
    FE --> U : Redirection vers Login
end




class:

@startuml Classes_Sprint1
skinparam classAttributeIconSize 0
skinparam classFontSize 12
skinparam defaultFontName Arial
skinparam backgroundColor #FAFAFA
skinparam class {
  BackgroundColor #EEF4FF
  BorderColor #2255AA
  HeaderBackgroundColor #2255AA
  HeaderFontColor White
}

class User {
  + _id : ObjectId
  + name : String                {required}
  + email : String               {required, unique}
  + password : String            {required, select:false}
  + phone : String               {required}
  + role : String                {client | admin}
  + isActive : Boolean           {default: true}
  + resetPasswordToken : String
  + resetPasswordExpire : Date
  + createdAt : Date
  + updatedAt : Date
  --
  + comparePassword(pwd) : Boolean
  .. Opérations Visiteur ..
  + register(name,email,phone,pwd) : JWT
  + login(email, password) : JWT
  + forgotPassword(email) : void
  + resetPassword(token, pwd) : void
  .. Opérations Client ..
  + logout() : void
  + getMe() : User
  + updateProfile(name,email,phone) : User
  + changePassword(oldPwd, newPwd) : void
  + deleteAccount() : void
  .. Opérations Admin ..
  + getAllClients() : User[]
  + toggleClientStatus(id, isActive) : User
  + deleteClient(id) : void
}

note right of User
  comparePassword() : Mongoose schema.method
  pre('save') hook → bcrypt.hash(password)
  deleteAccount() → DELETE /api/auth/profile
    appelé par le CLIENT (ProfilePage.jsx)
  deleteClient(id) → DELETE /api/admin/clients/:id
    appelé par l'ADMIN (GestionClients.jsx)
end note

class Service {
  + _id : ObjectId
  + name : String             {required, unique}
  + description : String      {required}
  + basePrice : Number        {required}
  + estimatedTime : String    {required}
  + category : String         {enum: voir note}
  + isActive : Boolean        {default: true}
  + createdAt : Date
  + updatedAt : Date
  --
  .. Opérations Public ..
  + getAllServices() : Service[]
  .. Opérations Admin ..
  + createService(data) : Service
  + updateService(id, data) : Service
  + deleteService(id) : void
}

note right of Service
  category : {Entretien | Réparation |
  Diagnostic | Carrosserie |
  Mécanique | Électrique | Tôlerie}
end note

User "1" --> "0..*" Service : gère (Admin) >

@enduml

@startuml UC_Sprint1
skinparam actorStyle awesome
skinparam usecase {
  BackgroundColor #EEF4FF
  BorderColor #2255AA
  FontSize 12
}
skinparam backgroundColor #FAFAFA
left to right direction

actor "Visiteur"        as V
actor "Client"          as C
actor "Administrateur"  as A
actor "Nodemailer"      as MAIL

rectangle "Sprint 1 — Auth & Services" {
  package "Accès Public" {
    usecase "S'inscrire"                     as UC1
    usecase "Se connecter"                   as UC2
    usecase "Mot de passe oublié"            as UC3
    usecase "Réinitialiser le mot de passe"  as UC4
    usecase "Envoyer email de reset"         as UC5
  }
  package "Espace Client" {
    usecase "Voir son profil"                as UC6
    usecase "Modifier son profil"            as UC7
    usecase "Changer son mot de passe"       as UC8
    usecase "Supprimer son compte"           as UC9
  }
  package "Espace Admin" {
    usecase "Créer un service"               as UC10
    usecase "Modifier un service"            as UC11
    usecase "Supprimer un service"           as UC12
    usecase "Lister les services"            as UC13
    usecase "Lister les clients"             as UC14
    usecase "Bloquer / Activer un client"    as UC15
    usecase "Supprimer un client"            as UC16
  }
}

V --> UC1
V --> UC2
V --> UC3
UC3 ..> UC5 : <<include>>
UC5 ..> UC4 : <<include>>
UC5 --> MAIL : utilise

C --> UC2
C --> UC6
C --> UC7
C --> UC8
C --> UC9

A --> UC2
A --> UC10
A --> UC11
A --> UC12
A --> UC13
A --> UC14
A --> UC15
A --> UC16
@enduml




@startuml Classes_Sprint1
skinparam classAttributeIconSize 0
skinparam classFontSize 12
skinparam defaultFontName Arial
skinparam class {
  BackgroundColor #EEF4FF
  BorderColor #2255AA
  HeaderBackgroundColor #2255AA
  HeaderFontColor White
}

class User {
  + _id : ObjectId
  + name : String              {required}
  + email : String             {required, unique}
  + password : String          {required, select:false}
  + phone : String             {required}
  + role : String              {client | admin}
  + isActive : Boolean         {default: true}
  + resetPasswordToken : String
  + resetPasswordExpire : Date
  + createdAt : Date
  + updatedAt : Date
  --
  + comparePassword(candidatePassword) : Boolean
  .. Opérations Visiteur ..
  + register(name, email, phone, password) : JWT
  + login(email, password) : JWT
  + forgotPassword(email) : void
  + resetPassword(token, password) : void
  .. Opérations Client ..
  + logout() : void
  + updateProfile(name, email, phone) : User
  + changePassword(currentPwd, newPwd) : void
  .. Opérations Admin ..
  + getAllClients() : User[]
  + toggleClientStatus(id, isActive) : User
  + deleteClient(id) : void
}



class Service {
  + _id : ObjectId
  + name : String             {required, unique}
  + description : String      {required}
  + basePrice : Number        {required}
  + estimatedTime : String    {required}
  + category : String         {enum}
  + isActive : Boolean        {default: true}
  + createdAt : Date
  + updatedAt : Date
  --
  .. Public ..
  + getAllServices() : Service[]
  .. Admin ..
  + createService(data) : Service
  + updateService(id, data) : Service
  + deleteService(id) : void
}



User "1" --> "0..*" Service : gère  >

@enduml



sprint 2
 
 usecase

@startuml UC_Sprint2
skinparam actorStyle awesome
skinparam usecase {
  BackgroundColor #EEF4FF
  BorderColor #2255AA
  FontSize 12
}

left to right direction

actor "Client" as C
actor "Administrateur" as A

rectangle "Sprint 2 — Operational Essentials" {

  package "Véhicules" {

    usecase "Gérer ses véhicules" as UC_VEH

    usecase "Ajouter un véhicule" as UV1
    usecase "Modifier un véhicule" as UV2
    usecase "Supprimer un véhicule" as UV3
    usecase "Consulter ses véhicules" as UV4

    UV1 ..> UC_VEH : <<extend>>
    UV2 ..> UC_VEH : <<extend>>
    UV3 ..> UC_VEH : <<extend>>
    UV4 ..> UC_VEH : <<extend>>
  }

  package "Réservations" {

    usecase "Créer une réservation" as UR1
    usecase "Annuler une réservation" as UR2
    usecase "Valider / Refuser une réservation" as UA1
  }

  package "Devis" {

    usecase "Créer un devis" as UD1
    usecase "Consulter un devis" as UD2
    usecase "Accepter / Refuser un devis" as UD3
  }
}

C --> UC_VEH
C --> UR1
C --> UR2
C --> UD2
C --> UD3

A --> UA1
A --> UD1

@enduml

class:

@startuml Classes_Sprint2_Final
skinparam classAttributeIconSize 0
skinparam classFontSize 15
skinparam defaultFontName Arial

skinparam class {
  BackgroundColor #E0F8FF
  BorderColor #3399FF
  HeaderBackgroundColor #3399FF
  HeaderFontColor White
}

' ── Verbes sur les flèches : gras, bleu foncé, lisibles ──
skinparam ArrowFontSize 11
skinparam ArrowFontStyle bold
skinparam ArrowFontColor #0a2a6e
skinparam ArrowColor #2266cc

skinparam linetype ortho
skinparam shadowing false
left to right direction

class User {
  + _id : ObjectId
  + name, email, phone : String
  + role : String {client | admin}
  + isActive : Boolean
  --
  + comparePassword(pwd)
  + addVehicle(data)
  + updateVehicle(data)
  + deleteVehicle(id)
  + getMyVehicles()
  + createReservation(data)
  + cancelReservation(id)
  + getMyReservations()
  + createDevis(data)
  + acceptDevis(id)
  + rejectDevis(id)
  + getMyDevis()
}

class Vehicle {
  + _id : ObjectId
  + userId : ObjectId
  + brand, model, plate, vin : String
  + color : String
  + year, mileage : Number
  --
  + addVehicle(data)
  + updateVehicle(id, data)
  + deleteVehicle(id)
  + getMyVehicles(userId)
}

class Reservation {
  + _id : ObjectId
  + userId : ObjectId
  + vehicleId : ObjectId
  + date : Date
  + status : String {pending|accepted|rejected|cancelled}
  --
  + createReservation(data)
  + cancelReservation(id)
  + acceptReservation(id)
  + rejectReservation(id)
  + getMyReservations(userId)
  + getAllReservations()
}

class Devis {
  + _id : ObjectId
  + userId : ObjectId
  + vehicleId : ObjectId
  + serviceLabel : String
  + amount : Number
  + status : String {pending|accepted|rejected}
  --
  + createDevis(data)
  + updateDevis(id, data)
  + acceptDevis(id)
  + rejectDevis(id)
  + getMyDevis(userId)
}

class DevisItem {
  + name : String
  + quantity : Number
  + price : Number
}

' ────────────────────────────────────────────
' Relations
' ── Flèche longue (----> ) pour "est associé à" → label centré loin des boîtes
' ── Flèche longue (----> ) pour "génère"         → même chose
' ────────────────────────────────────────────
User    "1" ---->  "0..*" Vehicle      : possède
User    "1" -->    "0..*" Reservation  : effectue
User    "1" -->    "0..*" Devis        : reçoit

Vehicle "1" -----> "0..*" Reservation  : est associé à
Vehicle "1" ---->  "0..*" Devis        : est concerné par

Reservation "1" -----> "0..1" Devis   : génère

Devis   "1" *----> "0..*" DevisItem   : contient
@enduml


@startuml Seq0_Authentification

skinparam sequenceArrowThickness 2
skinparam actorStyle awesome
skinparam sequenceGroupBorderColor #2266cc
skinparam sequenceGroupBackgroundColor #e8f4ff
skinparam sequenceGroupFontColor #0a2a6e
skinparam sequenceGroupFontSize 11
skinparam NoteBackgroundColor #f0f7ff
skinparam NoteBorderColor #3399FF
skinparam NoteFontColor #0a2a6e
skinparam participant {
  BackgroundColor #D0F0FF
  BorderColor #3399FF
  FontColor Black
  FontSize 12
  FontName Arial
}
skinparam database {
  BackgroundColor #B0E0FF
  BorderColor #3399FF
  FontColor Black
  FontSize 12
}
skinparam actor {
  BackgroundColor #3399FF
  FontColor Black
  FontSize 12
}

title Authentification — Connexion

actor      "Utilisateur"   as U
participant "Interface"    as FE
participant "Système"      as SYS
database   "Base de données" as DB

U  ->  FE  : Saisit son email et mot de passe
FE ->  SYS : Demande de connexion

SYS -> DB  : Recherche de l'utilisateur par email

alt Utilisateur introuvable
  DB  --> SYS : Aucun résultat
  SYS --> FE  : Identifiants incorrects
  FE  --> U   : Affiche message d'erreur
else Utilisateur trouvé
  DB  --> SYS : Informations du compte

  SYS -> SYS  : Vérifie le mot de passe

  alt Mot de passe incorrect
    SYS --> FE : Identifiants incorrects
    FE  --> U  : Affiche message d'erreur
  else Compte désactivé
    SYS --> FE : Compte non autorisé
    FE  --> U  : Affiche message d'erreur
  else Connexion réussie
    SYS -> SYS : Génère un jeton de session
    SYS --> FE : Connexion autorisée
    FE  -> FE  : Mémorise la session
    FE  --> U  : Redirige vers le tableau de bord
  end
end

note over FE, SYS
  Le jeton de session est réutilisé
  dans toutes les actions suivantes
  pour identifier l'utilisateur
end note
@enduml
@startuml Seq_Inscription
skinparam sequenceArrowThickness 2
skinparam actorStyle awesome
skinparam sequenceGroupBorderColor #2266cc
skinparam sequenceGroupBackgroundColor #e8f4ff
skinparam sequenceGroupFontColor #0a2a6e
skinparam sequenceGroupFontSize 11
skinparam NoteBackgroundColor #f0f7ff
skinparam NoteBorderColor #3399FF
skinparam NoteFontColor #0a2a6e
skinparam participant {
  BackgroundColor #D0F0FF
  BorderColor #3399FF
  FontColor Black
  FontSize 12
  FontName Arial
}
skinparam database {
  BackgroundColor #B0E0FF
  BorderColor #3399FF
  FontColor Black
  FontSize 12
}
skinparam actor {
  BackgroundColor #3399FF
  FontColor Black
  FontSize 12
}

title Séquence — Inscription d'un nouveau client

actor      "Visiteur"        as V
participant "Interface"      as FE
participant "Système"        as SYS
database   "Base de données" as DB

V   ->  FE  : Remplit le formulaire d'inscription\n(nom, email, téléphone, mot de passe)
FE  ->  SYS : Envoie les informations d'inscription

SYS ->  DB  : Vérifie si l'email est déjà utilisé

alt Email déjà enregistré
  DB  --> SYS : Email existant
  SYS --> FE  : Email déjà utilisé
  FE  --> V   : Affiche message d'erreur
else Champs obligatoires manquants
  SYS --> FE  : Informations incomplètes
  FE  --> V   : Affiche message d'erreur
else Inscription possible
  DB  --> SYS : Email disponible
  SYS ->  SYS : Chiffre le mot de passe
  SYS ->  DB  : Sauvegarde le nouveau compte\navec le rôle "Client"
  DB  --> SYS : Compte sauvegardé
  SYS ->  SYS : Génère un jeton de session
  SYS --> FE  : Confirmation et jeton de session
  FE  ->  FE  : Mémorise la session
  FE  --> V   : Redirige vers le tableau de bord
end
@enduml
##################################################################################
@startuml Seq_ReinitialisationMotDePasse
skinparam sequenceArrowThickness 2
skinparam actorStyle awesome
skinparam sequenceGroupBorderColor #2266cc
skinparam sequenceGroupBackgroundColor #e8f4ff
skinparam sequenceGroupFontColor #0a2a6e
skinparam sequenceGroupFontSize 11
skinparam NoteBackgroundColor #f0f7ff
skinparam NoteBorderColor #3399FF
skinparam NoteFontColor #0a2a6e
skinparam participant {
  BackgroundColor #D0F0FF
  BorderColor #3399FF
  FontColor Black
  FontSize 12
  FontName Arial
}
skinparam database {
  BackgroundColor #B0E0FF
  BorderColor #3399FF
  FontColor Black
  FontSize 12
}
skinparam actor {
  BackgroundColor #3399FF
  FontColor Black
  FontSize 12
}

title Séquence — Réinitialisation du mot de passe

actor      "Utilisateur"    as U
participant "Interface"     as FE
participant "Système"       as SYS
participant "Service Email" as MAIL
database   "Base de données" as DB

== Etape 1 : Demande de réinitialisation ==

U   ->  FE   : Clique sur "Mot de passe oublié"\net saisit son adresse email
FE  ->  SYS  : Envoie l'adresse email

SYS ->  DB   : Vérifie si l'email est connu

alt Email introuvable
  DB  --> SYS  : Aucun compte trouvé
  SYS --> FE   : Email non reconnu
  FE  --> U    : Affiche message d'erreur
else Email reconnu
  DB  --> SYS  : Compte trouvé
  SYS ->  SYS  : Génère un lien de réinitialisation temporaire
  SYS ->  DB   : Sauvegarde le lien temporaire
  SYS ->  MAIL : Envoie le lien par email
  MAIL --> U   : Email reçu avec le lien de réinitialisation
  SYS --> FE   : Confirmation d'envoi
  FE  --> U    : Affiche "Un email vous a été envoyé"
end

== Etape 2 : Saisie du nouveau mot de passe ==

U   ->  FE   : Ouvre le lien reçu par email\net saisit le nouveau mot de passe
FE  ->  SYS  : Envoie le nouveau mot de passe

SYS ->  DB   : Vérifie la validité du lien temporaire

alt Lien expiré ou invalide
  DB  --> SYS  : Lien non valide
  SYS --> FE   : Lien expiré ou déjà utilisé
  FE  --> U    : Affiche message d'erreur
else Lien valide
  DB  --> SYS  : Lien accepté
  SYS ->  SYS  : Chiffre le nouveau mot de passe
  SYS ->  DB   : Met à jour le mot de passe\net supprime le lien temporaire
  DB  --> SYS  : Mise à jour sauvegardée
  SYS --> FE   : Confirmation du changement
  FE  --> U    : Redirige vers la page de connexion
end
@enduml

#####################################################################################


@startuml Classes_Sprint2_Final
skinparam classAttributeIconSize 0

' Taille du texte augmentée pour le rapport
skinparam classFontSize 15
skinparam classFontStyle bold
skinparam classAttributeFontSize 14
skinparam classStereotypeFontSize 13

skinparam ArrowFontSize 14
skinparam ArrowFontStyle bold
skinparam ArrowFontColor #0a2a6e
skinparam ArrowColor #2266cc

skinparam defaultFontName Arial
skinparam class {
  BackgroundColor #D0F0FF
  BorderColor #3399FF
  HeaderBackgroundColor #3399FF
  HeaderFontColor White
  HeaderFontSize 16
  HeaderFontStyle bold
}
skinparam linetype ortho
skinparam shadowing false
left to right direction

class User {
  + _id : ObjectId
  + name, email, phone : String
  + role : String {client | admin}
  + isActive : Boolean
  --
  + comparePassword(pwd)
  + addVehicle(data)
  + updateVehicle(data)
  + deleteVehicle(id)
  + getMyVehicles()
  + createReservation(data)
  + cancelReservation(id)
  + getMyReservations()
  + createDevis(data)
  + acceptDevis(id)
  + rejectDevis(id)
  + getMyDevis()
}

class Vehicle {
  + _id : ObjectId
  + userId : ObjectId
  + brand, model, plate, vin : String
  + color : String
  + year, mileage : Number
  --
  + addVehicle(data)
  + updateVehicle(id, data)
  + deleteVehicle(id)
  + getMyVehicles(userId)
}

class Reservation {
  + _id : ObjectId
  + userId : ObjectId
  + vehicleId : ObjectId
  + date : Date
  + status : String {pending|accepted|rejected|cancelled}
  --
  + createReservation(data)
  + cancelReservation(id)
  + acceptReservation(id)
  + rejectReservation(id)
  + getMyReservations(userId)
  + getAllReservations()
}

class Devis {
  + _id : ObjectId
  + userId : ObjectId
  + vehicleId : ObjectId
  + serviceLabel : String
  + amount : Number
  + status : String {pending|accepted|rejected}
  --
  + createDevis(data)
  + updateDevis(id, data)
  + acceptDevis(id)
  + rejectDevis(id)
  + getMyDevis(userId)
}

class DevisItem {
  + name : String
  + quantity : Number
  + price : Number
}

' Relations avec flèches longues pour l'espacement
User    "1" ---->  "0..*" Vehicle      : (possède)
User    "1" -->    "0..*" Reservation  : (effectue)
User    "1" -->    "0..*" Devis        : (reçoit)
Vehicle "1" -----> "0..*" Reservation  : (est associé à)
Vehicle "1" ---->  "0..*" Devis        : (est concerné par)
Reservation "1" -----> "0..1" Devis    : (génère)
Devis   "1" *----> "0..*" DevisItem    : (contient)
@enduml

##############
@startuml Seq1_AjoutVehicule

skinparam sequenceArrowThickness 2
skinparam actorStyle awesome
skinparam sequenceGroupBorderColor #2266cc
skinparam sequenceGroupBackgroundColor #e8f4ff
skinparam sequenceGroupFontColor #0a2a6e
skinparam sequenceGroupFontSize 11
skinparam NoteBackgroundColor #f0f7ff
skinparam NoteBorderColor #3399FF
skinparam NoteFontColor #0a2a6e
skinparam participant {
  BackgroundColor #D0F0FF
  BorderColor #3399FF
  FontColor Black
  FontSize 12
  FontName Arial
}
skinparam database {
  BackgroundColor #B0E0FF
  BorderColor #3399FF
  FontColor Black
  FontSize 12
}
skinparam actor {
  BackgroundColor #3399FF
  FontColor Black
  FontSize 12
}

title Séquence 1 — Ajout d'un véhicule

actor      "Client"          as C
participant "Interface"      as FE
participant "Système"        as SYS
database   "Base de données" as DB

ref over C, FE, SYS, DB
  Authentification 
end ref

C   ->  FE  : Remplit le formulaire\n(marque, modèle, année, plaque, VIN)
FE  ->  SYS : Envoie les informations du véhicule
SYS ->  SYS : Vérifie l'identité du client

SYS ->  DB  : Sauvegarde le véhicule

alt La plaque d'immatriculation existe déjà
  DB  --> SYS : Doublon détecté
  SYS --> FE  : Immatriculation déjà enregistrée
  FE  --> C   : Affiche message d'erreur
else Sauvegarde réussie
  DB  --> SYS : Véhicule sauvegardé
  SYS --> FE  : Confirmation de l'ajout
  FE  --> C   : Liste des véhicules mise à jour
end
@enduml
##################################
@startuml Seq2_ReservationDevis
skinparam sequenceArrowThickness 2
skinparam actorStyle awesome
skinparam sequenceGroupBorderColor #2266cc
skinparam sequenceGroupBackgroundColor #e8f4ff
skinparam sequenceGroupFontColor #0a2a6e
skinparam sequenceGroupFontSize 12
skinparam NoteBackgroundColor #f0f7ff
skinparam NoteBorderColor #1565C0
skinparam NoteFontColor #0a2a6e
skinparam defaultFontName Arial
skinparam defaultFontSize 12

title Séquence 2 — Réservation et création du Devis

' ── Couleur inline : syntaxe "as Alias #couleur" après la déclaration ──
actor      "Client"            as C   #1565C0
participant "Interface Client" as FEC #BBDEFB
actor      "Admin"             as A   #2E7D32
participant "Interface Admin"  as FEA #C8E6C9
participant "Système"          as SYS #ECEFF1
database   "Base de données"   as DB  #CFD8DC

ref over C, FEC, SYS, DB
  Authentification Client préalable
  
end ref

ref over A, FEA, SYS, DB
  Authentification Admin préalable
  
end ref

== Etape 1 : Le client fait une demande de réservation ==

C   ->  FEC : Choisit un véhicule, un service\net une date
FEC ->  SYS : Envoie la demande de réservation
SYS ->  SYS : Vérifie l identité du client
SYS ->  DB  : Sauvegarde la réservation\navec statut en attente
DB  --> SYS : Réservation sauvegardée
SYS --> FEC : Confirmation de la demande
FEC --> C   : Réservation en attente de validation

== Etape 2 : L admin traite la réservation ==

A   ->  FEA : Consulte les réservations en attente
FEA ->  SYS : Demande la liste des réservations
SYS ->  SYS : Vérifie les droits administrateur
SYS ->  DB  : Récupère les réservations en attente
DB  --> SYS : Liste des réservations
SYS --> FEA : Affiche les réservations
FEA --> A   : Liste visible

A   ->  FEA : Accepte la réservation
FEA ->  SYS : Envoie la décision d acceptation
SYS ->  SYS : Vérifie les droits administrateur
SYS ->  DB  : Met à jour le statut en acceptée
SYS ->  DB  : Crée un devis associé\navec statut en attente
DB  --> SYS : Réservation et devis sauvegardés
SYS --> FEA : Confirmation de l action
FEA --> A   : Mise à jour affichée

note over C, FEC
  Le client consulte sa réservation
  et voit le statut mis à jour
  lors de sa prochaine connexion
end note
@enduml