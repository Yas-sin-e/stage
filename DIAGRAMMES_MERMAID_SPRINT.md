# Diagrammes Visuels UML - AutoExpert

## SPRINT 1 : Diagrammes Cas d'Utilisation

### Diagramme Global - Sprint 1

```mermaid
usecase
    actor Visiteur
    actor Client
    actor Admin
    actor Email["Système Email"]
    
    Visiteur --> (S'inscrire)
    Visiteur --> (Se connecter)
    Visiteur --> (Réinitialiser MDP)
    
    Client --> (Gérer Mon Profil)
    Client --> (Consulter Services)
    
    Admin --> (Gérer Comptes Clients)
    Admin --> (Gérer Services)
    Admin --> (Tableau de Bord Admin)
    
    (S'inscrire) .> (Valider Email) : <<inclure>>
    (Réinitialiser MDP) --> Email
    (Se connecter) .> (Générer JWT) : <<inclure>>
```

### Diagramme Raffiné - Sprint 1

```mermaid
usecase
    actor V["Visiteur"]
    actor C["Client"]
    actor A["Administrateur"]
    
    rectangle "Authentification & Accès" {
        V --> (US-1a: S'inscrire)
        V --> (US-1b: Se connecter)
        V --> (US-1c: Réinitialiser MDP)
        (S'inscrire) .> (Hash Bcrypt) : <<inclure>>
        (Se connecter) .> (Vérifier JWT) : <<inclure>>
        (Réinitialiser MDP) .> (Envoyer Email) : <<inclure>>
    }
    
    rectangle "Gestion Profil & Comptes" {
        C --> (US-1d: Gérer Mon Profil)
        A --> (US-1e: Gérer Comptes Clients)
    }
    
    rectangle "Gestion Catalogue Services" {
        A --> (US-2: CRUD Services)
        C --> (Consulter Catalogue)
        (CRUD Services) .> (Consulter Catalogue) : <<inclure>>
    }
    
    rectangle "Tableaux de Bord" {
        C --> (Tableau de Bord Client)
        A --> (Tableau de Bord Admin)
    }
```

### Diagramme de Classes - Sprint 1

```mermaid
classDiagram
    class Utilisateur {
        _id: ObjectId
        nom: String
        email: String (unique)
        motDePasse: String (bcrypt)
        telephone: String
        role: Enum[client, admin]
        actif: Boolean
        tokenReinitialisation: String?
        expirationReinitialisation: Date?
        createdAt: Date
        updatedAt: Date
    }
    
    class Service {
        _id: ObjectId
        nom: String
        description: String
        prixBase: Number
        tempsEstime: String
        categorie: String
        createdAt: Date
        updatedAt: Date
    }
    
    Utilisateur "1" <-- "plusieurs" Service : Administrateur gère
```

---

## SPRINT 2 : Diagrammes Cas d'Utilisation

### Diagramme Global - Sprint 2

```mermaid
usecase
    actor Client
    actor Admin
    
    Client --> (Gérer Mes Véhicules)
    Client --> (Créer une Réservation)
    Client --> (Consulter Les Devis)
    
    Admin --> (Valider Réservations)
    Admin --> (Créer Devis)
    Admin --> (Consulter Les Devis Clients)
    
    (Créer une Réservation) .> (Sélectionner Véhicule) : <<inclure>>
    (Créer une Réservation) .> (Sélectionner Service) : <<inclure>>
    (Consulter Les Devis) .> (Accepter Devis) : <<extension>>
    (Accepter Devis) .> (Créer Réparation Auto) : <<inclure>>
```

### Diagramme Raffiné - Sprint 2

```mermaid
usecase
    actor C["Client"]
    actor A["Administrateur"]
    
    rectangle "Gestion Mes Véhicules" {
        C --> (US-3a: Ajouter Véhicule)
        C --> (US-3b: Modifier Véhicule)
        C --> (US-3c: Supprimer Véhicule)
        C --> (US-3d: Consulter Mes Véhicules)
        (Ajouter Véhicule) .> (Valider Immatriculation) : <<inclure>>
    }
    
    rectangle "Workflow Réservations" {
        C --> (US-4a: Créer Réservation)
        A --> (US-4b: Valider Réservation)
        A --> (US-4c: Refuser Réservation)
        C --> (US-4d: Annuler Réservation)
        (Créer Réservation) .> (Choisir Date) : <<inclure>>
    }
    
    rectangle "Workflow Devis & Réparation" {
        A --> (US-5a: Générer Devis)
        C --> (US-5b: Accepter Devis)
        C --> (US-5c: Refuser Devis)
        (Accepter Devis) .> (AUTO-Créer Réparation) : <<inclure>>
    }
```

### Diagramme de Classes - Sprint 2

```mermaid
classDiagram
    class Utilisateur {
        _id: ObjectId
        nom: String
        email: String
    }
    
    class Vehicule {
        _id: ObjectId
        userId: FK
        marque: String
        modele: String
        annee: Number
        immatriculation: String (unique)
        vin: String
        couleur: String
        kilometrage: Number
    }
    
    class Reservation {
        _id: ObjectId
        userId: FK
        vehiculeId: FK
        serviceId: FK
        dateChoisie: Date
        statut: Enum[en attente,acceptée,refusée]
    }
    
    class Devis {
        _id: ObjectId
        userId: FK
        vehiculeId: FK
        reservationId: FK
        libelle: String
        montant: Number
        articles: Array
        statut: Enum[en attente,accepté,refusé]
    }
    
    Utilisateur "1" -- "plusieurs" Vehicule
    Utilisateur "1" -- "plusieurs" Reservation
    Vehicule "1" -- "plusieurs" Reservation
    Reservation "1" -- "1" Devis
```

### Diagramme Séquence - Workflow Réservation

```mermaid
sequenceDiagram
    participant Client
    participant Interface Client
    participant Serveur Backend
    participant Base de Données
    participant Interface Admin
    
    Client->>Interface Client: 1. Choisir Véhicule + Service + Date
    Interface Client->>Serveur Backend: 2. POST /api/reservations
    Serveur Backend->>Base de Données: 3. Créer Réservation (statut=en attente)
    Base de Données-->>Serveur Backend: Confirmation
    Serveur Backend-->>Interface Client: HTTP 201 OK
    Interface Client-->>Client: "Réservation envoyée !"
    
    Note over Interface Admin: Admin accède au tableau de bord
    Interface Admin->>Serveur Backend: 4. GET /api/admin/reservations
    Serveur Backend->>Base de Données: Récupérer réservations en attente
    Base de Données-->>Serveur Backend: Liste
    Serveur Backend-->>Interface Admin: Afficher liste
    
    Interface Admin->>Serveur Backend: 5. PUT /api/admin/reservations/:id/accepter
    Serveur Backend->>Base de Données: Mettre à jour statut = acceptée
    Base de Données-->>Serveur Backend: OK
    Serveur Backend-->>Interface Admin: Notification
    
    Interface Admin->>Serveur Backend: 6. POST /api/admin/devis (créer)
    Serveur Backend->>Base de Données: Créer Devis
    Base de Données-->>Serveur Backend: OK
    Serveur Backend-->>Interface Admin: Devis créé
    
    Note over Client: Client accepte le devis
    Client->>Interface Client: 7. Accepter Devis
    Interface Client->>Serveur Backend: 8. PUT /api/devis/:id/accepter
    Serveur Backend->>Base de Données: Créer Réparation automatiquement
    Base de Données-->>Serveur Backend: Réparation créée
    Serveur Backend-->>Interface Client: HTTP 200 OK
    Interface Client-->>Client: "Réparation en cours !"
```

---

## SPRINT 3 : Diagrammes Cas d'Utilisation

### Diagramme Global - Sprint 3

```mermaid
usecase
    actor Client
    actor Admin
    actor IA["Ollama (Intelligence Artificielle)"]
    
    Client --> (Suivre Réparation)
    Client --> (Chat IA pour Diagnostic)
    Client --> (Confirmer Récupération)
    
    Admin --> (Gérer Statut Réparation)
    Admin --> (Ajouter Notes Techniques)
    Admin --> (Consulter Tableau Analytique)
    
    (Chat IA pour Diagnostic) --> IA
```

### Diagramme Raffiné - Sprint 3

```mermaid
usecase
    actor C["Client"]
    actor A["Administrateur"]
    actor LLM["Ollama llama3.1"]
    
    rectangle "Suivi Réparations" {
        C --> (US-6b: Voir Chronologie Statut)
        C --> (US-6b: Consulter Notes Techniques)
        C --> (US-6b: Confirmer Récupération)
        A --> (US-6a: Changer le Statut)
        A --> (US-6a: Ajouter Notes Techniques)
        (Changer le Statut) .> (Notifier Client) : <<inclure>>
    }
    
    rectangle "Chat IA Automobile" {
        C --> (US-8: Décrire les Symptômes)
        (Décrire les Symptômes) --> LLM
        LLM --> (US-8: Générer Diagnostic)
        (Générer Diagnostic) .> (Recommander Services) : <<inclure>>
    }
    
    rectangle "Tableau de Bord Analytique" {
        A --> (US-7: Visualiser KPI)
        A --> (US-7: Voir Graphiques Revenus)
        A --> (US-7: Voir Activité Hebdomadaire)
        (Visualiser KPI) .> (Filtrer par Dates) : <<extension>>
    }
```

### Diagramme de Classes - Sprint 3

```mermaid
classDiagram
    class Reparation {
        _id: ObjectId
        userId: FK
        vehiculeId: FK
        devisId: FK
        montantTotal: Number
        service: String
        statut: Enum[en attente,en cours,terminée,livrée]
        dateDebut: Date
        dateFinEstimee: Date
        dateTerminaison: Date
        dateLivraison: Date
        notes: String
        noteTechnicien: String
    }
    
    class Conversation {
        _id: ObjectId
        userId: FK
        messages: Array
        contexteVehicule: FK?
    }
    
    class Message {
        expediteur: Enum[utilisateur,ia]
        contenu: String
        timestamp: Date
    }
    
    Reparation "1" -- "1" Devis
    Conversation "1" -- "plusieurs" Message
    Conversation "1" -- "0..1" Vehicule
```

### Diagramme Séquence - Chat IA & Diagnostic

```mermaid
sequenceDiagram
    participant Client
    participant Interface Client
    participant Serveur Backend
    participant Ollama
    
    Client->>Interface Client: 1. Ouvre l'interface Chat IA
    Client->>Interface Client: 2. Décrit les symptômes du véhicule
    Interface Client->>Serveur Backend: 3. POST /api/chat/diagnostiquer {message}
    
    Serveur Backend->>Serveur Backend: 4. Construire le prompt contextualisé
    Serveur Backend->>Ollama: 5. Envoyer le prompt à llama3.1
    
    Note over Ollama: IA traite la requête (3-15 secondes)
    Ollama-->>Serveur Backend: 6. Retourner le diagnostic
    
    Serveur Backend->>Serveur Backend: 7. Analyser la réponse IA
    Serveur Backend-->>Interface Client: 8. HTTP 200 + diagnostic
    
    Interface Client->>Interface Client: 9. Afficher le diagnostic structuré
    Interface Client-->>Client: 10. Afficher:<br/>- Diagnostic probable<br/>- Causes possibles<br/>- Services recommandés
    
    Client->>Interface Client: 11. Cliquer sur un service recommandé
    Interface Client->>Interface Client: 12. Rediriger vers création réservation
    Interface Client-->>Serveur Backend: 13. Pré-remplir le service
```

### Diagramme Séquence - Workflow Statut Réparation

```mermaid
sequenceDiagram
    participant Interface Admin
    participant API Backend
    participant Base de Données
    participant Portal Client
    
    Interface Admin->>API Backend: 1. GET /admin/reparations
    API Backend->>Base de Données: Récupérer les réparations
    Base de Données-->>API Backend: Liste (statut=en cours)
    API Backend-->>Interface Admin: Afficher le tableau
    
    Interface Admin->>API Backend: 2. PUT /admin/reparations/:id/statut
    API Backend->>Base de Données: Mettre à jour statut=terminée
    Base de Données-->>API Backend: OK
    API Backend->>API Backend: 3. Envoyer une notification
    API Backend-->>Interface Admin: HTTP 200
    
    Note over Portal Client: Client reçoit une notification
    Portal Client->>API Backend: 4. GET /api/reparations/mes-reparations
    API Backend->>Base de Données: Récupérer les réparations du client
    Base de Données-->>API Backend: Réparation avec statut=terminée
    API Backend-->>Portal Client: Afficher la chronologie
    
    Portal Client-->>Portal Client: 5. Afficher la chronologie:<br/>En cours → Terminée → Livrée
    
    Portal Client->>API Backend: 6. PUT /api/reparations/:id/confirmer-livraison
    API Backend->>Base de Données: Mettre à jour statut=livrée, dateLivraison=maintenant
    Base de Données-->>API Backend: OK
    API Backend-->>Portal Client: HTTP 200 + confirmation
```

---

## Résumé des Diagrammes UML

| Sprint | Type | Nombre | Format |
|--------|------|--------|--------|
| **Sprint 1** | Diagramme Cas d'Utilisation Global + Raffiné | 2 | Mermaid (Français) |
| **Sprint 1** | Diagramme de Classes | 1 | Mermaid (Français) |
| **Sprint 2** | Diagramme Cas d'Utilisation Global + Raffiné | 2 | Mermaid (Français) |
| **Sprint 2** | Diagramme de Classes | 1 | Mermaid (Français) |
| **Sprint 2** | Diagramme Séquence (Workflow Réservation) | 1 | Mermaid (Français) |
| **Sprint 3** | Diagramme Cas d'Utilisation Global + Raffiné | 2 | Mermaid (Français) |
| **Sprint 3** | Diagramme de Classes | 1 | Mermaid (Français) |
| **Sprint 3** | Diagramme Séquence (Chat IA) | 1 | Mermaid (Français) |
| **Sprint 3** | Diagramme Séquence (Statut Réparation) | 1 | Mermaid (Français) |
| | **TOTAL** | **12 diagrammes** | **✅ 100% en Français** |

---

✅ Tous les diagrammes sont maintenant entièrement en **français** pour une meilleure lisibilité et professionnalisme !

