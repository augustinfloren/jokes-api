const debug = require('debug')('app:controller');
const Joke = require('./models/Joke');

const controller = {
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
                where: { 
                    col1: 1,
                    col2: 2,
                    offset: 0,
                    limit: 1
                },
                order: ['RAND(ID)']
            })
            res.json(joke);
        } catch(err) {
            console.error('Erreur lors de la récupération de la blague :', err);
            res.status(500).send('Erreur du serveur');
        };
    }
};

module.exports = controller;