require("dotenv").config();
const debug = require('debug')('app:index');
const express = require("express");
const router = require("express").Router();
const controller = require("./controller.js");
const db = require("./data/migrate.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 3000;

// Configuration de l'app
const app = express();

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
      openapi: "3.0.0",
      info: {
          title: "API de Blagues Carambar",
          version: "1.0.0",
          description: "Une API pour gérer des blagues",
      },
      servers: [
          {
              url: `http://localhost:${PORT}`,
          },
      ],
  },
  apis: ["./controller.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.post("/newJoke", controller.addJoke);
router.get("/jokes", controller.getAllJokes);
router.get("/joke:id", controller.getOneJoke);
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

