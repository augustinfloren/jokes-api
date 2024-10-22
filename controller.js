const debug = require('debug')('app:controller');
const sequelize = require('./models/dbClient');
const Joke = require('./models/Joke');

const controller = {
    /**
     * @swagger
     * /newJoke:
     *   post:
     *     summary: Ajouter une nouvelle blague
     *     tags: [Blagues]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Le joueur de bowling ?"
     *               statement:
     *                 type: string
     *                 example: "Quel est le comble pour un joueur de bowling ?"
     *               answer:
     *                 type: string
     *                 example: "De perdre la boule !"
     *     responses:
     *       200:
     *         description: Blague ajoutée avec succès
     *       400:
     *         description: Erreur de validation des données
     *       500:
     *         description: Erreur du serveur
     */
    async addJoke(req, res) {
        try {
            const { title, statement, answer } = req.body;
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\d\s'-]+$/;
            if(!regex.test(title) || !regex.test(statement) || !regex.test(answer) ){
                return res.status(400).send("Le champ ne doit contenir que des lettres et des chiffres.");
            } else {
                const joke = await Joke.create({
                    title: title,
                    statement: statement,
                    answer: answer,
                });
                res.json(joke);
            }
        } catch(err) {
            console.error('Erreur lors de la création de la blague :', err);
            res.status(500).send('Erreur du serveur');
        };
    },
    /**
     * @swagger
     * /jokes:
     *   get:
     *     summary: Récupérer toutes les blagues
     *     tags: [Blagues]
     *     responses:
     *       200:
     *         description: Liste de blagues
     *       500:
     *         description: Erreur du serveur
     */
    async getAllJokes(req, res) {
        try {
            const jokes = await Joke.findAll();
            res.json(jokes);
        } catch(err) {
            console.error('Erreur lors de la récupération des blagues :', err);
            res.status(500).send('Erreur du serveur');
        };
    },
    /**
     * @swagger
     * /joke/{id}:
     *   get:
     *     summary: Récupérer une blague par son ID
     *     tags: [Blagues]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: L'ID de la blague
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Blague trouvée
     *       404:
     *         description: Blague non trouvée
     *       500:
     *         description: Erreur du serveur
     */
    async getOneJoke(req, res) {
        try {
            const joke = await Joke.findOne({ where: { id: req.params.id } })
            res.json(joke);
        } catch(err) {
            console.error('Erreur lors de la récupération de la blague :', err);
            res.status(500).send('Erreur du serveur');
        };
    },
    /**
     * @swagger
     * /randomJoke:
     *   get:
     *     summary: Récupérer une blague aléatoire
     *     tags: [Blagues]
     *     responses:
     *       200:
     *         description: Blague aléatoire
     *       500:
     *         description: Erreur du serveur
     */
    async getRandomJoke(req, res) {
        try {
            const joke = await Joke.findAll({ 
                order: sequelize.random(),
                limit: 1
            })
            res.json(joke);
        } catch(err) {
            console.error('Erreur lors de la récupération de la blague :', err);
            res.status(500).send('Erreur du serveur');
        };
    }
};

module.exports = controller;