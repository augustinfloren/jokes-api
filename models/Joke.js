const { DataTypes } = require('sequelize');
const sequelize = require('./sequelizeClient');

const Joke = sequelize.define('Joke', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'jokes'
});

module.exports = Joke;
