const debug = require('debug')('app:client');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './jokes.db' 
});

sequelize.authenticate()
.then(() => {
  debug('Connexion à la base de données réussie.');
})
.catch(err => {
  debug('Erreur de connexion à la base de données:', err);
});

module.exports = sequelize;
