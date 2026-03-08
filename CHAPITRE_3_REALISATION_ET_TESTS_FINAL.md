# Chapitre 3 : R├®alisation et Tests

## Introduction

Ce chapitre d├®crit la mise en ┼ôuvre pratique de la plateforme **AutoExpert**, organis├®e en trois sprints successifs selon la m├®thodologie Scrum. Pour chaque sprint, nous pr├®sentons le backlog simplifi├®, les diagrammes UML (cas d'utilisation, s├®quences, classes), ainsi que les interfaces r├®alis├®es. Le chapitre se conclut par les r├®trospectives et la phase de tests de validation.

---

## Sprint 1 : Authentification, Accueil & Base ÔÇö Fondations S├®curis├®es
**Dur├®e : 1 semaine | Effort : 14 points**

Le premier sprint pose les fondations s├®curis├®es de l'application : authentification compl├¿te (inscription, connexion, r├®initialisation du mot de passe), mise en place de l'interface d'accueil, des tableaux de bord, de la gestion des profils utilisateur, des clients et du catalogue de services.

### 1.1 Backlog du Sprint 1

| ID | User Story | T├óche principale | Effort |
|---|---|---|---|
| **US-1a/b** | En tant que Visiteur, je veux m'inscrire et me connecter pour acc├®der ├á mon espace personnel. | D├®velopper les routes d'authentification (JWT + Bcrypt) et les formulaires React. | Difficile ÔÇö 5 pts |
| **US-1c** | En tant qu'Utilisateur, je veux r├®initialiser mon mot de passe par email pour r├®cup├®rer mon acc├¿s. | Impl├®menter l'envoi d'email s├®curis├® avec lien temporaire via Nodemailer. | Interm├®diaire ÔÇö 3 pts |
| **US-1d** | En tant que Client, je veux g├®rer mon profil pour maintenir mes informations ├á jour. | Cr├®er la route de mise ├á jour du profil, l'interface des param├¿tres et le Dashboard Client. | Interm├®diaire ÔÇö 2 pts |
| **US-1e** | En tant qu'Administrateur, je veux g├®rer les comptes clients pour contr├┤ler les acc├¿s. | Mettre en place la liste des utilisateurs, le contr├┤le des acc├¿s et le Dashboard Admin. | Interm├®diaire ÔÇö 2 pts |
| **US-2** | En tant qu'Administrateur, je veux g├®rer les services pour d├®finir le catalogue du garage. | D├®velopper la gestion compl├¿te (CRUD) du catalogue des prestations. | Facile ÔÇö 2 pts |
| | | **TOTAL** | **14 pts** |

### 1.2 Diagramme de Cas d'Utilisation ÔÇö Sprint 1

#### Use Case Global ÔÇö Vue Abstraite

Au premier niveau, les cas d'utilisation sont regroup├®s sous la forme d'actions g├®n├®riques ┬½ G├®rer... ┬╗. Ce diagramme offre une vision synth├®tique du p├®rim├¿tre fonctionnel du sprint :

- **G├®rer l'Authentification** : inscription, connexion, r├®initialisation
- **G├®rer les Comptes** : profil utilisateur et gestion administrative
- **G├®rer les Services** : catalogue du garage

#### Use Case Raffin├® ÔÇö Vue D├®taill├®e par Acteur

Ce niveau d├®taille chaque cas global en actions concr├¿tes :

**Acteurs** :
- **Visiteur** : utilisateur non authentifi├®
- **Client** : utilisateur authentifi├® avec r├┤le ┬½ client ┬╗
- **Administrateur** : utilisateur authentifi├® avec r├┤le ┬½ admin ┬╗
- **Syst├¿me Email (Nodemailer)** : acteur secondaire externe

**Relations UML** :
- `<<include>>` : action toujours ex├®cut├®e (ex. : v├®rification JWT)
- `<<extend>>` : action optionnelle d├®clench├®e sous condition (ex. : r├®initialisation si mot de passe oubli├®)

### 1.3 Descriptions des Cas d'Utilisation ÔÇö Sprint 1

#### Use Case 1 : S'inscrire

| | |
|---|---|
| **Acteur principal** | Visiteur (non connect├®) |
| **Objectif** | Cr├®er un nouveau compte client sur la plateforme AutoExpert |
| **Pr├®-conditions** | L'utilisateur n'a pas encore de compte. L'email saisi n'existe pas en base. |
| **Sc├®nario nominal** | 1. Le visiteur remplit le formulaire (nom, email, t├®l├®phone, mot de passe)<br>2. Le frontend valide les champs en temps r├®el<br>3. Le backend v├®rifie l'unicit├® de l'email<br>4. Le mot de passe est hach├® via Bcrypt<br>5. Un compte avec le r├┤le ┬½ client ┬╗ est cr├®├®<br>6. Un JWT est g├®n├®r├® et l'utilisateur est redirig├® vers son dashboard |
| **Sc├®nario alternatif** | Email d├®j├á existant ÔåÆ HTTP 409 + message ┬½ Cet email est d├®j├á utilis├® ┬╗ |

#### Use Case 2 : Se connecter

| | |
|---|---|
| **Acteur principal** | Visiteur poss├®dant un compte (Client ou Admin) |
| **Objectif** | Acc├®der ├á son espace personnel via une authentification s├®curis├®e |
| **Pr├®-conditions** | L'utilisateur poss├¿de un compte actif avec email et mot de passe valides |
| **Sc├®nario nominal** | 1. L'utilisateur saisit son email et son mot de passe<br>2. Le backend compare le mot de passe avec le hash Bcrypt stock├®<br>3. Un JWT est g├®n├®r├® et retourn├® au frontend (validit├® : 30 jours)<br>4. Redirection selon le r├┤le : Client ÔåÆ Dashboard Client / Admin ÔåÆ Dashboard Admin |
| **Sc├®nario alternatif** | Identifiants incorrects ÔåÆ HTTP 401 + message ┬½ Email ou mot de passe incorrect ┬╗<br>Compte bloqu├® ÔåÆ HTTP 403 + message ┬½ Compte d├®sactiv├® ┬╗ |

#### Use Case 3 : R├®initialiser le mot de passe

| | |
|---|---|
| **Acteur principal** | Utilisateur ayant oubli├® son mot de passe |
| **Objectif** | Retrouver l'acc├¿s ├á son compte via un lien s├®curis├® envoy├® par email |
| **Pr├®-conditions** | L'utilisateur poss├¿de un compte actif avec un email valide enregistr├® en base |
| **Sc├®nario nominal** | 1. L'utilisateur saisit son email sur la page ┬½ Mot de passe oubli├® ┬╗<br>2. Le backend g├®n├¿re un token unique valable 1 heure<br>3. Nodemailer envoie le lien de r├®initialisation (syst├¿me externe)<br>4. L'utilisateur clique sur le lien et saisit son nouveau mot de passe<br>5. Le token est valid├® et le nouveau mot de passe hach├® est sauvegard├® |
| **Sc├®nario alternatif** | Token expir├® (> 1h) ÔåÆ Message ┬½ Lien expir├® ┬╗<br>Lien d├®j├á utilis├® ÔåÆ Message ┬½ Lien invalide ┬╗ |

#### Use Case 4 : G├®rer les services (Admin)

| | |
|---|---|
| **Acteur principal** | Administrateur authentifi├® |
| **Objectif** | Cr├®er, modifier, consulter et archiver les prestations du catalogue du garage |
| **Pr├®-conditions** | L'administrateur est connect├® avec le r├┤le ┬½ admin ┬╗ |
| **Sc├®nario nominal** | 1. L'admin acc├¿de ├á la page ┬½ Gestion des Services ┬╗<br>2. Il consulte le catalogue existant<br>3. Il cr├®e, modifie ou archive un service (nom, description, prix, dur├®e, cat├®gorie)<br>4. Les modifications sont sauvegard├®es via l'API REST |
| **Sc├®nario alternatif** | Champ obligatoire manquant ÔåÆ Message de validation<br>Service li├® ├á une r├®servation active ÔåÆ Archivage propos├® ├á la place de la suppression |

### 1.4 Diagramme de Classes ÔÇö Sprint 1

**Entit├®s principales** :

```
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé           User (Utilisateur)        Ôöé
Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
Ôöé ÔÇó _id: ObjectId (PK)               Ôöé
Ôöé ÔÇó name: String (requis)            Ôöé
Ôöé ÔÇó email: String (requis, unique)   Ôöé
Ôöé ÔÇó password: String (hash├® Bcrypt)  Ôöé
Ôöé ÔÇó phone: String (requis)           Ôöé
Ôöé ÔÇó role: Enum ['client', 'admin']   Ôöé
Ôöé ÔÇó isActive: Boolean (d├®faut: true) Ôöé
Ôöé ÔÇó resetPasswordToken: String?      Ôöé
Ôöé ÔÇó resetPasswordExpire: Date?       Ôöé
Ôöé ÔÇó createdAt: Date                  Ôöé
Ôöé ÔÇó updatedAt: Date                  Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ

ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé         Service (Prestation)        Ôöé
Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
Ôöé ÔÇó _id: ObjectId (PK)               Ôöé
Ôöé ÔÇó name: String (requis)            Ôöé
Ôöé ÔÇó description: String              Ôöé
Ôöé ÔÇó price: Number (requis)           Ôöé
Ôöé ÔÇó duration: String (ex: "2h")      Ôöé
Ôöé ÔÇó category: String (requis)        Ôöé
Ôöé ÔÇó createdAt: Date                  Ôöé
Ôöé ÔÇó updatedAt: Date                  Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
```

**Relations** :
- Un Administrateur g├¿re plusieurs Services
- Chaque User est identifi├® par son r├┤le (client / admin)

### 1.5 R├®alisation du Sprint 1 ÔÇö Interfaces Utilisateur

Le Sprint 1 livre 9 interfaces principales :

#### 1. Page d'Accueil (Visiteur)
- Vitrine publique de la plateforme
- Pr├®sentation du garage, services propos├®s
- Boutons d'inscription et connexion
- Acc├¿s sans authentification

#### 2. Interface de Connexion
- Formulaire email + mot de passe
- Option affichage/masquage du mot de passe
- Lien ┬½ Mot de passe oubli├® ┬╗
- Lien vers page d'inscription
- Messages d'erreur explicites sans rechargement

#### 3. Interface d'Inscription
- Formulaire : nom, email, t├®l├®phone, mot de passe (confirmation)
- Validation en temps r├®el des champs
- R├┤le ┬½ client ┬╗ attribu├® automatiquement
- Redirection vers dashboard apr├¿s g├®n├®ration JWT

#### 4. Interface de R├®initialisation du Mot de Passe
- ├ëtape 1 : saisie de l'email pour recevoir le lien s├®curis├®
- ├ëtape 2 : saisie du nouveau mot de passe
- Validit├® du lien : 1 heure, utilisation unique

#### 5. Dashboard Client
- Tableau de bord personnalis├® du client
- R├®sum├® des v├®hicules enregistr├®s
- Liste des r├®servations r├®centes
- ├ëtat des r├®parations en cours
- Acc├¿s rapide au Chat IA
- Navigation lat├®rale vers sections de l'espace personnel

#### 6. Dashboard Administrateur
- Tableau de bord global avec cartes KPI :
  - Clients totaux
  - R├®servations du mois
  - R├®parations en cours
  - Revenus du mois
- Liste des derni├¿res r├®servations ├á traiter
- Navigation vers tous les modules de gestion

#### 7. Gestion du Profil (Client)
- Modification des informations personnelles (nom, t├®l├®phone)
- Changement du mot de passe
- Sauvegarde s├®curis├®e via requ├¬te PUT (middleware JWT)

#### 8. Gestion des Services (Admin)
- Catalogue en cartes : nom, cat├®gorie (badge color├®), prix, dur├®e
- Cr├®ation via formulaire modal
- Modification et archivage pour chaque service

#### 9. Gestion des Clients (Admin)
- Tableau pagin├® : nom, email, t├®l├®phone, date d'inscription, statut
- Actions : basculer statut, supprimer compte
- Recherche par nom ou email

### 1.6 R├®trospective ÔÇö Sprint 1

| Cat├®gorie | D├®tails |
|---|---|
| **Ô£à Points positifs** | ÔÇó Architecture MERN op├®rationnelle d├¿s le d├®but<br>ÔÇó Authentification JWT + Bcrypt s├®curis├®e et fonctionnelle<br>ÔÇó 14/14 points livr├®s ÔÇö taux de compl├®tion : **100%**<br>ÔÇó Communication fluide avec les stakeholders |
| **ÔÜá´©Å Difficult├®s** | ÔÇó Configuration initiale de Nodemailer (port SMTP)<br>ÔÇó Gestion des tokens de r├®initialisation avec expiration<br>ÔÇó Relations Mongoose (virtual fields et r├®f├®rences) |
| **­ƒöº Actions correctives** | ÔÇó Documenter toutes les variables d'environnement (.env)<br>ÔÇó Ajouter commentaires JSDoc sur les contr├┤leurs backend<br>ÔÇó Tester syst├®matiquement les cas limites des formulaires |

#### Fonctionnalit├®s valid├®es ÔÇö Sprint 1

| Fonctionnalit├® | Statut | Remarques |
|---|---|---|
| Inscription / Connexion s├®curis├®e | Ô£à | JWT + Bcrypt op├®rationnels |
| R├®initialisation MDP par email | Ô£à | Token 1h, Nodemailer configur├® |
| Gestion du profil ÔÇö Client | Ô£à | Modification des informations personnelles |
| Dashboard Client + Dashboard Admin | Ô£à | Interfaces de navigation op├®rationnelles |
| Gestion des clients ÔÇö Admin | Ô£à | Bloquer / Activer / Supprimer |
| CRUD Services ÔÇö Admin | Ô£à | Catalogue complet fonctionnel |
| Page d'accueil publique | Ô£à | Interface vitrine visible sans authentification |

---

## Sprint 2 : Gestion M├®tier ÔÇö Essentiels Op├®rationnels
**Dur├®e : 1 semaine | Effort : 17 points**

Le deuxi├¿me sprint impl├®mente le c┼ôur op├®rationnel de la plateforme : la gestion des v├®hicules clients, la prise de rendez-vous en ligne et sa validation par l'administrateur, ainsi que la g├®n├®ration et la validation des devis d├®taill├®s.

**Flux m├®tier complet** : V├®hicule ÔåÆ R├®servation ÔåÆ Validation Admin ÔåÆ Devis ÔåÆ Acceptation Client ÔåÆ R├®paration automatique

### 2.1 Backlog du Sprint 2

| ID | User Story | T├óche principale | Effort |
|---|---|---|---|
| **US-3** | En tant que Client, je veux g├®rer mes v├®hicules (CRUD) pour les associer ├á mes interventions. | D├®velopper les routes s├®curis├®es CRUD et l'interface de gestion du parc automobile. | Interm├®diaire ÔÇö 3 pts |
| **US-4** | En tant que Client, je veux prendre et annuler un RDV. En tant qu'Admin, je veux valider ou refuser. | Impl├®menter le workflow de r├®servation complet avec gestion des statuts. | Difficile ÔÇö 7 pts |
| **US-5** | En tant qu'Admin, je veux cr├®er un devis chiffr├®. En tant que Client, je veux l'accepter ou refuser. | D├®velopper le mod├¿le Devis, le calcul automatique du total et le d├®clenchement de la r├®paration. | Difficile ÔÇö 7 pts |
| | | **TOTAL** | **17 pts** |

### 2.2 Descriptions des Cas d'Utilisation ÔÇö Sprint 2

#### Use Case 5 : G├®rer ses v├®hicules (Client)

| | |
|---|---|
| **Acteur principal** | Client authentifi├® |
| **Objectif** | Ajouter, consulter, modifier et supprimer ses v├®hicules pour les associer aux interventions |
| **Pr├®-conditions** | Le client est connect├®. Pour l'ajout : l'immatriculation ne doit pas d├®j├á exister en base. |
| **Sc├®nario nominal** | 1. Le client acc├¿de ├á la page ┬½ Mes V├®hicules ┬╗<br>2. Il remplit le formulaire (marque, mod├¿le, ann├®e, immatriculation, VIN, kilom├®trage, couleur)<br>3. Le backend valide l'unicit├® de l'immatriculation<br>4. Le v├®hicule est sauvegard├® et appara├«t dans la liste |
| **Sc├®nario alternatif** | Immatriculation d├®j├á enregistr├®e ÔåÆ Message ┬½ Cette immatriculation existe d├®j├á ┬╗ |

#### Use Case 6 : G├®rer les r├®servations (Client + Admin)

| | |
|---|---|
| **Acteur principal** | Client (cr├®ation / annulation), Admin (validation / refus) |
| **Objectif** | Planifier l'entretien d'un v├®hicule et organiser le planning de l'atelier |
| **Pr├®-conditions** | Le client poss├¿de au moins un v├®hicule. Le service s├®lectionn├® est actif. |
| **Sc├®nario nominal** | 1. Le client s├®lectionne un v├®hicule, un service (pr├®d├®fini ou libre) et une date<br>2. La r├®servation est cr├®├®e avec le statut ┬½ En attente ┬╗<br>3. L'admin consulte les demandes en attente et accepte ou refuse<br>4. Le statut est mis ├á jour (Accept├®e / Refus├®e) et visible par le client |
| **Sc├®nario alternatif** | Client annule ÔåÆ statut ┬½ Annul├®e ┬╗<br>Admin refuse ÔåÆ notification c├┤t├® client |

#### Use Case 7 : G├®rer les devis (Admin + Client)

| | |
|---|---|
| **Acteur principal** | Admin (cr├®ation), Client (acceptation / refus) |
| **Objectif** | Chiffrer pr├®cis├®ment les travaux et obtenir la validation du client avant d├®marrage |
| **Pr├®-conditions** | La r├®servation correspondante a ├®t├® accept├®e par l'administrateur |
| **Sc├®nario nominal** | 1. L'admin cr├®e le devis en s├®lectionnant services, quantit├®s et prix unitaires<br>2. Le backend calcule automatiquement le total<br>3. Le client consulte le devis dans ┬½ Mes Devis ┬╗ et accepte ou refuse<br>4. Si accept├® ÔåÆ une r├®paration est cr├®├®e automatiquement (statut ┬½ En cours ┬╗)<br>5. Si refus├® ÔåÆ l'admin est notifi├® |
| **Sc├®nario alternatif** | Devis refus├® par le client ÔåÆ statut ┬½ Refus├® ┬╗, aucune r├®paration cr├®├®e |

### 2.3 Diagramme de Classes ÔÇö Sprint 2

**Nouvelles entit├®s** :

```
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé        Vehicle (V├®hicule)            Ôöé
Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
Ôöé ÔÇó _id: ObjectId (PK)                Ôöé
Ôöé ÔÇó userId: ObjectId (FK ÔåÆ User)      Ôöé
Ôöé ÔÇó brand: String (marque, requis)    Ôöé
Ôöé ÔÇó model: String (mod├¿le, requis)    Ôöé
Ôöé ÔÇó year: Number (ann├®e, requis)      Ôöé
Ôöé ÔÇó plate: String (immatriculation)   Ôöé
Ôöé   UNIQUE, UPPERCASE, requis         Ôöé
Ôöé ÔÇó vin: String (VIN, requis)         Ôöé
Ôöé ÔÇó color: String                     Ôöé
Ôöé ÔÇó mileage: Number (kilom├®trage)     Ôöé
Ôöé ÔÇó createdAt: Date                   Ôöé
Ôöé ÔÇó updatedAt: Date                   Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ

ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé      Reservation (R├®servation)       Ôöé
Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
Ôöé ÔÇó _id: ObjectId (PK)                Ôöé
Ôöé ÔÇó userId: ObjectId (FK ÔåÆ User)      Ôöé
Ôöé ÔÇó vehicleId: ObjectId (FK ÔåÆ Vehicle)Ôöé
Ôöé ÔÇó serviceId: ObjectId (FK ÔåÆ Service)Ôöé
Ôöé ÔÇó date: Date (date demand├®e)        Ôöé
Ôöé ÔÇó status: Enum                      Ôöé
Ôöé   ['pending', 'accepted', 'rejected']Ôöé
Ôöé ÔÇó createdAt: Date                   Ôöé
Ôöé ÔÇó updatedAt: Date                   Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ

ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé          Devis (Devis)               Ôöé
Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
Ôöé ÔÇó _id: ObjectId (PK)                Ôöé
Ôöé ÔÇó userId: ObjectId (FK ÔåÆ User)      Ôöé
Ôöé ÔÇó vehicleId: ObjectId (FK ÔåÆ Vehicle)Ôöé
Ôöé ÔÇó reservationId: ObjectId (FK)      Ôöé
Ôöé ÔÇó serviceLabel: String              Ôöé
Ôöé ÔÇó amount: Number (montant)          Ôöé
Ôöé ÔÇó estimatedTime: String             Ôöé
Ôöé ÔÇó items: Array de DetailItems       Ôöé
Ôöé   - name: String                    Ôöé
Ôöé   - quantity: Number                Ôöé
Ôöé   - price: Number (unitaire)        Ôöé
Ôöé ÔÇó status: Enum                      Ôöé
Ôöé   ['pending', 'accepted', 'rejected']Ôöé
Ôöé ÔÇó createdAt: Date                   Ôöé
Ôöé ÔÇó updatedAt: Date                   Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
```

### 2.4 R├®alisation du Sprint 2 ÔÇö Interfaces Utilisateur

#### 1. Mes V├®hicules (Client)
- Liste des v├®hicules enregistr├®s : marque, mod├¿le, immatriculation, kilom├®trage
- Ajout via formulaire modal
- Modification et suppression disponibles
- Validation de l'unicit├® de l'immatriculation en temps r├®el

#### 2. Cr├®ation de R├®servation (Client)
- Deux modes : r├®servation pour service pr├®d├®fini ou probl├¿me libre
- S├®lection du v├®hicule, du service et de la date souhait├®e
- V├®rification de disponibilit├®

#### 3. Gestion des R├®servations (Admin)
- Tableau de toutes les r├®servations
- Filtres par statut (En attente / Accept├®e / Refus├®e / Annul├®e)
- Boutons Accepter / Refuser directement accessibles

#### 4. Gestion des Devis (Admin + Client)
- **Interface Admin** : cr├®ation avec services, quantit├®s, prix unitaires ÔÇö total calcul├® automatiquement
- **Interface Client** : consultation et validation (accepter / refuser)
- Acceptation d├®clenche automatiquement la cr├®ation de r├®paration

### 2.5 R├®trospective ÔÇö Sprint 2

| Cat├®gorie | D├®tails |
|---|---|
| **Ô£à Points positifs** | ÔÇó Workflow complet R├®servation ÔåÆ Admin ÔåÆ Devis ÔåÆ Client op├®rationnel<br>ÔÇó Calcul automatique du total devis fonctionnel<br>ÔÇó Unicit├® de l'immatriculation correctement valid├®e<br>ÔÇó 17/17 points livr├®s ÔÇö taux de compl├®tion : **100%** |
| **ÔÜá´©Å Difficult├®s** | ÔÇó D├®clenchement automatique de la r├®paration apr├¿s acceptation<br>ÔÇó Gestion des statuts en cascade<br>ÔÇó Tests du workflow complet chronophages |
| **­ƒöº Actions correctives** | ÔÇó Refactoriser les contr├┤leurs backend<br>ÔÇó Optimiser les requ├¬tes MongoDB avec des index<br>ÔÇó Ajouter des logs backend pour d├®bogage Sprint 3 |

#### Fonctionnalit├®s valid├®es ÔÇö Sprint 2

| Fonctionnalit├® | Statut | Remarques |
|---|---|---|
| Gestion des v├®hicules ÔÇö CRUD complet | Ô£à | Unicit├® de l'immatriculation valid├®e |
| Workflow r├®servation Client ÔåÆ Admin | Ô£à | Statuts op├®rationnels |
| Cr├®ation de devis avec calcul automatique | Ô£à | Total calcul├® c├┤t├® backend |
| Acceptation devis ÔåÆ R├®paration automatique | Ô£à | D├®clenchement automatique |

---

## Sprint 3 : Suivi, Dashboard Analytics & IA ÔÇö Contr├┤le de l'Application
**Dur├®e : 1 semaine | Effort : 10 points**

Le troisi├¿me sprint introduit les fonctionnalit├®s diff├®renciatrices : le syst├¿me de suivi des r├®parations avec timeline de statuts, le tableau de bord enrichi avec graphiques analytiques, et l'assistant IA de pr├®-diagnostic bas├® sur **Ollama llama3.1** ÔÇö la valeur ajout├®e principale d'AutoExpert.

### 3.1 Backlog du Sprint 3

| ID | User Story | T├óche principale | Effort |
|---|---|---|---|
| **US-6** | En tant qu'Admin, je veux faire ├®voluer le statut d'une r├®paration pour informer le client. | D├®velopper le syst├¿me de statuts (En cours ÔåÆ Termin├®e ÔåÆ Livr├®e) et notes techniques. | Haute ÔÇö 2 pts |
| **US-6b** | En tant que Client, je veux consulter l'├®tat de mes r├®parations et confirmer r├®cup├®ration. | Impl├®menter la vue client avec timeline de statut et confirmation. | Haute ÔÇö 2 pts |
| **US-7** | En tant qu'Admin, je veux visualiser les statistiques globales du garage. | Programmer les agr├®gations MongoDB et int├®grer les graphiques (KPI, revenus, activit├®). | Moyenne ÔÇö 3 pts |
| **US-8** | En tant que Client, je veux dialoguer avec une IA pour obtenir un pr├®-diagnostic. | Connecter le backend ├á Ollama llama3.1 et d├®velopper l'interface Chat IA. | Moyenne ÔÇö 3 pts |
| | | **TOTAL** | **10 pts** |

### 3.2 Descriptions des Cas d'Utilisation ÔÇö Sprint 3

#### Use Case 8 : Suivi des r├®parations (Admin + Client)

| | |
|---|---|
| **Acteur principal** | Admin (mise ├á jour statut), Client (consultation et confirmation) |
| **Objectif** | Suivre l'avancement des travaux et informer le client en temps r├®el |
| **Pr├®-conditions** | Un devis a ├®t├® accept├® ÔÇö une r├®paration a ├®t├® cr├®├®e (statut ┬½ En cours ┬╗) |
| **Sc├®nario nominal (Admin)** | 1. L'admin acc├¿de ├á la liste des r├®parations en cours<br>2. Il fait ├®voluer le statut : En cours ÔåÆ Termin├®e ÔåÆ Livr├®e<br>3. Il ajoute des notes techniques visibles par le client |
| **Sc├®nario nominal (Client)** | 1. Le client consulte ┬½ Mes R├®parations ┬╗ avec timeline de statut<br>2. Pour une r├®paration ┬½ Livr├®e ┬╗, il confirme la r├®cup├®ration |

#### Use Case 9 : Consulter le tableau de bord (Admin)

| | |
|---|---|
| **Acteur principal** | Administrateur authentifi├® |
| **Objectif** | Visualiser les statistiques globales du garage pour piloter l'activit├® |
| **Pr├®-conditions** | L'admin est connect├®. Des donn├®es existent en base (r├®servations, r├®parations, revenus). |
| **Sc├®nario nominal** | 1. L'admin acc├¿de au Dashboard Analytique<br>2. Les KPI sont calcul├®s par agr├®gation MongoDB (revenus, r├®servations, r├®parations)<br>3. Les graphiques (barres hebdomadaires, camembert revenus) s'affichent<br>4. La liste des derni├¿res r├®servations ├á traiter est visible |
| **Sc├®nario alternatif** | Aucune donn├®e ÔåÆ indicateurs affichent 0, graphiques vides |

#### Use Case 10 : Chat IA Automobile (Client)

| | |
|---|---|
| **Acteur principal** | Client authentifi├® |
| **Acteur secondaire** | Ollama llama3.1 (moteur IA local ÔÇö syst├¿me externe) |
| **Objectif** | Obtenir un pr├®-diagnostic m├®canique personnalis├® avant toute prise de rendez-vous |
| **Pr├®-conditions** | Client connect├®. Ollama llama3.1 install├® et op├®rationnel sur le serveur. |
| **Sc├®nario nominal** | 1. Le client d├®crit ses sympt├┤mes dans l'interface de chat<br>2. Le message est envoy├® au backend (POST /api/chat/diagnose)<br>3. Le backend construit un prompt contextualis├® et interroge Ollama<br>4. La r├®ponse est retourn├®e au frontend<br>5. L'interface affiche la r├®ponse avec les services recommand├®s |
| **Sc├®nario alternatif** | Ollama indisponible ÔåÆ HTTP 503 + message ┬½ L'assistant IA est temporairement indisponible ┬╗ |

### 3.3 Diagramme de Classes ÔÇö Sprint 3

**Nouvelles entit├®s** :

```
ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé       Reparation (R├®paration)        Ôöé
Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
Ôöé ÔÇó _id: ObjectId (PK)                Ôöé
Ôöé ÔÇó userId: ObjectId (FK ÔåÆ User)      Ôöé
Ôöé ÔÇó vehicleId: ObjectId (FK ÔåÆ Vehicle)Ôöé
Ôöé ÔÇó devisId: ObjectId (FK ÔåÆ Devis)    Ôöé
Ôöé ÔÇó totalAmount: Number               Ôöé
Ôöé ÔÇó service: String                   Ôöé
Ôöé ÔÇó status: Enum                      Ôöé
Ôöé   ['pending', 'in_progress',        Ôöé
Ôöé    'completed', 'delivered']        Ôöé
Ôöé ÔÇó startDate: Date                   Ôöé
Ôöé ÔÇó estimatedEndDate: Date            Ôöé
Ôöé ÔÇó completedAt: Date                 Ôöé
Ôöé ÔÇó deliveredAt: Date                 Ôöé
Ôöé ÔÇó notes: String                     Ôöé
Ôöé ÔÇó technicianNotes: String           Ôöé
Ôöé ÔÇó createdAt: Date                   Ôöé
Ôöé ÔÇó updatedAt: Date                   Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ

ÔöîÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÉ
Ôöé     Conversation (Historique IA)     Ôöé
Ôö£ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöñ
Ôöé ÔÇó _id: ObjectId (PK)                Ôöé
Ôöé ÔÇó userId: ObjectId (FK ÔåÆ User)      Ôöé
Ôöé ÔÇó messages: Array                   Ôöé
Ôöé   - sender: Enum ['user', 'ai']    Ôöé
Ôöé   - text: String                    Ôöé
Ôöé   - timestamp: Date                 Ôöé
Ôöé ÔÇó vehicleContext: ObjectId (FK)?    Ôöé
Ôöé ÔÇó createdAt: Date                   Ôöé
Ôöé ÔÇó updatedAt: Date                   Ôöé
ÔööÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÿ
```

### 3.4 R├®alisation du Sprint 3 ÔÇö Interfaces Utilisateur

#### 1. Suivi des R├®parations (Client)
- Timeline visuelle par v├®hicule
- Statut actuel repr├®sent├® en barre de progression
- Pour r├®parations ┬½ Livr├®es ┬╗ : bouton confirmation r├®cup├®ration
- Notes techniques du m├®canicien visibles en lecture seule

#### 2. Gestion des R├®parations (Admin)
- Liste des r├®parations en cours
- ├ëvolution du statut (En cours ÔåÆ Termin├®e ÔåÆ Livr├®e)
- Champ pour ajouter des notes techniques
- Filtrage par statut disponible

#### 3. Tableau de Bord Analytique enrichi (Admin)
- Quatre cartes KPI :
  - Clients totaux
  - R├®servations du mois
  - R├®parations en cours
  - Revenus du mois
- Graphique en barres des r├®servations par semaine
- Graphique circulaire des revenus par cat├®gorie de service
- Tableau des cinq derni├¿res r├®servations ├á traiter

#### 4. Chat IA AutoExpert (Client)
- Interface conversationnelle avec historique
- Les r├®ponses s'affichent progressivement
- Chaque r├®ponse structur├®e en trois sections :
  - **Diagnostic probable** : analyse du probl├¿me
  - **Causes possibles** : hypoth├¿ses m├®caniques
  - **Services recommand├®s** : prestations pertinentes (cliquables)
- Redirection directe vers page de r├®servation

#### 5. Consultation des Devis (Client)
- D├®tail des services, quantit├®s, prix unitaires et total
- Boutons Accepter et Refuser
- Acceptation d├®clenche cr├®ation automatique de r├®paration

### 3.5 R├®trospective ÔÇö Sprint 3

| Cat├®gorie | D├®tails |
|---|---|
| **Ô£à Points positifs** | ÔÇó Int├®gration Ollama llama3.1 fonctionnelle<br>ÔÇó Tableau de bord analytique complet avec graphiques<br>ÔÇó Workflow r├®paration entier op├®rationnel<br>ÔÇó 10/10 points livr├®s ÔÇö taux de compl├®tion : **100%** |
| **ÔÜá´©Å Difficult├®s** | ÔÇó Temps de r├®ponse Ollama variable (3-15 secondes)<br>ÔÇó Agr├®gation MongoDB pour statistiques de revenus<br>ÔÇó Optimisation des performances du dashboard |
| **­ƒöº Actions correctives** | ÔÇó Optimiser le prompt syst├¿me pour r├®ponses concises<br>ÔÇó Ajouter indicateur d'attente anim├® IA<br>ÔÇó Mettre en cache les statistiques du dashboard |

#### Fonctionnalit├®s valid├®es ÔÇö Sprint 3

| Fonctionnalit├® | Statut | Remarques |
|---|---|---|
| Suivi r├®parations ÔÇö Admin (3 statuts + notes) | Ô£à | Transitions op├®rationnelles |
| Suivi r├®parations ÔÇö Client (timeline + confirmation) | Ô£à | Confirmation de r├®cup├®ration fonctionnelle |
| Tableau de bord analytique (KPI + graphiques) | Ô£à | Agr├®gations MongoDB + Recharts |
| Chat IA automobile (llama3.1 via Ollama) | Ô£à | Pr├®-diagnostic avec interface fluide |
| Consultation et validation des devis (Client) | Ô£à | Acceptation ÔåÆ r├®paration auto |

---

## 4. Bilan Global des Sprints

| Sprint | Module | Points planifi├®s | Points livr├®s | Compl├®tion |
|---|---|---|---|---|
| **Sprint 1** | Fondations S├®curis├®es | 14 pts | 14 pts | Ô£à 100% |
| **Sprint 2** | Essentiels Op├®rationnels | 17 pts | 17 pts | Ô£à 100% |
| **Sprint 3** | Contr├┤le de l'Application | 10 pts | 10 pts | Ô£à 100% |
| | **TOTAL** | **41 pts** | **41 pts** | **Ô£à 100%** |

**V├®locit├® de l'├®quipe** : 41 points sur 3 sprints, attestant de la fiabilit├® des estimations et de la rigueur du processus Scrum.

---

## 5. Tests et Validation

La phase de tests valide la conformit├® de la plateforme AutoExpert aux exigences d├®finies. Trois types de tests ont ├®t├® r├®alis├®s :

### 5.1 Tests Fonctionnels (15 cas)

| ID | Cas de test | Donn├®es d'entr├®e | R├®sultat attendu | Statut |
|---|---|---|---|---|
| **TF-01** | Inscription email valide | Nom, email, t├®l├®phone, mot de passe corrects | Compte cr├®├®, JWT retourn├®, redirection dashboard | Ô£à |
| **TF-02** | Inscription email existant | Email d├®j├á enregistr├® | Message ┬½ Cet email est d├®j├á utilis├® ┬╗ | Ô£à |
| **TF-03** | Connexion identifiants corrects | Email et mot de passe valides | JWT g├®n├®r├®, redirection selon r├┤le | Ô£à |
| **TF-04** | Connexion mauvais mot de passe | Mot de passe incorrect | Message ┬½ Email ou mot de passe incorrect ┬╗ | Ô£à |
| **TF-05** | Connexion compte bloqu├® | Compte d├®sactiv├® par l'admin | Message ┬½ Compte d├®sactiv├® ┬╗ | Ô£à |
| **TF-06** | R├®initialisation MDP ÔÇö email valide | Email existant en base | Email re├ºu avec lien s├®curis├® (< 30s) | Ô£à |
| **TF-07** | R├®initialisation MDP ÔÇö lien expir├® | Token > 1 heure | Message ┬½ Lien expir├® ┬╗ | Ô£à |
| **TF-08** | Ajout v├®hicule ÔÇö plaque unique | Immatriculation non enregistr├®e | V├®hicule cr├®├® et list├® | Ô£à |
| **TF-09** | Ajout v├®hicule ÔÇö plaque dupliqu├®e | Immatriculation d├®j├á enregistr├®e | Erreur ┬½ Immatriculation existante ┬╗ | Ô£à |
| **TF-10** | Cr├®ation r├®servation | V├®hicule + service + date | R├®servation cr├®├®e (statut ┬½ En attente ┬╗) | Ô£à |
| **TF-11** | Validation r├®servation par admin | R├®servation en attente | Statut ÔåÆ ┬½ Accept├®e ┬╗ | Ô£à |
| **TF-12** | Cr├®ation devis avec calcul total | 3 articles ├ù 50 TND l'un | Total = 150 TND calcul├® automatiquement | Ô£à |
| **TF-13** | Acceptation devis par client | Devis en attente | R├®paration cr├®├®e automatiquement (statut ┬½ En cours ┬╗) | Ô£à |
| **TF-14** | Chat IA ÔÇö sympt├┤me automobile | Description de panne v├®hicule | Pr├®-diagnostic retourn├® (~8 s) | Ô£à |
| **TF-15** | ├ëvolution statut r├®paration | En cours ÔåÆ Termin├®e | Statut mis ├á jour en base, visible par client | Ô£à |

### 5.2 Tests de S├®curit├® (6 cas)

| Test | Description | R├®sultat |
|---|---|---|
| **Acc├¿s route Admin sans token JWT** | GET /api/admin/clients sans Authorization | HTTP 401 Unauthorized Ô£à |
| **Acc├¿s route Admin avec token Client** | Token r├┤le ┬½ client ┬╗ sur route ┬½ admin ┬╗ | HTTP 403 Forbidden Ô£à |
| **Tentative d'injection NoSQL** | {email: {"$gt": ""}} dans champ login | Rejet├® par validation Mongoose Ô£à |
| **Token JWT falsifi├®** | Modification manuelle du payload JWT | Signature invalide, acc├¿s refus├® Ô£à |
| **V├®rification stockage mots de passe** | Lecture directe en base MongoDB | Hash Bcrypt (60 caract├¿res) confirm├® Ô£à |
| **R├®utilisation lien r├®initialisation** | Clic sur lien d├®j├á utilis├® | Message ┬½ Lien expir├® ou d├®j├á utilis├® ┬╗ Ô£à |

### 5.3 Tests de Performance (6 mesures)

| Page / Endpoint | Temps moyen | Optimisation appliqu├®e |
|---|---|---|
| Page d'accueil (React SPA) | ~0.8 s | Vite + code splitting React |
| POST /api/auth/login | ~150 ms | Index MongoDB sur email |
| GET /api/vehicles/mine | ~80 ms | Filtrage par userId index├® |
| GET /api/reparations/mine | ~120 ms | Populate limit├® aux champs n├®cessaires |
| GET /api/admin/dashboard | ~200 ms | Agr├®gation MongoDB optimis├®e |
| POST /api/chat/diagnose (IA) | ~5 ├á 12 s | R├®ponse progressive (Ollama) |

**Conclusion des tests** : Toutes les pages (hors Chat IA) respectent le temps de r├®ponse cible < 2 secondes. Le Chat IA utilise une architecture asynchrone pour rendre l'attente acceptable ├á l'utilisateur.

---

## 6. Conclusion

Ce chapitre a pr├®sent├® la phase de r├®alisation et validation de la plateforme **AutoExpert**, construite it├®rativement sur trois sprints Scrum d'une semaine chacun.

### Synth├¿se des livrables

**­ƒöÉ Sprint 1 ÔÇö Fondations S├®curis├®es** (14 pts)
- Authentification JWT + Bcrypt
- Interface d'accueil et tableaux de bord
- Catalogue de services
- Gestion des comptes client et administrateur

**­ƒô▒ Sprint 2 ÔÇö Essentiels Op├®rationnels** (17 pts)
- Gestion compl├¿te des v├®hicules (CRUD)
- Workflow r├®servation : Client ÔåÆ Admin ÔåÆ Validation
- Gestion des devis avec calcul automatique
- D├®clenchement automatique des r├®parations

**­ƒñû Sprint 3 ÔÇö Contr├┤le de l'Application** (10 pts)
- Chat IA de pr├®-diagnostic (Ollama llama3.1)
- Suivi complet des r├®parations avec timeline
- Tableau de bord analytique avec graphiques
- Architecture performante et maintenable

### Architecture et technologie

L'architecture **MERN** (MongoDB, Express, React, Node.js) a offert un cadre :
- Ô£à **Moderne** : technologies ├á jour et widely adopted
- Ô£à **Performant** : temps de r├®ponse < 2s (hors IA)
- Ô£à **Maintenable** : structure modulaire et document├®e
- Ô£à **S├®curis├®** : authentification robuste et validation des donn├®es

### R├®sultats de validation

- Ô£à **15 tests fonctionnels** : 100% r├®ussite
- Ô£à **6 tests s├®curit├®** : 100% r├®ussite
- Ô£à **6 mesures performance** : cibles atteintes
- Ô£à **41/41 points planifi├®s** : taux de compl├®tion 100%

### Valeur ajout├®e

**AutoExpert** est la premi├¿re plateforme de gestion de garage ├á int├®grer une **intelligence artificielle de pr├®-diagnostic** directement accessible au client, comblant les lacunes identifi├®es dans les solutions existantes (Drivvo, Shopmonkey).

---

**Fin du Chapitre 3**
