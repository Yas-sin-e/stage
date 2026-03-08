# Chapitre 3 : Réalisation et Tests

## Introduction

Ce chapitre décrit la mise en œuvre pratique de la plateforme **AutoExpert**, organisée en trois sprints successifs selon la méthodologie Scrum. Pour chaque sprint, nous présentons le backlog simplifié, les diagrammes UML (cas d'utilisation, séquences, classes), ainsi que les interfaces réalisées. Le chapitre se conclut par les rétrospectives et la phase de tests de validation.

---

## Sprint 1 : Authentification, Accueil & Base — Fondations Sécurisées
**Durée : 1 semaine | Effort : 14 points**

Le premier sprint pose les fondations sécurisées de l'application : authentification complète (inscription, connexion, réinitialisation du mot de passe), mise en place de l'interface d'accueil, des tableaux de bord, de la gestion des profils utilisateur, des clients et du catalogue de services.

### 1.1 Backlog du Sprint 1

| ID | User Story | Tâche principale | Effort |
|---|---|---|---|
| **US-1a/b** | En tant que Visiteur, je veux m'inscrire et me connecter pour accéder à mon espace personnel. | Développer les routes d'authentification (JWT + Bcrypt) et les formulaires React. | Difficile — 5 pts |
| **US-1c** | En tant qu'Utilisateur, je veux réinitialiser mon mot de passe par email pour récupérer mon accès. | Implémenter l'envoi d'email sécurisé avec lien temporaire via Nodemailer. | Intermédiaire — 3 pts |
| **US-1d** | En tant que Client, je veux gérer mon profil pour maintenir mes informations à jour. | Créer la route de mise à jour du profil, l'interface des paramètres et le Dashboard Client. | Intermédiaire — 2 pts |
| **US-1e** | En tant qu'Administrateur, je veux gérer les comptes clients pour contrôler les accès. | Mettre en place la liste des utilisateurs, le contrôle des accès et le Dashboard Admin. | Intermédiaire — 2 pts |
| **US-2** | En tant qu'Administrateur, je veux gérer les services pour définir le catalogue du garage. | Développer la gestion complète (CRUD) du catalogue des prestations. | Facile — 2 pts |
| | | **TOTAL** | **14 pts** |

### 1.2 Diagramme de Cas d'Utilisation — Sprint 1

#### Use Case Global — Vue Abstraite

Au premier niveau, les cas d'utilisation sont regroupés sous la forme d'actions génériques « Gérer... ». Ce diagramme offre une vision synthétique du périmètre fonctionnel du sprint :

- **Gérer l'Authentification** : inscription, connexion, réinitialisation
- **Gérer les Comptes** : profil utilisateur et gestion administrative
- **Gérer les Services** : catalogue du garage

#### Use Case Raffiné — Vue Détaillée par Acteur

Ce niveau détaille chaque cas global en actions concrètes :

**Acteurs** :
- **Visiteur** : utilisateur non authentifié
- **Client** : utilisateur authentifié avec rôle « client »
- **Administrateur** : utilisateur authentifié avec rôle « admin »
- **Système Email (Nodemailer)** : acteur secondaire externe

**Relations UML** :
- `<<include>>` : action toujours exécutée (ex. : vérification JWT)
- `<<extend>>` : action optionnelle déclenchée sous condition (ex. : réinitialisation si mot de passe oublié)

### 1.3 Descriptions des Cas d'Utilisation — Sprint 1

#### Use Case 1 : S'inscrire

| | |
|---|---|
| **Acteur principal** | Visiteur (non connecté) |
| **Objectif** | Créer un nouveau compte client sur la plateforme AutoExpert |
| **Pré-conditions** | L'utilisateur n'a pas encore de compte. L'email saisi n'existe pas en base. |
| **Scénario nominal** | 1. Le visiteur remplit le formulaire (nom, email, téléphone, mot de passe)<br>2. Le frontend valide les champs en temps réel<br>3. Le backend vérifie l'unicité de l'email<br>4. Le mot de passe est haché via Bcrypt<br>5. Un compte avec le rôle « client » est créé<br>6. Un JWT est généré et l'utilisateur est redirigé vers son dashboard |
| **Scénario alternatif** | Email déjà existant → HTTP 409 + message « Cet email est déjà utilisé » |

#### Use Case 2 : Se connecter

| | |
|---|---|
| **Acteur principal** | Visiteur possédant un compte (Client ou Admin) |
| **Objectif** | Accéder à son espace personnel via une authentification sécurisée |
| **Pré-conditions** | L'utilisateur possède un compte actif avec email et mot de passe valides |
| **Scénario nominal** | 1. L'utilisateur saisit son email et son mot de passe<br>2. Le backend compare le mot de passe avec le hash Bcrypt stocké<br>3. Un JWT est généré et retourné au frontend (validité : 30 jours)<br>4. Redirection selon le rôle : Client → Dashboard Client / Admin → Dashboard Admin |
| **Scénario alternatif** | Identifiants incorrects → HTTP 401 + message « Email ou mot de passe incorrect »<br>Compte bloqué → HTTP 403 + message « Compte désactivé » |

#### Use Case 3 : Réinitialiser le mot de passe

| | |
|---|---|
| **Acteur principal** | Utilisateur ayant oublié son mot de passe |
| **Objectif** | Retrouver l'accès à son compte via un lien sécurisé envoyé par email |
| **Pré-conditions** | L'utilisateur possède un compte actif avec un email valide enregistré en base |
| **Scénario nominal** | 1. L'utilisateur saisit son email sur la page « Mot de passe oublié »<br>2. Le backend génère un token unique valable 1 heure<br>3. Nodemailer envoie le lien de réinitialisation (système externe)<br>4. L'utilisateur clique sur le lien et saisit son nouveau mot de passe<br>5. Le token est validé et le nouveau mot de passe haché est sauvegardé |
| **Scénario alternatif** | Token expiré (> 1h) → Message « Lien expiré »<br>Lien déjà utilisé → Message « Lien invalide » |

#### Use Case 4 : Gérer les services (Admin)

| | |
|---|---|
| **Acteur principal** | Administrateur authentifié |
| **Objectif** | Créer, modifier, consulter et archiver les prestations du catalogue du garage |
| **Pré-conditions** | L'administrateur est connecté avec le rôle « admin » |
| **Scénario nominal** | 1. L'admin accède à la page « Gestion des Services »<br>2. Il consulte le catalogue existant<br>3. Il crée, modifie ou archive un service (nom, description, prix, durée, catégorie)<br>4. Les modifications sont sauvegardées via l'API REST |
| **Scénario alternatif** | Champ obligatoire manquant → Message de validation<br>Service lié à une réservation active → Archivage proposé à la place de la suppression |

### 1.4 Diagramme de Classes — Sprint 1

**Entités principales** :

```
┌─────────────────────────────────────┐
│           User (Utilisateur)        │
├─────────────────────────────────────┤
│ • _id: ObjectId (PK)               │
│ • name: String (requis)            │
│ • email: String (requis, unique)   │
│ • password: String (hashé Bcrypt)  │
│ • phone: String (requis)           │
│ • role: Enum ['client', 'admin']   │
│ • isActive: Boolean (défaut: true) │
│ • resetPasswordToken: String?      │
│ • resetPasswordExpire: Date?       │
│ • createdAt: Date                  │
│ • updatedAt: Date                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         Service (Prestation)        │
├─────────────────────────────────────┤
│ • _id: ObjectId (PK)               │
│ • name: String (requis)            │
│ • description: String              │
│ • price: Number (requis)           │
│ • duration: String (ex: "2h")      │
│ • category: String (requis)        │
│ • createdAt: Date                  │
│ • updatedAt: Date                  │
└─────────────────────────────────────┘
```

**Relations** :
- Un Administrateur gère plusieurs Services
- Chaque User est identifié par son rôle (client / admin)

### 1.5 Réalisation du Sprint 1 — Interfaces Utilisateur

Le Sprint 1 livre 9 interfaces principales :

#### 1. Page d'Accueil (Visiteur)
- Vitrine publique de la plateforme
- Présentation du garage, services proposés
- Boutons d'inscription et connexion
- Accès sans authentification

#### 2. Interface de Connexion
- Formulaire email + mot de passe
- Option affichage/masquage du mot de passe
- Lien « Mot de passe oublié »
- Lien vers page d'inscription
- Messages d'erreur explicites sans rechargement

#### 3. Interface d'Inscription
- Formulaire : nom, email, téléphone, mot de passe (confirmation)
- Validation en temps réel des champs
- Rôle « client » attribué automatiquement
- Redirection vers dashboard après génération JWT

#### 4. Interface de Réinitialisation du Mot de Passe
- Étape 1 : saisie de l'email pour recevoir le lien sécurisé
- Étape 2 : saisie du nouveau mot de passe
- Validité du lien : 1 heure, utilisation unique

#### 5. Dashboard Client
- Tableau de bord personnalisé du client
- Résumé des véhicules enregistrés
- Liste des réservations récentes
- État des réparations en cours
- Accès rapide au Chat IA
- Navigation latérale vers sections de l'espace personnel

#### 6. Dashboard Administrateur
- Tableau de bord global avec cartes KPI :
  - Clients totaux
  - Réservations du mois
  - Réparations en cours
  - Revenus du mois
- Liste des dernières réservations à traiter
- Navigation vers tous les modules de gestion

#### 7. Gestion du Profil (Client)
- Modification des informations personnelles (nom, téléphone)
- Changement du mot de passe
- Sauvegarde sécurisée via requête PUT (middleware JWT)

#### 8. Gestion des Services (Admin)
- Catalogue en cartes : nom, catégorie (badge coloré), prix, durée
- Création via formulaire modal
- Modification et édition pour chaque service
- **Statut visuel** : badge « Actif » (vert) ou « Archivé » (orange)
- **Archivage intelligent** : 
  - Bouton 📦 (Archive) pour archiver les services actifs
  - Si des réservations actives existent → archivage automatique (au lieu de suppression)
  - Bouton ✓ (Réactiver) visible pour les services archivés
- **Suppression** : possible uniquement si aucune réservation active n'est liée
- Codes couleurs pour l'état : vert actif, gris archivé

#### 9. Gestion des Clients (Admin)
- Tableau paginé : nom, email, téléphone, date d'inscription, statut
- Actions : basculer statut, supprimer compte
- Recherche par nom ou email

### 1.6 Rétrospective — Sprint 1

| Catégorie | Détails |
|---|---|
| **✅ Points positifs** | • Architecture MERN opérationnelle dès le début<br>• Authentification JWT + Bcrypt sécurisée et fonctionnelle<br>• 14/14 points livrés — taux de complétion : **100%**<br>• Communication fluide avec les stakeholders |
| **⚠️ Difficultés** | • Configuration initiale de Nodemailer (port SMTP)<br>• Gestion des tokens de réinitialisation avec expiration<br>• Relations Mongoose (virtual fields et références) |
| **🔧 Actions correctives** | • Documenter toutes les variables d'environnement (.env)<br>• Ajouter commentaires JSDoc sur les contrôleurs backend<br>• Tester systématiquement les cas limites des formulaires |

#### Fonctionnalités validées — Sprint 1

| Fonctionnalité | Statut | Remarques |
|---|---|---|
| Inscription / Connexion sécurisée | ✅ | JWT + Bcrypt opérationnels |
| Réinitialisation MDP par email | ✅ | Token 1h, Nodemailer configuré |
| Gestion du profil — Client | ✅ | Modification des informations personnelles |
| Dashboard Client + Dashboard Admin | ✅ | Interfaces de navigation opérationnelles |
| Gestion des clients — Admin | ✅ | Bloquer / Activer / Supprimer |
| CRUD Services — Admin | ✅ | Catalogue complet fonctionnel |
| Page d'accueil publique | ✅ | Interface vitrine visible sans authentification |

---

## Sprint 2 : Gestion Métier — Essentiels Opérationnels
**Durée : 1 semaine | Effort : 17 points**

Le deuxième sprint implémente le cœur opérationnel de la plateforme : la gestion des véhicules clients, la prise de rendez-vous en ligne et sa validation par l'administrateur, ainsi que la génération et la validation des devis détaillés.

**Flux métier complet** : Véhicule → Réservation → Validation Admin → Devis → Acceptation Client → Réparation automatique

### 2.1 Backlog du Sprint 2

| ID | User Story | Tâche principale | Effort |
|---|---|---|---|
| **US-3** | En tant que Client, je veux gérer mes véhicules (CRUD) pour les associer à mes interventions. | Développer les routes sécurisées CRUD et l'interface de gestion du parc automobile. | Intermédiaire — 3 pts |
| **US-4** | En tant que Client, je veux prendre et annuler un RDV. En tant qu'Admin, je veux valider ou refuser. | Implémenter le workflow de réservation complet avec gestion des statuts. | Difficile — 7 pts |
| **US-5** | En tant qu'Admin, je veux créer un devis chiffré. En tant que Client, je veux l'accepter ou refuser. | Développer le modèle Devis, le calcul automatique du total et le déclenchement de la réparation. | Difficile — 7 pts |
| | | **TOTAL** | **17 pts** |

### 2.2 Descriptions des Cas d'Utilisation — Sprint 2

#### Use Case 5 : Gérer ses véhicules (Client)

| | |
|---|---|
| **Acteur principal** | Client authentifié |
| **Objectif** | Ajouter, consulter, modifier et supprimer ses véhicules pour les associer aux interventions |
| **Pré-conditions** | Le client est connecté. Pour l'ajout : l'immatriculation ne doit pas déjà exister en base. |
| **Scénario nominal** | 1. Le client accède à la page « Mes Véhicules »<br>2. Il remplit le formulaire (marque, modèle, année, immatriculation, VIN, kilométrage, couleur)<br>3. Le backend valide l'unicité de l'immatriculation<br>4. Le véhicule est sauvegardé et apparaît dans la liste |
| **Scénario alternatif** | Immatriculation déjà enregistrée → Message « Cette immatriculation existe déjà » |

#### Use Case 6 : Gérer les réservations (Client + Admin)

| | |
|---|---|
| **Acteur principal** | Client (création / annulation), Admin (validation / refus) |
| **Objectif** | Planifier l'entretien d'un véhicule et organiser le planning de l'atelier |
| **Pré-conditions** | Le client possède au moins un véhicule. Le service sélectionné est actif. |
| **Scénario nominal** | 1. Le client sélectionne un véhicule, un service (prédéfini ou libre) et une date<br>2. La réservation est créée avec le statut « En attente »<br>3. L'admin consulte les demandes en attente et accepte ou refuse<br>4. Le statut est mis à jour (Acceptée / Refusée) et visible par le client |
| **Scénario alternatif** | Client annule → statut « Annulée »<br>Admin refuse → notification côté client |

#### Use Case 7 : Gérer les devis (Admin + Client)

| | |
|---|---|
| **Acteur principal** | Admin (création), Client (acceptation / refus) |
| **Objectif** | Chiffrer précisément les travaux et obtenir la validation du client avant démarrage |
| **Pré-conditions** | La réservation correspondante a été acceptée par l'administrateur |
| **Scénario nominal** | 1. L'admin crée le devis en sélectionnant services, quantités et prix unitaires<br>2. Le backend calcule automatiquement le total<br>3. Le client consulte le devis dans « Mes Devis » et accepte ou refuse<br>4. Si accepté → une réparation est créée automatiquement (statut « En cours »)<br>5. Si refusé → l'admin est notifié |
| **Scénario alternatif** | Devis refusé par le client → statut « Refusé », aucune réparation créée |

### 2.3 Diagramme de Classes — Sprint 2

**Nouvelles entités** :

```
┌──────────────────────────────────────┐
│        Vehicle (Véhicule)            │
├──────────────────────────────────────┤
│ • _id: ObjectId (PK)                │
│ • userId: ObjectId (FK → User)      │
│ • brand: String (marque, requis)    │
│ • model: String (modèle, requis)    │
│ • year: Number (année, requis)      │
│ • plate: String (immatriculation)   │
│   UNIQUE, UPPERCASE, requis         │
│ • vin: String (VIN, requis)         │
│ • color: String                     │
│ • mileage: Number (kilométrage)     │
│ • createdAt: Date                   │
│ • updatedAt: Date                   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│      Reservation (Réservation)       │
├──────────────────────────────────────┤
│ • _id: ObjectId (PK)                │
│ • userId: ObjectId (FK → User)      │
│ • vehicleId: ObjectId (FK → Vehicle)│
│ • serviceId: ObjectId (FK → Service)│
│ • date: Date (date demandée)        │
│ • status: Enum                      │
│   ['pending', 'accepted', 'rejected']│
│ • createdAt: Date                   │
│ • updatedAt: Date                   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│          Devis (Devis)               │
├──────────────────────────────────────┤
│ • _id: ObjectId (PK)                │
│ • userId: ObjectId (FK → User)      │
│ • vehicleId: ObjectId (FK → Vehicle)│
│ • reservationId: ObjectId (FK)      │
│ • serviceLabel: String              │
│ • amount: Number (montant)          │
│ • estimatedTime: String             │
│ • items: Array de DetailItems       │
│   - name: String                    │
│   - quantity: Number                │
│   - price: Number (unitaire)        │
│ • status: Enum                      │
│   ['pending', 'accepted', 'rejected']│
│ • createdAt: Date                   │
│ • updatedAt: Date                   │
└──────────────────────────────────────┘
```

### 2.4 Réalisation du Sprint 2 — Interfaces Utilisateur

#### 1. Mes Véhicules (Client)
- Liste des véhicules enregistrés : marque, modèle, immatriculation, kilométrage
- Ajout via formulaire modal
- Modification et suppression disponibles
- Validation de l'unicité de l'immatriculation en temps réel

#### 2. Création de Réservation (Client)
- Deux modes : réservation pour service prédéfini ou problème libre
- Sélection du véhicule, du service et de la date souhaitée
- Vérification de disponibilité

#### 3. Gestion des Réservations (Admin)
- Tableau de toutes les réservations
- Filtres par statut (En attente / Acceptée / Refusée / Annulée)
- Boutons Accepter / Refuser directement accessibles

#### 4. Gestion des Devis (Admin + Client)
- **Interface Admin** : création avec services, quantités, prix unitaires — total calculé automatiquement
- **Interface Client** : consultation et validation (accepter / refuser)
- Acceptation déclenche automatiquement la création de réparation

### 2.5 Rétrospective — Sprint 2

| Catégorie | Détails |
|---|---|
| **✅ Points positifs** | • Workflow complet Réservation → Admin → Devis → Client opérationnel<br>• Calcul automatique du total devis fonctionnel<br>• Unicité de l'immatriculation correctement validée<br>• 17/17 points livrés — taux de complétion : **100%** |
| **⚠️ Difficultés** | • Déclenchement automatique de la réparation après acceptation<br>• Gestion des statuts en cascade<br>• Tests du workflow complet chronophages |
| **🔧 Actions correctives** | • Refactoriser les contrôleurs backend<br>• Optimiser les requêtes MongoDB avec des index<br>• Ajouter des logs backend pour débogage Sprint 3 |

#### Fonctionnalités validées — Sprint 2

| Fonctionnalité | Statut | Remarques |
|---|---|---|
| Gestion des véhicules — CRUD complet | ✅ | Unicité de l'immatriculation validée |
| Workflow réservation Client → Admin | ✅ | Statuts opérationnels |
| Création de devis avec calcul automatique | ✅ | Total calculé côté backend |
| Acceptation devis → Réparation automatique | ✅ | Déclenchement automatique |

---

## Sprint 3 : Suivi, Dashboard Analytics & IA — Contrôle de l'Application
**Durée : 1 semaine | Effort : 10 points**

Le troisième sprint introduit les fonctionnalités différenciatrices : le système de suivi des réparations avec timeline de statuts, le tableau de bord enrichi avec graphiques analytiques, et l'assistant IA de pré-diagnostic basé sur **Ollama llama3.1** — la valeur ajoutée principale d'AutoExpert.

### 3.1 Backlog du Sprint 3

| ID | User Story | Tâche principale | Effort |
|---|---|---|---|
| **US-6** | En tant qu'Admin, je veux faire évoluer le statut d'une réparation pour informer le client. | Développer le système de statuts (En cours → Terminée → Livrée) et notes techniques. | Haute — 2 pts |
| **US-6b** | En tant que Client, je veux consulter l'état de mes réparations et confirmer récupération. | Implémenter la vue client avec timeline de statut et confirmation. | Haute — 2 pts |
| **US-7** | En tant qu'Admin, je veux visualiser les statistiques globales du garage. | Programmer les agrégations MongoDB et intégrer les graphiques (KPI, revenus, activité). | Moyenne — 3 pts |
| **US-8** | En tant que Client, je veux dialoguer avec une IA pour obtenir un pré-diagnostic. | Connecter le backend à Ollama llama3.1 et développer l'interface Chat IA. | Difficile — 5 pts |
| | | **TOTAL** | **10 pts** |

### 3.2 Descriptions des Cas d'Utilisation — Sprint 3

#### Use Case 8 : Suivi des réparations (Admin + Client)

| | |
|---|---|
| **Acteur principal** | Admin (mise à jour statut), Client (consultation et confirmation) |
| **Objectif** | Suivre l'avancement des travaux et informer le client en temps réel |
| **Pré-conditions** | Un devis a été accepté — une réparation a été créée (statut « En cours ») |
| **Scénario nominal (Admin)** | 1. L'admin accède à la liste des réparations en cours<br>2. Il fait évoluer le statut : En cours → Terminée → Livrée<br>3. Il ajoute des notes techniques visibles par le client |
| **Scénario nominal (Client)** | 1. Le client consulte « Mes Réparations » avec timeline de statut<br>2. Pour une réparation « Livrée », il confirme la récupération |

#### Use Case 9 : Consulter le tableau de bord (Admin)

| | |
|---|---|
| **Acteur principal** | Administrateur authentifié |
| **Objectif** | Visualiser les statistiques globales du garage pour piloter l'activité |
| **Pré-conditions** | L'admin est connecté. Des données existent en base (réservations, réparations, revenus). |
| **Scénario nominal** | 1. L'admin accède au Dashboard Analytique<br>2. Les KPI sont calculés par agrégation MongoDB (revenus, réservations, réparations)<br>3. Les graphiques (barres hebdomadaires, camembert revenus) s'affichent<br>4. La liste des dernières réservations à traiter est visible |
| **Scénario alternatif** | Aucune donnée → indicateurs affichent 0, graphiques vides |

#### Use Case 10 : Chat IA Automobile (Client)

| | |
|---|---|
| **Acteur principal** | Client authentifié |
| **Acteur secondaire** | Ollama llama3.1 (moteur IA local — système externe) |
| **Objectif** | Obtenir un pré-diagnostic mécanique personnalisé avant toute prise de rendez-vous |
| **Pré-conditions** | Client connecté. Ollama llama3.1 installé et opérationnel sur le serveur. |
| **Scénario nominal** | 1. Le client décrit ses symptômes dans l'interface de chat<br>2. Le message est envoyé au backend (POST /api/chat/diagnose)<br>3. Le backend construit un prompt contextualisé et interroge Ollama<br>4. La réponse est retournée au frontend<br>5. L'interface affiche la réponse avec les services recommandés |
| **Scénario alternatif** | Ollama indisponible → HTTP 503 + message « L'assistant IA est temporairement indisponible » |

### 3.3 Diagramme de Classes — Sprint 3

**Nouvelles entités** :

```
┌──────────────────────────────────────┐
│       Reparation (Réparation)        │
├──────────────────────────────────────┤
│ • _id: ObjectId (PK)                │
│ • userId: ObjectId (FK → User)      │
│ • vehicleId: ObjectId (FK → Vehicle)│
│ • devisId: ObjectId (FK → Devis)    │
│ • totalAmount: Number               │
│ • service: String                   │
│ • status: Enum                      │
│   ['pending', 'in_progress',        │
│    'completed', 'delivered']        │
│ • startDate: Date                   │
│ • estimatedEndDate: Date            │
│ • completedAt: Date                 │
│ • deliveredAt: Date                 │
│ • notes: String                     │
│ • technicianNotes: String           │
│ • createdAt: Date                   │
│ • updatedAt: Date                   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│     Conversation (Historique IA)     │
├──────────────────────────────────────┤
│ • _id: ObjectId (PK)                │
│ • userId: ObjectId (FK → User)      │
│ • messages: Array                   │
│   - sender: Enum ['user', 'ai']    │
│   - text: String                    │
│   - timestamp: Date                 │
│ • vehicleContext: ObjectId (FK)?    │
│ • createdAt: Date                   │
│ • updatedAt: Date                   │
└──────────────────────────────────────┘
```

### 3.4 Réalisation du Sprint 3 — Interfaces Utilisateur

#### 1. Suivi des Réparations (Client)
- Timeline visuelle par véhicule
- Statut actuel représenté en barre de progression
- Pour réparations « Livrées » : bouton confirmation récupération
- Notes techniques du mécanicien visibles en lecture seule

#### 2. Gestion des Réparations (Admin)
- Liste des réparations en cours
- Évolution du statut (En cours → Terminée → Livrée)
- Champ pour ajouter des notes techniques
- Filtrage par statut disponible

#### 3. Tableau de Bord Analytique enrichi (Admin)
- Quatre cartes KPI :
  - Clients totaux
  - Réservations du mois
  - Réparations en cours
  - Revenus du mois
- Graphique en barres des réservations par semaine
- Graphique circulaire des revenus par catégorie de service
- Tableau des cinq dernières réservations à traiter

#### 4. Chat IA AutoExpert (Client)
- Interface conversationnelle avec historique
- Les réponses s'affichent progressivement
- Chaque réponse structurée en trois sections :
  - **Diagnostic probable** : analyse du problème
  - **Causes possibles** : hypothèses mécaniques
  - **Services recommandés** : prestations pertinentes (cliquables)
- Redirection directe vers page de réservation

#### 5. Consultation des Devis (Client)
- Détail des services, quantités, prix unitaires et total
- Boutons Accepter et Refuser
- Acceptation déclenche création automatique de réparation

### 3.5 Rétrospective — Sprint 3

| Catégorie | Détails |
|---|---|
| **✅ Points positifs** | • Intégration Ollama llama3.1 fonctionnelle<br>• Tableau de bord analytique complet avec graphiques<br>• Workflow réparation entier opérationnel<br>• 10/10 points livrés — taux de complétion : **100%** |
| **⚠️ Difficultés** | • Temps de réponse Ollama variable (3-15 secondes)<br>• Agrégation MongoDB pour statistiques de revenus<br>• Optimisation des performances du dashboard |
| **🔧 Actions correctives** | • Optimiser le prompt système pour réponses concises<br>• Ajouter indicateur d'attente animé IA<br>• Mettre en cache les statistiques du dashboard |

#### Fonctionnalités validées — Sprint 3

| Fonctionnalité | Statut | Remarques |
|---|---|---|
| Suivi réparations — Admin (3 statuts + notes) | ✅ | Transitions opérationnelles |
| Suivi réparations — Client (timeline + confirmation) | ✅ | Confirmation de récupération fonctionnelle |
| Tableau de bord analytique (KPI + graphiques) | ✅ | Agrégations MongoDB + Recharts |
| Chat IA automobile (llama3.1 via Ollama) | ✅ | Pré-diagnostic avec interface fluide |
| Consultation et validation des devis (Client) | ✅ | Acceptation → réparation auto |

---

## 4. Bilan Global des Sprints

| Sprint | Module | Points planifiés | Points livrés | Complétion |
|---|---|---|---|---|
| **Sprint 1** | Fondations Sécurisées | 14 pts | 14 pts | ✅ 100% |
| **Sprint 2** | Essentiels Opérationnels | 17 pts | 17 pts | ✅ 100% |
| **Sprint 3** | Contrôle de l'Application | 10 pts | 10 pts | ✅ 100% |
| | **TOTAL** | **41 pts** | **41 pts** | **✅ 100%** |

**Vélocité de l'équipe** : 41 points sur 3 sprints, attestant de la fiabilité des estimations et de la rigueur du processus Scrum.

---

## 5. Tests et Validation

La phase de tests valide la conformité de la plateforme AutoExpert aux exigences définies. Trois types de tests ont été réalisés :

### 5.1 Tests Fonctionnels (17 cas)

| ID | Cas de test | Données d'entrée | Résultat attendu | Statut |
|---|---|---|---|---|
| **TF-01** | Inscription email valide | Nom, email, téléphone, mot de passe corrects | Compte créé, JWT retourné, redirection dashboard | ✅ |
| **TF-02** | Inscription email existant | Email déjà enregistré | Message « Cet email est déjà utilisé » | ✅ |
| **TF-03** | Connexion identifiants corrects | Email et mot de passe valides | JWT généré, redirection selon rôle | ✅ |
| **TF-04** | Connexion mauvais mot de passe | Mot de passe incorrect | Message « Email ou mot de passe incorrect » | ✅ |
| **TF-05** | Connexion compte bloqué | Compte désactivé par l'admin | Message « Compte désactivé » | ✅ |
| **TF-06** | Réinitialisation MDP — email valide | Email existant en base | Email reçu avec lien sécurisé (< 30s) | ✅ |
| **TF-07** | Réinitialisation MDP — lien expiré | Token > 1 heure | Message « Lien expiré » | ✅ |
| **TF-08** | Ajout véhicule — plaque unique | Immatriculation non enregistrée | Véhicule créé et listé | ✅ |
| **TF-09** | Ajout véhicule — plaque dupliquée | Immatriculation déjà enregistrée | Erreur « Immatriculation existante » | ✅ |
| **TF-10** | Création réservation | Véhicule + service + date | Réservation créée (statut « En attente ») | ✅ |
| **TF-11** | Validation réservation par admin | Réservation en attente | Statut → « Acceptée » | ✅ |
| **TF-12** | Création devis avec calcul total | 3 articles × 50 TND l'un | Total = 150 TND calculé automatiquement | ✅ |
| **TF-13** | Acceptation devis par client | Devis en attente | Réparation créée automatiquement (statut « En cours ») | ✅ |
| **TF-14** | Chat IA — symptôme automobile | Description de panne véhicule | Pré-diagnostic retourné (~8 s) | ✅ |
| **TF-15** | Évolution statut réparation | En cours → Terminée | Statut mis à jour en base, visible par client | ✅ |
| **TF-16** | Archivage service avec réservations actives | Suppression d'un service lié à une réservation pending | Service archivé au lieu de supprimé — isActive = false | ✅ |
| **TF-17** | Suppression service sans réservations | Suppression d'un service sans références | Service supprimé complètement de la base | ✅ |

### 5.2 Tests de Sécurité (6 cas)

| Test | Description | Résultat |
|---|---|---|
| **Accès route Admin sans token JWT** | GET /api/admin/clients sans Authorization | HTTP 401 Unauthorized ✅ |
| **Accès route Admin avec token Client** | Token rôle « client » sur route « admin » | HTTP 403 Forbidden ✅ |
| **Tentative d'injection NoSQL** | {email: {"$gt": ""}} dans champ login | Rejeté par validation Mongoose ✅ |
| **Token JWT falsifié** | Modification manuelle du payload JWT | Signature invalide, accès refusé ✅ |
| **Vérification stockage mots de passe** | Lecture directe en base MongoDB | Hash Bcrypt (60 caractères) confirmé ✅ |
| **Réutilisation lien réinitialisation** | Clic sur lien déjà utilisé | Message « Lien expiré ou déjà utilisé » ✅ |

### 5.3 Tests de Performance (6 mesures)

| Page / Endpoint | Temps moyen | Optimisation appliquée |
|---|---|---|
| Page d'accueil (React SPA) | ~0.8 s | Vite + code splitting React |
| POST /api/auth/login | ~150 ms | Index MongoDB sur email |
| GET /api/vehicles/mine | ~80 ms | Filtrage par userId indexé |
| GET /api/reparations/mine | ~120 ms | Populate limité aux champs nécessaires |
| GET /api/admin/dashboard | ~200 ms | Agrégation MongoDB optimisée |
| POST /api/chat/diagnose (IA) | ~5 à 12 s | Réponse progressive (Ollama) |

**Conclusion des tests** : Toutes les pages (hors Chat IA) respectent le temps de réponse cible < 2 secondes. Le Chat IA utilise une architecture asynchrone pour rendre l'attente acceptable à l'utilisateur.

---

## 6. Conclusion

Ce chapitre a présenté la phase de réalisation et validation de la plateforme **AutoExpert**, construite itérativement sur trois sprints Scrum d'une semaine chacun.

### Synthèse des livrables

**🔐 Sprint 1 — Fondations Sécurisées** (14 pts)
- Authentification JWT + Bcrypt
- Interface d'accueil et tableaux de bord
- Catalogue de services
- Gestion des comptes client et administrateur

**📱 Sprint 2 — Essentiels Opérationnels** (17 pts)
- Gestion complète des véhicules (CRUD)
- Workflow réservation : Client → Admin → Validation
- Gestion des devis avec calcul automatique
- Déclenchement automatique des réparations

**🤖 Sprint 3 — Contrôle de l'Application** (10 pts)
- Chat IA de pré-diagnostic (Ollama llama3.1)
- Suivi complet des réparations avec timeline
- Tableau de bord analytique avec graphiques
- Architecture performante et maintenable

### Architecture et technologie

L'architecture **MERN** (MongoDB, Express, React, Node.js) a offert un cadre :
- ✅ **Moderne** : technologies à jour et widely adopted
- ✅ **Performant** : temps de réponse < 2s (hors IA)
- ✅ **Maintenable** : structure modulaire et documentée
- ✅ **Sécurisé** : authentification robuste et validation des données

### Résultats de validation

- ✅ **17 tests fonctionnels** : 100% réussite
- ✅ **6 tests sécurité** : 100% réussite
- ✅ **6 mesures performance** : cibles atteintes
- ✅ **41/41 points planifiés** : taux de complétion 100%

### Valeur ajoutée

**AutoExpert** est la première plateforme de gestion de garage à intégrer une **intelligence artificielle de pré-diagnostic** directement accessible au client, comblant les lacunes identifiées dans les solutions existantes (Drivvo, Shopmonkey).

---

**Fin du Chapitre 3**
