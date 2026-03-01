# Configuration Email pour Gmail

Pour utiliser la fonctionnalité "Mot de passe oublié", vous devez configurer un compte Gmail :

## Étapes :

1. **Créer un mot de passe d'application Gmail** :
   - Allez sur https://myaccount.google.com/security
   - Activez la validation en 2 étapes si ce n'est pas déjà fait
   - Allez dans "Mots de passe des applications"
   - Sélectionnez "Autre" et nommez-le "AutoExpert"
   - Copiez le mot de passe généré (16 caractères)

2. **Modifier le fichier .env** :
   ```
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASS=le-mot-de-passe-app-genere
   ```

3. **Redémarrer le serveur backend**

## Alternative : Utiliser Mailtrap (pour les tests)

Si vous voulez tester sans Gmail :
```
EMAIL_USER=votre-username-mailtrap
EMAIL_PASS=votre-password-mailtrap
```

Et modifier `backend/utils/sendEmail.js` :
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```
