require("dotenv").config();
const debug = require('debug')('app:index');
const express = require("express");
const router = require("express").Router();
const controller = require("./controller.js");
const db = require("./data/migrate.js");

const PORT = process.env.PORT || 3000;

// Configuration de l'app
const app = express();

app.use(express.static("./public"));
app.use(express.json());

router.get("/jokes", controller.getAllJokes);
router.get("/joke", controller.getOneJoke);
router.get("/randomJoke", controller.getRandomJoke);
app.use(router);

// Exécutez les migrations au démarrage de l'application
(async () => {
  try {
    await db.migrate(); 
    debug('Migrations effectuées avec succès.');
    
    // Lancement du serveur après les migrations
    app.listen(PORT, 'localhost', () => {
      debug(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors des migrations :', error.message);
  }
})();

