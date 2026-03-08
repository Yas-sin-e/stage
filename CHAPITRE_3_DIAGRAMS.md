# Chapitre 3 : RÔö£┬«alisation et Tests

## Introduction

Ce chapitre dÔö£┬«crit la mise en Ôö╝├┤uvre pratique de la plateforme **AutoExpert**, organisÔö£┬«e en trois sprints successifs selon la mÔö£┬«thodologie Scrum. Pour chaque sprint, nous prÔö£┬«sentons le backlog simplifiÔö£┬«, les diagrammes UML (cas d'utilisation, sÔö£┬«quences, classes), ainsi que les interfaces rÔö£┬«alisÔö£┬«es. Le chapitre se conclut par les rÔö£┬«trospectives et la phase de tests de validation.

---

## Sprint 1 : Authentification, Accueil & Base ├ö├ç├Â Fondations SÔö£┬«curisÔö£┬«es
**DurÔö£┬«e : 1 semaine | Effort : 14 points**

Le premier sprint pose les fondations sÔö£┬«curisÔö£┬«es de l'application : authentification complÔö£┬┐te (inscription, connexion, rÔö£┬«initialisation du mot de passe), mise en place de l'interface d'accueil, des tableaux de bord, de la gestion des profils utilisateur, des clients et du catalogue de services.

### 1.1 Backlog du Sprint 1

| ID | User Story | TÔö£├│che principale | Effort |
|---|---|---|---|
| **US-1a/b** | En tant que Visiteur, je veux m'inscrire et me connecter pour accÔö£┬«der Ôö£├í mon espace personnel. | DÔö£┬«velopper les routes d'authentification (JWT + Bcrypt) et les formulaires React. | Difficile ├ö├ç├Â 5 pts |
| **US-1c** | En tant qu'Utilisateur, je veux rÔö£┬«initialiser mon mot de passe par email pour rÔö£┬«cupÔö£┬«rer mon accÔö£┬┐s. | ImplÔö£┬«menter l'envoi d'email sÔö£┬«curisÔö£┬« avec lien temporaire via Nodemailer. | IntermÔö£┬«diaire ├ö├ç├Â 3 pts |
| **US-1d** | En tant que Client, je veux gÔö£┬«rer mon profil pour maintenir mes informations Ôö£├í jour. | CrÔö£┬«er la route de mise Ôö£├í jour du profil, l'interface des paramÔö£┬┐tres et le Dashboard Client. | IntermÔö£┬«diaire ├ö├ç├Â 2 pts |
| **US-1e** | En tant qu'Administrateur, je veux gÔö£┬«rer les comptes clients pour contrÔö£Ôöñler les accÔö£┬┐s. | Mettre en place la liste des utilisateurs, le contrÔö£Ôöñle des accÔö£┬┐s et le Dashboard Admin. | IntermÔö£┬«diaire ├ö├ç├Â 2 pts |
| **US-2** | En tant qu'Administrateur, je veux gÔö£┬«rer les services pour dÔö£┬«finir le catalogue du garage. | DÔö£┬«velopper la gestion complÔö£┬┐te (CRUD) du catalogue des prestations. | Facile ├ö├ç├Â 2 pts |
| | | **TOTAL** | **14 pts** |

### 1.2 Diagramme de Cas d'Utilisation ├ö├ç├Â Sprint 1

#### Use Case Global ├ö├ç├Â Vue Abstraite

Au premier niveau, les cas d'utilisation sont regroupÔö£┬«s sous la forme d'actions gÔö£┬«nÔö£┬«riques Ôö¼┬¢ GÔö£┬«rer... Ôö¼Ôòù. Ce diagramme offre une vision synthÔö£┬«tique du pÔö£┬«rimÔö£┬┐tre fonctionnel du sprint :

- **GÔö£┬«rer l'Authentification** : inscription, connexion, rÔö£┬«initialisation
- **GÔö£┬«rer les Comptes** : profil utilisateur et gestion administrative
- **GÔö£┬«rer les Services** : catalogue du garage

#### Use Case RaffinÔö£┬« ├ö├ç├Â Vue DÔö£┬«taillÔö£┬«e par Acteur

Ce niveau dÔö£┬«taille chaque cas global en actions concrÔö£┬┐tes :

**Acteurs** :
- **Visiteur** : utilisateur non authentifiÔö£┬«
- **Client** : utilisateur authentifiÔö£┬« avec rÔö£Ôöñle Ôö¼┬¢ client Ôö¼Ôòù
- **Administrateur** : utilisateur authentifiÔö£┬« avec rÔö£Ôöñle Ôö¼┬¢ admin Ôö¼Ôòù
- **SystÔö£┬┐me Email (Nodemailer)** : acteur secondaire externe

**Relations UML** :
- `<<include>>` : action toujours exÔö£┬«cutÔö£┬«e (ex. : vÔö£┬«rification JWT)
- `<<extend>>` : action optionnelle dÔö£┬«clenchÔö£┬«e sous condition (ex. : rÔö£┬«initialisation si mot de passe oubliÔö£┬«)

### 1.3 Descriptions des Cas d'Utilisation ├ö├ç├Â Sprint 1

#### Use Case 1 : S'inscrire

| | |
|---|---|
| **Acteur principal** | Visiteur (non connectÔö£┬«) |
| **Objectif** | CrÔö£┬«er un nouveau compte client sur la plateforme AutoExpert |
| **PrÔö£┬«-conditions** | L'utilisateur n'a pas encore de compte. L'email saisi n'existe pas en base. |
| **ScÔö£┬«nario nominal** | 1. Le visiteur remplit le formulaire (nom, email, tÔö£┬«lÔö£┬«phone, mot de passe)<br>2. Le frontend valide les champs en temps rÔö£┬«el<br>3. Le backend vÔö£┬«rifie l'unicitÔö£┬« de l'email<br>4. Le mot de passe est hachÔö£┬« via Bcrypt<br>5. Un compte avec le rÔö£Ôöñle Ôö¼┬¢ client Ôö¼Ôòù est crÔö£┬«Ôö£┬«<br>6. Un JWT est gÔö£┬«nÔö£┬«rÔö£┬« et l'utilisateur est redirigÔö£┬« vers son dashboard |
| **ScÔö£┬«nario alternatif** | Email dÔö£┬«jÔö£├í existant ├ö├Ñ├å HTTP 409 + message Ôö¼┬¢ Cet email est dÔö£┬«jÔö£├í utilisÔö£┬« Ôö¼Ôòù |

#### Use Case 2 : Se connecter

| | |
|---|---|
| **Acteur principal** | Visiteur possÔö£┬«dant un compte (Client ou Admin) |
| **Objectif** | AccÔö£┬«der Ôö£├í son espace personnel via une authentification sÔö£┬«curisÔö£┬«e |
| **PrÔö£┬«-conditions** | L'utilisateur possÔö£┬┐de un compte actif avec email et mot de passe valides |
| **ScÔö£┬«nario nominal** | 1. L'utilisateur saisit son email et son mot de passe<br>2. Le backend compare le mot de passe avec le hash Bcrypt stockÔö£┬«<br>3. Un JWT est gÔö£┬«nÔö£┬«rÔö£┬« et retournÔö£┬« au frontend (validitÔö£┬« : 30 jours)<br>4. Redirection selon le rÔö£Ôöñle : Client ├ö├Ñ├å Dashboard Client / Admin ├ö├Ñ├å Dashboard Admin |
| **ScÔö£┬«nario alternatif** | Identifiants incorrects ├ö├Ñ├å HTTP 401 + message Ôö¼┬¢ Email ou mot de passe incorrect Ôö¼Ôòù<br>Compte bloquÔö£┬« ├ö├Ñ├å HTTP 403 + message Ôö¼┬¢ Compte dÔö£┬«sactivÔö£┬« Ôö¼Ôòù |

#### Use Case 3 : RÔö£┬«initialiser le mot de passe

| | |
|---|---|
| **Acteur principal** | Utilisateur ayant oubliÔö£┬« son mot de passe |
| **Objectif** | Retrouver l'accÔö£┬┐s Ôö£├í son compte via un lien sÔö£┬«curisÔö£┬« envoyÔö£┬« par email |
| **PrÔö£┬«-conditions** | L'utilisateur possÔö£┬┐de un compte actif avec un email valide enregistrÔö£┬« en base |
| **ScÔö£┬«nario nominal** | 1. L'utilisateur saisit son email sur la page Ôö¼┬¢ Mot de passe oubliÔö£┬« Ôö¼Ôòù<br>2. Le backend gÔö£┬«nÔö£┬┐re un token unique valable 1 heure<br>3. Nodemailer envoie le lien de rÔö£┬«initialisation (systÔö£┬┐me externe)<br>4. L'utilisateur clique sur le lien et saisit son nouveau mot de passe<br>5. Le token est validÔö£┬« et le nouveau mot de passe hachÔö£┬« est sauvegardÔö£┬« |
| **ScÔö£┬«nario alternatif** | Token expirÔö£┬« (> 1h) ├ö├Ñ├å Message Ôö¼┬¢ Lien expirÔö£┬« Ôö¼Ôòù<br>Lien dÔö£┬«jÔö£├í utilisÔö£┬« ├ö├Ñ├å Message Ôö¼┬¢ Lien invalide Ôö¼Ôòù |

#### Use Case 4 : GÔö£┬«rer les services (Admin)

| | |
|---|---|
| **Acteur principal** | Administrateur authentifiÔö£┬« |
| **Objectif** | CrÔö£┬«er, modifier, consulter et archiver les prestations du catalogue du garage |
| **PrÔö£┬«-conditions** | L'administrateur est connectÔö£┬« avec le rÔö£Ôöñle Ôö¼┬¢ admin Ôö¼Ôòù |
| **ScÔö£┬«nario nominal** | 1. L'admin accÔö£┬┐de Ôö£├í la page Ôö¼┬¢ Gestion des Services Ôö¼Ôòù<br>2. Il consulte le catalogue existant<br>3. Il crÔö£┬«e, modifie ou archive un service (nom, description, prix, durÔö£┬«e, catÔö£┬«gorie)<br>4. Les modifications sont sauvegardÔö£┬«es via l'API REST |
| **ScÔö£┬«nario alternatif** | Champ obligatoire manquant ├ö├Ñ├å Message de validation<br>Service liÔö£┬« Ôö£├í une rÔö£┬«servation active ├ö├Ñ├å Archivage proposÔö£┬« Ôö£├í la place de la suppression |

### 1.4 Diagramme de Classes ├ö├ç├Â Sprint 1

**EntitÔö£┬«s principales** :

```
├ö├Â├«├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ë
├ö├Â├®           User (Utilisateur)        ├ö├Â├®
├ö├Â┬ú├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├▒
├ö├Â├® ├ö├ç├│ _id: ObjectId (PK)               ├ö├Â├®
├ö├Â├® ├ö├ç├│ name: String (requis)            ├ö├Â├®
├ö├Â├® ├ö├ç├│ email: String (requis, unique)   ├ö├Â├®
├ö├Â├® ├ö├ç├│ password: String (hashÔö£┬« Bcrypt)  ├ö├Â├®
├ö├Â├® ├ö├ç├│ phone: String (requis)           ├ö├Â├®
├ö├Â├® ├ö├ç├│ role: Enum ['client', 'admin']   ├ö├Â├®
├ö├Â├® ├ö├ç├│ isActive: Boolean (dÔö£┬«faut: true) ├ö├Â├®
├ö├Â├® ├ö├ç├│ resetPasswordToken: String?      ├ö├Â├®
├ö├Â├® ├ö├ç├│ resetPasswordExpire: Date?       ├ö├Â├®
├ö├Â├® ├ö├ç├│ createdAt: Date                  ├ö├Â├®
├ö├Â├® ├ö├ç├│ updatedAt: Date                  ├ö├Â├®
├ö├Â├Â├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├┐

├ö├Â├«├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ë
├ö├Â├®         Service (Prestation)        ├ö├Â├®
├ö├Â┬ú├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├▒
├ö├Â├® ├ö├ç├│ _id: ObjectId (PK)               ├ö├Â├®
├ö├Â├® ├ö├ç├│ name: String (requis)            ├ö├Â├®
├ö├Â├® ├ö├ç├│ description: String              ├ö├Â├®
├ö├Â├® ├ö├ç├│ price: Number (requis)           ├ö├Â├®
├ö├Â├® ├ö├ç├│ duration: String (ex: "2h")      ├ö├Â├®
├ö├Â├® ├ö├ç├│ category: String (requis)        ├ö├Â├®
├ö├Â├® ├ö├ç├│ createdAt: Date                  ├ö├Â├®
├ö├Â├® ├ö├ç├│ updatedAt: Date                  ├ö├Â├®
├ö├Â├Â├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├┐
```

**Relations** :
- Un Administrateur gÔö£┬┐re plusieurs Services
- Chaque User est identifiÔö£┬« par son rÔö£Ôöñle (client / admin)

### 1.5 RÔö£┬«alisation du Sprint 1 ├ö├ç├Â Interfaces Utilisateur

Le Sprint 1 livre 9 interfaces principales :

#### 1. Page d'Accueil (Visiteur)
- Vitrine publique de la plateforme
- PrÔö£┬«sentation du garage, services proposÔö£┬«s
- Boutons d'inscription et connexion
- AccÔö£┬┐s sans authentification

#### 2. Interface de Connexion
- Formulaire email + mot de passe
- Option affichage/masquage du mot de passe
- Lien Ôö¼┬¢ Mot de passe oubliÔö£┬« Ôö¼Ôòù
- Lien vers page d'inscription
- Messages d'erreur explicites sans rechargement

#### 3. Interface d'Inscription
- Formulaire : nom, email, tÔö£┬«lÔö£┬«phone, mot de passe (confirmation)
- Validation en temps rÔö£┬«el des champs
- RÔö£Ôöñle Ôö¼┬¢ client Ôö¼Ôòù attribuÔö£┬« automatiquement
- Redirection vers dashboard aprÔö£┬┐s gÔö£┬«nÔö£┬«ration JWT

#### 4. Interface de RÔö£┬«initialisation du Mot de Passe
- Ôö£├½tape 1 : saisie de l'email pour recevoir le lien sÔö£┬«curisÔö£┬«
- Ôö£├½tape 2 : saisie du nouveau mot de passe
- ValiditÔö£┬« du lien : 1 heure, utilisation unique

#### 5. Dashboard Client
- Tableau de bord personnalisÔö£┬« du client
- RÔö£┬«sumÔö£┬« des vÔö£┬«hicules enregistrÔö£┬«s
- Liste des rÔö£┬«servations rÔö£┬«centes
- Ôö£├½tat des rÔö£┬«parations en cours
- AccÔö£┬┐s rapide au Chat IA
- Navigation latÔö£┬«rale vers sections de l'espace personnel

#### 6. Dashboard Administrateur
- Tableau de bord global avec cartes KPI :
  - Clients totaux
  - RÔö£┬«servations du mois
  - RÔö£┬«parations en cours
  - Revenus du mois
- Liste des derniÔö£┬┐res rÔö£┬«servations Ôö£├í traiter
- Navigation vers tous les modules de gestion

#### 7. Gestion du Profil (Client)
- Modification des informations personnelles (nom, tÔö£┬«lÔö£┬«phone)
- Changement du mot de passe
- Sauvegarde sÔö£┬«curisÔö£┬«e via requÔö£┬¼te PUT (middleware JWT)

#### 8. Gestion des Services (Admin)
- Catalogue en cartes : nom, catÔö£┬«gorie (badge colorÔö£┬«), prix, durÔö£┬«e
- CrÔö£┬«ation via formulaire modal
- Modification et archivage pour chaque service

#### 9. Gestion des Clients (Admin)
- Tableau paginÔö£┬« : nom, email, tÔö£┬«lÔö£┬«phone, date d'inscription, statut
- Actions : basculer statut, supprimer compte
- Recherche par nom ou email

### 1.6 RÔö£┬«trospective ├ö├ç├Â Sprint 1

| CatÔö£┬«gorie | DÔö£┬«tails |
|---|---|
| **├ö┬ú├á Points positifs** | ├ö├ç├│ Architecture MERN opÔö£┬«rationnelle dÔö£┬┐s le dÔö£┬«but<br>├ö├ç├│ Authentification JWT + Bcrypt sÔö£┬«curisÔö£┬«e et fonctionnelle<br>├ö├ç├│ 14/14 points livrÔö£┬«s ├ö├ç├Â taux de complÔö£┬«tion : **100%**<br>├ö├ç├│ Communication fluide avec les stakeholders |
| **├ö├£├í┬┤┬®├à DifficultÔö£┬«s** | ├ö├ç├│ Configuration initiale de Nodemailer (port SMTP)<br>├ö├ç├│ Gestion des tokens de rÔö£┬«initialisation avec expiration<br>├ö├ç├│ Relations Mongoose (virtual fields et rÔö£┬«fÔö£┬«rences) |
| **┬¡ãÆ├Â┬║ Actions correctives** | ├ö├ç├│ Documenter toutes les variables d'environnement (.env)<br>├ö├ç├│ Ajouter commentaires JSDoc sur les contrÔö£Ôöñleurs backend<br>├ö├ç├│ Tester systÔö£┬«matiquement les cas limites des formulaires |

#### FonctionnalitÔö£┬«s validÔö£┬«es ├ö├ç├Â Sprint 1

| FonctionnalitÔö£┬« | Statut | Remarques |
|---|---|---|
| Inscription / Connexion sÔö£┬«curisÔö£┬«e | ├ö┬ú├á | JWT + Bcrypt opÔö£┬«rationnels |
| RÔö£┬«initialisation MDP par email | ├ö┬ú├á | Token 1h, Nodemailer configurÔö£┬« |
| Gestion du profil ├ö├ç├Â Client | ├ö┬ú├á | Modification des informations personnelles |
| Dashboard Client + Dashboard Admin | ├ö┬ú├á | Interfaces de navigation opÔö£┬«rationnelles |
| Gestion des clients ├ö├ç├Â Admin | ├ö┬ú├á | Bloquer / Activer / Supprimer |
| CRUD Services ├ö├ç├Â Admin | ├ö┬ú├á | Catalogue complet fonctionnel |
| Page d'accueil publique | ├ö┬ú├á | Interface vitrine visible sans authentification |

---

## Sprint 2 : Gestion MÔö£┬«tier ├ö├ç├Â Essentiels OpÔö£┬«rationnels
**DurÔö£┬«e : 1 semaine | Effort : 17 points**

Le deuxiÔö£┬┐me sprint implÔö£┬«mente le cÔö╝├┤ur opÔö£┬«rationnel de la plateforme : la gestion des vÔö£┬«hicules clients, la prise de rendez-vous en ligne et sa validation par l'administrateur, ainsi que la gÔö£┬«nÔö£┬«ration et la validation des devis dÔö£┬«taillÔö£┬«s.

**Flux mÔö£┬«tier complet** : VÔö£┬«hicule ├ö├Ñ├å RÔö£┬«servation ├ö├Ñ├å Validation Admin ├ö├Ñ├å Devis ├ö├Ñ├å Acceptation Client ├ö├Ñ├å RÔö£┬«paration automatique

### 2.1 Backlog du Sprint 2

| ID | User Story | TÔö£├│che principale | Effort |
|---|---|---|---|
| **US-3** | En tant que Client, je veux gÔö£┬«rer mes vÔö£┬«hicules (CRUD) pour les associer Ôö£├í mes interventions. | DÔö£┬«velopper les routes sÔö£┬«curisÔö£┬«es CRUD et l'interface de gestion du parc automobile. | IntermÔö£┬«diaire ├ö├ç├Â 3 pts |
| **US-4** | En tant que Client, je veux prendre et annuler un RDV. En tant qu'Admin, je veux valider ou refuser. | ImplÔö£┬«menter le workflow de rÔö£┬«servation complet avec gestion des statuts. | Difficile ├ö├ç├Â 7 pts |
| **US-5** | En tant qu'Admin, je veux crÔö£┬«er un devis chiffrÔö£┬«. En tant que Client, je veux l'accepter ou refuser. | DÔö£┬«velopper le modÔö£┬┐le Devis, le calcul automatique du total et le dÔö£┬«clenchement de la rÔö£┬«paration. | Difficile ├ö├ç├Â 7 pts |
| | | **TOTAL** | **17 pts** |

### 2.2 Descriptions des Cas d'Utilisation ├ö├ç├Â Sprint 2

#### Use Case 5 : GÔö£┬«rer ses vÔö£┬«hicules (Client)

| | |
|---|---|
| **Acteur principal** | Client authentifiÔö£┬« |
| **Objectif** | Ajouter, consulter, modifier et supprimer ses vÔö£┬«hicules pour les associer aux interventions |
| **PrÔö£┬«-conditions** | Le client est connectÔö£┬«. Pour l'ajout : l'immatriculation ne doit pas dÔö£┬«jÔö£├í exister en base. |
| **ScÔö£┬«nario nominal** | 1. Le client accÔö£┬┐de Ôö£├í la page Ôö¼┬¢ Mes VÔö£┬«hicules Ôö¼Ôòù<br>2. Il remplit le formulaire (marque, modÔö£┬┐le, annÔö£┬«e, immatriculation, VIN, kilomÔö£┬«trage, couleur)<br>3. Le backend valide l'unicitÔö£┬« de l'immatriculation<br>4. Le vÔö£┬«hicule est sauvegardÔö£┬« et apparaÔö£┬½t dans la liste |
| **ScÔö£┬«nario alternatif** | Immatriculation dÔö£┬«jÔö£├í enregistrÔö£┬«e ├ö├Ñ├å Message Ôö¼┬¢ Cette immatriculation existe dÔö£┬«jÔö£├í Ôö¼Ôòù |

#### Use Case 6 : GÔö£┬«rer les rÔö£┬«servations (Client + Admin)

| | |
|---|---|
| **Acteur principal** | Client (crÔö£┬«ation / annulation), Admin (validation / refus) |
| **Objectif** | Planifier l'entretien d'un vÔö£┬«hicule et organiser le planning de l'atelier |
| **PrÔö£┬«-conditions** | Le client possÔö£┬┐de au moins un vÔö£┬«hicule. Le service sÔö£┬«lectionnÔö£┬« est actif. |
| **ScÔö£┬«nario nominal** | 1. Le client sÔö£┬«lectionne un vÔö£┬«hicule, un service (prÔö£┬«dÔö£┬«fini ou libre) et une date<br>2. La rÔö£┬«servation est crÔö£┬«Ôö£┬«e avec le statut Ôö¼┬¢ En attente Ôö¼Ôòù<br>3. L'admin consulte les demandes en attente et accepte ou refuse<br>4. Le statut est mis Ôö£├í jour (AcceptÔö£┬«e / RefusÔö£┬«e) et visible par le client |
| **ScÔö£┬«nario alternatif** | Client annule ├ö├Ñ├å statut Ôö¼┬¢ AnnulÔö£┬«e Ôö¼Ôòù<br>Admin refuse ├ö├Ñ├å notification cÔö£ÔöñtÔö£┬« client |

#### Use Case 7 : GÔö£┬«rer les devis (Admin + Client)

| | |
|---|---|
| **Acteur principal** | Admin (crÔö£┬«ation), Client (acceptation / refus) |
| **Objectif** | Chiffrer prÔö£┬«cisÔö£┬«ment les travaux et obtenir la validation du client avant dÔö£┬«marrage |
| **PrÔö£┬«-conditions** | La rÔö£┬«servation correspondante a Ôö£┬«tÔö£┬« acceptÔö£┬«e par l'administrateur |
| **ScÔö£┬«nario nominal** | 1. L'admin crÔö£┬«e le devis en sÔö£┬«lectionnant services, quantitÔö£┬«s et prix unitaires<br>2. Le backend calcule automatiquement le total<br>3. Le client consulte le devis dans Ôö¼┬¢ Mes Devis Ôö¼Ôòù et accepte ou refuse<br>4. Si acceptÔö£┬« ├ö├Ñ├å une rÔö£┬«paration est crÔö£┬«Ôö£┬«e automatiquement (statut Ôö¼┬¢ En cours Ôö¼Ôòù)<br>5. Si refusÔö£┬« ├ö├Ñ├å l'admin est notifiÔö£┬« |
| **ScÔö£┬«nario alternatif** | Devis refusÔö£┬« par le client ├ö├Ñ├å statut Ôö¼┬¢ RefusÔö£┬« Ôö¼Ôòù, aucune rÔö£┬«paration crÔö£┬«Ôö£┬«e |

### 2.3 Diagramme de Classes ├ö├ç├Â Sprint 2

**Nouvelles entitÔö£┬«s** :

```
├ö├Â├«├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ë
├ö├Â├®        Vehicle (VÔö£┬«hicule)            ├ö├Â├®
├ö├Â┬ú├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├▒
├ö├Â├® ├ö├ç├│ _id: ObjectId (PK)                ├ö├Â├®
├ö├Â├® ├ö├ç├│ userId: ObjectId (FK ├ö├Ñ├å User)      ├ö├Â├®
├ö├Â├® ├ö├ç├│ brand: String (marque, requis)    ├ö├Â├®
├ö├Â├® ├ö├ç├│ model: String (modÔö£┬┐le, requis)    ├ö├Â├®
├ö├Â├® ├ö├ç├│ year: Number (annÔö£┬«e, requis)      ├ö├Â├®
├ö├Â├® ├ö├ç├│ plate: String (immatriculation)   ├ö├Â├®
├ö├Â├®   UNIQUE, UPPERCASE, requis         ├ö├Â├®
├ö├Â├® ├ö├ç├│ vin: String (VIN, requis)         ├ö├Â├®
├ö├Â├® ├ö├ç├│ color: String                     ├ö├Â├®
├ö├Â├® ├ö├ç├│ mileage: Number (kilomÔö£┬«trage)     ├ö├Â├®
├ö├Â├® ├ö├ç├│ createdAt: Date                   ├ö├Â├®
├ö├Â├® ├ö├ç├│ updatedAt: Date                   ├ö├Â├®
├ö├Â├Â├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├┐

├ö├Â├«├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ë
├ö├Â├®      Reservation (RÔö£┬«servation)       ├ö├Â├®
├ö├Â┬ú├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├▒
├ö├Â├® ├ö├ç├│ _id: ObjectId (PK)                ├ö├Â├®
├ö├Â├® ├ö├ç├│ userId: ObjectId (FK ├ö├Ñ├å User)      ├ö├Â├®
├ö├Â├® ├ö├ç├│ vehicleId: ObjectId (FK ├ö├Ñ├å Vehicle)├ö├Â├®
├ö├Â├® ├ö├ç├│ serviceId: ObjectId (FK ├ö├Ñ├å Service)├ö├Â├®
├ö├Â├® ├ö├ç├│ date: Date (date demandÔö£┬«e)        ├ö├Â├®
├ö├Â├® ├ö├ç├│ status: Enum                      ├ö├Â├®
├ö├Â├®   ['pending', 'accepted', 'rejected']├ö├Â├®
├ö├Â├® ├ö├ç├│ createdAt: Date                   ├ö├Â├®
├ö├Â├® ├ö├ç├│ updatedAt: Date                   ├ö├Â├®
├ö├Â├Â├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├┐

├ö├Â├«├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ë
├ö├Â├®          Devis (Devis)               ├ö├Â├®
├ö├Â┬ú├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├▒
├ö├Â├® ├ö├ç├│ _id: ObjectId (PK)                ├ö├Â├®
├ö├Â├® ├ö├ç├│ userId: ObjectId (FK ├ö├Ñ├å User)      ├ö├Â├®
├ö├Â├® ├ö├ç├│ vehicleId: ObjectId (FK ├ö├Ñ├å Vehicle)├ö├Â├®
├ö├Â├® ├ö├ç├│ reservationId: ObjectId (FK)      ├ö├Â├®
├ö├Â├® ├ö├ç├│ serviceLabel: String              ├ö├Â├®
├ö├Â├® ├ö├ç├│ amount: Number (montant)          ├ö├Â├®
├ö├Â├® ├ö├ç├│ estimatedTime: String             ├ö├Â├®
├ö├Â├® ├ö├ç├│ items: Array de DetailItems       ├ö├Â├®
├ö├Â├®   - name: String                    ├ö├Â├®
├ö├Â├®   - quantity: Number                ├ö├Â├®
├ö├Â├®   - price: Number (unitaire)        ├ö├Â├®
├ö├Â├® ├ö├ç├│ status: Enum                      ├ö├Â├®
├ö├Â├®   ['pending', 'accepted', 'rejected']├ö├Â├®
├ö├Â├® ├ö├ç├│ createdAt: Date                   ├ö├Â├®
├ö├Â├® ├ö├ç├│ updatedAt: Date                   ├ö├Â├®
├ö├Â├Â├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├┐
```

### 2.4 RÔö£┬«alisation du Sprint 2 ├ö├ç├Â Interfaces Utilisateur

#### 1. Mes VÔö£┬«hicules (Client)
- Liste des vÔö£┬«hicules enregistrÔö£┬«s : marque, modÔö£┬┐le, immatriculation, kilomÔö£┬«trage
- Ajout via formulaire modal
- Modification et suppression disponibles
- Validation de l'unicitÔö£┬« de l'immatriculation en temps rÔö£┬«el

#### 2. CrÔö£┬«ation de RÔö£┬«servation (Client)
- Deux modes : rÔö£┬«servation pour service prÔö£┬«dÔö£┬«fini ou problÔö£┬┐me libre
- SÔö£┬«lection du vÔö£┬«hicule, du service et de la date souhaitÔö£┬«e
- VÔö£┬«rification de disponibilitÔö£┬«

#### 3. Gestion des RÔö£┬«servations (Admin)
- Tableau de toutes les rÔö£┬«servations
- Filtres par statut (En attente / AcceptÔö£┬«e / RefusÔö£┬«e / AnnulÔö£┬«e)
- Boutons Accepter / Refuser directement accessibles

#### 4. Gestion des Devis (Admin + Client)
- **Interface Admin** : crÔö£┬«ation avec services, quantitÔö£┬«s, prix unitaires ├ö├ç├Â total calculÔö£┬« automatiquement
- **Interface Client** : consultation et validation (accepter / refuser)
- Acceptation dÔö£┬«clenche automatiquement la crÔö£┬«ation de rÔö£┬«paration

### 2.5 RÔö£┬«trospective ├ö├ç├Â Sprint 2

| CatÔö£┬«gorie | DÔö£┬«tails |
|---|---|
| **├ö┬ú├á Points positifs** | ├ö├ç├│ Workflow complet RÔö£┬«servation ├ö├Ñ├å Admin ├ö├Ñ├å Devis ├ö├Ñ├å Client opÔö£┬«rationnel<br>├ö├ç├│ Calcul automatique du total devis fonctionnel<br>├ö├ç├│ UnicitÔö£┬« de l'immatriculation correctement validÔö£┬«e<br>├ö├ç├│ 17/17 points livrÔö£┬«s ├ö├ç├Â taux de complÔö£┬«tion : **100%** |
| **├ö├£├í┬┤┬®├à DifficultÔö£┬«s** | ├ö├ç├│ DÔö£┬«clenchement automatique de la rÔö£┬«paration aprÔö£┬┐s acceptation<br>├ö├ç├│ Gestion des statuts en cascade<br>├ö├ç├│ Tests du workflow complet chronophages |
| **┬¡ãÆ├Â┬║ Actions correctives** | ├ö├ç├│ Refactoriser les contrÔö£Ôöñleurs backend<br>├ö├ç├│ Optimiser les requÔö£┬¼tes MongoDB avec des index<br>├ö├ç├│ Ajouter des logs backend pour dÔö£┬«bogage Sprint 3 |

#### FonctionnalitÔö£┬«s validÔö£┬«es ├ö├ç├Â Sprint 2

| FonctionnalitÔö£┬« | Statut | Remarques |
|---|---|---|
| Gestion des vÔö£┬«hicules ├ö├ç├Â CRUD complet | ├ö┬ú├á | UnicitÔö£┬« de l'immatriculation validÔö£┬«e |
| Workflow rÔö£┬«servation Client ├ö├Ñ├å Admin | ├ö┬ú├á | Statuts opÔö£┬«rationnels |
| CrÔö£┬«ation de devis avec calcul automatique | ├ö┬ú├á | Total calculÔö£┬« cÔö£ÔöñtÔö£┬« backend |
| Acceptation devis ├ö├Ñ├å RÔö£┬«paration automatique | ├ö┬ú├á | DÔö£┬«clenchement automatique |

---

## Sprint 3 : Suivi, Dashboard Analytics & IA ├ö├ç├Â ContrÔö£Ôöñle de l'Application
**DurÔö£┬«e : 1 semaine | Effort : 10 points**

Le troisiÔö£┬┐me sprint introduit les fonctionnalitÔö£┬«s diffÔö£┬«renciatrices : le systÔö£┬┐me de suivi des rÔö£┬«parations avec timeline de statuts, le tableau de bord enrichi avec graphiques analytiques, et l'assistant IA de prÔö£┬«-diagnostic basÔö£┬« sur **Ollama llama3.1** ├ö├ç├Â la valeur ajoutÔö£┬«e principale d'AutoExpert.

### 3.1 Backlog du Sprint 3

| ID | User Story | TÔö£├│che principale | Effort |
|---|---|---|---|
| **US-6** | En tant qu'Admin, je veux faire Ôö£┬«voluer le statut d'une rÔö£┬«paration pour informer le client. | DÔö£┬«velopper le systÔö£┬┐me de statuts (En cours ├ö├Ñ├å TerminÔö£┬«e ├ö├Ñ├å LivrÔö£┬«e) et notes techniques. | Haute ├ö├ç├Â 2 pts |
| **US-6b** | En tant que Client, je veux consulter l'Ôö£┬«tat de mes rÔö£┬«parations et confirmer rÔö£┬«cupÔö£┬«ration. | ImplÔö£┬«menter la vue client avec timeline de statut et confirmation. | Haute ├ö├ç├Â 2 pts |
| **US-7** | En tant qu'Admin, je veux visualiser les statistiques globales du garage. | Programmer les agrÔö£┬«gations MongoDB et intÔö£┬«grer les graphiques (KPI, revenus, activitÔö£┬«). | Moyenne ├ö├ç├Â 3 pts |
| **US-8** | En tant que Client, je veux dialoguer avec une IA pour obtenir un prÔö£┬«-diagnostic. | Connecter le backend Ôö£├í Ollama llama3.1 et dÔö£┬«velopper l'interface Chat IA. | Moyenne ├ö├ç├Â 3 pts |
| | | **TOTAL** | **10 pts** |

### 3.2 Descriptions des Cas d'Utilisation ├ö├ç├Â Sprint 3

#### Use Case 8 : Suivi des rÔö£┬«parations (Admin + Client)

| | |
|---|---|
| **Acteur principal** | Admin (mise Ôö£├í jour statut), Client (consultation et confirmation) |
| **Objectif** | Suivre l'avancement des travaux et informer le client en temps rÔö£┬«el |
| **PrÔö£┬«-conditions** | Un devis a Ôö£┬«tÔö£┬« acceptÔö£┬« ├ö├ç├Â une rÔö£┬«paration a Ôö£┬«tÔö£┬« crÔö£┬«Ôö£┬«e (statut Ôö¼┬¢ En cours Ôö¼Ôòù) |
| **ScÔö£┬«nario nominal (Admin)** | 1. L'admin accÔö£┬┐de Ôö£├í la liste des rÔö£┬«parations en cours<br>2. Il fait Ôö£┬«voluer le statut : En cours ├ö├Ñ├å TerminÔö£┬«e ├ö├Ñ├å LivrÔö£┬«e<br>3. Il ajoute des notes techniques visibles par le client |
| **ScÔö£┬«nario nominal (Client)** | 1. Le client consulte Ôö¼┬¢ Mes RÔö£┬«parations Ôö¼Ôòù avec timeline de statut<br>2. Pour une rÔö£┬«paration Ôö¼┬¢ LivrÔö£┬«e Ôö¼Ôòù, il confirme la rÔö£┬«cupÔö£┬«ration |

#### Use Case 9 : Consulter le tableau de bord (Admin)

| | |
|---|---|
| **Acteur principal** | Administrateur authentifiÔö£┬« |
| **Objectif** | Visualiser les statistiques globales du garage pour piloter l'activitÔö£┬« |
| **PrÔö£┬«-conditions** | L'admin est connectÔö£┬«. Des donnÔö£┬«es existent en base (rÔö£┬«servations, rÔö£┬«parations, revenus). |
| **ScÔö£┬«nario nominal** | 1. L'admin accÔö£┬┐de au Dashboard Analytique<br>2. Les KPI sont calculÔö£┬«s par agrÔö£┬«gation MongoDB (revenus, rÔö£┬«servations, rÔö£┬«parations)<br>3. Les graphiques (barres hebdomadaires, camembert revenus) s'affichent<br>4. La liste des derniÔö£┬┐res rÔö£┬«servations Ôö£├í traiter est visible |
| **ScÔö£┬«nario alternatif** | Aucune donnÔö£┬«e ├ö├Ñ├å indicateurs affichent 0, graphiques vides |

#### Use Case 10 : Chat IA Automobile (Client)

| | |
|---|---|
| **Acteur principal** | Client authentifiÔö£┬« |
| **Acteur secondaire** | Ollama llama3.1 (moteur IA local ├ö├ç├Â systÔö£┬┐me externe) |
| **Objectif** | Obtenir un prÔö£┬«-diagnostic mÔö£┬«canique personnalisÔö£┬« avant toute prise de rendez-vous |
| **PrÔö£┬«-conditions** | Client connectÔö£┬«. Ollama llama3.1 installÔö£┬« et opÔö£┬«rationnel sur le serveur. |
| **ScÔö£┬«nario nominal** | 1. Le client dÔö£┬«crit ses symptÔö£Ôöñmes dans l'interface de chat<br>2. Le message est envoyÔö£┬« au backend (POST /api/chat/diagnose)<br>3. Le backend construit un prompt contextualisÔö£┬« et interroge Ollama<br>4. La rÔö£┬«ponse est retournÔö£┬«e au frontend<br>5. L'interface affiche la rÔö£┬«ponse avec les services recommandÔö£┬«s |
| **ScÔö£┬«nario alternatif** | Ollama indisponible ├ö├Ñ├å HTTP 503 + message Ôö¼┬¢ L'assistant IA est temporairement indisponible Ôö¼Ôòù |

### 3.3 Diagramme de Classes ├ö├ç├Â Sprint 3

**Nouvelles entitÔö£┬«s** :

```
├ö├Â├«├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ë
├ö├Â├®       Reparation (RÔö£┬«paration)        ├ö├Â├®
├ö├Â┬ú├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├▒
├ö├Â├® ├ö├ç├│ _id: ObjectId (PK)                ├ö├Â├®
├ö├Â├® ├ö├ç├│ userId: ObjectId (FK ├ö├Ñ├å User)      ├ö├Â├®
├ö├Â├® ├ö├ç├│ vehicleId: ObjectId (FK ├ö├Ñ├å Vehicle)├ö├Â├®
├ö├Â├® ├ö├ç├│ devisId: ObjectId (FK ├ö├Ñ├å Devis)    ├ö├Â├®
├ö├Â├® ├ö├ç├│ totalAmount: Number               ├ö├Â├®
├ö├Â├® ├ö├ç├│ service: String                   ├ö├Â├®
├ö├Â├® ├ö├ç├│ status: Enum                      ├ö├Â├®
├ö├Â├®   ['pending', 'in_progress',        ├ö├Â├®
├ö├Â├®    'completed', 'delivered']        ├ö├Â├®
├ö├Â├® ├ö├ç├│ startDate: Date                   ├ö├Â├®
├ö├Â├® ├ö├ç├│ estimatedEndDate: Date            ├ö├Â├®
├ö├Â├® ├ö├ç├│ completedAt: Date                 ├ö├Â├®
├ö├Â├® ├ö├ç├│ deliveredAt: Date                 ├ö├Â├®
├ö├Â├® ├ö├ç├│ notes: String                     ├ö├Â├®
├ö├Â├® ├ö├ç├│ technicianNotes: String           ├ö├Â├®
├ö├Â├® ├ö├ç├│ createdAt: Date                   ├ö├Â├®
├ö├Â├® ├ö├ç├│ updatedAt: Date                   ├ö├Â├®
├ö├Â├Â├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├┐

├ö├Â├«├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ë
├ö├Â├®     Conversation (Historique IA)     ├ö├Â├®
├ö├Â┬ú├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├▒
├ö├Â├® ├ö├ç├│ _id: ObjectId (PK)                ├ö├Â├®
├ö├Â├® ├ö├ç├│ userId: ObjectId (FK ├ö├Ñ├å User)      ├ö├Â├®
├ö├Â├® ├ö├ç├│ messages: Array                   ├ö├Â├®
├ö├Â├®   - sender: Enum ['user', 'ai']    ├ö├Â├®
├ö├Â├®   - text: String                    ├ö├Â├®
├ö├Â├®   - timestamp: Date                 ├ö├Â├®
├ö├Â├® ├ö├ç├│ vehicleContext: ObjectId (FK)?    ├ö├Â├®
├ö├Â├® ├ö├ç├│ createdAt: Date                   ├ö├Â├®
├ö├Â├® ├ö├ç├│ updatedAt: Date                   ├ö├Â├®
├ö├Â├Â├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├ç├ö├Â├┐
```

### 3.4 RÔö£┬«alisation du Sprint 3 ├ö├ç├Â Interfaces Utilisateur

#### 1. Suivi des RÔö£┬«parations (Client)
- Timeline visuelle par vÔö£┬«hicule
- Statut actuel reprÔö£┬«sentÔö£┬« en barre de progression
- Pour rÔö£┬«parations Ôö¼┬¢ LivrÔö£┬«es Ôö¼Ôòù : bouton confirmation rÔö£┬«cupÔö£┬«ration
- Notes techniques du mÔö£┬«canicien visibles en lecture seule

#### 2. Gestion des RÔö£┬«parations (Admin)
- Liste des rÔö£┬«parations en cours
- Ôö£├½volution du statut (En cours ├ö├Ñ├å TerminÔö£┬«e ├ö├Ñ├å LivrÔö£┬«e)
- Champ pour ajouter des notes techniques
- Filtrage par statut disponible

#### 3. Tableau de Bord Analytique enrichi (Admin)
- Quatre cartes KPI :
  - Clients totaux
  - RÔö£┬«servations du mois
  - RÔö£┬«parations en cours
  - Revenus du mois
- Graphique en barres des rÔö£┬«servations par semaine
- Graphique circulaire des revenus par catÔö£┬«gorie de service
- Tableau des cinq derniÔö£┬┐res rÔö£┬«servations Ôö£├í traiter

#### 4. Chat IA AutoExpert (Client)
- Interface conversationnelle avec historique
- Les rÔö£┬«ponses s'affichent progressivement
- Chaque rÔö£┬«ponse structurÔö£┬«e en trois sections :
  - **Diagnostic probable** : analyse du problÔö£┬┐me
  - **Causes possibles** : hypothÔö£┬┐ses mÔö£┬«caniques
  - **Services recommandÔö£┬«s** : prestations pertinentes (cliquables)
- Redirection directe vers page de rÔö£┬«servation

#### 5. Consultation des Devis (Client)
- DÔö£┬«tail des services, quantitÔö£┬«s, prix unitaires et total
- Boutons Accepter et Refuser
- Acceptation dÔö£┬«clenche crÔö£┬«ation automatique de rÔö£┬«paration

### 3.5 RÔö£┬«trospective ├ö├ç├Â Sprint 3

| CatÔö£┬«gorie | DÔö£┬«tails |
|---|---|
| **├ö┬ú├á Points positifs** | ├ö├ç├│ IntÔö£┬«gration Ollama llama3.1 fonctionnelle<br>├ö├ç├│ Tableau de bord analytique complet avec graphiques<br>├ö├ç├│ Workflow rÔö£┬«paration entier opÔö£┬«rationnel<br>├ö├ç├│ 10/10 points livrÔö£┬«s ├ö├ç├Â taux de complÔö£┬«tion : **100%** |
| **├ö├£├í┬┤┬®├à DifficultÔö£┬«s** | ├ö├ç├│ Temps de rÔö£┬«ponse Ollama variable (3-15 secondes)<br>├ö├ç├│ AgrÔö£┬«gation MongoDB pour statistiques de revenus<br>├ö├ç├│ Optimisation des performances du dashboard |
| **┬¡ãÆ├Â┬║ Actions correctives** | ├ö├ç├│ Optimiser le prompt systÔö£┬┐me pour rÔö£┬«ponses concises<br>├ö├ç├│ Ajouter indicateur d'attente animÔö£┬« IA<br>├ö├ç├│ Mettre en cache les statistiques du dashboard |

#### FonctionnalitÔö£┬«s validÔö£┬«es ├ö├ç├Â Sprint 3

| FonctionnalitÔö£┬« | Statut | Remarques |
|---|---|---|
| Suivi rÔö£┬«parations ├ö├ç├Â Admin (3 statuts + notes) | ├ö┬ú├á | Transitions opÔö£┬«rationnelles |
| Suivi rÔö£┬«parations ├ö├ç├Â Client (timeline + confirmation) | ├ö┬ú├á | Confirmation de rÔö£┬«cupÔö£┬«ration fonctionnelle |
| Tableau de bord analytique (KPI + graphiques) | ├ö┬ú├á | AgrÔö£┬«gations MongoDB + Recharts |
| Chat IA automobile (llama3.1 via Ollama) | ├ö┬ú├á | PrÔö£┬«-diagnostic avec interface fluide |
| Consultation et validation des devis (Client) | ├ö┬ú├á | Acceptation ├ö├Ñ├å rÔö£┬«paration auto |

---

## 4. Bilan Global des Sprints

| Sprint | Module | Points planifiÔö£┬«s | Points livrÔö£┬«s | ComplÔö£┬«tion |
|---|---|---|---|---|
| **Sprint 1** | Fondations SÔö£┬«curisÔö£┬«es | 14 pts | 14 pts | ├ö┬ú├á 100% |
| **Sprint 2** | Essentiels OpÔö£┬«rationnels | 17 pts | 17 pts | ├ö┬ú├á 100% |
| **Sprint 3** | ContrÔö£Ôöñle de l'Application | 10 pts | 10 pts | ├ö┬ú├á 100% |
| | **TOTAL** | **41 pts** | **41 pts** | **├ö┬ú├á 100%** |

**VÔö£┬«locitÔö£┬« de l'Ôö£┬«quipe** : 41 points sur 3 sprints, attestant de la fiabilitÔö£┬« des estimations et de la rigueur du processus Scrum.

---

## 5. Tests et Validation

La phase de tests valide la conformitÔö£┬« de la plateforme AutoExpert aux exigences dÔö£┬«finies. Trois types de tests ont Ôö£┬«tÔö£┬« rÔö£┬«alisÔö£┬«s :

### 5.1 Tests Fonctionnels (15 cas)

| ID | Cas de test | DonnÔö£┬«es d'entrÔö£┬«e | RÔö£┬«sultat attendu | Statut |
|---|---|---|---|---|
| **TF-01** | Inscription email valide | Nom, email, tÔö£┬«lÔö£┬«phone, mot de passe corrects | Compte crÔö£┬«Ôö£┬«, JWT retournÔö£┬«, redirection dashboard | ├ö┬ú├á |
| **TF-02** | Inscription email existant | Email dÔö£┬«jÔö£├í enregistrÔö£┬« | Message Ôö¼┬¢ Cet email est dÔö£┬«jÔö£├í utilisÔö£┬« Ôö¼Ôòù | ├ö┬ú├á |
| **TF-03** | Connexion identifiants corrects | Email et mot de passe valides | JWT gÔö£┬«nÔö£┬«rÔö£┬«, redirection selon rÔö£Ôöñle | ├ö┬ú├á |
| **TF-04** | Connexion mauvais mot de passe | Mot de passe incorrect | Message Ôö¼┬¢ Email ou mot de passe incorrect Ôö¼Ôòù | ├ö┬ú├á |
| **TF-05** | Connexion compte bloquÔö£┬« | Compte dÔö£┬«sactivÔö£┬« par l'admin | Message Ôö¼┬¢ Compte dÔö£┬«sactivÔö£┬« Ôö¼Ôòù | ├ö┬ú├á |
| **TF-06** | RÔö£┬«initialisation MDP ├ö├ç├Â email valide | Email existant en base | Email reÔö£┬║u avec lien sÔö£┬«curisÔö£┬« (< 30s) | ├ö┬ú├á |
| **TF-07** | RÔö£┬«initialisation MDP ├ö├ç├Â lien expirÔö£┬« | Token > 1 heure | Message Ôö¼┬¢ Lien expirÔö£┬« Ôö¼Ôòù | ├ö┬ú├á |
| **TF-08** | Ajout vÔö£┬«hicule ├ö├ç├Â plaque unique | Immatriculation non enregistrÔö£┬«e | VÔö£┬«hicule crÔö£┬«Ôö£┬« et listÔö£┬« | ├ö┬ú├á |
| **TF-09** | Ajout vÔö£┬«hicule ├ö├ç├Â plaque dupliquÔö£┬«e | Immatriculation dÔö£┬«jÔö£├í enregistrÔö£┬«e | Erreur Ôö¼┬¢ Immatriculation existante Ôö¼Ôòù | ├ö┬ú├á |
| **TF-10** | CrÔö£┬«ation rÔö£┬«servation | VÔö£┬«hicule + service + date | RÔö£┬«servation crÔö£┬«Ôö£┬«e (statut Ôö¼┬¢ En attente Ôö¼Ôòù) | ├ö┬ú├á |
| **TF-11** | Validation rÔö£┬«servation par admin | RÔö£┬«servation en attente | Statut ├ö├Ñ├å Ôö¼┬¢ AcceptÔö£┬«e Ôö¼Ôòù | ├ö┬ú├á |
| **TF-12** | CrÔö£┬«ation devis avec calcul total | 3 articles Ôö£├╣ 50 TND l'un | Total = 150 TND calculÔö£┬« automatiquement | ├ö┬ú├á |
| **TF-13** | Acceptation devis par client | Devis en attente | RÔö£┬«paration crÔö£┬«Ôö£┬«e automatiquement (statut Ôö¼┬¢ En cours Ôö¼Ôòù) | ├ö┬ú├á |
| **TF-14** | Chat IA ├ö├ç├Â symptÔö£Ôöñme automobile | Description de panne vÔö£┬«hicule | PrÔö£┬«-diagnostic retournÔö£┬« (~8 s) | ├ö┬ú├á |
| **TF-15** | Ôö£├½volution statut rÔö£┬«paration | En cours ├ö├Ñ├å TerminÔö£┬«e | Statut mis Ôö£├í jour en base, visible par client | ├ö┬ú├á |

### 5.2 Tests de SÔö£┬«curitÔö£┬« (6 cas)

| Test | Description | RÔö£┬«sultat |
|---|---|---|
| **AccÔö£┬┐s route Admin sans token JWT** | GET /api/admin/clients sans Authorization | HTTP 401 Unauthorized ├ö┬ú├á |
| **AccÔö£┬┐s route Admin avec token Client** | Token rÔö£Ôöñle Ôö¼┬¢ client Ôö¼Ôòù sur route Ôö¼┬¢ admin Ôö¼Ôòù | HTTP 403 Forbidden ├ö┬ú├á |
| **Tentative d'injection NoSQL** | {email: {"$gt": ""}} dans champ login | RejetÔö£┬« par validation Mongoose ├ö┬ú├á |
| **Token JWT falsifiÔö£┬«** | Modification manuelle du payload JWT | Signature invalide, accÔö£┬┐s refusÔö£┬« ├ö┬ú├á |
| **VÔö£┬«rification stockage mots de passe** | Lecture directe en base MongoDB | Hash Bcrypt (60 caractÔö£┬┐res) confirmÔö£┬« ├ö┬ú├á |
| **RÔö£┬«utilisation lien rÔö£┬«initialisation** | Clic sur lien dÔö£┬«jÔö£├í utilisÔö£┬« | Message Ôö¼┬¢ Lien expirÔö£┬« ou dÔö£┬«jÔö£├í utilisÔö£┬« Ôö¼Ôòù ├ö┬ú├á |

### 5.3 Tests de Performance (6 mesures)

| Page / Endpoint | Temps moyen | Optimisation appliquÔö£┬«e |
|---|---|---|
| Page d'accueil (React SPA) | ~0.8 s | Vite + code splitting React |
| POST /api/auth/login | ~150 ms | Index MongoDB sur email |
| GET /api/vehicles/mine | ~80 ms | Filtrage par userId indexÔö£┬« |
| GET /api/reparations/mine | ~120 ms | Populate limitÔö£┬« aux champs nÔö£┬«cessaires |
| GET /api/admin/dashboard | ~200 ms | AgrÔö£┬«gation MongoDB optimisÔö£┬«e |
| POST /api/chat/diagnose (IA) | ~5 Ôö£├í 12 s | RÔö£┬«ponse progressive (Ollama) |

**Conclusion des tests** : Toutes les pages (hors Chat IA) respectent le temps de rÔö£┬«ponse cible < 2 secondes. Le Chat IA utilise une architecture asynchrone pour rendre l'attente acceptable Ôö£├í l'utilisateur.

---

## 6. Conclusion

Ce chapitre a prÔö£┬«sentÔö£┬« la phase de rÔö£┬«alisation et validation de la plateforme **AutoExpert**, construite itÔö£┬«rativement sur trois sprints Scrum d'une semaine chacun.

### SynthÔö£┬┐se des livrables

**┬¡ãÆ├Â├ë Sprint 1 ├ö├ç├Â Fondations SÔö£┬«curisÔö£┬«es** (14 pts)
- Authentification JWT + Bcrypt
- Interface d'accueil et tableaux de bord
- Catalogue de services
- Gestion des comptes client et administrateur

**┬¡ãÆ├┤ÔûÆ Sprint 2 ├ö├ç├Â Essentiels OpÔö£┬«rationnels** (17 pts)
- Gestion complÔö£┬┐te des vÔö£┬«hicules (CRUD)
- Workflow rÔö£┬«servation : Client ├ö├Ñ├å Admin ├ö├Ñ├å Validation
- Gestion des devis avec calcul automatique
- DÔö£┬«clenchement automatique des rÔö£┬«parations

**┬¡ãÆ├▒├╗ Sprint 3 ├ö├ç├Â ContrÔö£Ôöñle de l'Application** (10 pts)
- Chat IA de prÔö£┬«-diagnostic (Ollama llama3.1)
- Suivi complet des rÔö£┬«parations avec timeline
- Tableau de bord analytique avec graphiques
- Architecture performante et maintenable

### Architecture et technologie

L'architecture **MERN** (MongoDB, Express, React, Node.js) a offert un cadre :
- ├ö┬ú├á **Moderne** : technologies Ôö£├í jour et widely adopted
- ├ö┬ú├á **Performant** : temps de rÔö£┬«ponse < 2s (hors IA)
- ├ö┬ú├á **Maintenable** : structure modulaire et documentÔö£┬«e
- ├ö┬ú├á **SÔö£┬«curisÔö£┬«** : authentification robuste et validation des donnÔö£┬«es

### RÔö£┬«sultats de validation

- ├ö┬ú├á **15 tests fonctionnels** : 100% rÔö£┬«ussite
- ├ö┬ú├á **6 tests sÔö£┬«curitÔö£┬«** : 100% rÔö£┬«ussite
- ├ö┬ú├á **6 mesures performance** : cibles atteintes
- ├ö┬ú├á **41/41 points planifiÔö£┬«s** : taux de complÔö£┬«tion 100%

### Valeur ajoutÔö£┬«e

**AutoExpert** est la premiÔö£┬┐re plateforme de gestion de garage Ôö£├í intÔö£┬«grer une **intelligence artificielle de prÔö£┬«-diagnostic** directement accessible au client, comblant les lacunes identifiÔö£┬«es dans les solutions existantes (Drivvo, Shopmonkey).

---

**Fin du Chapitre 3**
