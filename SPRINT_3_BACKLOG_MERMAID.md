# 🏃‍♂️ Sprint 3 : Tableau de Bord, Suivi des Réparations et Intégration IA

Ce fichier détaille le contenu clair et réel du Sprint 3 du projet AutoExpert, incluant le backlog raffiné, la répartition de l'effort des User Stories, et les schémas explicatifs utilisant **Mermaid** pour une visualisation directe dans Markdown.

## 📋 1. Product Backlog du Sprint 3

| ID        | User Story                                                                                                                                                     | Tâche principale                                                                                                                                                                       | Complexité / Effort   |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- |
| **US-6**  | En tant qu'Admin, je veux faire évoluer le statut d'une réparation.                                                                                            | Développer le système de transitions (En cours → Terminée → Livrée) et les notes techniques.                                                                                           | Intermédiaire — 2 pts |
| **US-6b** | En tant que Client, je veux consulter le tableau de bord et l’état de mes réparations afin de suivre l’évolution et confirmer la récupération de mon véhicule. | Implémenter l’interface Dashboard Client affichant les statistiques principales (véhicules, rendez-vous, devis) ainsi que la section de suivi des réparations avec leur statut actuel. | Intermédiaire — 2 pts |
| **US-7**  | En tant qu'Admin, je veux visualiser les statistiques globales du garage sur le tableau de bord.                                                               | Implémentation des agrégations MongoDB pour calculer les KPIs et affichage des résultats sous forme des cartes.                                                                        | Intermédiaire — 2 pts |
| **US-8**  | En tant que Client, je veux dialoguer avec une IA pour obtenir un pré-diagnostic de mon véhicule.                                                              | Connecter le backend à Ollama llama3.1 et développer l'interface Chat IA avec historique.                                                                                              | Difficile — 4 pts     |
| **TOTAL** | **Toutes les fonctionnalités ont été implémentées et testées.**                                                                                                |                                                                                                                                                                                        | **10 pts**            |

---

## 📊 2. Répartition de l'effort (Story Points)

Ce graphique illustre le poids de chaque fonctionnalité dans le sprint.

```mermaid
pie title Répartition de l'effort du Sprint 3 (Total: 10 pts)
    "US-6 (Statut Réparations Admin)" : 2
    "US-6b (Dashboard Client & Suivi)" : 2
    "US-7 (Dashboard Admin KPIs)" : 2
    "US-8 (Chat IA Pré-diagnostic)" : 4
```

---

## 🔄 3. Cycle de vie d'une Réparation (US-6 & US-6b)

Ce schéma d'état (State Diagram) illustre comment le statut d'une réparation évolue dans le système grâce aux actions de l'Administrateur, et comment le Client interagit à la fin.

```mermaid
stateDiagram-v2
    [*] --> En_cours : Devis accepté (Auto)

    state "En Cours" as En_cours
    state "Terminée" as Terminee
    state "Livrée" as Livree

    En_cours --> Terminee : L'Admin marque la réparation comme terminée
    Terminee --> Livree : L'Admin remet le véhicule au client

    Livree --> [*] : Le Client confirme la récupération sur son Dashboard

    note right of En_cours
        L'Admin peut ajouter
        des notes techniques
        tout au long du processus
    end note
```

---

## 🧠 4. Répartition des Fonctionnalités par Acteur (Mindmap)

Une carte heuristique (Mindmap) qui résume parfaitement qui fait quoi durant ce Sprint 3.

```mermaid
mindmap
  root((Sprint 3
  AutoExpert))
    Admin
      Gestion Réparations (US-6)
        Mises à jour des statuts
        Ajout de notes techniques
      Tableau de bord (US-7)
        KPIs Globaux
        Agrégations MongoDB (Revenus, RDVs)
    Client
      Dashboard Personnel (US-6b)
        Aperçu des véhicules
        Suivi des réparations en temps réel
        Bouton de confirmation de récupération
      Assistant IA (US-8)
        Chat avec llama3.1
        Pré-diagnostic automobile
```

---

## ⚙️ 5. Séquence de Communication de l'IA (US-8)

Ce diagramme de séquence montre l'interaction technique et l'implication d'Ollama (llama3.1) en temps réel pour générer le pré-diagnostic client.

```mermaid
sequenceDiagram
    actor Client
    participant Frontend (React)
    participant Backend (Node/Express)
    participant Ollama (llama3.1)

    Client->>Frontend (React): Saisit les symptômes ("Bruit au freinage")
    Frontend (React)->>Backend (Node/Express): POST /api/chat { message }
    Backend (Node/Express)->>Backend (Node/Express): Construit le prompt avec le rôle AutoExpert
    Backend (Node/Express)->>Ollama (llama3.1): Envoie la requête de génération
    Ollama (llama3.1)-->>Backend (Node/Express): Retourne la réponse en streaming (Chunks)
    Backend (Node/Express)-->>Frontend (React): Transfère les chunks via Server-Sent Events (SSE)
    Frontend (React)-->>Client: Affiche le texte progressivement
```
