# 📊 Rapport d'Analyse Frontend : Problèmes et Connexions Backend

Ce rapport détaille les problèmes identifiés dans le dossier `frontend` et dresse la liste complète des connexions (fonctions) reliant les pages React au serveur Backend.

---

## 🛑 1. Analyse des Problèmes Frontend (Rapport Linter)

Après une analyse complète avec **ESLint** sur l'ensemble du dossier `src/`, voici les conclusions :

> [!TIP]
> **Le code front-end est structurellement sain.** La très grande majorité des erreurs affichées dans votre éditeur sont en réalité des **"Faux Positifs"** causés par une configuration ESLint incomplète pour Vite + React 17+.

### Le problème principal : `'React' must be in scope when using JSX`
- **Explication :** Environ 90% des erreurs qui apparaissent en rouge dans votre code viennent de la règle `react/react-in-jsx-scope`. 
- **La réalité :** Depuis React 17, il n'est plus nécessaire d'écrire `import React from 'react'` dans chaque fichier pour utiliser du JSX. Vite.js gère cela automatiquement. Cependant, le linter (ESLint) de votre projet ne le sait pas et continue d'exiger cette importation.
- **Solution possible :** Soit continuer à ignorer cette erreur, soit modifier `eslint.config.js` pour désactiver la règle `"react/react-in-jsx-scope": "off"`.

### Autres petits avertissements 
- Quelques variables définies mais jamais utilisées. (Corrigé précédemment sur la page `ChatAIPage.jsx`).
- Globalement, il n'y a **aucune erreur fatale** qui empêcherait le code de fonctionner. Le projet compile très bien.

---

## 🔗 2. Cartographie des Connexions Backend par Fichier

Voici la liste de **tous les appels API** découverts dans le front-end. Ils s'appuient sur l'instance configurée `api` (Axios).

### ⚙️ Authentification & Configuration Globale
#### `src/services/api/axios.js`
- `api.post('/auth/login')` : Connexion de l'utilisateur.
- `api.post('/auth/register')` : Inscription d'un nouvel utilisateur.

#### `src/pages/AppPages/ProfilePage.jsx`
- `api.put('/auth/profile')` : Mettre à jour les informations du profil.
- `api.put('/auth/change-password')` : Changer le mot de passe.
- `api.post(...)` : Upload de la photo de profil / avatar.

---

### 👤 Pages Côté Client (`src/pages/client/`)

#### `ChatAIPage.jsx`
- `api.get('/chat/ai/status')` : Vérifier si le modèle IA (Ollama) est en ligne.
- `api.post('/chat/ai')` : Envoyer une conversation à l'IA et obtenir une réponse.

#### `DashboardPage.jsx`
- `api.get('/vehicles')` : Récupérer ses véhicules.
- `api.get('/reservations')` : Récupérer ses réservations.
- `api.get('/devis')` : Récupérer ses devis.
- `api.get('/reparations')` : Récupérer ses réparations en cours.
- `api.get('/services')` : Voir les services disponibles.
- *Actions directes :* Validation d'un devis (`PUT /devis/:id/accept`), récupération d'un véhicule (`PUT /reparations/:id/recuperer`), suppression d'une réservation (`DELETE`).

#### `MyVehiclePage.jsx`
- `api.get('/vehicles')` : Liste des véhicules du client.
- `api.post('/vehicles')` : Ajouter un nouveau véhicule.
- `api.put('/vehicles/:id')` : Modifier un véhicule existant.
- `api.delete('/vehicles/:id')` : Supprimer un véhicule.

#### `ReservationsPage.jsx` & `MyReservationsPage.jsx`
- `api.post('/reservations')` : Créer une nouvelle réservation.
- `api.get('/reservations')` : Historique des réservations.
- `api.delete('/reservations/:id')` : Annuler une réservation.

#### `DevisPage.jsx`
- `api.get('/devis')` : Historique des devis du client.
- `api.put('/devis/:id/accept')` : Accepter un devis.
- `api.put('/devis/:id/reject')` : Refuser un devis.

---

### 🛡️ Pages Côté Administrateur (`src/pages/admin/`)

#### `GestionClients.jsx`
- `api.get('/admin/clients')` : Liste de tous les clients de l'application.

#### `GestionServices.jsx`
- `api.get('/admin/services')` : Obtenir tous les catalogues de services.
- `api.post('/admin/services')` : Ajouter un service.
- `api.put('/admin/services/:id')`, `api.delete('/admin/services/:id')` : Éditer/Supprimer un service.
- `api.put('/admin/services/:id/archive')` / `reactivate` : Archiver un service.

#### `GestionReservations.jsx`
- `api.get('/admin/reservations')` : Liste de toutes les réservations.
- `api.put('/admin/reservations/:id/accept')` : Accepter une réservation client.
- `api.put('/admin/reservations/:id/reject')` : Rejeter une réservation (avec motif).

#### `GestionReparations.jsx`
- `api.get('/admin/reparations')` : Liste du suivi des réparations atelier.
- `api.put('/admin/reparations/:id/start')` : Commencer la réparation d'un véhicule.
- `api.put('/admin/reparations/:id/complete')` : Finir la réparation (avec notes du technicien).
- `api.delete('/admin/reparations/:id')` : Effacer le dossier de réparation.

#### `GestionDevis.jsx`
- *Chargement initial :* Effectue plusieurs appels en parallèle pour récupérer les devis (`/admin/devis`), clients (`/admin/clients`), véhicules liés (`/admin/vehicles`) et réservations.
- `api.post('/admin/devis')` : Assigner et envoyer un devis formel à un client.
- `api.put('/admin/devis/:id')` : Modifier un devis.
- `api.delete('/admin/devis/:id')` : Supprimer un devis du système.

---

> [!NOTE]
> **Structure des appels** : Vous utilisez une instance **Axios centralisée** (`api`). C'est une excellente pratique qui permet d'injecter automatiquement les tokens d'authentification (JWT) à chaque appel grâce aux intercepteurs définis dans `axios.js`.
