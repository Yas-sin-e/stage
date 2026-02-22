# Chapitre 2 : Spécification des besoins et modélisation de la solution

## Introduction

Le présent chapitre a pour objectif de définir de manière exhaustive les fonctionnalités que l'application **AutoExpert** doit offrir aux utilisateurs. AutoExpert est une plateforme web de gestion de garage automobile qui permet aux clients de gérer leurs véhicules, prendre des rendez-vous, demander des devis et suivre l'état de leurs réparations. Les administrateurs quant à eux peuvent gérer l'ensemble des opérations du garage.

L'objectif principal du projet est de digitaliser et automatiser la gestion d'un garage automobile afin de :
- Faciliter la prise de rendez-vous pour les clients
- Permettre une demande de devis rapide et précise
- Offrir un suivi en temps réel de l'état des réparations
- Optimiser la gestion administrative pour le garagiste

Dans le contexte spécifique des devis, l'application prend en compte le fait que le prix d'un service peut varier considérablement selon le type de véhicule (voiture complète, véhicule utilitaire, moto, etc.) et l'état du véhicule. C'est pourquoi l'administrateur doit voir le véhicule en personne pour évaluer correctement les problèmes et établir un devis précis. L'application permet decapturer toutes les informations nécessaires (marque, modèle, année, kilométrage, numéro VIN, immatriculation) pour faciliter cette évaluation.

---

## 1. Besoins fonctionnels

Les besoins fonctionnels représentent les fonctionnalités essentielles que l'application doit offrir. Nous les présentons ci-dessous de manière hiérarchisée.

### 1.1 Gestion de l'authentification et des utilisateurs

#### 1.1.1 Inscription des utilisateurs
- L'application doit permettre à un utilisateur de créer un compte en fournissant son nom, email, téléphone et mot de passe.
- L'email doit être unique dans le système.
- Le mot de passe doit contenir au moins 6 caractères.
- Par défaut, un nouvel utilisateur aura le rôle de « client ».

#### 1.1.2 Connexion des utilisateurs
- L'application doit permettre à un utilisateur de se connecter avec son email et mot de passe.
- Un token JWT (JSON Web Token) doit être généré et renvoyé en cas de succès.
- Le token doit être valide pendant 30 jours.

#### 1.1.3 Gestion du profil utilisateur
- L'utilisateur doit pouvoir consulter son profil.
- L'utilisateur doit pouvoir modifier ses informations personnelles (nom, téléphone).
- L'utilisateur doit pouvoir changer son mot de passe.

#### 1.1.4 Gestion des rôles
- Le système doit distinguer entre deux rôles : « client » et « admin ».
- L'accès à certaines fonctionnalités doit être réservé à l'administrateur.

---

### 1.2 Gestion des véhicules

#### 1.2.1 Ajout d'un véhicule
- L'utilisateur doit pouvoir ajouter un véhicule à son compte.
- Les informations requises sont : marque, modèle, année, immatriculation, numéro VIN, kilométrage et couleur.
- L'immatriculation doit être unique dans le système.

#### 1.2.2 Consultation des véhicules
- L'utilisateur doit pouvoir voir la liste de ses véhicules.
- L'administrateur doit pouvoir voir tous les véhicules de tous les utilisateurs.

#### 1.2.3 Modification d'un véhicule
- L'utilisateur doit pouvoir modifier les informations de son véhicule.

#### 1.2.4 Suppression d'un véhicule
- L'utilisateur doit pouvoir supprimer un véhicule de son compte.
- La suppression du véhicule ne doit pas supprimer les devis et réparations associés.

---

### 1.3 Gestion des services

#### 1.3.1 Consultation des services
- L'application doit afficher la liste des services proposés par le garage.
- Les services doivent être catégorisés (Entretien, Réparation, Diagnostic, Carrosserie).
- Les informations affichées pour chaque service : nom, description, prix de base, temps estimé.

#### 1.3.2 Gestion des services (Admin)
- L'administrateur doit pouvoir créer un nouveau service.
- L'administrateur doit pouvoir modifier un service existant.
- L'administrateur doit pouvoir supprimer un service.
- L'administrateur doit pouvoir activer ou désactiver un service.

---

### 1.4 Gestion des réservations

#### 1.4.1 Création d'une réservation
- L'utilisateur doit pouvoir prendre un rendez-vous pour un service.
- Les informations requises : véhicule, service, date et heure, notes supplémentaires.
- La date de réservation doit être supérieure à la date actuelle.

#### 1.4.2 Consultation des réservations
- L'utilisateur doit pouvoir voir l'historique de ses réservations.
- L'administrateur doit pouvoir voir toutes les réservations.

#### 1.4.3 Gestion des réservations (Admin)
- L'administrateur doit pouvoir accepter une réservation.
- L'administrateur doit pouvoir refuser une réservation avec motif.
- En cas d'acceptation, un devis automatique doit être généré.

#### 1.4.4 Annulation d'une réservation
- L'utilisateur doit pouvoir annuler sa réservation si elle est en attente.

---

### 1.5 Gestion des devis

#### 1.5.1 Demande de devis
- L'utilisateur doit pouvoir soumettre une demande de devis.
- Les informations requises : véhicule concerné, service désiré, description du problème, dates souhaitées.
- Le système doit permettre de préciser les éléments spécifiques du devis (pièces, main d'œuvre).

#### 1.5.2 Consultation des devis
- L'utilisateur doit pouvoir voir ses devis avec leur statut.
- L'administrateur doit pouvoir voir tous les devis.

#### 1.5.3 Élaboration du devis (Admin)
- L'administrateur doit pouvoir créer un devis détaillé.
- L'administrateur doit pouvoir spécifier : le montant total, les dates de début et fin, la liste des articles avec quantités et prix unitaires.
- Le système doit valider que la date de début est inférieure à la date de fin.

#### 1.5.4 Traitement du devis
- L'utilisateur doit pouvoir accepter un devis.
- L'utilisateur doit pouvoir refuser un devis.
- En cas d'acceptation, une réparation doit être automatiquement créée.

#### 1.5.5 Modification et suppression des devis
- L'administrateur doit pouvoir modifier un devis.
- L'administrateur doit pouvoir supprimer un devis.

---

### 1.6 Gestion des réparations

#### 1.6.1 Suivi des réparations
- L'utilisateur doit pouvoir suivre l'état de ses réparations.
- Les statuts possibles : « pending » (en attente), « in_progress » (en cours), « completed » (terminée), « delivered » (livrée).

#### 1.6.2 Gestion des réparations (Admin)
- L'administrateur doit pouvoir démarrer une réparation.
- L'administrateur doit pouvoir marquer une réparation comme terminée.
- L'administrateur doit pouvoir livr

---

### 1.7 Tableau de bord administratif

#### 1.7.1 Statistiques globales
- L'administrateur doit pouvoir consulter des statistiques globales :
  - Nombre total de clients
  - Nombre total de véhicules
  - Nombre de réservations (totales, en attente)
  - Nombre de devis (totaux, en attente)
  - Nombre de réparations (totales, en cours, terminées)
  - Revenus totaux (réparations livrées)

---

### 1.8 Chat avec l'IA

#### 1.8.1 Assistant virtuel
- L'utilisateur doit pouvoir dialoguer avec un assistant IA.
- L'IA doit pouvoir répondre aux questions sur les services, les procédures, etc.

---

## 2. Besoins non fonctionnels

### 2.1 Performance
- Le temps de réponse des pages ne doit pas dépasser 3 secondes.
- Les requêtes API doivent être traitées en moins de 2 secondes.

### 2.2 Sécurité
- Les mots de passe doivent être chiffrés avec bcrypt.
- Les routes sensibles doivent être protégées par authentification JWT.
- Les rôles doivent être vérifiés pour l'accès aux fonctionnalités administratives.

### 2.3 Convivialité et ergonomie
- L'interface doit être intuitive et facile à utiliser.
- Les messages d'erreur doivent être clairs et explicites.
- Les formulaires doivent avoir une validation en temps réel.

### 2.4 Maintenabilité
- Le code doit être structuré et commenté.
- L'architecture doit permettre l'ajout de nouvelles fonctionnalités facilement.

### 2.5 Disponibilité
- L'application doit être disponible 24h/24 et 7j/7.
- En cas d'erreur, des messages d'erreur appropriés doivent être affichés.

---

## 3. Modélisation de la solution

### 3.1 Extraction des différentes entités

L'application repose sur les entités suivantes :

1. **User** - Utilisateurs du système (clients et administrateurs)
2. **Vehicle** - Véhicules des clients
3. **Service** - Services proposés par le garage
4. **Reservation** - Rendez-vous pris par les clients
5. **Devis** - Devis établis par l'administrateur
6. **Reparation** - Réparations effectuées sur les véhicules

---

### 3.2 Extraction des attributs des différentes entités

#### 3.2.1 Entité User (Utilisateur)

| Attribut | Type | Description | Contraintes |
|----------|------|-------------|-------------|
| _id | ObjectId | Identifiant unique | Généré automatiquement |
| name | String | Nom de l'utilisateur | Requis |
| email | String | Adresse email | Requis, unique, en minuscules |
| password | String | Mot de passe | Requis, minimum 6 caractères |
| phone | String | Numéro de téléphone | Requis |
| role | String | Rôle de l'utilisateur | Énumération : 'client', 'admin' |
| isActive | Boolean | Statut du compte | Par défaut : true |
| createdAt | Date | Date de création | Automatique |
| updatedAt | Date | Date de mise à jour | Automatique |

#### 3.2.2 Entité Vehicle (Véhicule)

| Attribut | Type | Description | Contraintes |
|----------|------|-------------|-------------|
| _id | ObjectId | Identifiant unique | Généré automatiquement |
| userId | ObjectId | Propriétaire du véhicule | Référence vers User, requis |
| brand | String | Marque du véhicule | Requis |
| model | String | Modèle du véhicule | Requis |
| year | Number | Année de fabrication | Requis |
| plate | String | Immatriculation | Requis, unique, en majuscules |
| vin | String | Numéro VIN | Requis |
| color | String | Couleur du véhicule | Optionnel |
| mileage | Kilométrage | Optionnel |
| createdAt | Date | Date de création | Automatique |
| updatedAt | Date | Date de mise à jour | Automatique |

#### 3.2.3 Entité Service (Service)

| Attribut | Type | Description | Contraintes |
|----------|------|-------------|-------------|
| _id | ObjectId | Identifiant unique | Généré automatiquement |
| name | String | Nom du service | Requis, unique |
| description | String | Description du service | Requis |
| basePrice | Number | Prix de base | Requis |
| estimatedTime | String | Temps estimé | Requis |
| category | String | Catégorie du service | Énumération : 'Entretien', 'Réparation', 'Diagnostic', 'Carrosserie' |
| isActive | Boolean | Statut du service | Par défaut : true |
| createdAt | Date | Date de création | Automatique |
| updatedAt | Date | Date de mise à jour | Automatique |

#### 3.2.4 Entité Reservation (Réservation)

| Attribut | Type | Description | Contraintes |
|----------|------|-------------|-------------|
| _id | ObjectId | Identifiant unique | Généré automatiquement |
| userId | ObjectId | Client | Référence vers User, requis |
| vehicleId | ObjectId | Véhicule concerné | Référence vers Vehicle, requis |
| serviceId | ObjectId | Service demandé | Référence vers Service, requis |
| date | Date | Date du rendez-vous | Requis |
| time | String | Heure du rendez-vous | Requis |
| status | String | Statut de la réservation | Énumération : 'pending', 'accepted', 'rejected', 'cancelled' |
| notes | String | Notes du client | Optionnel |
| adminNotes | String | Notes de l'administrateur | Optionnel |
| createdAt | Date | Date de création | Automatique |
| updatedAt | Date | Date de mise à jour | Automatique |

#### 3.2.5 Entité Devis (Devis)

| Attribut | Type | Description | Contraintes |
|----------|------|-------------|-------------|
| _id | ObjectId | Identifiant unique | Généré automatiquement |
| userId | ObjectId | Client | Référence vers User, requis |
| vehicleId | ObjectId | Véhicule concerné | Référence vers Vehicle, requis |
| serviceId | ObjectId | Service concerné | Référence vers Service, optionnel |
| serviceLabel | String | Nom du service | Requis |
| amount | Number | Montant total du devis | Requis |
| estimatedTime | String | Temps estimé | Requis |
| dateDebut | Date | Date de début prévue | Requis |
| dateFin | Date | Date de fin prévue | Requis |
| status | String | Statut du devis | Énumération : 'pending', 'accepted', 'rejected' |
| description | String | Description du problème | Optionnel |
| items | Array | Liste des articles | Tableau d'objets avec name, quantity, price |
| createdAt | Date | Date de création | Automatique |
| updatedAt | Date | Date de mise à jour | Automatique |

#### 3.2.6 Entité Reparation (Réparation)

| Attribut | Type | Description | Contraintes |
|----------|------|-------------|-------------|
| _id | ObjectId | Identifiant unique | Généré automatiquement |
| userId | ObjectId | Client | Référence vers User, requis |
| vehicleId | ObjectId | Véhicule concerné | Référence vers Vehicle, requis |
| devisId | ObjectId | Devis associé | Référence vers Devis, requis |
| totalAmount | Number | Montant total | Requis |
| service | String | Service effectué | Requis |
| status | String | Statut de la réparation | Énumération : 'pending', 'in_progress', 'completed', 'delivered' |
| startDate | Date | Date de début | Optionnel |
| estimatedEndDate | Date | Date de fin estimée | Optionnel |
| completedAt | Date | Date de fin réelle | Optionnel |
| deliveredAt | Date | Date de livraison | Optionnel |
| notes | String | Notes | Optionnel |
| technicianNotes | String | Notes du technician | Optionnel |
| createdAt | Date | Date de création | Automatique |
| updatedAt | Date | Date de mise à jour | Automatique |

---

### 3.3 Diagramme entité-association (E-A)

```
┌─────────────────┐       ┌─────────────────┐
│      USER      │       │     VEHICLE     │
├─────────────────┤       ├─────────────────┤
│ _id             │       │ _id             │
│ name            │◄──────│ userId          │
│ email           │  1:N  │ brand           │
│ password        │       │ model           │
│ phone           │       │ year            │
│ role            │       │ plate           │
│ isActive        │       │ vin             │
│ createdAt       │       │ color           │
│ updatedAt       │       │ mileage         │
└─────────────────┘       │ createdAt       │
         │                │ updatedAt       │
         │                └────────┬────────┘
         │                         │
         │                         │
┌────────▼────────┐       ┌────────▼────────┐
│   RESERVATION  │       │      DEVIS      │
├─────────────────┤       ├─────────────────┤
│ _id             │       │ _id             │
│ userId          │       │ userId          │
│ vehicleId       │       │ vehicleId       │
│ serviceId       │       │ serviceId       │
│ date            │       │ serviceLabel    │
│ time            │       │ amount          │
│ status          │       │ estimatedTime   │
│ notes           │       │ dateDebut       │
│ adminNotes      │       │ dateFin         │
│ createdAt       │       │ status          │
│ updatedAt       │       │ description    │
└────────┬────────┘       │ items           │
         │               │ createdAt       │
         │               │ updatedAt       │
         │               └────────┬────────┘
         │                        │
         │                        │
┌────────▼────────┐       ┌────────▼────────┐
│    SERVICE     │       │   REPARATION    │
├─────────────────┤       ├─────────────────┤
│ _id             │       │ _id             │
│ name            │       │ userId          │
│ description     │       │ vehicleId       │
│ basePrice       │       │ devisId         │
│ estimatedTime   │       │ totalAmount     │
│ category        │       │ service         │
│ isActive        │       │ status          │
│ createdAt       │       │ startDate       │
│ updatedAt       │       │ estimatedEndDate│
└─────────────────┘       │ completedAt     │
                          │ deliveredAt     │
                          │ notes           │
                          │ technicianNotes │
                          │ createdAt       │
                          │ updatedAt       │
                          └─────────────────┘
```

#### Légende des associations :

| Association | Type | Description |
|-------------|------|-------------|
| User → Vehicle | 1:N | Un utilisateur peut avoir plusieurs véhicules |
| User → Reservation | 1:N | Un utilisateur peut avoir plusieurs réservations |
| User → Devis | 1:N | Un utilisateur peut avoir plusieurs devis |
| User → Reparation | 1:N | Un utilisateur peut avoir plusieurs réparations |
| Vehicle → Reservation | 1:N | Un véhicule peut avoir plusieurs réservations |
| Vehicle → Devis | 1:N | Un véhicule peut avoir plusieurs devis |
| Vehicle → Reparation | 1:N | Un véhicule peut avoir plusieurs réparations |
| Service → Reservation | 1:N | Un service peut être demandé dans plusieurs réservations |
| Service → Devis | 1:N | Un service peut figurer dans plusieurs devis |
| Devis → Reparation | 1:1 | Un devis accepté génère une seule réparation |

---

### 3.4 Description du modèle entité-association

#### 3.4.1 Associations et cardinalités

1. **Association « possède » (User ↔ Vehicle)**
   - Cardinalité : 1:N (Un utilisateur peut posséder plusieurs véhicules, un véhicule appartient à un seul utilisateur)
   - Clé migrée : `userId` dans l'entité Vehicle

2. **Association « réserve » (User ↔ Reservation)**
   - Cardinalité : 1:N (Un utilisateur peut faire plusieurs réservations, une réservation concerne un seul utilisateur)
   - Clé migrée : `userId` dans l'entité Reservation

3. **Association « concerne » (Vehicle ↔ Reservation)**
   - Cardinalité : 1:N (Un véhicule peut faire l'objet de plusieurs réservations)
   - Clé migrée : `vehicleId` dans l'entité Reservation

4. **Association « propose » (Service ↔ Reservation)**
   - Cardinalité : 1:N (Un service peut être demandé dans plusieurs réservations)
   - Clé migrée : `serviceId` dans l'entité Reservation

5. **Association « demande » (User ↔ Devis)**
   - Cardinalité : 1:N (Un utilisateur peut demander plusieurs devis)
   - Clé migrée : `userId` dans l'entité Devis

6. **Association « concerne » (Vehicle ↔ Devis)**
   - Cardinalité : 1:N (Un véhicule peut faire l'objet de plusieurs devis)
   - Clé migrée : `vehicleId` dans l'entité Devis

7. **Association « génère » (Devis ↔ Reparation)**
   - Cardinalité : 1:1 (Un devis accepté génère une seule réparation)
   - Clé migrée : `devisId` dans l'entité Reparation

8. **Association « porte sur » (User ↔ Reparation)**
   - Cardinalité : 1:N (Un utilisateur peut avoir plusieurs réparations)
   - Clé migrée : `userId` dans l'entité Reparation

---

### 3.5 Schéma relationnel

```
sql
-- Table Users
CREATE TABLE users (
    _id PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    role ENUM('client', 'admin') DEFAULT 'client',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table Vehicles
CREATE TABLE vehicles (
    _id PRIMARY KEY,
    user_id FOREIGN KEY REFERENCES users(_id),
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    plate VARCHAR(50) UNIQUE NOT NULL,
    vin VARCHAR(50) NOT NULL,
    color VARCHAR(50),
    mileage INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table Services
CREATE TABLE services (
    _id PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    estimated_time VARCHAR(50) NOT NULL,
    category ENUM('Entretien', 'Réparation', 'Diagnostic', 'Carrosserie') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table Reservations
CREATE TABLE reservations (
    _id PRIMARY KEY,
    user_id FOREIGN KEY REFERENCES users(_id),
    vehicle_id FOREIGN KEY REFERENCES vehicles(_id),
    service_id FOREIGN KEY REFERENCES services(_id),
    date TIMESTAMP NOT NULL,
    time VARCHAR(20) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table Devis
CREATE TABLE devis (
    _id PRIMARY KEY,
    user_id FOREIGN KEY REFERENCES users(_id),
    vehicle_id FOREIGN KEY REFERENCES vehicles(_id),
    service_id FOREIGN KEY REFERENCES services(_id),
    service_label VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    estimated_time VARCHAR(50) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    description TEXT,
    items JSON,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table Reparations
CREATE TABLE reparations (
    _id PRIMARY KEY,
    user_id FOREIGN KEY REFERENCES users(_id),
    vehicle_id FOREIGN KEY REFERENCES vehicles(_id),
    devis_id FOREIGN KEY REFERENCES devis(_id),
    total_amount DECIMAL(10,2) NOT NULL,
    service VARCHAR(255) NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'delivered') DEFAULT 'pending',
    start_date TIMESTAMP,
    estimated_end_date TIMESTAMP,
    completed_at TIMESTAMP,
    delivered_at TIMESTAMP,
    notes TEXT,
    technician_notes TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

---

## 4. Diagrammes Use Case

### 4.1 Diagramme Use Case global

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AUTOEXPERT                                       │
│                    Application de Gestion                                │
│                     de Garage Automobile                                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐          ┌───────────────┐          ┌───────────────┐
│    CLIENT     │          │    ADMIN      │          │    GUEST      │
│  (Utilisateur)│          │ (Gestionnaire)│          │   (Visiteur)  │
└───────┬───────┘          └───────┬───────┘          └───────┬───────┘
        │                          │                          │
        │ ◄── Authentification ───►│                          │
        │                          │                          │
        │                          │                          │
        │ ┌───────────────────────┐│                          │
        │ │   GESTION VÉHICULE    ││                          │
        │ │ ───────────────────── ││                          │
        │ │ • Ajouter véhicule   ││                          │
        │ │ • Voir mes véhicules ││                          │
        │ │ • Modifier véhicule  ││                          │
        │ │ • Supprimer véhicule ││                          │
        │ └───────────────────────┘│                          │
        │                          │                          │
        │ ┌───────────────────────┐│ ┌───────────────────────┐│
        │ │   GESTION RÉSERVATION ││ │   GESTION RÉSERVATION ││
        │ │ ───────────────────── ││ │ ───────────────────── ││
        │ │ • Créer réservation  ││ │ • Voir toutes         ││
        │ │ • Voir mes réservations│ │ • Accepter/réfuser   ││
        │ │ • Annuler réservation││ │ • Générer devis auto ││
        │ └───────────────────────┘│ └───────────────────────┘│
        │                          │                          │
        │ ┌───────────────────────┐│ ┌───────────────────────┐│
        │ │    GESTION DEVIS      ││ │    GESTION DEVIS      ││
        │ │ ───────────────────── ││ │ ───────────────────── ││
        │ │ • Demander devis     ││ │ • Créer devis         ││
        │ │ • Voir mes devis    ││ │ • Modifier devis      ││
        │ │ • Accepter devis    ││ │ • Voir tous les devis││
        │ │ • Refuser devis     ││ │ • Accepter/refuser    ││
        │ └───────────────────────┘│ │ • Supprimer devis    ││
        │                          │ └───────────────────────┘│
        │ ┌───────────────────────┐│ ┌───────────────────────┐│
        │ │ GESTION RÉPARATIONS   ││ │ GESTION RÉPARATIONS   ││
        │ │ ───────────────────── ││ │ ───────────────────── ││
        │ │ • Voir mes réparations││ │ • Démarrer réparation││
        │ │ • Suivre état         ││ │ • Marquer terminée    ││
        │ │                       ││ │ • Livrer véhicule    ││
        │ └───────────────────────┘│ └───────────────────────┘│
        │                          │                          │
        │ ┌───────────────────────┐│ ┌───────────────────────┐│
        │ │   CHAT IA             ││ │   TABLEAU DE BORD     ││
        │ │ ───────────────────── ││ │ ───────────────────── ││
        │ │ • Poser questions    ││ │ • Voir statistiques  ││
        │ │ • Obtenir assistance ││ │ • Gérer clients      ││
        │ └───────────────────────┘│ │ • Gérer services     ││
        │                          │ └───────────────────────┘│
        │ ┌───────────────────────┐│                          │
        │ │   MON PROFIL          ││                          │
        │ │ ───────────────────── ││                          │
        │ │ • Voir profil        ││                          │
        │ │ • Modifier profil    ││                          │
        │ │ • Changer mot de passe││                          │
        │ └───────────────────────┘│                          │
        │                          │                          │
        │ ┌───────────────────────┐│                          │
        │ │   SERVICES            ││                          │
        │ │ ───────────────────── ││                          │
        │ │ • Consulter services ││                          │
        │ └───────────────────────┘│                          │
        │                          │                          │
        ▼                          ▼                          ▼
```

### 4.2 Description des Use Cases par acteur

#### 4.2.1 Acteur : Guest (Visiteur)

| Use Case | Description |
|----------|-------------|
| Consulter-accueil | Voir la page d'accueil du site |
| Consulter-services | Voir la liste des services proposés |
| Consulter-about | Voir la page à propos |
| S'inscrire | Créer un nouveau compte utilisateur |
| Se-connecter | Authentifier pour accéder à son compte |

#### 4.2.2 Acteur : Client

| Use Case | Description |
|----------|-------------|
| Gérer-profil | Consulter et modifier ses informations personnelles |
| Gérer-véhicules | Ajouter, modifier, supprimer ses véhicules |
| Consulter-services | Voir les services disponibles |
| Créer-réservation | Prendre un rendez-vous pour un service |
| Consulter-réservations | Voir l'historique de ses réservations |
| Annuler-réservation | Annuler une réservation en attente |
| Demander-devis | Soumettre une demande de devis |
| Consulter-devis | Voir ses devis et leur statut |
| Accepter-devis | Accepter un devis proposé |
| Refuser-devis | Refuser un devis proposé |
| Consulter-réparations | Suivre l'état de ses réparations |
| Chat-IA | Dialoguer avec l'assistant virtuel |

#### 4.2.3 Acteur : Administrateur

| Use Case | Description |
|----------|-------------|
| Tableau-de-bord | Consulter les statistiques globales |
| Gérer-clients | Consulter, activer/désactiver, supprimer des clients |
| Gérer-véhicules | Consulter et supprimer tous les véhicules |
| Gérer-services | Créer, modifier, supprimer des services |
| Gérer-réservations | Consulter, accepter ou refuser les réservations |
| Créer-devis | Élaborer un devis détaillé pour un client |
| Modifier-devis | Modifier un devis existant |
| Gérer-devis | Consulter, accepter, refuser, supprimer tous les devis |
| Gérer-réparations | Démarrer, suivre, terminer, livrer les réparations |
| Consulter-stats | Voir les statistiques et revenus |

---

## 5. Diagramme de Classes

### 5.1 Diagramme de Classes complet

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _id: ObjectId                                                            │
│ - name: String                                                             │
│ - email: String                                                            │
│ - password: String                                                          │
│ - phone: String                                                             │
│ - role: String                                                              │
│ - isActive: Boolean                                                        │
│ - createdAt: Date                                                           │
│ - updatedAt: Date                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ + pre('save'): hashPassword()                                               │
│ + comparePassword(candidatePassword): Boolean                               │
└─────────────────────────────┬───────────────────────────────────────────────┘
                              │
                              │ 1
                              │ *
┌─────────────────────────────▼───────────────────────────────────────────────┐
│                              VEHICLE                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _id: ObjectId                                                            │
│ - brand: String                                                            │
│ - model: String                                                            │
│ - year: Number                                                             │
│ - plate: String                                                            │
│ - vin: String                                                              │
│ - color: String                                                            │
│ - mileage: Number                                                          │
│ - createdAt: Date                                                          │
│ - updatedAt: Date                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ + user: User (référence)                                                   │
└─────────────────────────────┬───────────────────────────────────────────────┘
                              │
                              │ *
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│   RESERVATION     │ │      DEVIS        │ │   REPARATION      │
├───────────────────┤ ├───────────────────┤ ├───────────────────┤
│ - _id: ObjectId  │ │ - _id: ObjectId   │ │ - _id: ObjectId  │
│ - date: Date     │ │ - serviceLabel    │ │ - totalAmount     │
│ - time: String   │ │ - amount: Number  │ │ - service: String │
│ - status: String │ │ - estimatedTime   │ │ - status: String  │
│ - notes: String  │ │ - dateDebut: Date │ │ - startDate       │
│ - adminNotes     │ │ - dateFin: Date   │ │ - estimatedEndDate│
│ - createdAt      │ │ - status: String  │ │ - completedAt     │
│ - updatedAt      │ │ - description     │ │ - deliveredAt     │
│                  │ │ - items: Array    │ │ - notes           │
│                  │ │ - createdAt       │ │ - technicianNotes│
│                  │ │ - updatedAt       │ │ - createdAt       │
│                  │ │                   │ │ - updatedAt       │
├───────────────────┤ ├───────────────────┤ ├───────────────────┤
│ + user: User     │ │ + user: User      │ │ + user: User      │
│ + vehicle:Vehicle│ │ + vehicle:Vehicle │ │ + vehicle:Vehicle │
│ + service:Service│ │ + service:Service│ │ + devis: Devis    │
└────────┬─────────┘ └────────┬─────────┘ └───────────────────┘
         │                    │
         │                    │ 1
         │                    │ *
         │                    ▼
         │          ┌───────────────────┐
         │          │      SERVICE      │
         │          ├───────────────────┤
         │          │ - _id: ObjectId   │
         │          │ - name: String    │
         │          │ - description     │
         │          │ - basePrice       │
         │          │ - estimatedTime   │
         │          │ - category: String│
         │          │ - isActive        │
         │          │ - createdAt       │
         │          │ - updatedAt       │
         │          └───────────────────┘
         │
         │
         └──────────────► ┌───────────────────┐
                          │    SERVICE       │
                          ├───────────────────┤
                          │ - _id: ObjectId  │
                          │ - name: String   │
                          │ - description    │
                          │ - basePrice      │
                          │ - estimatedTime  │
                          │ - category       │
                          │ - isActive       │
                          └───────────────────┘
```

### 5.2 Description des classes

#### Classe User
- **Responsabilité** : Représente un utilisateur du système
- **Attributs** : Identifiants, informations personnelles, rôle, statut
- **Méthodes** : Hachage du mot de passe, comparaison de mot de passe

#### Classe Vehicle
- **Responsabilité** : Représente un véhicule belonging à un client
- **Attributs** : Marque, modèle, année, immatriculation, VIN, couleur, kilométrage
- **Associations** : Appartient à un User

#### Classe Service
- **Responsabilité** : Représente un service proposé par le garage
- **Attributs** : Nom, description, prix de base, temps estimé, catégorie
- **Associations** : Peut être demandé dans plusieurs Reservations et Devis

#### Classe Reservation
- **Responsabilité** : Représente un rendez-vous pris par un client
- **Attributs** : Date, heure, statut, notes
- **Associations** : Lièe à User, Vehicle, Service

#### Classe Devis
- **Responsabilité** : Représente un devis établi pour un véhicule
- **Attributs** : Montant, dates, statut, liste des articles
- **Associations** : Lièe à User, Vehicle, Service
- **Génère** : Une Reparation en cas d'acceptation

#### Classe Reparation
- **Responsabilité** : Représente une réparation effectuée
- **Attributs** : Montant, statut, dates de début et fin, notes
- **Associations** : Lièe à User, Vehicle, Devis

---

## 6. Diagrammes de séquence

### 6.1 Diagramme de séquence : Inscription d'un utilisateur

```
┌────────┐     ┌──────────┐     ┌────────────┐     ┌─────────┐
│ Client │     │ Frontend │     │   Backend  │     │ MongoDB │
└───┬────┘     └────┬─────┘     └─────┬──────┘     └────┬────┘
    │               │                 │                 │
    │ 1.Saisie infos│                 │                 │
    │──────────────>│                 │                 │
    │               │                 │                 │
    │ 2.Appel API  │                 │                 │
    │ POST /auth/register            │                 │
    │─────────────>│                 │                 │
    │               │                 │                 │
    │               │ 3.Validation   │                 │
    │               │───────│        │                 │
    │               │       │        │                 │
    │               │<──────┘        │                 │
    │               │                 │                 │
    │               │ 4.Hash mot de passe              │
    │               │───────│        │                 │
    │               │       │        │                 │
    │               │<──────┘        │                 │
    │               │                 │                 │
    │               │ 5.Insert User │                 │
    │               │───────────────>│                 │
    │               │                │───────│         │
    │               │                │       │         │
    │               │                │<──────┘         │
    │               │                 │                 │
    │               │ 6.JWT Token    │                 │
    │               │<───────────────│                 │
    │               │                 │                 │
    │ 7.Confirmation│                 │                 │
    │<──────────────│                 │                 │
    │               │                 │                 │
```

### 6.2 Diagramme de séquence : Demande de devis

```
┌────────┐     ┌──────────┐     ┌────────────┐     ┌─────────┐
│ Client │     │ Frontend │     │   Backend  │     │ MongoDB │
└───┬────┘     └────┬─────┘     └─────┬──────┘     └────┬────┘
    │               │                 │                 │
    │ 1.Sélection véhicule & service│                 │
    │──────────────>│                 │                 │
    │               │                 │                 │
    │ 2.Description problème│                 │
    │──────────────>│                 │                 │
    │               │                 │                 │
    │ 3.Appel API   │                 │                 │
    │ POST /devis   │                 │                 │
    │──────────────>│                 │                 │
    │               │                 │                 │
    │               │ 4.Authentification & vérification│
    │               │───────│        │                 │
    │               │       │        │                 │
    │               │<──────┘        │                 │
    │               │                 │                 │
    │               │ 5.Vérification véhicule          │
    │               │───────────────>│                 │
    │               │                │───────│         │
    │               │                │       │         │
    │               │                │<──────┘         │
    │               │                 │                 │
    │               │ 6.Créer Devis (status: pending) │
    │               │───────────────>│                 │
    │               │                │───────│         │
    │               │                │       │         │
    │               │                │<──────┘         │
    │               │                 │                 │
    │               │ 7.Réponse avec Devis              │
    │               │<───────────────│                 │
    │               │                 │                 │
    │ 8.Affichage confirmation       │                 │
    │<──────────────│                 │                 │
    │               │                 │                 │
```

### 6.3 Diagramme de séquence : Acceptation d'un devis et création de réparation

```
┌──────────┐     ┌──────────┐     ┌────────────┐     ┌─────────┐
│  Client  │     │ Frontend │     │   Backend  │     │ MongoDB │
└────┬─────┘     └────┬─────┘     └─────┬──────┘     └────┬────┘
     │                │                 │                 │
     │ 1.Voir devis   │                 │                 │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │ 2.Accepter devis               │                 │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │ 3.API PUT /devis/:id/accept    │                 │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │                │ 4.Authentification            │
     │                │───────│        │                 │
     │                │       │        │                 │
     │                │<──────┘        │                 │
     │                │                 │                 │
     │                │ 5.Charger Devis│                 │
     │                │───────────────>│                 │
     │                │                │───────│         │
     │                │                │       │         │
     │                │                │<──────┘         │
     │                │                 │                 │
     │                │ 6.Mettre à jour status = 'accepted'
     │                │───────────────>│                 │
     │                │                │───────│         │
     │                │                │       │         │
     │                │                │<──────┘         │
     │                │                 │                 │
     │                │ 7.Créer Reparation            │
     │                │───────────────>│                 │
     │                │                │───────│         │
     │                │                │       │         │
     │                │                │<──────┘         │
     │                │                 │                 │
     │                │ 8.Réponse Devis + Reparation │
     │                │<───────────────│                 │
     │                │                 │                 │
     │ 9.Confirmation│                 │                 │
     │<──────────────│                 │                 │
     │                │                 │                 │
```

### 6.4 Diagramme de séquence : Création d'un devis par l'administrateur

```
┌──────────┐     ┌──────────┐     ┌────────────┐     ┌─────────┐
│  Admin   │     │ Frontend │     │   Backend  │     │ MongoDB │
└────┬─────┘     └────┬─────┘     └─────┬──────┘     └────┬────┘
     │                │                 │                 │
     │ 1.Sélection client & véhicule    │                 │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │ 2.Détails devis (services, prix, dates)             │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │ 3.Appel API POST /admin/devis  │                 │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │                │ 4.Authentification + Vérif admin│
     │                │───────│        │                 │
     │                │       │        │                 │
     │                │<──────┘        │                 │
     │                │                 │                 │
     │                │ 5.Validations dates             │
     │                │───────│        │                 │
     │                │       │        │                 │
     │                │<──────┘        │                 │
     │                │                 │                 │
     │                │ 6.Créer Devis (status: pending) │
     │                │───────────────>│                 │
     │                │                │───────│         │
     │                │                │       │         │
     │                │                │<──────┘         │
     │                │                 │                 │
     │                │ 7.Populate & retourne Devis      │
     │                │<───────────────│                 │
     │                │                 │                 │
     │ 8.Confirmation │                 │                 │
     │<──────────────│                 │                 │
     │                │                 │                 │
```

### 6.5 Diagramme de séquence : Gestion d'une réservation par l'administrateur

```
┌──────────┐     ┌──────────┐     ┌────────────┐     ┌─────────┐
│  Admin   │     │ Frontend │     │   Backend  │     │ MongoDB │
└────┬─────┘     └────┬─────┘     └─────┬──────┘     └────┬────┘
     │                │                 │                 │
     │ 1.Voir réservation│                 │                 │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │ 2.Accepter réservation          │                 │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │ 3.API PUT /admin/reservations/:id/accept          │
     │──────────────>│                 │                 │
     │                │                 │                 │
     │                │ 4.Authentification + Vérif admin │
     │                │───────│        │                 │
     │                │       │        │                 │
     │                │<──────┘        │                 │
     │                │                 │                 │
     │                │ 5.Charger Reservation + Service  │
     │                │──────────────>│                 │
     │                │                │───────│         │
     │                │                │       │         │
     │                │                │<──────┘         │
     │                │                 │                 │
     │                │ 6.Mettre à jour status = 'accepted'            │
     │                │───────────────>│                 │
     │                │                │───────│         │
     │                │                │       │         │
     │                │                │<──────┘         │
     │                │                 │                 │
     │                │ 7.Générer automatiquement un Devis           │
     │                │   (basé sur le service)│                 │
     │                │───────────────>│                 │
     │                │                │───────│         │
     │                │                │       │         │
     │                │                │<──────┘         │
     │                │                 │                 │
     │                │ 8.Réponse: Reservation + Devis              │
     │                │<───────────────│                 │
     │                │                 │                 │
     │ 9.Confirmation │                 │                 │
     │<──────────────│                 │                 │
     │                │                 │                 │
```

---

## Conclusion du chapitre 2

Ce chapitre a permis de définir exhaustivement les besoins fonctionnels et non fonctionnels de l'application AutoExpert. Les besoins fonctionnels ont été présentés de manière structurée en identifiant les différentes fonctionnalités attendues pour chaque domaine fonctionnel (authentification, gestion des véhicules, des services, des réservations, des devis et des réparations).

La modélisation de la solution a permis d'identifier les six entités principales du système (User, Vehicle, Service, Reservation, Devis, Reparation) ainsi que leurs attributs respectifs. Le diagramme entité-association et le schéma relationnel montrent clairement les relations entre ces entités.

Les diagrammes Use Case permettent de comprendre les interactions entre les trois types d'acteurs (Client, Administrateur, Visiteur) et les fonctionnalités du système. Le diagramme de classes offre une vue d'ensemble de la structure objet de l'application.

Enfin, les cinq diagrammes de séquence présentés illustrent les flux d'échanges principaux :
1. L'inscription d'un nouvel utilisateur
2. La demande de devis par un client
3. L'acceptation d'un devis et la création automatique d'une réparation
4. La création d'un devis par l'administrateur
5. La gestion des réservations par l'administrateur avec génération automatique de devis

Ces diagrammes permettent de mieux comprendre le fonctionnement dynamique de l'application et constituent une base solide pour la phase d'implémentation.

---

*Document préparé pour le projet AutoExpert - Chapitre 2 : Spécification des besoins et modélisation de la solution*
