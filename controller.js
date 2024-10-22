const debug = require('debug')('app:controller');
const sequelize = require('./models/dbClient');
const Joke = require('./models/Joke');

const controller = {
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
    async getAllJokes(req, res) {
        try {
            const jokes = await Joke.findAll();
            res.json(jokes);
        } catch(err) {
            console.error('Erreur lors de la récupération des blagues :', err);
            res.status(500).send('Erreur du serveur');
        };
    },
    async getOneJoke(req, res) {
        try {
            const joke = await Joke.findOne({ where: { id: req.params.id } })
            res.json(joke);
        } catch(err) {
            console.error('Erreur lors de la récupération de la blague :', err);
            res.status(500).send('Erreur du serveur');
        };
    },
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