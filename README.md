# Projet Quizine (back)
***
L'API Quizzine a été développée pour le site web Quizzine, une plateforme d'échange de recettes, accessible à l'adresse : [https://quizinne.netlify.app/#/]

## Technologies et Bibliothèques utilisées
***

* Express.js: Un framework web pour Node.js, utilisé pour construire des API.

* PostgreSQL: Le système de gestion de base de données relationnelle utilisé pour stocker les données de l'application.
* bcryptjs: Utilisé pour le hachage des mots de passe. (+ salt) 
* CORS (Cross-Origin Resource Sharing): Permet de gérer les politiques de partage de ressources entre différentes origines.
* dotenv: Pour gérer les variables d'environnement de l'application.
* email-validator: Pour valider les adresses email lors de l'inscription ou d'autres opérations nécessitant une validation d'email.
* jsonwebtoken (JWT): Utilisé pour l'authentification et la gestion des sessions via des tokens.
* Multer: Middleware pour le téléchargement de fichiers.
* pg: Client PostgreSQL pour Node.js, utilisé pour interagir avec la base de données PostgreSQL.
* Cloudinary: Stockage externe de fichiers
* Multer-storage-cloudinary: Stockage via Multer pour Cloudinary
* Helmet: Sécurisation des applis Express (xss...)
* Sanitize-html: Nettoie le code HTML (xss)

## Outil de développement
***
* Nodemon: Utilisé en développement pour redémarrer automatiquement le serveur Node.js à chaque modification de fichier.
  
## Installation
***
1 Cloner le dépôt
```
git clone https://github.com/Lesly-Nupert/quizine_api.git
```
2 Aller dans le repertoire du projet
```
cd /chemin/du/projet
```
3 Installer les packages NPM
```
npm install
```
4 Lancer le serveur local
```
npm run dev
```

## Licence 
***
Distribué sous licence ISC. Voir ```LICENSE.txt``` pour plus d'informations.
