// Charge les variables d'environnement à partir d'un fichier .env
// A mettre tout en haut du point d'entrée de l'application pour être sûr que les variables sont bien accessibles.
require('dotenv').config();

// Importe le framework Express
const express = require('express');

// Middlewarre CORS :
// Cross-Origin Resource Sharing rend l'API accessible en toute sécurité à différents clients (domaine, protocole ou port) différente de la sienne via des en-têtes http (cela se fait automatiquement sous le capot)

const cors = require('cors');

// Initialisation de Express
const app = express();

// Activation de CORS

// app.use(cors());

// const corsOptions = {
//     origin: 'https://quizinne.netlify.app',
//     optionsSuccessStatus: 200 
// };
// app.use(cors(corsOptions));

// LOCALHOST:3000 uniquement pour le développement
// Distribue les fichiers statiques dans le dossier 'images' (middleware)
// app.use('/images', express.static('./images'));

// Middleware qui analyse les données du corps de la requête (Propriété: req.body)
// Dans insomnia et Fetch mettre le Content-Type à application x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse données JSON
app.use(express.json());

// Importe les routes de l'application depuis le dossier 'router' + utilisation
const router = require('./app/router/');
app.use(router); 

// Port sur lequel l'appli va écouter + Url de base 
app.set('PORT', process.env.PORT || 3000);
app.set('URL', process.env.BASE_URL || 'https://quizinneapi.up.railway.app/');

app.listen(app.get('PORT'), () => {
    console.log(`Listening on ${app.get('URL')}:${app.get('PORT')}`);
});