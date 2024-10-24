const debug = require('debug')('app:migrate');
const sequelize = require('../models/dbClient');
const Joke = require('../models/Joke');
const fs = require('fs');
const path = require('path');

async function migrate() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'jokes.json'), 'utf8');
    const jokes = JSON.parse(data);

    await sequelize.sync({ force: true }); 
    debug('La base de données a été synchronisée.');

    await Joke.bulkCreate(jokes);

  } catch (error) {
    console.error('Erreur lors de l\'importation des blagues:', error);
  } 
};

module.exports = migrate;
