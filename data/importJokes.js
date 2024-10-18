const fs = require('fs'); // Importer le module fs pour lire des fichiers
const path = require('path'); // Importer le module path
const db = require('../models/dbClient.js');
const jokes = require(path.join(__dirname, 'jokes.json')); // Utiliser le chemin absolu

// Lire le fichier SQL pour créer la table
fs.readFile(path.join(__dirname, './jokes.sql'), 'utf8', (err, sqlCreateTable) => {
    if (err) {
        return console.error('Erreur lors de la lecture du fichier SQL :', err.message);
    }

    // Exécuter la requête pour créer la table
    db.run(sqlCreateTable, (err) => {
        if (err) {
            return console.error('Erreur lors de la création de la table :', err.message);
        }
        console.log('Table "jokes" créée avec succès.');

        let counter = 1;
        let sqlValues = [];
        let sqlParameters = [];

        for (const joke of jokes) {
            sqlParameters.push(`($${counter}, $${counter + 1})`);
            counter += 2;
            sqlValues.push(joke.title);
            sqlValues.push(joke.answer);
        }

        const sql = `
            INSERT INTO "jokes"("title", "answer")
            VALUES ${sqlParameters.join()};
        `;

        db.run(sql, sqlValues, function (err) {
            if (err) {
                return console.error('Erreur lors de l\'insertion des données :', err.message);
            }
            console.log(`Blagues ajoutées`);
        });

        db.close((err) => {
            if (err) {
                console.error('Erreur lors de la fermeture de la base de données :', err.message);
            } else {
                console.log('Connexion à la base de données fermée.');
            }
        });
    });
});
