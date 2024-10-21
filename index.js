require("dotenv").config();
const debug = require('debug')('app');
const express = require("express");
const router = require("express").Router();
const controller = require("./controller.js");

const PORT = process.env.PORT || 3000;

// Configuration de l'app
const app = express();

app.use(express.static("./public"));

app.use(express.json());

router.get("/jokes", controller.getAllJokes);

// Lancement du serveur
app.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});
