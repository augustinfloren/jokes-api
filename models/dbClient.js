const sqlite3 = require('sqlite3').verbose(); // Importer le module sqlite3

// Créer ou ouvrir une base de données SQLite
const db = new sqlite3.Database('jokes.db', (err) => {
    if (err) {
      console.error('Erreur lors de la connexion à la base de données :', err.message);
    } else {
      console.log('Connecté à la base de données SQLite.');
    }
});

module.exports = db;