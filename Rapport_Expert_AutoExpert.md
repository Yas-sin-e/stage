# RAPPORT D'EXPERT - PROJET AUTOEXPERT
## Application Web de Gestion de Garage Automobile

---

# TABLE DES MATIÈRES

1. [Introduction et Contexte du Projet](#1-introduction-et-contexte-du-projet)
2. [Dernière Modification Effectuée](#2-dernière-modification-effectuée)
3. [Analyse des Acteurs](#3-analyse-des-acteurs)
4. [Besoins Fonctionnels](#4-besoins-fonctionnels)
5. [Besoins Non Fonctionnels](#5-besoins-non-fonctionnels)
6. [Diagramme de Cas d'Utilisation Global](#6-diagramme-de-cas-dutilisation-global)
7. [Méthodologie Agile - Scrum](#7-méthodologie-agile---scrum)
8. [Product Backlog](#8-product-backlog)
9. [Release Planning](#9-release-planning)
10. [Environnement de Travail](#10-environnement-de-travail)
11. [Outils et Technologies](#11-outils-et-technologies)
12. [Architecture du Projet](#12-architecture-du-projet)
13. [Justification des Choix Techniques](#13-justification-des-choix-techniques)
14. [Conclusion](#14-conclusion)

---

# 1. INTRODUCTION ET CONTEXTE DU PROJET

## 1.1 Présentation Générale

**AutoExpert** est une application web full-stack de gestion de garage automobile développée avec la stack MERN (MongoDB, Express, React, Node.js). Ce projet a été conçu pour digitaliser et automatiser la gestion d'un garage automobile afin de faciliter la prise de rendez-vous pour les clients, permettre une demande de devis rapide et précise, offrir un suivi en temps réel de l'état des réparations, et optimiser la gestion administrative pour le garagiste.

Le système permet aux clients de gérer leurs véhicules, prendre des rendez-vous, demander des devis et suivre l'état de leurs réparations. Les administrateurs peuvent gérer l'ensemble des opérations du garage incluant les clients, services, réservations, devis et réparations.

## 1.2 Objectifs du Projet

Les objectifs principaux du projet AutoExpert sont :

- **Permettre aux clients de s'inscrire et se connecter** de manière sécurisée
- **Permettre aux clients de gérer leurs véhicules** (ajout, modification, suppression)
- **Permettre aux clients de prendre des rendez-vous** pour des services
- **Permettre aux clients de demander des devis** pour des réparation
- **Permettre aux administrateurs de gérer l'ensemble du garage** de manière centralisée
- **Offrir un assistant IA** pour l'assistance et le diagnostic automobile

## 1.3 Type d'Application

L'application est une **Application Full-Stack MERN** (MongoDB, Express, React, Node.js) avec les caractéristiques suivantes :
- Architecture cliente-serveur moderne
- Interface utilisateur réactive et responsive
- API RESTful pour la communication
- Base de données NoSQL orientée documents

---

# 2. DERNIÈRE MODIFICATION EFFECTUÉE

## 2.1 Historique des Modifications Récentes

Selon le fichier TODO.md, la dernière modification majeure a porté sur l'amélioration du **Chat IA** pour permettre une meilleure contextualisation des conversations.

## 2.2 Détails des Modifications

### Modifications Effectuées :

| Tâche | Statut | Description |
|-------|--------|-------------|
| Modifier backend/routes/chatAI.js | ✅ Terminé | Modification pour accepter et utiliser un tableau de messages |
| Mettre à jour frontend/src/pages/client/ChatAIPage.jsx | ✅ Terminé | Envoi de l'historique de conversation au backend |
| Tester la fonctionnalité de chat | ✅ Terminé | Vérification que le contexte est maintenu |
| Optimiser les paramètres du Modelfile | ✅ Terminé | Amélioration de l'intelligence de l'IA |
| Ajouter des exemples complets et des règles spécifiques | ✅ Terminé | Configuration avancée pour de meilleures réponses |

### Spécifications Techniques des Modifications :

**Backend (chatAI.js)** :
- Passage d'un message unique à un tableau de messages dans l'appel Ollama
- Conservation du contexte de conversation

**Frontend (ChatAIPage.jsx)** :
- Envoi du tableau complet des messages (utilisateur et bot)
- Exclusion des messages système de l'historique

**Modelfile - Optimisations** :
```
FROM llama3.1
PARAMETER temperature 0.05
PARAMETER top_p 0.85
PARAMETER num_ctx 16384
PARAMETER repeat_penalty 1.3
PARAMETER num_predict 2048
PARAMETER min_p 0.1
PARAMETER typical_p 0.9
```

**Règles IA Implémentées** :
- Domaine exclusif : automotive uniquement
- Format strict de diagnostic
- Gestion multi-problèmes
- Demande automatique des données véhicule (Marque/Modèle/Année/Motorisation)
- Coûts estimés en Dinars Tunisiens (TND)
- Suggestions de réservation AutoExpert

---

# 3. ANALYSE DES ACTEURS

## 3.1 Définition des Acteurs

Un acteur représente un rôle qu'un utilisateur externe peut jouer dans son interaction avec le système. Dans le projet AutoExpert, nous avons identifié trois acteurs principaux.

### 3.1.1 Visiteur (Guest)

Le **Visiteur** représente tout utilisateur n'ayant pas encore effectué d'authentification dans le système. C'est un acteur externe qui peut uniquement consulter les informations publiques du site.

**Caractéristiques du Visiteur** :
- Accès aux pages publiques uniquement
- Peut consulter la page d'accueil
- Peut visualiser la liste des services proposés
- Peut consulter la page "À propos"
- Peut accéder à la page de contact
- Peut s'inscrire pour devenir client
- Peut se connecter s'il possède déjà un compte

**Besoins fonctionnels du Visiteur** :
- Consulter la page d'accueil
- Découvrir les services disponibles
- Obtenir des informations sur le garage
- Créer un nouveau compte utilisateur
- Authentifier pour accéder à son espace personnel

### 3.1.2 Client

Le **Client** représente l'utilisateur authentifié ayant le rôle "client" dans le système. C'est le principal utilisateur de l'application qui utilise les services du garage.

**Caractéristiques du Client** :
- Utilisateur authentifié avec un compte actif
- Possède un ou plusieurs véhicules
- Peut réserver des services
- Peut demander des devis
- Peut suivre ses réparations
- Peut dialoguer avec l'assistant IA

**Besoins fonctionnels du Client** :
- Gérer son profil utilisateur
- Gérer ses véhicules (ajouter, modifier, supprimer)
- Consulter les services disponibles
- Créer des réservations pour des services
- Consulter l'historique de ses réservations
- Annuler une réservation en attente
- Soumettre des demandes de devis
- Consulter ses devis et leur statut
- Accepter ou refuser un devis
- Suivre l'état de ses réparations
- Dialoguer avec l'assistant virtuel IA
- Consulter et modifier ses informations personnelles
- Changer son mot de passe

### 3.1.3 Administrateur (Admin)

L'**Administrateur** représente le gestionnaire du garage qui a accès à toutes les fonctionnalités administratives du système. Il possède le rôle "admin" et gère l'ensemble des opérations.

**Caractéristiques de l'Administrateur** :
- Accès complet à toutes les fonctionnalités
- Gestion des clients
- Gestion des services
- Gestion des réservations
- Gestion des devis
- Gestion des réparations
- Tableau de bord analytique

**Besoins fonctionnels de l'Administrateur** :
- Consulter le tableau de bord avec statistiques globales
- Gérer les clients (consulter, activer/désactiver, supprimer)
- Consulter et supprimer tous les véhicules
- Créer, modifier, supprimer des services
- Consulter, accepter ou refuser les réservations
- Élaborer des devis détaillés pour les clients
- Modifier les devis existants
- Consulter, accepter, refuser, supprimer tous les devis
- Démarrer, suivre, terminer et livrer les réparations
- Consulter les statistiques et revenus

## 3.2 Tableau Récapitulatif des Acteurs

| Acteur | Rôle | Accès | Permissions |
|--------|------|-------|-------------|
| Visiteur | Guest | Pages publiques | Consultation seule |
| Client | User | Pages client | CRUD sur ses données |
| Administrateur | Admin | Pages admin | Contrôle total |

---

# 4. BESOINS FONCTIONNELS

## 4.1 Gestion de l'Authentification et des Utilisateurs

### 4.1.1 Inscription des Utilisateurs

L'application doit permettre à un utilisateur de créer un compte en fournissant les informations suivantes : nom, email, téléphone et mot de passe. L'email doit être unique dans le système et le mot de passe doit contenir au minimum 6 caractères. Par défaut, un nouvel utilisateur aura le rôle de « client ».

Cette fonctionnalité permet aux nouveaux clients de s'enregistrer sur la plateforme de manière autonome sans intervention d'un administrateur.

**Route API** : `POST /api/auth/register`

**Paramètres requis** :
- name (String, requis)
- email (String, requis, unique)
- password (String, requis, min 6 caractères)
- phone (String, requis)

### 4.1.2 Connexion des Utilisateurs

L'application doit permettre à un utilisateur de se connecter avec son email et mot de passe. Un token JWT (JSON Web Token) doit être généré et renvoyé en cas de succès. Le token doit être valide pendant 30 jours.

Cette fonctionnalité permet l'authentification sécurisée des utilisateurs et l'accès aux fonctionnalités protégées.

**Route API** : `POST /api/auth/login`

**Paramètres requis** :
- email (String, requis)
- password (String, requis)

### 4.1.3 Gestion du Profil Utilisateur

L'utilisateur doit pouvoir consulter son profil, modifier ses informations personnelles (nom, téléphone) et changer son mot de passe.

Cette fonctionnalité permet à chaque utilisateur de maintenir ses informations à jour.

**Routes API** :
- `GET /api/auth/me` - Consulter le profil
- `PUT /api/auth/profile` - Modifier le profil
- `PUT /api/auth/change-password` - Changer le mot de passe

### 4.1.4 Gestion des Rôles

Le système doit distinguer entre deux rôles : « client » et « admin ». L'accès à certaines fonctionnalités doit être réservé à l'administrateur.

Cette fonctionnalité permet de sécuriser l'accès aux fonctionnalités administratives.

## 4.2 Gestion des Véhicules

### 4.2.1 Ajout d'un Véhicule

L'utilisateur doit pouvoir ajouter un véhicule à son compte. Les informations requises sont : marque, modèle, année, immatriculation, numéro VIN, kilométrage et couleur. L'immatriculation doit être unique dans le système.

Cette fonctionnalité permet au client d'enregistrer son véhicule pour pouvoir ensuite effectuer des réservations et demandes de devis.

**Route API** : `POST /api/vehicles`

**Paramètres requis** :
- make/brand (String, requis)
- model (String, requis)
- year (Number, requis)
- licensePlate (String, requis, unique)
- VIN (String, requis)
- mileage (Number, optionnel)
- color (String, optionnel)

### 4.2.2 Consultation des Véhicules

L'utilisateur doit pouvoir voir la liste de ses véhicules. L'administrateur doit pouvoir voir tous les véhicules de tous les utilisateurs.

Cette fonctionnalité permet le suivi des véhicules par chaque client et la supervision globale par l'administrateur.

**Routes API** :
- `GET /api/vehicles` - Véhicules du client connecté
- `GET /api/admin/vehicles` - Tous les véhicules (admin)

### 4.2.3 Modification d'un Véhicule

L'utilisateur doit pouvoir modifier les informations de son véhicule.

Cette fonctionnalité permet de mettre à jour les informations du véhicule (kilométrage, couleur, etc.).

**Route API** : `PUT /api/vehicles/:id`

### 4.2.4 Suppression d'un Véhicule

L'utilisateur doit pouvoir supprimer un véhicule de son compte. La suppression du véhicule ne doit pas supprimer les devis et réparations associés.

Cette fonctionnalité permet au client de gérer sa flotte de véhicules.

**Route API** : `DELETE /api/vehicles/:id`

## 4.3 Gestion des Services

### 4.3.1 Consultation des Services

L'application doit afficher la liste des services proposés par le garage. Les services doivent être catégorisés (Entretien, Réparation, Diagnostic, Carrosserie). Les informations affichées pour chaque service sont : nom, description, prix de base, temps estimé.

Cette fonctionnalité permet aux clients de découvrir les services disponibles.

**Route API** : `GET /api/services`

### 4.3.2 Gestion des Services (Admin)

L'administrateur doit pouvoir créer un nouveau service, modifier un service existant, supprimer un service et activer ou désactiver un service.

Cette fonctionnalité permet à l'administrateur de maintenir le catalogue de services à jour.

**Routes API** :
- `POST /api/admin/services` - Créer un service
- `PUT /api/services/:id` - Modifier un service
- `DELETE /api/services/:id` - Supprimer un service

## 4.4 Gestion des Réservations

### 4.4.1 Création d'une Réservation

L'utilisateur doit pouvoir prendre un rendez-vous pour un service. Les informations requises sont : véhicule, service, date et heure, notes supplémentaires. La date de réservation doit être supérieure à la date actuelle.

Cette fonctionnalité permet au client de planifier sa visite au garage.

**Route API** : `POST /api/reservations`

**Paramètres requis** :
- vehicleId (ObjectId, requis)
- serviceId (ObjectId, requis)
- date (Date, requis)
- notes (String, optionnel)

### 4.4.2 Consultation des Réservations

L'utilisateur doit pouvoir voir l'historique de ses réservations. L'administrateur doit pouvoir voir toutes les réservations.

**Routes API** :
- `GET /api/reservations` - Réservations du client
- `GET /api/admin/reservations` - Toutes les réservations (admin)

### 4.4.3 Gestion des Réservations (Admin)

L'administrateur doit pouvoir accepter une réservation, refuser une réservation avec motif. En cas d'acceptation, un devis automatique doit être généré.

**Route API** : `PUT /api/admin/reservations/:id`

### 4.4.4 Annulation d'une Réservation

L'utilisateur doit pouvoir annuler sa réservation si elle est en attente.

**Route API** : `DELETE /api/reservations/:id`

## 4.5 Gestion des Devis

### 4.5.1 Demande de Devis

L'utilisateur doit pouvoir soumettre une demande de devis. Les informations requises sont : véhicule concerné, service désiré, description du problème, dates souhaitées.

Cette fonctionnalité permet au client d'obtenir une estimation de coût pour les réparations.

**Route API** : `POST /api/devis`

### 4.5.2 Consultation des Devis

L'utilisateur doit pouvoir voir ses devis avec leur statut. L'administrateur doit pouvoir voir tous les devis.

**Routes API** :
- `GET /api/devis` - Devis du client
- `GET /api/admin/devis` - Tous les devis (admin)

### 4.5.3 Élaboration du Devis (Admin)

L'administrateur doit pouvoir créer un devis détaillé, spécifier le montant total, les dates de début et fin, la liste des articles avec quantités et prix unitaires. Le système doit valider que la date de début est inférieure à la date de fin.

**Route API** : `POST /api/admin/devis`

### 4.5.4 Traitement du Devis

L'utilisateur doit pouvoir accepter ou refuser un devis. En cas d'acceptation, une réparation doit être automatiquement créée.

**Routes API** :
- `PUT /api/devis/:id/accept` - Accepter le devis
- `PUT /api/devis/:id/reject` - Refuser le devis

### 4.5.5 Modification et Suppression des Devis

L'administrateur doit pouvoir modifier et supprimer un devis.

## 4.6 Gestion des Réparations

### 4.6.1 Suivi des Réparations

L'utilisateur doit pouvoir suivre l'état de ses réparations. Les statuts possibles sont : « pending » (en attente), « in_progress » (en cours), « completed » (terminée), « delivered » (livrée).

**Routes API** :
- `GET /api/reparations` - Réparations du client
- `GET /api/admin/reparations` - Toutes les réparations (admin)

### 4.6.2 Gestion des Réparations (Admin)

L'administrateur doit pouvoir démarrer une réparation, marquer une réparation comme terminée, livr

**Route API** : `POST /api/admin/reparations`
**Route API** : `PUT /api/admin/reparations/:id`

## 4.7 Tableau de Bord Administratif

### 4.7.1 Statistiques Globales

L'administrateur doit pouvoir consulter des statistiques globales incluant le nombre total de clients, le nombre total de véhicules, le nombre de réservations (totales, en attente), le nombre de devis (totaux, en attente), le nombre de réparations (totales, en cours, terminées), et les revenus totaux (réparations livrées).

## 4.8 Chat avec l'IA

### 4.8.1 Assistant Virtuel

L'utilisateur doit pouvoir dialoguer avec un assistant IA. L'IA doit pouvoir répondre aux questions sur les services, les procédures, le diagnostic automobile, etc.

L'assistant AutoExpert est configuré avec des règles strictes :
- Domaine exclusif : automotive uniquement
- Demande des données véhicule (Marque/Modèle/Année/Motorisation)
- Diagnostic structuré avec causes, vérifications, solutions
- Coûts estimés en TND
- Suggestions de réservation

**Route API** : `POST /api/chat`

---

# 5. BESOINS NON FONCTIONNELS

## 5.1 Performance

Le temps de réponse des pages ne doit pas dépasser 3 secondes. Les requêtes API doivent être traitées en moins de 2 secondes. L'application doit pouvoir gérer un nombre croissant d'utilisateurs sans dégradation significative des performances.

**Métriques de performance** :
- Temps de chargement initial < 3 secondes
- Temps de réponse API < 2 secondes
- Mise en cache des services (5 minutes)
- Optimisation des requêtes MongoDB

## 5.2 Sécurité

Les mots de passe doivent être chiffrés avec bcrypt. Les routes sensibles doivent être protégées par authentification JWT. Les rôles doivent être vérifiés pour l'accès aux fonctionnalités administratives.

**Mesures de sécurité** :
- Hachage des mots de passe avec bcryptjs
- Authentification JWT avec expiration de 30 jours
- Vérification des rôles (middleware admin)
- Stockage sécurisé des tokens dans localStorage
- Headers Authorization Bearer

## 5.3 Convivialité et Ergonomie

L'interface doit être intuitive et facile à utiliser. Les messages d'erreur doivent être clairs et explicites. Les formulaires doivent avoir une validation en temps réel.

**Principes d'ergonomie** :
- Navigation intuitive avec barre de navigation responsive
- Messages d'erreur explicites via toasts
- Validation en temps réel des formulaires
- Feedback visuel pour toutes les actions
- Design épuré et moderne avec Tailwind CSS

## 5.4 Maintenabilité

Le code doit être structuré et commenté. L'architecture doit permettre l'ajout de nouvelles fonctionnalités facilement. La séparation claire entre frontend et backend facilite la maintenance.

**Principes de maintenabilité** :
- Architecture MVC côté backend
- Composants réutilisables côté frontend
- Documentation complète du code
- Structure de dossiers logique
- Convention de nommage cohérente

## 5.5 Disponibilité

L'application doit être disponible 24h/24 et 7j/7. En cas d'erreur, des messages d'erreur appropriés doivent être affichés.

**Mesures de disponibilité** :
- Gestion centralisée des erreurs (middleware error handler)
- Messages d'erreur clairs pour l'utilisateur
- Redirection automatique en cas d'expiration de session

## 5.6 Compatibilité

L'application doit être compatible avec les navigateurs modernes (Chrome, Firefox, Safari, Edge). Elle doit être responsive pour s'adapter aux différentes tailles d'écran (mobile, tablette, desktop).

**Navigateurs supportés** :
- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

**Tailles d'écran supportées** :
- Mobile : < 640px
- Tablette : 640px - 1024px
- Desktop : > 1024px

## 5.7 Évolutivité

L'application doit pouvoir évoluer pour ajouter de nouvelles fonctionnalités sans refonte majeure. L'architecture MERN permet une évolutivité horizontale et verticale.

**Capacités d'évolutivité** :
- Ajout de nouveaux modules (paiement, notifications)
- Extension de la base de données
- Mise en place de microservices si nécessaire

---

# 6. DIAGRAMME DE CAS D'UTILISATION GLOBAL

## 6.1 Vue d'Ensemble

Le diagramme de cas d'utilisation global présente les interactions entre les trois acteurs (Visiteur, Client, Administrateur) et les différentes fonctionnalités du système.

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

## 6.2 Cas d'Utilisation par Acteur

### 6.2.1 Visiteur

| Cas d'Utilisation | Description |
|-------------------|-------------|
| Consulter-accueil | Voir la page d'accueil du site |
| Consulter-services | Voir la liste des services proposés |
| Consulter-about | Voir la page à propos |
| Consulter-contact | Voir la page de contact |
| S'inscrire | Créer un nouveau compte utilisateur |
| Se-connecter | Authentifier pour accéder à son compte |

### 6.2.2 Client

| Cas d'Utilisation | Description |
|-------------------|-------------|
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
| Changer-mot-de-passe | Modifier son mot de passe |

### 6.2.3 Administrateur

| Cas d'Utilisation | Description |
|-------------------|-------------|
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

# 7. MÉTHODOLOGIE AGILE - SCRUM

## 7.1 Présentation de l'Équipe

Le projet AutoExpert est géré selon la méthodologie agile Scrum, adaptée aux équipes de développement small to medium.

### 7.1.1 Composition de l'Équipe

| Rôle | Nom | Responsabilités |
|------|-----|-----------------|
| **Scrum Master** | Abir Ben Cheikh | Facilitation des cérémonies, elimination des obstacles, protection de l'équipe |
| **Product Owner** | Skander Belloum | Définition des fonctionnalités,priorisation du backlog, validation des livrables |
| **Développeur** | Yassine Aounallah | Développement des fonctionnalités, tests, documentation |

### 7.1.2 Rôles et Responsabilités

**Scrum Master (Abir Ben Cheikh)** :
- Organiser et animer les cérémonies Scrum (Daily Standup, Sprint Planning, Sprint Review, Sprint Retrospective)
- Eliminer les obstacles qui freinent l'équipe
- Assurer le respect des pratiques agiles
- Faciliter la communication au sein de l'équipe

**Product Owner (Skander Belloum)** :
- Définir la vision du produit
- Gérer et prioriser le Product Backlog
- Accepter ou rejeter les user stories terminées
- Communiquer avec les parties prenantes

**Développeur (Yassine Aounallah)** :
- Estimer les tâches et les user stories
- Développer les fonctionnalités
- Écrire les tests unitaires et d'intégration
- Participer aux revues de code
- Maintenir la documentation technique

## 7.2 Événements Scrum

### 7.2.1 Sprint

Un Sprint est une période de 2 semaines pendant laquelle une fonctionnalité potentiellement livrable est créée. Chaque sprint comprend :

- **Objectif du Sprint** : But à atteindre
- **Plan de Sprint** : Travaux à réaliser
- **Équipe Scrum** : Les membres responsables
- **Estimations** : Points de story
- **Revues** : Démonstration du travail

### 7.2.2 Cérémonies

| Cérémonie | Fréquence | Durée | Objectif |
|----------|-----------|-------|----------|
| Daily Standup | Quotidien | 15 min | Synchronisation quotidienne |
| Sprint Planning | Début de sprint | 2-4 heures | Planification du sprint |
| Sprint Review | Fin de sprint | 1-2 heures | Démonstration des fonctionnalités |
| Sprint Retrospective | Fin de sprint | 1-1.5 heures | Amélioration continue |

## 7.3 Artefacts Scrum

### 7.3.1 Product Backlog

Le Product Backlog est une liste ordonnée de tout ce qui pourrait être nécessaire dans le produit. Il est géré par le Product Owner.

### 7.3.2 Sprint Backlog

Le Sprint Backlog est la liste des éléments du Product Backlog sélectionnés pour le Sprint,加上 un plan pour livrer le produit.

### 7.3.3 Increment

Un Increment est la somme de tous les éléments du Product Backlog complétés durant le Sprint et la valeur des increments des sprints précédents.

---

# 8. PRODUCT BACKLOG

## 8.1 Structure du Product Backlog

Le Product Backlog est organisé selon une hiérarchie : **Epic → Feature → User Story**.

### 8.1.1 Définitions

**Epic** : Une grande fonctionnalité ou un objectif stratégique qui peut être分解 en plusieurs features et user stories.

**Feature** : Une fonctionnalité de niveau moyen qui regroupe plusieurs user stories liées.

**User Story** : Une description concise d'une fonctionnalité du point de vue de l'utilisateur final. Format : "En tant que [rôle], je veux [fonctionnalité], afin de [bénéfice]."

## 8.2 Épics du Projet AutoExpert

### Epic 1 : Gestion des Utilisateurs
### Epic 2 : Gestion des Véhicules
### Epic 3 : Gestion des Services
### Epic 4 : Gestion des Réservations
### Epic 5 : Gestion des Devis
### Epic 6 : Gestion des Réparations
### Epic 7 : Chat IA
### Epic 8 : Tableau de Bord Administratif

---

## 8.3 Product Backlog Détaillé

| ID | Epic | Feature | User Story | Priorité |
|----|------|---------|------------|----------|
| **EP1** | **Gestion des Utilisateurs** | | | Haute |
| US1.1 | | Inscription | En tant que visiteur, je veux m'inscrire sur la plateforme, afin de créer un compte et accéder aux services | Haute |
| US1.2 | | Connexion | En tant qu'utilisateur, je veux me connecter, afin d'accéder à mon espace personnel | Haute |
| US1.3 | | Gestion profil | En tant que client, je veux modifier mes informations personnelles, afin de maintenir mes données à jour | Moyenne |
| US1.4 | | Authentification JWT | En tant que développeur, je veux implémenter l'authentification JWT, afin de sécuriser les accès | Haute |
| **EP2** | **Gestion des Véhicules** | | | Haute |
| US2.1 | | Ajout véhicule | En tant que client, je veux ajouter un véhicule à mon compte, afin de pouvoir réserver des services | Haute |
| US2.2 | | Liste véhicules | En tant que client, je veux voir la liste de mes véhicules, afin de les gérer | Haute |
| US2.3 | | Modification véhicule | En tant que client, je veux modifier les informations de mon véhicule, afin de les mettre à jour | Moyenne |
| US2.4 | | Suppression véhicule | En tant que client, je veux supprimer un véhicule, afin de gérer ma flotte | Moyenne |
| **EP3** | **Gestion des Services** | | | Haute |
| US3.1 | | Consultation services | En tant que client, je veux consulter les services proposés, afin de choisir celui qui me convient | Haute |
| US3.2 | | CRUD Services (Admin) | En tant qu'admin, je veux gérer les services, afin de maintenir le catalogue à jour | Haute |
| **EP4** | **Gestion des Réservations** | | | Haute |
| US4.1 | | Création réservation | En tant que client, je veux créer une réservation, afin de planifier une visite au garage | Haute |
| US4.2 | | Liste réservations | En tant que client, je veux voir mes réservations, afin de suivre mes rendez-vous | Haute |
| US4.3 | | Annulation réservation | En tant que client, je veux annuler une réservation, afin de modifier mes plans | Moyenne |
| US4.4 | | Validation admin | En tant qu'admin, je veux valider les réservations, afin de gérer le planning | Haute |
| **EP5** | **Gestion des Devis** | | | Haute |
| US5.1 | | Demande devis | En tant que client, je veux demander un devis, afin d'obtenir une estimation | Haute |
| US5.2 | | Liste devis client | En tant que client, je veux voir mes devis, afin de suivre leur statut | Haute |
| US5.3 | | Acceptation devis | En tant que client, je veux accepter un devis, afin de lancer les réparations | Haute |
| US5.4 | | Création devis admin | En tant qu'admin, je veux créer un devis détaillé, afin de proposer une estimation au client | Haute |
| **EP6** | **Gestion des Réparations** | | | Haute |
| US6.1 | | Suivi réparations | En tant que client, je veux suivre mes réparations, afin de savoir où en est mon véhicule | Haute |
| US6.2 | | Création réparation | En tant qu'admin, je veux créer une réparation, afin de suivre l'intervention | Haute |
| US6.3 | | Mise à jour statut | En tant qu'admin, je veux mettre à jour le statut, afin de tenir le client informé | Haute |
| **EP7** | **Chat IA** | | | Moyenne |
| US7.1 | | Chat basic | En tant que client, je veux discuter avec un assistant IA, afin d'obtenir des informations | Moyenne |
| US7.2 | | Diagnostic automobile | En tant que client, je veux obtenir un diagnostic, afin de comprendre les problèmes de mon véhicule | Moyenne |
| US7.3 | | Historique conversation | En tant que client, je veux maintenir le contexte, afin d'avoir une conversation cohérente | Moyenne |
| **EP8** | **Tableau de Bord Admin** | | | Haute |
| US8.1 | | Statistiques | En tant qu'admin, je veux voir les statistiques, afin d'avoir une vue d'ensemble | Haute |
| US8.2 | | Gestion clients | En tant qu'admin, je veux gérer les clients, afin de maintenir la base utilisateurs | Haute |
| US8.3 | | Graphiques | En tant qu'admin, je veux voir des graphiques, afin d'analyser les données | Moyenne |

---

## 8.4 Détail des User Stories (Sélection)

### US1.1 : Inscription Utilisateur

**En tant que** visitor,
**Je veux** m'inscrire sur la plateforme,
**Afin de** créer un compte et accéder aux services.

**Critères d'acceptation** :
- [ ] Le formulaire d'inscription affiche les champs : nom, email, téléphone, mot de passe
- [ ] La validation de l'email est effectuée
- [ ] Le mot de passe doit contenir au moins 6 caractères
- [ ] Un message d'erreur s'affiche si l'email existe déjà
- [ ] L'utilisateur est redirigé vers le dashboard après inscription
- [ ] Un email de confirmation est envoyé (optionnel)

**Estimation** : 3 points de story

---

### US2.1 : Ajout d'un Véhicule

**En tant que** client,
**Je veux** ajouter un véhicule à mon compte,
**Afin de** pouvoir réserver des services.

**Critères d'acceptation** :
- [ ] Le formulaire d'ajout contient : marque, modèle, année, immatriculation, VIN, kilométrage
- [ ] L'immatriculation doit être unique
- [ ] Tous les champs obligatoires sont validés
- [ ] Le véhicule apparaît dans la liste après création
- [ ] Un message de confirmation s'affiche

**Estimation** : 5 points de story

---

### US4.1 : Création d'une Réservation

**En tant que** client,
**Je veux** créer une réservation,
**Afin de** planifier une visite au garage.

**Critères d'acceptation** :
- [ ] Le client peut sélectionner un de ses véhicules
- [ ] Le client peut sélectionner un service
- [ ] Le client peut choisir une date et heure
- [ ] La date doit être supérieure à aujourd'hui
- [ ] Un email de confirmation est envoyé
- [ ] La réservation apparaît dans le tableau de bord

**Estimation** : 8 points de story

---

### US5.3 : Acceptation d'un Devis

**En tant que** client,
**Je veux** accepter un devis,
**Afin de** lancer les réparations.

**Critères d'acceptation** :
- [ ] Le client peut voir les détails du devis
- [ ] Le client peut accepter le devis
- [ ] Le client peut refuser le devis
- [ ] Une réparation est automatiquement créée
- [ ] L'admin est notifié de l'acceptation
- [ ] Le statut du devis est mis à jour

**Estimation** : 5 points de story

---

### US7.2 : Diagnostic Automobile

**En tant que** client,
**Je veux** obtenir un diagnostic de mon véhicule,
**Afin de** comprendre les problèmes et obtenir une solution.

**Critères d'acceptation** :
- [ ] L'IA demande les informations du véhicule (marque, modèle, année, motorisation)
- [ ] L'IA demande le symptôme observé
- [ ] L'IA fournit un diagnostic structuré
- [ ] L'IA propose des solutions avec coûts estimés
- [ ] L'IA suggère de faire une réservation chez AutoExpert

**Estimation** : 13 points de story

---

# 9. RELEASE PLANNING

## 9.1 Stratégie de Release

Le projet AutoExpert sera livré en **3 sprints** pendant la période de stage de 1 mois. Chaque sprint correspond à une phase de développement complète avec ses propres cas d'utilisation, diagrammes de classes et diagrammes de séquence.

### Convention de Nommage

- **Sprint** : Sprint X - [Nom du Sprint]
- **Durée** : 1 semaine par sprint (3 semaines de développement + 1 semaine de consolidation)

## 9.2 Plan de Release - 3 Sprints

| Sprint | Nom du Sprint | Features Principales | Période | Estimation |
|--------|---------------|---------------------|---------|------------|
| **Sprint 1** | **Fondamentaux & Authentification** | - Structure projet<br>- Authentification JWT<br>- Inscription/Connexion<br>- Gestion utilisateurs<br>- Pages publiques | Semaine 1 | 34 points |
| **Sprint 2** | **Gestion Métier** | - CRUD Véhicules<br>- CRUD Services<br>- CRUD Réservations<br>- Gestion profil | Semaine 2 | 34 points |
| **Sprint 3** | **Devis, Réparations & Dashboard** | - Gestion Devis<br>- Gestion Réparations<br>- Dashboard Admin<br>- Chat IA<br>- Tests & Optimisations | Semaine 3 | 34 points |

---

## 9.3 DÉTAIL DES SPRINTS AVEC DIAGRAMMES

### ═══════════════════════════════════════════════════════════
### SPRINT 1 : FONDAMENTAUX & AUTHENTIFICATION
### ═══════════════════════════════════════════════════════════

**Période** : Semaine 1
**Objectif** : Mettre en place les fondations du projet et l'authentification

#### User Stories du Sprint 1

| ID | User Story | Estimation |
|----|------------|------------|
| US1.1 | En tant que visiteur, je veux m'inscrire sur la plateforme | 5 |
| US1.2 | En tant qu'utilisateur, je veux me connecter | 5 |
| US1.3 | En tant que développeur, je veux implémenter l'authentification JWT | 8 |
| US1.4 | En tant que client, je veux modifier mes informations personnelles | 3 |
| US3.1 | En tant que client, je veux consulter les services proposés | 3 |
| US1.5 | Setup projet (Backend/Frontend) | 5 |
| US1.6 | Pages publiques (Home, About, Contact) | 5 |
| **Total** | | **34 points** |

#### Cas d'Utilisation - Sprint 1

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPRINT 1 : FONDAMENTAUX                      │
│                 AUTHENTIFICATION & INSCRIPTION                   │
└─────────────────────────────────────────────────────────────────┘

                          ACTEURS
          ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
          │   VISITEUR  │    │   CLIENT    │    │   ADMIN     │
          └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
                 │                   │                   │
                 │                   │                   │
    ┌────────────▼────────────┐      │                   │
    │   CRÉER UN COMPTE       │      │                   │
    │  (Inscription)          │      │                   │
    └────────────┬────────────┘      │                   │
                 │                   │                   │
                 ▼                   │                   │
    ┌─────────────────────────────┐ │                   │
    │   SE CONNECTER              │ │                   │
    │  (Login)                    │ │                   │
    └──────────────┬──────────────┘ │                   │
                   │                │                   │
                   │◄──────────────┤                   │
                   │                │                   │
                   ▼                ▼                   ▼
    ┌─────────────────────────────────────────────────────────────┐
    │              AUTHENTIFICATION JWT (Commun)                   │
    │  • Génération token (30 jours)                               │
    │  • Vérification middleware                                   │
    │  • Gestion rôles (client/admin)                              │
    └─────────────────────────────────────────────────────────────┘
                   │                │                   │
                   │                │                   │
    ┌──────────────┴───┐   ┌───────▼───────┐   ┌──────▼──────┐
    │  CONSULTER      │   │  CONSULTER    │   │  GÉRER     │
    │  MON PROFIL     │   │  SERVICES     │   │  CLIENTS    │
    │ (Modification)  │   │ (Catalogue)   │   │ (Admin)     │
    └─────────────────┘   └───────────────┘   └─────────────┘
```

#### Diagramme de Classes - Sprint 1

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DIAGRAMME DE CLASSES - SPRINT 1                      │
│                        AUTHENTIFICATION & UTILISATEURS                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _id: ObjectId                                                            │
│ - name: String                                                             │
│ - email: String                                                            │
│ - password: String                                                          │
│ - phone: String                                                             │
│ - role: String (enum: 'client', 'admin')                                   │
│ - isActive: Boolean                                                        │
│ - createdAt: Date                                                           │
│ - updatedAt: Date                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ + pre('save'): hashPassword()                                               │
│ + comparePassword(candidatePassword): Boolean                               │
│ + generateToken(): String                                                   │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                              SERVICE                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ - _id: ObjectId                                                            │
│ - name: String                                                             │
│ - description: String                                                      │
│ - basePrice: Number                                                        │
│ - estimatedTime: String                                                    │
│ - category: String                                                         │
│ - isActive: Boolean                                                        │
│ - createdAt: Date                                                          │
│ - updatedAt: Date                                                          │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                          AUTHENTIFICATION                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ - token: String                                                            │
│ - expiresIn: Number (30 jours)                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ + verifyToken(token): Object                                               │
│ + decodeToken(token): Object                                               │
│ + hashPassword(password): String                                           │
│ + comparePassword(password, hash): Boolean                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Diagramme de Séquence - Sprint 1

```
┌─────────────────────────────────────────────────────────────────────────────┐
│               DIAGRAMME DE SÉQUENCE - INSCRIPTION                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌────────┐     ┌──────────┐     ┌────────────┐     ┌─────────┐
│ Visiteur│     │ Frontend │     │   Backend  │     │ MongoDB │
└───┬────┘     └────┬─────┘     └─────┬──────┘     └────┬────┘
    │               │                 │                 │
    │ 1.Saisie infos│                 │                 │
    │ (nom,email,mdp,téléphone)      │                 │
    │──────────────>│                 │                 │
    │               │                 │                 │
    │ 2.Appel API  │                 │                 │
    │ POST /auth/register            │                 │
    │─────────────>│                 │                 │
    │               │                 │                 │
    │               │ 3.Validation   │                 │
    │               │ des données   │                 │
    │               │───────│        │                 │
    │               │       │        │                 │
    │               │<──────┘        │                 │
    │               │                 │                 │
    │               │ 4.Hash mdp     │                 │
    │               │ (bcryptjs)     │                 │
    │               │───────│        │                 │
    │               │       │        │                 │
    │               │<──────┘        │                 │
    │               │                 │                 │
    │               │ 5.Insert User  │                 │
    │               │───────────────>│                 │
    │               │                │───────│         │
    │               │                │       │         │
    │               │                │<──────┘         │
    │               │                 │                 │
    │               │ 6.JWT Token    │                 │
    │               │<───────────────│                 │
    │               │                 │                 │
    │ 7.Confirmation│                 │                 │
    │ et redirection│                 │                 │
    │<──────────────│                 │                 │
    │               │                 │                 │
```

---

### ═══════════════════════════════════════════════════════════
### SPRINT 2 : GESTION MÉTIER
### ═══════════════════════════════════════════════════════════

**Période** : Semaine 2
**Objectif** : Implémenter la gestion des véhicules, services et réservations

#### User Stories du Sprint 2

| ID | User Story | Estimation |
|----|------------|------------|
| US2.1 | En tant que client, je veux ajouter un véhicule à mon compte | 5 |
| US2.2 | En tant que client, je veux voir la liste de mes véhicules | 3 |
| US2.3 | En tant que client, je veux modifier les informations de mon véhicule | 3 |
| US2.4 | En tant que client, je veux supprimer un véhicule | 3 |
| US3.2 | En tant qu'admin, je veux gérer les services | 8 |
| US4.1 | En tant que client, je veux créer une réservation | 8 |
| US4.2 | En tant que client, je veux voir mes réservations | 3 |
| US4.3 | En tant que client, je veux annuler une réservation | 3 |
| **Total** | | **34 points** |

#### Cas d'Utilisation - Sprint 2

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPRINT 2 : GESTION MÉTIER                   │
│           VÉHICULES | SERVICES | RÉSERVATIONS                  │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────────────────────────────┐
                    │         GESTION VÉHICULES            │
                    │  ┌──────────────────────────────┐   │
                    │  │ • Ajouter véhicule           │   │
                    │  │ • Liste véhicules            │   │
                    │  │ • Modifier véhicule          │   │
                    │  │ • Supprimer véhicule         │   │
                    │  └──────────────────────────────┘   │
                    └──────────────────┬───────────────────┘
                                       │
                    ┌──────────────────▼───────────────────┐
                    │       GESTION SERVICES               │
                    │  ┌──────────────────────────────┐   │
                    │  │ • Créer service (Admin)       │   │
                    │  │ • Liste services              │   │
                    │  │ • Modifier service (Admin)     │   │
                    │  │ • Supprimer service (Admin)   │   │
                    │  └──────────────────────────────┘   │
                    └──────────────────┬───────────────────┘
                                       │
                    ┌──────────────────▼───────────────────┐
                    │      GESTION RÉSERVATIONS           │
                    │  ┌──────────────────────────────┐   │
                    │  │ • Créer réservation          │   │
                    │  │ • Liste réservations          │   │
                    │  │ • Annuler réservation         │   │
                    │  │ • Valider (Admin)            │   │
                    │  └──────────────────────────────┘   │
                    └──────────────────────────────────────┘
```

#### Diagramme de Classes - Sprint 2

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DIAGRAMME DE CLASSES - SPRINT 2                         │
│                      GESTION VÉHICULES, SERVICES, RÉSERVATIONS              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐       ┌─────────────────────────────┐
│           USER             │       │          VEHICLE            │
├─────────────────────────────┤       ├─────────────────────────────┤
│ - _id: ObjectId            │       │ - _id: ObjectId            │
│ - name: String             │       │ - brand: String            │
│ - email: String            │       │ - model: String            │
│ - password: String         │       │ - year: Number             │
│ - phone: String            │       │ - licensePlate: String     │
│ - role: String            │◄──────│ - VIN: String              │
│ - isActive: Boolean       │   1:N │ - mileage: Number         │
│ - createdAt: Date         │       │ - color: String           │
│ - updatedAt: Date         │       │ - createdAt: Date         │
└─────────────────────────────┘       │ - updatedAt: Date         │
                                     └────────────┬──────────────┘
                                                  │
                                                  │ N:1
                                                  │
┌─────────────────────────────┐       ┌──────────▼──────────────┐
│          SERVICE           │       │       RESERVATION        │
├─────────────────────────────┤       ├─────────────────────────┤
│ - _id: ObjectId           │       │ - _id: ObjectId          │
│ - name: String            │       │ - date: Date             │
│ - description: String     │       │ - time: String           │
│ - basePrice: Number      │       │ - status: String         │
│ - estimatedTime: String   │       │ - notes: String          │
│ - category: String        │       │ - createdAt: Date        │
│ - isActive: Boolean      │       │ - updatedAt: Date        │
│ - createdAt: Date        │       ├─────────────────────────┤
│ - updatedAt: Date        │       │ + user: User (ref)       │
└─────────────────────────────┘       │ + vehicle: Vehicle(ref) │
                                     │ + service: Service(ref) │
                                     └─────────────────────────┘
```

#### Diagramme de Séquence - Sprint 2 (Création Réservation)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│               DIAGRAMME DE SÉQUENCE - CRÉATION RÉSERVATION                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌────────┐     ┌──────────┐     ┌────────────┐     ┌─────────┐
│ Client │     │ Frontend │     │   Backend  │     │ MongoDB │
└───┬────┘     └────┬─────┘     └─────┬──────┘     └────┬────┘
    │               │                 │                 │
    │ 1.Sélection véhicule & service│                 │
    │ et date      │                 │                 │
    │──────────────>│                 │                 │
    │               │                 │                 │
    │ 2.Appel API   │                 │                 │
    │ POST /reservations            │                 │
    │ (avec JWT token)              │                 │
    │─────────────>│                 │                 │
    │               │                 │                 │
    │               │ 3.Authentification            │
    │               │ (Vérif token JWT)            │
    │               │───────│        │                 │
    │               │       │        │                 │
    │               │<──────┘        │                 │
    │               │                 │                 │
    │               │ 4.Vérification données       │
    │               │ (véhicule, service, date)    │
    │               │───────│        │                 │
    │               │       │        │                 │
    │               │<──────┘        │                 │
    │               │                 │                 │
    │               │ 5.Créer Réservation          │
    │               │ (status: pending)            │
    │               │──────────────>│                 │
    │               │                │───────│         │
    │               │                │       │         │
    │               │                │<──────┘         │
    │               │                 │                 │
    │               │ 6.Réponse avec Réservation   │
    │               │<───────────────│                 │
    │               │                 │                 │
    │ 7.Confirmation│                 │                 │
    │ et redirection│                 │                 │
    │<──────────────│                 │                 │
    │               │                 │                 │
```

---

### ═══════════════════════════════════════════════════════════
### SPRINT 3 : DEVIS, RÉPARATIONS & DASHBOARD
### ═══════════════════════════════════════════════════════════

**Période** : Semaine 3
**Objectif** : Finaliser avec les devis, réparations, dashboard admin et chat IA

#### User Stories du Sprint 3

| ID | User Story | Estimation |
|----|------------|------------|
| US5.1 | En tant que client, je veux demander un devis | 8 |
| US5.2 | En tant que client, je veux voir mes devis | 3 |
| US5.3 | En tant que client, je veux accepter un devis | 5 |
| US5.4 | En tant qu'admin, je veux créer un devis détaillé | 8 |
| US6.1 | En tant que client, je veux suivre mes réparations | 5 |
| US6.2 | En tant qu'admin, je veux gérer les réparations | 5 |
| US8.1 | En tant qu'admin, je veux voir les statistiques | 5 |
| US7.1 | En tant que client, je veux dialoguer avec l'IA | 5 |
| **Total** | | **44 points** |

#### Cas d'Utilisation - Sprint 3

```
┌─────────────────────────────────────────────────────────────────┐
│               SPRINT 3 : DEVIS, RÉPARATIONS & DASHBOARD        │
│                    CHAT IA & STATISTIQUES                        │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────┐
    │                    GESTION DEVIS                        │
    │  ┌─────────────────────┐    ┌─────────────────────┐   │
    │  │      CLIENT          │    │       ADMIN          │   │
    │  ├─────────────────────┤    ├─────────────────────┤   │
    │  │ • Demander devis    │    │ • Créer devis       │   │
    │  │ • Voir mes devis   │    │ • Modifier devis    │   │
    │  │ • Accepter devis    │    │ • Accepter/Refuser  │   │
    │  │ • Refuser devis     │    │ • Supprimer devis   │   │
    │  └─────────────────────┘    └─────────────────────┘   │
    └────────────────────┬────────────────────────────────────┘
                         │
                         │ Génère
                         ▼
    ┌─────────────────────────────────────────────────────────┐
    │                  GESTION RÉPARATIONS                     │
    │  ┌─────────────────────┐    ┌─────────────────────┐   │
    │  │      CLIENT          │    │       ADMIN          │   │
    │  ├─────────────────────┤    ├─────────────────────┤   │
    │  │ • Suivre réparation │    │ • Créer réparation  │   │
    │  │ • Voir historique   │    │ • Mettre à jour     │   │
    │  │                     │    │ • Terminer/Livrer   │   │
    │  └─────────────────────┘    └─────────────────────┘   │
    └────────────────────┬────────────────────────────────────┘
                         │
    ┌────────────────────▼────────────────────────────────────┐
    │                 TABLEAU DE BORD ADMIN                    │
    │  ┌─────────────────────────────────────────────────────┐│
    │  │ • Statistiques (clients, véhicules, revenus)      ││
    │  │ • Graphiques (réservations, revenus)              ││
    │  │ • Gestion clients                                 ││
    │  └─────────────────────────────────────────────────────┘│
    └────────────────────┬────────────────────────────────────┘
                         │
    ┌────────────────────▼────────────────────────────────────┐
    │                      CHAT IA                            │
    │  ┌─────────────────────────────────────────────────────┐│
    │  │ • Diagnostic automobile                            ││
    │  │ • Questions sur services                           ││
    │  │ • Conseils entretien                               ││
    │  │ • Suggestion de réservation                        ││
    │  └─────────────────────────────────────────────────────┘│
    └─────────────────────────────────────────────────────────┘
```

#### Diagramme de Classes - Sprint 3

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DIAGRAMME DE CLASSES - SPRINT 3                          │
│                    DEVIS, RÉPARATIONS, DASHBOARD                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐       ┌─────────────────────────────┐
│          DEVIS             │       │       REPARATION            │
├─────────────────────────────┤       ├─────────────────────────────┤
│ - _id: ObjectId            │       │ - _id: ObjectId            │
│ - description: String      │       │ - status: String           │
│ - totalPrice: Number      │       │ - startDate: Date          │
│ - status: String          │       │ - endDate: Date            │
│ - validUntil: Date        │       │ - notes: String             │
│ - createdAt: Date         │       │ - createdAt: Date          │
│ - updatedAt: Date         │       │ - updatedAt: Date          │
├─────────────────────────────┤       ├─────────────────────────────┤
│ + user: User (ref)        │       │ + user: User (ref)         │
│ + vehicle: Vehicle (ref)   │       │ + vehicle: Vehicle (ref)   │
│ + services: Service[]      │       │ + services: Service[]      │
│ + devis: Devis (ref)      │◄──────│ + devis: Devis (ref)       │
└────────────┬──────────────┘       └─────────────────────────────┘
             │ 1:1
             │ Génère
             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DASHBOARD ADMIN                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ - totalUsers: Number                                                        │
│ - totalVehicles: Number                                                    │
│ - totalReservations: Number                                                │
│ - totalDevis: Number                                                       │
│ - totalReparations: Number                                                 │
│ - totalRevenue: Number                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getStatistics(): Object                                                  │
│ + getReservationsChart(): Array                                            │
│ + getRevenueChart(): Array                                                 │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                           CHAT IA                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ - messages: Array                                                           │
│ - context: Object                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ + sendMessage(userMessage): String                                         │
│ + getDiagnostic(vehicleInfo, symptoms): Object                             │
│ + maintainContext(): void                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Diagramme de Séquence - Sprint 3 (Acceptation Devis)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│            DIAGRAMME DE SÉQUENCE - ACCEPTATION DEVIS & CRÉATION            │
│                         RÉPARATION                                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌────────┐     ┌──────────┐     ┌────────────┐     ┌─────────┐
│ Client │     │ Frontend │     │   Backend  │     │ MongoDB │
└───┬────┘     └────┬─────┘     └─────┬──────┘     └────┬────┘
    │               │                 │                 │
    │ 1.Voir devis │                 │                 │
    │ avec détails │                 │                 │
    │──────────────>│                 │                 │
    │               │                 │                 │
    │ 2.Accepter devis              │                 │
    │──────────────>│                 │                 │
    │               │                 │                 │
    │ 3.API PUT    │                 │                 │
    │ /devis/:id/accept            │                 │
    │─────────────>│                 │                 │
    │               │                 │                 │
    │               │ 4.Authentification            │
    │               │───────│        │                 │
    │               │       │        │                 │
    │               │<──────┘        │                 │
    │               │                 │                 │
    │               │ 5.Charger Devis│                 │
    │               │───────────────>│                 │
    │               │                │───────│         │
    │               │                │       │         │
    │               │                │<──────┘         │
    │               │                 │                 │
    │               │ 6.Mettre à jour status='accepted'│
    │               │───────────────>│                 │
    │               │                │───────│         │
    │               │                │       │         │
    │               │                │<──────┘         │
    │               │                 │                 │
    │               │ 7.Créer Reparation            │
    │               │ (status: in_progress)         │
    │               │───────────────>│                 │
    │               │                │───────│         │
    │               │                │       │         │
    │               │                │<──────┘         │
    │               │                 │                 │
    │               │ 8.Réponse: Devis + Reparation │
    │               │<───────────────│                 │
    │               │                 │                 │
    │ 9.Confirmation│                 │                 │
    │ et notification│                 │                 │
    │<──────────────│                 │                 │
    │               │                 │                 │
```

---

## 9.4 Récapitulatif des Sprints

| Sprint | Nom | Points | Semaine | Livrable |
|--------|-----|--------|---------|----------|
| 1 | Fondamentaux & Auth | 34 | 1 | Application avec authentification |
| 2 | Gestion Métier | 34 | 2 | CRUD complet véhicules, services, réservations |
| 3 | Devis & Dashboard | 44 | 3 | Devis, réparations, admin, chat IA |

**Total : 112 points de story pour 3 sprints**

---

# 10. ENVIRONNEMENT DE TRAVAIL

## 10.1 Configuration Matérielle

### 10.1.1 Équipement de Développement

Le développement du projet AutoExpert est réalisé sur un ordinateur portable Dell G15 avec les caractéristiques suivantes :

| Composant | Spécification |
|-----------|----------------|
| **Modèle** | Dell G15 |
| **Processeur (CPU)** | Intel Core i5-11400H |
| **Carte Graphique (GPU)** | NVIDIA GeForce RTX 3050 |
| **Mémoire Vive (RAM)** | 16 GB DDR4 |
| **Stockage (Disque Dur)** | 512 GB SSD NVMe |
| **Système d'Exploitation** | Windows 11 Pro x64 |

### 10.1.2 Détails des Composants

**Processeur Intel Core i5-11400H** :
- Architecture : Rocket Lake
- Fréquence de base : 2.7 GHz
- Fréquence Turbo : 4.5 GHz
- Nombre de cœurs : 6
- Nombre de threads : 12
- Cache : 12 MB Intel Smart Cache

**Carte Graphique NVIDIA GeForce RTX 3050** :
- Architecture : Ampere
- Mémoire VRAM : 4 GB GDDR6
- CUDA Cores : 2048
- Fréquence GPU : 1550 MHz
- TGP : 80W

**Mémoire Vive 16 GB DDR4** :
- Fréquence : 3200 MHz
- Configuration : 2x8GB Dual Channel

**Stockage 512 GB SSD NVMe** :
- Interface : PCIe 3.0 x4
- Vitesse de lecture : jusqu'à 3500 MB/s
- Vitesse d'écriture : jusqu'à 3000 MB/s

### 10.1.3 Système d'Exploitation

**Windows 11 Pro x64** :
- Version : Windows 11 Pro
- Architecture : 64 bits
- Build : Dernière mise à jour disponible

## 10.2 Configuration Réseau

Pour le développement local :
- **Mode de connexion** : Réseau local (localhost)
- **Adresse Backend** : http://localhost:5000
- **Adresse Frontend** : http://localhost:5174
- **Base de données** : MongoDB local sur localhost:27017

---

# 11. OUTILS ET TECHNOLOGIES

## 11.1 Environnements de Développement

### 11.1.1 Éditeur de Code

| Outil | Logo | Description |
|-------|------|-------------|
| **Visual Studio Code** | ![VSCode](https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg) | Éditeur de code source développé par Microsoft, largement utilisé pour le développement web moderne |

**Extensions VSCode recommandées** :
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- GitLens

### 11.1.2 Système de Gestion de Versions

| Outil | Logo | Description |
|-------|------|-------------|
| **Git** | ![Git](https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png) | Système de gestion de versions distribué |

**Dépôt distant** :
| Service | Description |
|---------|-------------|
| **GitHub** | Plateforme d'hébergement de code source pour le versioning et la collaboration |

## 11.2 Outils de Test et Développement

### 11.2.1 API Testing

| Outil | Description |
|-------|-------------|
| **Postman** | Plateforme de collaboration pour le développement d'API, permet de tester les endpoints REST |

## 11.3 Langages de Programmation

### 11.3.1 Langages Principal

| Langage | Version | Usage |
|---------|---------|-------|
| **JavaScript** | ES6+ | Langage principal pour le frontend et backend |
| **HTML5** | - | Structure des pages web |
| **CSS3** | - | Style et mise en page |

### 11.3.2 Technologies Backend

| Technologie | Version | Description |
|-------------|---------|-------------|
| **Node.js** | LTS | Environnement d'exécution JavaScript côté serveur |
| **Express.js** | ^5.2.1 | Framework web minimal pour Node.js |
| **MongoDB** | ^7.0.0 | Base de données NoSQL orientée documents |
| **Mongoose** | ^9.1.5 | ODM pour MongoDB |
| **JWT** | ^9.0.3 | JSON Web Token pour l'authentification |
| **bcryptjs** | ^3.0.3 | Bibliothèque de hachage de mots de passe |
| **cors** | ^2.8.6 | Middleware pour le partage des ressources entre origines |
| **dotenv** | ^17.2.3 | Chargement des variables d'environnement |
| **ollama** | ^0.6.3 | Intégration avec les modèles LLM locaux |

### 11.3.3 Technologies Frontend

| Technologie | Version | Description |
|-------------|---------|-------------|
| **React** | ^19.2.0 | Bibliothèque JavaScript pour créer des interfaces utilisateur |
| **Vite** | ^7.2.4 | Outil de build et serveur de développement rapide |
| **React Router** | ^7.13.0 | Bibliothèque de routage pour React |
| **Tailwind CSS** | ^3.4.19 | Framework CSS utility-first |
| **Axios** | ^1.13.3 | Client HTTP pour les requêtes API |
| **React Hook Form** | ^7.71.1 | Hooks pour la gestion des formulaires |
| **React Hot Toast** | ^2.6.0 | Bibliothèque de notifications |
| **Recharts** | ^3.7.0 | Bibliothèque de graphiques pour React |
| **SweetAlert2** | ^11.26.17 | Bibliothèque de fenêtres modales |

## 11.4 Standards et Protocoles

### 11.4.1 Modélisation

| Standard | Description |
|----------|-------------|
| **UML** | Unified Modeling Language - Langage de modélisation unifié pour la conception logicielle |

### 11.4.2 Protocoles

| Protocole | Description |
|-----------|-------------|
| **REST** | Representational State Transfer - Style d'architecture pour les services web |
| **JWT** | JSON Web Token - Standard pour la création de tokens d'accès |
| **HTTP** | Hypertext Transfer Protocol - Protocole de communication |

---

# 12. ARCHITECTURE DU PROJET

## 12.1 Architecture MERN Stack

Le projet AutoExpert utilise l'architecture **MERN Stack**, une architecture moderne et flexible pour les applications web full-stack.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           ARCHITECTURE MERN                              │
│                              AUTOEXPERT                                  │
└─────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────────┐
                    │         FRONTEND            │
                    │        (React.js)           │
                    │                             │
                    │  ┌───────────────────────┐  │
                    │  │   Composants UI      │  │
                    │  │  - Pages             │  │
                    │  │  - Components        │  │
                    │  │  - Context           │  │
                    │  └───────────────────────┘  │
                    │             │               │
                    │             ▼               │
                    │  ┌───────────────────────┐  │
                    │  │   Services API        │  │
                    │  │   (Axios)             │  │
                    │  └───────────────────────┘  │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │           API REST         │
                    │        (Express.js)        │
                    │                             │
                    │  ┌───────────────────────┐  │
                    │  │     Routes            │  │
                    │  │  - /api/auth          │  │
                    │  │  - /api/vehicles      │  │
                    │  │  - /api/services      │  │
                    │  │  - /api/reservations  │  │
                    │  │  - /api/devis         │  │
                    │  │  - /api/reparations   │  │
                    │  │  - /api/chat          │  │
                    │  │  - /api/admin         │  │
                    │  └───────────────────────┘  │
                    │             │               │
                    │  ┌──────────▼──────────┐     │
                    │  │     Middleware     │     │
                    │  │  - Auth            │     │
                    │  │  - Admin           │     │
                    │  └────────────────────┘     │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │        DATABASE             │
                    │       (MongoDB)             │
                    │                             │
                    │  ┌───────────────────────┐  │
                    │  │    Collections        │  │
                    │  │  - users              │  │
                    │  │  - vehicles           │  │
                    │  │  - services           │  │
                    │  │  - reservations       │  │
                    │  │  - devis              │  │
                    │  │  - reparations        │  │
                    │  └───────────────────────┘  │
                    └─────────────────────────────┘
```

## 12.2 Architecture Frontend

Le frontend est construit avec React.js selon une architecture de composants réutilisables.

### Structure des Répertoires Frontend

```
frontend/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── layout/          # Composants de mise en page
│   │   │   ├── Navbar.jsx   # Barre de navigation
│   │   │   ├── Footer.jsx   # Pied de page
│   │   │   └── ScrollToTop.jsx
│   │   └── homeSection/     # Sections de la page d'accueil
│   │       ├── HeroSection.jsx
│   │       └── ServicesSection.jsx
│   ├── pages/               # Pages de l'application
│   │   ├── AppPages/        # Pages publiques
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── client/          # Pages client
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── MyVehiclePage.jsx
│   │   │   ├── ReservationsPage.jsx
│   │   │   ├── DevisPage.jsx
│   │   │   └── ChatAIPage.jsx
│   │   └── admin/           # Pages admin
│   │       ├── DashboardAdmin.jsx
│   │       ├── GestionClients.jsx
│   │       ├── GestionVehicules.jsx
│   │       ├── GestionServices.jsx
│   │       ├── GestionReservations.jsx
│   │       ├── GestionDevis.jsx
│   │       └── GestionReparations.jsx
│   ├── context/             # Contextes React
│   │   └── auth/            # Contexte d'authentification
│   ├── services/            # Services API
│   │   └── api/             # Configuration Axios
│   ├── data/                # Données statiques
│   ├── App.jsx              # Application principale
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
```

### Principes de Conception Frontend

1. **Responsive Design** : L'interface s'adapte à toutes les tailles d'écran
2. **Composants Réutilisables** : Les composants sont modularisés
3. **Gestion d'État** : Utilisation de React Context pour l'authentification
4. **Appels API** : Centralisés avec Axios et intercepteurs

## 12.3 Architecture Backend

Le backend utilise Node.js et Express avec une architecture MVC (Model-View-Controller).

### Structure des Répertoires Backend

```
backend/
├── config/
│   └── db.js                # Configuration de la base de données
├── middleware/
│   ├── adminMiddleware.js    # Vérification des droits admin
│   └── authMiddleware.js     # Authentification JWT
├── models/                   # Modèles de données Mongoose
│   ├── User.js              # Modèle utilisateur
│   ├── Vehicle.js           # Modèle véhicule
│   ├── Service.js           # Modèle service
│   ├── Reservation.js       # Modèle réservation
│   ├── Devis.js             # Modèle devis
│   └── Reparation.js        # Modèle réparation
├── routes/                   # Routes API
│   ├── auth.js              # Routes authentification
│   ├── vehicles.js          # Routes véhicules
│   ├── services.js          # Routes services
│   ├── reservations.js      # Routes réservations
│   ├── devis.js            # Routes devis
│   ├── reparations.js       # Routes réparations
│   ├── chatAI.js           # Routes Chat IA
│   └── admin.js            # Routes administration
├── services/                # Services additionnels
├── test/                    # Tests
├── server.js                # Point d'entrée
├── package.json
└── .env                     # Variables d'environnement
```

### Modèles de Données

**User (Utilisateur)** :
```
javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  role: String (enum: ['client', 'admin']),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Vehicle (Véhicule)** :
```
javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  make: String (required),
  model: String (required),
  year: Number (required),
  licensePlate: String (required, unique),
  VIN: String,
  mileage: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Service (Service)** :
```
javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  basePrice: Number (required),
  estimatedTime: String,
  category: String (required),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Reservation (Réservation)** :
```
javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  vehicleId: ObjectId (ref: Vehicle),
  serviceId: ObjectId (ref: Service),
  date: Date (required),
  status: String (enum: ['pending', 'confirmed', 'completed', 'cancelled']),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Devis (Devis)** :
```
javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  vehicleId: ObjectId (ref: Vehicle),
  services: [{ serviceId: ObjectId, price: Number }],
  totalPrice: Number (required),
  status: String (enum: ['pending', 'accepted', 'rejected']),
  validUntil: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Reparation (Réparation)** :
```
javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  vehicleId: ObjectId (ref: Vehicle),
  services: [ObjectId (ref: Service)],
  status: String (enum: ['in_progress', 'completed', 'delivered']),
  startDate: Date,
  endDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

# 13. JUSTIFICATION DES CHOIX TECHNIQUES

## 13.1 Choix de la Stack MERN

### 13.1.1 MongoDB

**Avantages** :
- Schéma flexible : Permet d'adapter facilement le modèle de données sans migration complexe
- Haute scalabilité : Distribution horizontale facile
- Performance : Idéal pour les applications web avec des opérations de lecture/écriture fréquentes
- JSON natif : Parfait alignement avec JavaScript/Node.js
- Coût : Version community gratuite

**Justification pour AutoExpert** :
- Les données des véhicules, réservations et devis ont des structures variables
- Les relations entre entités sont gérées avec les références MongoDB
- La base de données évolue facilement avec les besoins du projet

### 13.1.2 Express.js

**Avantages** :
- Minimaliste et flexible
- Grande communauté et écosystème
- Routing puissant et simple
- Middleware extensible

**Justification pour AutoExpert** :
- Création rapide d'API RESTful
- Gestion facile des routes et middleware
- Intégration parfaite avec Node.js

### 13.1.3 React

**Avantages** :
- Virtual DOM pour des performances optimales
- Composants réutilisables
- Large écosystème
- Grande communauté
- JavaScript unifié (frontend/backend)

**Justification pour AutoExpert** :
- Interface utilisateur réactive et fluide
- Gestion de l'état avec Context API
- Composants modularisables pour les différentes pages

### 13.1.4 Node.js

**Avantages** :
- JavaScript côté serveur
- Non-bloquant (ideal pour les I/O)
- Grande vitesse d'exécution
- Package NPM immense

**Justification pour AutoExpert** :
- Uniformité du langage JavaScript
- Gestion des requêtes API performante
- Facilité de développement

## 13.2 Choix des Technologies Frontend

### 13.2.1 Tailwind CSS

**Avantages** :
- Approche utility-first
- Pas de contexte CSS
- Personnalisation facile
- Bundle size réduit

**Justification pour AutoExpert** :
- Développement rapide des interfaces
- Design moderne et cohérent
- Responsive design facile

### 13.2.2 Vite

**Avantages** :
- Serveur de développement ultra-rapide
- Hot Module Replacement (HMR)
- Build optimisé

**Justification pour AutoExpert** :
- Amélioration significative de l'expérience développeur
- Temps de build réduit

### 13.2.3 React Router

**Justification** :
- Gestion des routes côté client
- Navigation fluide sans rechargement

### 13.2.4 Axios

**Justification** :
- Intercepteurs pour l'authentification automatique
- Meilleure gestion des erreurs
- Syntaxe plus claire que fetch

## 13.3 Choix des Technologies Backend

### 13.3.1 JWT pour l'Authentification

**Justification** :
- Sans état (stateless)
- Sécurité des API REST
- Expiration configurable
- Standard industriel

### 13.3.2 bcryptjs pour le Hachage

**Justification** :
- Sécurité des mots de passe
- Implémentation simple
- Résistance aux attaques

### 13.3.3 Ollama pour le Chat IA

**Justification** :
- Modèles LLM locaux (confidentialité)
- Pas de dépendance à des API externes payantes
- Personnalisation via Modelfile

## 13.4 Patterns de Conception Utilisés

### 13.4.1 MVC (Model-View-Controller)

**Backend** : Separation claire entre Models (données), Routes (contrôleur), et logique métier.

### 13.4.2 Context API

**Frontend** : Gestion centralisée de l'état d'authentification.

### 13.4.3 Protected Routes

**Frontend** : Routes accessibles uniquement aux utilisateurs connectés avec vérification de rôle.

---

# 14. CONCLUSION

## 14.1 Résumé du Projet

Le projet **AutoExpert** représente une solution complète de gestion de garage automobile développée avec les dernières technologies web. L'application offre une plateforme moderne permettant aux clients de gérer leurs véhicules, prendre des rendez-vous, demander des devis et suivre leurs réparations, tout en предоrant aux administrateurs un tableau de bord complet pour gérer l'ensemble du garage.

## 14.2 Points Clés

1. **Architecture MERN** : Une solution moderne, flexible et performante
2. **Trois acteurs** : Visiteur, Client, Administrateur avec des permissions distinctes
3. **Fonctionnalités complètes** : De l'authentification à la gestion des réparations
4. **Assistant IA** : Un système expert pour le diagnostic automobile
5. **Méthodologie Scrum** : Une gestion de projet structurée et agile

## 14.3 Équipe de Développement

| Rôle | Nom |
|------|-----|
| Scrum Master | Abir Ben Cheikh |
| Product Owner | Skander Belloum |
| Développeur | Yassine Aounallah |

## 14.4 Perspectives d'Avenir

L'application AutoExpert peut être améliorée avec les fonctionnalités suivantes :

- **Paiement en ligne** : Intégration Stripe pour les paiements
- **Notifications** : Système d'email/SMS pour les rappels
- **Application mobile** : Version React Native
- **Multi-langue** : Support i18n
- **Dark mode** : Thème sombre
- **PWA** : Progressive Web App pour une expérience mobile

---

# ANNEXES

## Annexe A : Modèle de Données Complet

Voir le fichier `Chapter2-Specification-Besoins.md` pour le modèle entité-association complet.

## Annexe B : Documentation Technique

Voir les fichiers :
- `backend/DOCUMENTATION.md` - Documentation backend
- `frontend/DOCUMENTATION.md` - Documentation frontend
- `cahier-de-charges.md` - Cahier des charges

## Annexe C : Tests Effectués

| Test | Statut |
|------|--------|
| Root API | ✅ OK |
| Register User | ✅ OK |
| Login | ✅ OK |
| Get Services | ✅ OK (23 services) |
| Get Profile | ✅ OK |
| Get Vehicles | ✅ OK |
| Get Reservations | ✅ OK |
| Get Devis | ✅ OK |
| Get Reparations | ✅ OK |
| Frontend | ✅ OK |

---

*Document préparé par Yassine Aounallah*
*Pour le projet AutoExpert - Application de Gestion de Garage Automobile*
*Date : 2024*
