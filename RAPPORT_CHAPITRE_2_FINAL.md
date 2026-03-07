# CHAPITRE 2 : Spécifications et Modélisation

## Introduction

Ce chapitre présente le processus de conception et de spécification de la plateforme **AutoExpert**. Nous y aborderons la méthodologie Scrum appliquée au projet, l'analyse détaillée des besoins fonctionnels et non fonctionnels, ainsi que la modélisation UML (diagrammes de cas d'utilisation, de classes et de séquences) décomposée selon nos trois Sprints de réalisation.

---

## 1. Cadrage Scrum

### Vision produit

**AutoExpert** vise à digitaliser et centraliser la gestion d'un garage automobile en offrant une plateforme moderne et performante. La vision est de permettre aux clients de gérer facilement leurs véhicules, de prendre des rendez-vous et d'obtenir des devis en ligne, tout en offrant aux garagistes un tableau de bord complet pour gérer leur charge de travail, les réparations, et communiquer avec la clientèle. L'intégration d'un assistant par intelligence artificielle (Chat IA) enrichit l'expérience utilisateur par un diagnostic préalable rapide.

### Release Planning (Découpage en 3 Sprints)

Le projet a été découpé de manière itérative afin de livrer de la valeur rapidement.

- **SPRINT 1 — Authentification & Base** : Mise en place de l'application, du système d'authentification, de l'interface d'accueil, des tableaux de bord (clients et admins), et du catalogue des services.
- **SPRINT 2 — Gestion Métier** : Ajout et gestion du parc de véhicules clients, ainsi que le système complet de réservation et de création de devis.
- **SPRINT 3 — Suivi, IA & Dashboard** : Finalisation du suivi transparent des réparations, génération des graphiques statistiques (Dashboard), et intégration de l'assistant IA mécanique.

### Product Backlog

Le Product Backlog recense l'ensemble des fonctionnalités du projet sous forme de **User Stories** compréhensibles et orientées utilisateur.

| ID        | En tant que... | Je veux...                        | Afin de...                                              | Priorité |
| :-------- | :------------- | :-------------------------------- | :------------------------------------------------------ | :------: |
| **US-01** | Visiteur       | M'inscrire et me connecter        | Accéder à mon espace personnel de manière sécurisée     |  Haute   |
| **US-02** | Utilisateur    | Réinitialiser mon mot de passe    | Récupérer mon compte en cas d'oubli                     |  Haute   |
| **US-03** | Client / Admin | Gérer mon profil                  | Maintenir mes informations de contact à jour            |  Moye.   |
| **US-04** | Admin          | Avoir une vue globale (Dashboard) | Avoir des statistiques claires sur l'activité du garage |  Haute   |
| **US-05** | Admin          | Gérer les services                | Maintenir le catalogue et les tarifs du garage          |  Haute   |
| **US-06** | Admin          | Gérer les clients                 | Contrôler les accès (Bloquer, Activer, Supprimer)       |  Haute   |
| **US-07** | Client         | Gérer mes véhicules               | Faciliter mes futures demandes d'intervention           |  Haute   |
| **US-08** | Client         | Prendre un rendez-vous            | Planifier une intervention avec ou sans service précis  |  Haute   |
| **US-09** | Admin          | Gérer les réservations            | Organiser le planning et valider les demandes           |  Haute   |
| **US-10** | Admin          | Créer des devis                   | Chiffrer précisément les pièces et la main d'œuvre      |  Haute   |
| **US-11** | Client         | Accepter ou refuser un devis      | Valider le coût d'une réparation proposée               |  Haute   |
| **US-12** | Admin          | Suivre les réparations            | Mettre à jour l'évolution des travaux en atelier        |  Haute   |
| **US-13** | Client         | Suivre l'état de ma réparation    | Savoir quand mon véhicule est prêt et livré             |  Haute   |
| **US-14** | Client         | Discuter avec une IA              | Avoir un diagnostic préliminaire de ma panne            |  Basse   |

---

## 2. Spécification des besoins

### Besoins fonctionnels

Un besoin fonctionnel décrit une action concrète que le système doit permettre d'effectuer.

**Espace Client :**

- Créer un compte et se connecter au portail.
- Voir son propre tableau de bord avec l'historique de ses activités.
- Enregistrer les informations techniques de ses véhicules.
- Demander un rendez-vous pour un service particulier ou un problème personnalisé.
- Accepter ou refuser la proposition tarifaire (devis) envoyée par le garagiste.
- Suivre visuellement l'état d'avancement (En attente, En cours, Terminé...) de la réparation.
- Dialoguer avec un Chat IA pour un avis mécanique rapide.

**Espace Administrateur (Garagiste) :**

- Disposer d'un tableau de bord avec des graphiques statistiques (revenus, activité).
- Gérer la liste des utilisateurs et contrôler qui a accès à la plateforme.
- Mettre à jour le catalogue des services (prix, catégories).
- Gérer le planning en acceptant ou déclinant les rendez-vous en ligne.
- Composer des devis détaillés selon les pièces nécessaires et la main-d'œuvre.
- Faire avancer le statut des réparations en atelier et pouvoir y joindre des notes.

### Besoins non fonctionnels

Les besoins non fonctionnels définissent les critères de qualité du système.

- **Sécurité** : Protection de l'application via les sessions (JWT) et mots de passe masqués (hachage bcrypt). Les pages "Admin" doivent être cloisonnées.
- **Performance** : Temps de réponse rapides. L'interface ne doit pas scintiller lors de la navigation (Single Page Application).
- **Ergonomie UI/UX** : L'expérience doit être intuitive et esthétique. L'interface doit s'adapter aux écrans de smartphones (Responsive Design).
- **Intégrité** : Maintien strict de l'intégrité des données via des validations robustes (un utilisateur ne peut pas créer deux voitures avec la même immatriculation).

---

## 3. Modélisation Globale

### Use Case GLOBAL (Les utilisateurs et le système)

Le diagramme de cas d'utilisation abstrait présente l'interaction principale entre les acteurs (Client, Administrateur, IA) et le projet **AutoExpert**.

```mermaid
usecaseDiagram
    actor Client
    actor Administrator
    actor "Modèle IA (Ollama)" as IA

    package "Plateforme Garage AutoExpert" {
        usecase "S'authentifier" as UC1
        usecase "Accéder Dashboard" as UC2
        usecase "Gérer ses Véhicules" as UC3
        usecase "Gérer Réservations" as UC4
        usecase "Gérer Devis" as UC5
        usecase "Gérer les Réparations" as UC6
        usecase "Administration (Services, Clients)" as UC7
        usecase "Consulter l'assistant IA" as UC8
        usecase "Fournir Diagnostic" as UC9
    }

    Client --> UC1
    Client --> UC2
    Client --> UC3
    Client --> UC4
    Client --> UC5
    Client --> UC6
    Client --> UC8

    Administrator --> UC1
    Administrator --> UC2
    Administrator --> UC4
    Administrator --> UC5
    Administrator --> UC6
    Administrator --> UC7

    UC8 <.. UC9 : <<extend>>
    IA --> UC9
```

---

## Conclusion

Ce deuxième chapitre nous a permis de structurer la logique globale du projet **AutoExpert**. L'analyse des besoins nous a permis d'extraire le **Product Backlog**, et nous avons planifié la réalisation sur **trois Sprints** distincts.
Cette organisation méthodique, couplée à une modélisation UML globale des cas d’utilisation, offre un cadre solide pour entamer la phase de développement et de réalisation qui sera détaillée dans le chapitre suivant.
