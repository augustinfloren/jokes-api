const Joke = require('./models/Joke');

const controller = {
    async getAllJokes(req, res) {
        try {
            const jokes = await Joke.finAll();
            res.json(jokes);
        } catch(err) {
            console.error('Erreur lors de la récupération des blagues :', err);
            res.status(500).send('Erreur du serveur');
        };
    }
};

module.exports = controller;