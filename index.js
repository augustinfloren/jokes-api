require("dotenv").config();
const debug = require('debug')('app:index');
const express = require("express");
const router = require("express").Router();
const controller = require("./controller.js");
const migrate = require("./data/migrate.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 3000;
const SERVER_PORT = process.env.SERVER_PORT;
const API_BASE_URL = process.env.API_BASE_URL;

const app = express();
const cors = require('cors');
app.use(cors());
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
              url: process.env.API_BASE_URL,
          },
      ],
  },
  apis: ["./controller.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.post("/newJoke", controller.addJoke);
router.get("/jokes", controller.getAllJokes);
router.get("/joke/:id", controller.getOneJoke);
router.get("/randomJoke", controller.getRandomJoke);

app.use(router);

(async () => {
  try {
    await migrate(); 
    debug('Migrations effectuées avec succès.');
    
    app.listen(PORT, SERVER_PORT, () => {
      debug(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors des migrations :', error.message);
  }
})();

