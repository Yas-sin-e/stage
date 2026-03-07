# Chapitre 3 : Mise en œuvre et Réalisation

## Introduction

Ce chapitre décrit la mise en œuvre pratique de la plateforme AutoExpert, organisée en trois sprints successifs selon la méthodologie agile Scrum. Pour chaque sprint, nous présentons le backlog simplifié (une tâche principale par User Story), les diagrammes UML — cas d'utilisation global et raffiné, descriptions textuelles formelles, diagrammes de séquence et de classes — ainsi que les interfaces utilisateur réalisées. Le chapitre se conclut par le bilan de vélocité, la phase complète de tests de validation (15 tests fonctionnels, 6 tests sécurité, 6 mesures de performance) et une synthèse de la valeur ajoutée d'AutoExpert par rapport aux solutions existantes.

**Flux métier global de la plateforme AutoExpert :**

Le cycle de vie complet d'une prestation, depuis l'arrivée du client jusqu'à la livraison de son véhicule, est modélisé par le flux suivant :

```mermaid
graph TD
    classDef client fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef admin fill:#fce4ec,stroke:#c2185b,stroke-width:2px;
    classDef system fill:#e8f5e9,stroke:#388e3c,stroke-width:2px;

    subgraph Espace Client [Actions du Client]
        A[1. Inscription / Connexion]:::client
        B[2. Ajout de Véhicule]:::client
        C[3. Prise de Rendez-vous]:::client
        F[6. Acceptation du Devis]:::client
        H[8. Suivi de la Réparation]:::client
        J[10. Confirmation de Livraison]:::client
    end

    subgraph Traitement Admin [Actions de l'Administrateur]
        D[4. Validation de la Réservation]:::admin
        E[5. Création du Devis Chiffré]:::admin
        I[9. Mise à jour statut & Livraison]:::admin
    end

    subgraph Automatisations Sys [Actions Automatiques]
        G[7. Création automatique de la Réparation]:::system
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H -.-> I
    I -.-> J
```

_(Légende : Bleu = Opération Client | Rose = Opération Administrateur | Vert = Déclenchement automatisé)_

---

## Sprint 1 : Authentification, Accueil & Base — Fondations Sécurisées (14 story points)

Le premier sprint pose les fondations sécurisées de l'application. Il couvre l'authentification complète (inscription, connexion, réinitialisation du mot de passe par email), la mise en place de la page d'accueil publique, des tableaux de bord personnalisés, de la gestion des profils utilisateur, de l'administration des comptes clients et du catalogue de services. Ce sprint dure une semaine et totalise 14 points d'effort.

### 1.1 Backlog du Sprint 1

Le tableau ci-dessous présente les cinq User Stories du Sprint 1 avec leur tâche principale et leur estimation d'effort issue du Planning Poker.

|     ID      | User Story                                                                                         | Tâche principale                                                                            | Effort                |
| :---------: | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ | :-------------------- |
| **US-1a/b** | En tant que Visiteur, je veux m'inscrire et me connecter pour accéder à mon espace personnel.      | Développer les routes d'authentification (JWT + Bcrypt) et les formulaires React.           | Difficile — 5 pts     |
|  **US-1c**  | En tant qu'Utilisateur, je veux réinitialiser mon mot de passe par email pour récupérer mon accès. | Implémenter l'envoi d'email sécurisé avec lien temporaire via Nodemailer.                   | Intermédiaire — 3 pts |
|  **US-1d**  | En tant que Client, je veux gérer mon profil pour maintenir mes informations à jour.               | Créer la route de mise à jour du profil, l'interface des paramètres et le Dashboard Client. | Intermédiaire — 2 pts |
|  **US-1e**  | En tant qu'Administrateur, je veux gérer les comptes clients pour contrôler les accès.             | Mettre en place la liste des utilisateurs, le contrôle des accès et le Dashboard Admin.     | Intermédiaire — 2 pts |
|  **US-2**   | En tant qu'Administrateur, je veux gérer les services pour définir le catalogue du garage.         | Développer la gestion complète (CRUD) du catalogue des prestations.                         | Facile — 2 pts        |
|             |                                                                                                    | **TOTAL**                                                                                   | **14 pts**            |

_Tableau 3.1 : Sprint Backlog 1 — 14 points d'effort_

### 1.2 Diagrammes de Cas d'Utilisation — Sprint 1

**● Use Case Global — Vue Abstraite**
À ce premier niveau, les cas d'utilisation sont regroupés sous la forme d'actions génériques afin de donner une vision synthétique sans entrer dans les détails complexes.

```mermaid
flowchart LR
    %% Acteurs
    C(("👤 Visiteur / Client"))
    A(("🛠️ Administrateur"))

    %% Cas d'utilisation
    subgraph Sprint 1 - Configuration de Base
        UC1([Gérer l'authentification])
        UC2([Gérer son profil])
        UC3([Gérer les clients])
        UC4([Gérer les services])
    end

    %% Liens
    C --> UC1
    C --> UC2
    A --> UC1
    A --> UC3
    A --> UC4
```

_(Figure 3.0 : Use Case Global — Sprint 1)_

**● Use Case Raffiné — Vue Détaillée par Acteur**
Ce diagramme détaille chaque cas global en actions concrètes par acteur (Visiteur, Client, Admin, et Nodemailer).

```mermaid
flowchart LR
    %% Acteurs
    V(("👤 Visiteur"))
    C(("👤 Client authentifié"))
    A(("🛠️ Administrateur"))
    MAIL(("📧 Nodemailer"))

    %% Cas d'utilisation
    subgraph Sprint 1 - Authentification & Base
        UC_REG([S'inscrire])
        UC_LOG([Se connecter])
        UC_JWT([Vérifier JWT])
        UC_RESET([Réinitialiser MDP])
        UC_EMAIL([Envoyer email sécurisé])
        UC_PROFIL([Gérer son profil])
        UC_CLIENTS([Gérer les clients])
        UC_SERV([Gérer les services])
    end

    %% Relations Acteurs -> Cas
    V --> UC_REG
    V --> UC_LOG
    C --> UC_LOG
    C --> UC_PROFIL
    C --> UC_RESET
    A --> UC_LOG
    A --> UC_CLIENTS
    A --> UC_SERV
    UC_EMAIL --> MAIL

    %% Relations Include/Extend
    UC_LOG -. "<< include >>" .-> UC_JWT
    UC_RESET -. "<< include >>" .-> UC_EMAIL
    UC_RESET -. "<< extend (si oublié) >>" .-> UC_LOG
```

_(Figure 3.1 : Use Case Raffiné — Sprint 1)_

---

### 1.3 Descriptions des Cas d'Utilisation — Sprint 1

| UC-1 : S'inscrire       |                                                                                                                                                                                                                                                                                         |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acteur principal**    | Visiteur (non connecté)                                                                                                                                                                                                                                                                 |
| **Objectif**            | Créer un nouveau compte client sur la plateforme AutoExpert.                                                                                                                                                                                                                            |
| **Pré-conditions**      | L'utilisateur n'a pas encore de compte. L'email saisi n'existe pas en base.                                                                                                                                                                                                             |
| **Scénario nominal**    | 1. Le visiteur remplit le formulaire.<br>2. Le frontend valide en temps réel.<br>3. Le backend vérifie l'unicité.<br>4. Le mot de passe est haché via Bcrypt (salt: 10).<br>5. Création en base MongoDB (rôle « client »).<br>6. Génération du JWT.<br>7. Redirection Dashboard Client. |
| **Scénario alternatif** | Email existant → HTTP 409 Conflict + message « Cet email est déjà utilisé ».                                                                                                                                                                                                            |

| UC-2 : Se connecter     |                                                                                                                                                                                      |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acteur principal**    | Visiteur possédant un compte (Client ou Admin)                                                                                                                                       |
| **Objectif**            | Accéder à son espace personnel via une authentification sécurisée.                                                                                                                   |
| **Pré-conditions**      | L'utilisateur possède un compte actif avec email et mot de passe valides.                                                                                                            |
| **Scénario nominal**    | 1. L'utilisateur saisit son email et mot de passe.<br>2. Le backend compare le MDP au hash Bcrypt.<br>3. Un JWT (validité : 30 jours) est retourné.<br>4. Redirection selon le rôle. |
| **Scénario alternatif** | Identifiants incorrects → HTTP 401.<br>Compte bloqué → HTTP 403.                                                                                                                     |

| UC-3 : Réinitialiser le mot de passe |                                                                                                                                                                                                                      |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acteur principal**                 | Utilisateur ayant oublié son mot de passe                                                                                                                                                                            |
| **Objectif**                         | Retrouver l'accès à son compte via un lien sécurisé envoyé par email.                                                                                                                                                |
| **Pré-conditions**                   | L'utilisateur possède un compte actif avec un email valide enregistré.                                                                                                                                               |
| **Scénario nominal**                 | 1. Saisie de l'email sur la page concernée.<br>2. Génération token unique (1h).<br>3. Nodemailer envoie le lien.<br>4. L'utilisateur clique et définit un nouveau MDP.<br>5. Le hash est sauvegardé, token invalidé. |
| **Scénario alternatif**              | Token expiré (> 1h) → message « Lien expiré ».<br>Lien déjà utilisé → « Lien invalide ».                                                                                                                             |

| UC-4 : Gérer les services (Admin) |                                                                                                                                                  |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acteur principal**              | Administrateur authentifié                                                                                                                       |
| **Objectif**                      | Créer, modifier, consulter et archiver les prestations du catalogue.                                                                             |
| **Pré-conditions**                | Rôle « admin ».                                                                                                                                  |
| **Scénario nominal**              | 1. Accès page « Gestion des Services ».<br>2. Consultation catalogue.<br>3. CRUD appliqué sur une prestation.<br>4. Persistance en BDD API REST. |
| **Scénario alternatif**           | Champ manquant → Validation.<br>Service lié à réservation active → Archivage proposé.                                                            |

---

### 1.4 Diagrammes de Séquence — Sprint 1

```mermaid
sequenceDiagram
    participant V as Visiteur (React)
    participant API as API Express
    participant DB as MongoDB

    Note over V,DB: Séquence 1 - Inscription
    V->>API: POST /api/auth/register (Données)
    API->>DB: findOne({ email })
    DB-->>API: null (Email libre)
    API->>API: bcrypt.hash(pwd, 10)
    API->>DB: create(User)
    DB-->>API: User (Client)
    API->>API: generate JWT
    API-->>V: 201 Created + Token
    V->>V: Redirection Dashboard Client
```

_(Figure 3.2 : Séquence — Inscription - Sprint 1)_

```mermaid
sequenceDiagram
    participant U as Utilisateur (React)
    participant API as API Express
    participant DB as MongoDB

    Note over U,DB: Séquence 2 - Connexion
    U->>API: POST /api/auth/login (email, pwd)
    API->>DB: findOne({ email })
    DB-->>API: User Record
    API->>API: bcrypt.compare(pwd, hash)
    API->>API: generate JWT
    API-->>U: 200 OK + Token + Rôle
    U->>U: Redirection selon Rôle (Admin ou Client)
```

_(Figure 3.3 : Séquence — Connexion - Sprint 1)_

```mermaid
sequenceDiagram
    participant U as Utilisateur (React)
    participant API as API Express
    participant ES as Nodemailer (Email)
    participant DB as MongoDB

    Note over U,DB: Séquence 3 - Récupération MDP
    U->>API: POST /api/auth/forgot-password (email)
    API->>DB: add Reset Token (TTL 1h)
    API->>ES: Send Email Link
    ES-->>U: Réception Email
    U->>API: POST /api/auth/reset-password (Token, Nouveau MDP)
    API->>DB: update Password Hash & clear Token
    API-->>U: Success Message
```

_(Figure 3.4 : Séquence — Réinitialisation MDP - Sprint 1)_

---

### 1.5 Diagramme de Classes — Sprint 1

```mermaid
classDiagram
    class User {
        <<entity>>
        +_id : ObjectId
        +name : String
        +email : String
        +phone : String
        -password : String
        +role : Enum ('client', 'admin')
        +isActive : Boolean
        ~resetPasswordToken : String
        ~resetPasswordExpire : Date
        +createdAt : Date
        +updatedAt : Date
        +register() : JWT
        +login() : JWT
        +forgotPassword() : void
        +resetPassword() : void
        +updateProfile() : User
        +getAllClients() : User[]
        +toggleStatus() : User
        +deleteClient() : void
    }

    class Service {
        <<entity>>
        +_id : ObjectId
        +name : String
        +description : String
        +price : Number
        +duration : String
        +category : String
        +createdAt : Date
        +updatedAt : Date
        +getAllServices() : Service[]
        +createService() : Service
        +updateService() : Service
        +archiveService() : void
    }

    User "1" -- "0..*" Service : gère (si Administrateur)
```

_(Figure 3.5 : Diagramme de Classes — Sprint 1)_

---

### 1.6 Réalisation du Sprint 1 — Interfaces Utilisateur

1. **🏠 Page d'Accueil (Visiteur)** : Vitrine publique — accessible sans authentification. _(Figure 3.6)_
2. **🔐 Connexion** : Authentification sécurisée par JWT. _(Figure 3.7)_
3. **✏️ Inscription** : Création de compte client. _(Figure 3.8)_
4. **📧 Réinitialisation du Mot de passe** : Processus en deux étapes (demande du lien et validation). _(Figure 3.9)_
5. **📊 Dashboard Client** : Tableau de bord personnalisé affichant le solde et les RDVs. _(Figure 3.10)_
6. **📈 Dashboard Administrateur** : Supervision globale du garage (statistiques par mois, revenus). _(Figure 3.11)_
7. **👤 Gestion du Profil (Client)** : Modification informations (nom, téléphone, changement mot de passe). _(Figure 3.12)_
8. **🔧 Gestion des Services (Admin)** : CRUD complet du catalogue et ajout de prestations et tarifs. _(Figure 3.13)_
9. **👥 Gestion des Clients (Admin)** : Activation/Suspension de comptes et tableau des clients. _(Figure 3.14)_

---

### 1.7 Rétrospective — Sprint 1

| Catégorie                  | Détails                                                                                                                                                                              |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ **Points positifs**     | • Architecture MERN opérationnelle.<br>• Authentification JWT + Bcrypt sécurisée et fonctionnelle.<br>• 14/14 points livrés — taux de complétion : 100 %.<br>• Communication fluide. |
| ⚠️ **Difficultés**         | • Configuration Nodemailer (port SMTP).<br>• TTL MongoDB pour l'expiration des tokens.<br>• Virtual fields liés à Mongoose.                                                          |
| 🔧 **Actions correctives** | • Documentation du `.env.example`.<br>• Ajout de JSDoc.<br>• Tests systématisés sur les edge cases (cas limites).                                                                    |

_Tableau 3.2 : Rétrospective Sprint 1_

---

---

## Sprint 2 : Gestion Métier — Essentiels Opérationnels (17 story points)

Ce sprint développe le cœur métier du garage : parc automobile des clients, prise de RDV, création de devis et déclenchement automatique des réparations.

### 2.1 Backlog du Sprint 2

|    ID    | User Story                                                                                              | Tâche principale                                                                           | Effort                |
| :------: | :------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- | :-------------------- |
| **US-3** | En tant que Client, je veux gérer mes véhicules.                                                        | Développer les routes sécurisées CRUD et l'interface de gestion du parc automobile.        | Intermédiaire — 3 pts |
| **US-4** | En tant que Client, je veux prendre et annuler un RDV. En tant qu'Admin, je veux valider ou refuser.    | Implémenter le workflow de réservation complet avec gestion des statuts.                   | Difficile — 7 pts     |
| **US-5** | En tant qu'Admin, je veux créer un devis chiffré. En tant que Client, je veux l'accepter ou le refuser. | Développer le modèle Devis, calcul automatique du total et déclenchement de la réparation. | Difficile — 7 pts     |
|          |                                                                                                         | **TOTAL**                                                                                  | **17 pts**            |

_Tableau 3.4 : Sprint Backlog 2 — 17 points d'effort_

### 2.2 Diagrammes de Cas d'Utilisation — Sprint 2

**● Use Case Global — Sprint 2**

```mermaid
flowchart LR
    C(("👤 Client"))
    A(("🛠️ Administrateur"))

    subgraph Sprint 2 - Gestion Métier
        UC1([Gérer mes véhicules])
        UC2([Gérer les réservations])
        UC3([Gérer les devis])
    end

    C --> UC1
    C --> UC2
    A --> UC2
    A --> UC3
```

_(Figure 3.15 : Use Case Global — Sprint 2)_

**● Use Case Raffiné — Sprint 2**

```mermaid
flowchart LR
    C(("👤 Client authentifié"))
    A(("🛠️ Administrateur"))

    subgraph Sprint 2 - Opérationnel
        UC_AV([Ajouter un véhicule])
        UC_MV([Modifier/Supprimer véhicule])
        UC_LV([Consulter mes véhicules])

        UC_CR([Créer une réservation])
        UC_SV([Sélectionner un véhicule])
        UC_SS([Choisir un service libre])
        UC_AR([Annuler réservation])

        UC_DEM([Consulter demandes Admin])
        UC_VAL([Accepter / Refuser RDV])
        UC_DV([Créer un devis])
        UC_IT([Détailler items & prix])
    end

    C --> UC_AV
    C --> UC_MV
    C --> UC_LV
    C --> UC_CR
    C --> UC_AR

    A --> UC_DEM
    A --> UC_VAL
    A --> UC_DV

    UC_CR -. "<< include >>" .-> UC_SV
    UC_CR -. "<< include >>" .-> UC_SS
    UC_DV -. "<< include >>" .-> UC_IT
    UC_VAL -. "<< extend (si accepté) >>" .-> UC_DV
```

_(Figure 3.16 : Use Case Raffiné — Sprint 2)_

### 2.3 Descriptions des Cas d'Utilisation — Sprint 2

| UC-5 : Gérer ses véhicules (Client) |                                                                                                                                                                             |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acteur principal**                | Client authentifié                                                                                                                                                          |
| **Scénario nominal**                | 1. Page « Mes Véhicules ».<br>2. Formulaire (marque, modèle, immatriculation, VIN, km).<br>3. Validation de l'unicité de l'immatriculation en DB.<br>4. Sauvegarde réussie. |
| **Scénario alternatif**             | Immatriculation dupliquée existante → HTTP 409 + Erreur "Cette immatriculation existe déjà".                                                                                |

| UC-6 : Gérer les réservations (Client + Admin) |                                                                                                                                                                                                                                     |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acteur principal**                           | Client et Admin                                                                                                                                                                                                                     |
| **Scénario nominal**                           | 1. Client choisit une voiture, un service associé, une date.<br>2. Réservation créée avec statut « En attente ».<br>3. L'Admin accepte ou refuse via son tableau de bord.<br>4. Le statut est mis à jour et visible pour le client. |

| UC-7 : Gérer les devis (Admin + Client) |                                                                                                                                                                                                                                                                                                        |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acteur principal**                    | Admin et Client                                                                                                                                                                                                                                                                                        |
| **Scénario nominal**                    | 1. L'admin crée le devis avec les items (qté x prix unitaire).<br>2. Montant total calculé de manière fiable côté backend.<br>3. Le client consulte son dashboard et accepte le devis.<br>4. L'acceptation du devis génère automatiquement la création d'une intervention avec le statut « En cours ». |

### 2.4 Diagrammes de Séquence — Sprint 2

```mermaid
sequenceDiagram
    participant C as Client (React)
    participant API as API Express
    participant DB as MongoDB

    C->>API: POST /api/vehicles (Immatriculation, VIN...)
    API->>DB: findOne({ plate })
    DB-->>API: null (plaque unique vérifiée)
    API->>DB: create(Vehicle)
    DB-->>API: Vehicle Entity
    API-->>C: 201 Created (Véhicule listé sur Dashboard)
```

_(Figure 3.17 : Séquence — Ajout d'un Véhicule - Sprint 2)_

```mermaid
sequenceDiagram
    participant C as Client
    participant API as API Express
    participant A as Admin

    C->>API: POST /api/reservations (Véhicule, Date, Service)
    API-->>A: (Nouvelle Demande 'Pending' au Garage)
    A->>API: PUT /api/reservations/:id/accept
    A->>API: POST /api/devis (Items, Quantités, Prix)
    API->>API: Calcul Total Σ(qté × prix)
    API-->>C: Devis disponible pour approbation
```

_(Figure 3.18 : Séquence — Validation Réservation & Création de Devis)_

```mermaid
sequenceDiagram
    participant C as Client
    participant API as API Express
    participant DB as MongoDB

    C->>API: POST /api/devis/:id/accept
    API->>DB: update(Devis, { status: 'accepted' })
    API->>DB: create(Reparation, { status: 'in_progress' })
    DB-->>API: Reparation Créée Automatiquement
    API-->>C: Retour interface Succès + Redirection Suivi
```

_(Figure 3.19 : Séquence — Acceptation Devis → Déclenchement Réparation)_

### 2.5 Diagramme de Classes — Sprint 2

```mermaid
classDiagram
    class Vehicle {
        <<entity>>
        +_id : ObjectId
        +userId : ObjectId
        +brand : String
        +model : String
        +year : Number
        +plate : String
        +vin : String
        +mileage : Number
        +color : String
    }

    class Reservation {
        <<entity>>
        +_id : ObjectId
        +userId : ObjectId
        +vehicleId : ObjectId
        +serviceId : ObjectId
        +date : Date
        +status : Enum ('pending', 'accepted', 'rejected', 'cancelled')
        +customProblem : String
    }

    class Devis {
        <<entity>>
        +_id : ObjectId
        +reservationId : ObjectId
        +items : DetailItem[]
        +amount : Number
        +status : Enum
    }

    User "1" -- "0..*" Vehicle : possède
    Vehicle "1" -- "0..*" Reservation : fait l'objet de
    Reservation "1" -- "0..1" Devis : a un
```

_(Figure 3.20 : Diagramme de Classes — Sprint 2)_

### 2.6 Réalisation du Sprint 2 — Interfaces Utilisateur

1. **🚗 Mes Véhicules (Client)** : Liste du parc de voitures, ajout via fenêtre modale et modifications associées. _(Figure 3.21)_
2. **📅 Prise de Rendez-vous (Client)** : Apparence fluide avec sélection de problèmes mécaniques et dates. _(Figure 3.22)_
3. **📋 Gestion des Réservations (Admin)** : Filtrage efficace pour l'Admin avec status accept/refuse en one-click. _(Figure 3.23)_
4. **💰 Gestion des Devis (Admin + Client)** : Facturation du technicien et confirmation rapide du devis client déclenchant la réparation en arrière-plan. _(Figure 3.24)_

### 2.7 Rétrospective — Sprint 2

| Catégorie                  | Détails                                                                                                                                                           |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ **Points positifs**     | • Workflow `Réservation → Admin → Devis → Client` extrêmement pertinent pour le produit final.<br>• Calculs fiables et exacts côté middleware.<br>• 17/17 points. |
| ⚠️ **Difficultés**         | • Transition système logique requise lors de mutations en cascade (devis déclenchant une réparation).<br>• Gestion des états d'erreur en cascade.                 |
| 🔧 **Actions correctives** | • Refactorisation des contrôleurs trop longs.<br>• Indexation MongoDB sur les statuts (facilité de recherche).                                                    |

_Tableau 3.5 : Rétrospective Sprint 2_

---

---

## Sprint 3 : Suivi, Dashboard Analytics & IA — Contrôle de l'Application (10 story points)

Le dernier sprint introduit les modules de suivi des travaux en atelier, les statistiques métiers et surtout le chat IA (Ollama Llama3.1) fournissant un niveau d'analyse unique.

### 3.1 Backlog du Sprint 3

|    ID     | User Story                                                          | Tâche principale                                                    | Effort            |
| :-------: | :------------------------------------------------------------------ | :------------------------------------------------------------------ | :---------------- |
| **US-6**  | En tant qu'Admin, je veux faire évoluer le statut d'une réparation. | Coder les transitions et notes techniques.                          | Haute — 2 pts     |
| **US-6b** | En tant que Client, je veux consulter l'état de mes réparations.    | Vue timeline animée et bouton transfert.                            | Haute — 2 pts     |
| **US-7**  | En tant qu'Admin, je veux voir les statistiques globales.           | Agrégations MongoDB et graphiques responsives Recharts.             | Facile — 1 pt     |
| **US-8**  | En tant que Client, je veux dialoguer avec l'IA.                    | Connexion d'un LLM local (Ollama) à l'App React de prise en charge. | Difficile — 5 pts |
|           |                                                                     | **TOTAL**                                                           | **10 pts**        |

_Tableau 3.7 : Sprint Backlog 3 — 10 points_

### 3.2 Diagrammes de Cas d'Utilisation — Sprint 3

**● Use Case Global — Sprint 3**

```mermaid
flowchart LR
    C(("👤 Client"))
    A(("🛠️ Administrateur"))
    IA(("🤖 IA Ollama"))

    subgraph Sprint 3 - Suivi & IA
        UC1([Gérer les réparations])
        UC2([Consulter tableau de bord])
        UC3([Interagir avec le Chat IA])
    end

    C --> UC3
    A --> UC1
    A --> UC2
    IA --> UC3
```

_(Figure 3.25 : Use Case Global — Sprint 3)_

**● Use Case Raffiné — Sprint 3**

```mermaid
flowchart LR
    C(("👤 Client authentifié"))
    A(("🛠️ Administrateur"))
    IA(("🤖 Ollama (llama3.1)"))

    subgraph Sprint 3 - Suivi & Intelligence
        UC_DV([Accepter/Refuser le devis])
        UC_INIT([Initialisation réparation autom.])
        UC_SUIV([Suivre ma réparation])

        UC_REP([Gérer réparations Admin])
        UC_STAT([Mettre à jour statut])
        UC_NOT([Ajouter notes tech])

        UC_DASH([Consulter Dashboard])
        UC_STATS([Voir statistiques chiffrées])

        UC_CHAT([Chat IA Automobile])
        UC_ANA([Analyser symptômes])
        UC_DIAG([Générer pré-diagnostic])
    end

    C --> UC_DV
    C --> UC_SUIV
    C --> UC_CHAT

    A --> UC_REP
    A --> UC_DASH

    UC_ANA --> IA

    UC_DV -. "<< include (si accepté) >>" .-> UC_INIT
    UC_REP -. "<< include >>" .-> UC_STAT
    UC_REP -. "<< extend >>" .-> UC_NOT
    UC_DASH -. "<< include >>" .-> UC_STATS
    UC_CHAT -. "<< include >>" .-> UC_ANA
    UC_ANA -. "<< include >>" .-> UC_DIAG
```

_(Figure 3.26 : Use Case Raffiné — Sprint 3)_

### 3.3 Descriptions des Cas d'Utilisation — Sprint 3

| UC-8 : Suivi des réparations |                                                                                                                                                                                              |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objectif**                 | Suivre l'avancement. L'Admin met à jour les statuts : `En cours → Terminée → Livrée`. Le Client voit les statuts changer sur une timeline dynamique avec la liberté de marquer la réception. |

| UC-9 : Dashboard Analytique (Admin) |                                                                                                                                                                      |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objectif**                        | Afficher les KPIs financiers (Revenus globaux, RDVs reçus, Performance Services). Ce processus de calcul intensif dépend de Pipelines d'agrégation MongoDB `$group`. |

| UC-10 : Chat IA Automobile (Client) |                                                                                                                                                                                                                             |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objectif**                        | Assistant virtuel conversationnel pour pré-diagnostic avec Ollama Llama 3.1.                                                                                                                                                |
| **Scénario nominal**                | 1. Le client décrit le symptôme observé.<br>2. Le backend compile un prompt structuré en arrière-plan.<br>3. Le modèle retourne : Diagnostic probable, Causes suspectées et Services recommandés (avec boutons cliquables). |

### 3.4 Diagrammes de Séquence — Sprint 3

```mermaid
sequenceDiagram
    participant C as Client (App)
    participant API as API Node.js
    participant IA as Ollama (Llama 3.1)

    C->>API: POST /api/chat/diagnose (Description Symptôme)
    API->>API: Compilation du Prompt Contextuel
    API->>IA: HTTP Request vers Modèle Local (Port 11434)
    IA-->>API: Format JSON: { Diagnostic, Causes, Services }
    API-->>C: Réponse Chat avec Services recommandés redirigeables
```

_(Figure 3.27 : Séquence — Chat IA Automobile Ollama Llama3.1)_

### 3.5 Diagramme de Classes — Sprint 3

```mermaid
classDiagram
    class Reparation {
        <<entity>>
        +_id : ObjectId
        +devisId : ObjectId
        +status : Enum ('pending','in_progress','completed','delivered')
        +startDate : Date
        +completedAt : Date
        +deliveredAt : Date
        +technicianNotes : String
        +updateStatus() : void
        +confirmReception() : void
    }

    class Conversation {
        <<entity>>
        +_id : ObjectId
        +userId : ObjectId
        +messages : Message[]
        +vehicleContext : ObjectId
        +addMessage() : void
    }

    Devis "1" -- "1" Reparation : se traduit par
    User "1" -- "0..*" Conversation : interagit avec l'IA
```

_(Figure 3.29 : Diagramme de Classes Complet)_

### 3.6 Réalisation du Sprint 3 — Interfaces Utilisateur

1. **🛠️ Suivi des Réparations (Client)** : Timeline visuelle moderne intégrant un système de validation final. _(Figure 3.30)_
2. **⚙️ Gestion des Réparations (Admin)** : Boutons de progression rapide permettant de fluidifier le travail opérateur. _(Figure 3.31)_
3. **📊 Tableau de Bord (Admin)** : Graphiques et KPI dynamiques mis en forme de manière professionnelle. _(Figure 3.32)_
4. **🤖 Chat IA AutoExpert** : Interface conversationnelle avec réponses structurées Llama3.1 et historique client. _(Figure 3.33)_
5. **📄 Devis Client** : Consultation détaillée priorisant l'expérience utilisateur, UX étudiée pour rassurer le client. _(Figure 3.34)_

### 3.7 Rétrospective — Sprint 3

| Catégorie                  | Détails                                                                                                                                                                      |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ **Points positifs**     | • Intégration fine d'un modèle de langage privatif (llama3.1 via Ollama).<br>• Présences de graphiques dynamiques temps réels Recharts.<br>• 10/10 points.                   |
| ⚠️ **Difficultés**         | • LLM local générant des temps de réponse pouvant varier selon le CPU (3-15s).<br>• Complexité des pipelines de MongoDB limitant légèrement le dashboard au début de sprint. |
| 🔧 **Actions correctives** | • Apparition d'un Loading indicateur progressif (UX design).<br>• Ajout d'un cache mémoire éphémère limitant l'écroulement des stats Admin.                                  |

---

## 4. Bilan Global des Sprints

| Sprint       | Module                          | Points planifiés | Points livrés | Complétion   |
| ------------ | ------------------------------- | ---------------- | ------------- | ------------ |
| **Sprint 1** | Fondations Sécurisées           | 14 pts           | 14 pts        | ✅ 100 %     |
| **Sprint 2** | Essentiels Opérationnels        | 17 pts           | 17 pts        | ✅ 100 %     |
| **Sprint 3** | Contrôle de l'Application       | 10 pts           | 10 pts        | ✅ 100 %     |
| **TOTAL**    | **11 User Stories — 3 sprints** | **41 pts**       | **41 pts**    | **✅ 100 %** |

_Tableau 3.10 : Vélocité de l'équipe — Bilan des 3 sprints_

---

## 5. Tests et Validation

La phase de test valide la conformité finale du produit en couvrant de multiples approches et domaines de sécurité logiques.

### 5.1 Tests Fonctionnels (15 cas de test - Succès 100%)

- TF-01 : Inscription valide → **✅ OK**
- TF-02 à TF-05 : Gestion des erreurs de connexion logiques et UI → **✅ OK**
- TF-06 : Reset MDP (Lien NodeMailer reçu sous 30 secondes chrono) → **✅ OK**
- TF-08 / TF-09 : Alertes et gestion d'unicité des immatriculations automobiles → **✅ OK**
- TF-10 à TF-13 : Workflow de Réservation, validation garage et Devis calculé mathématiquement calculé → **✅ OK**
- TF-14 : Diagnostic Chat IA avec réponses contextuelles et boutons de conversion en réservation agissant avec succès → **✅ OK**
- TF-15 : Mise à jour synchronisée en direct des suivis de Timeline → **✅ OK**

### 5.2 Tests de Sécurité (6 cas de test - Succès 100%)

- Accès Admin bloqué sans JWT valide, protection des API backend (Renvoi forcé HTTP 401).
- Accès Admin bloqué pour un compte possédant un rôle restreint Client (HTTP 403).
- Injections NoSQL via champs formulaires limités et sanitisés par le Validator Mongoose.
- Altération des métadonnées du client : les Tokens JWT modifiés manuellement entraînent échec.
- Stockage permanent : Mot de passes hashé à sens unique en Algorithme Bcrypt (Cost de 10).

### 5.3 Tests de Performance (6 mesures - Succès 100%)

| Page / Endpoint            | Temps moyen | Optimisation logicielle appliquée                                 |
| :------------------------- | :---------- | :---------------------------------------------------------------- |
| Page d'accueil (React SPA) | ~0.8 s      | Code splitting et Minification                                    |
| POST /api/auth/login       | ~150 ms     | Indexation MongoDB sur attribut "email"                           |
| GET /api/vehicles/mine     | ~80 ms      | Filtres locaux avec pointeur direct vers client UID               |
| GET /api/admin/dashboard   | ~200 ms     | Pipeline d'agrégation filtrée et structurée                       |
| POST /api/chat/diagnose    | ~5 à 12 s   | Intégration Loading UI pour calcul de l'IA (LLM Local Asynchrone) |

---

## 6. Conclusion

Ce chapitre a présenté la phase de réalisation et de validation de la plateforme AutoExpert, construite de manière itérative sur trois sprints Scrum d'une semaine chacun, pour un total de **41 story points livrés à 100 %**.

- 🔐 **Sprint 1 (Fondations)** : JWT, Bcrypt sécurisé et Tableaux de Bords.
- 📱 **Sprint 2 (Opérationnel)** : Modélisation et gestion du Parc Client, Workflow de Réservations, Devis clairs, Déclenchements en cascades (triggers).
- 🤖 **Sprint 3 (Contrôle / IA)** : Couche d'analyse avec l'assistant Chat Pré-Diagnostic (Llama3.1) et Aggregations Statistiques.

L'architecture MERN (MongoDB Express React Node.js) a offert un cadre moderne, hautement performant (temps de réponse moyen inférieur à 2 secondes hors calculs IA) et remarquablement maintenable grâce à ses composants autonomes. L'ensemble validé de 27 tests manuels et automatiques assure que la solution développée est stable et fiable.

**AutoExpert** se distingue fondamentalement des solutions garagistes concurrentes sur le marché (ex: _Drivvo_, _Shopmonkey_) de par son implémentation novatrice d'une **IA générative Llama3.1 privative**. Ce point différenciateur transforme le parcours du client de bout-en-bout : d'un simple dépôt de voiture classique à une véritable assistance technologique interactive, de la compréhension d'une panne jusqu'à la création d'une réparation certifiée informatiquement.
