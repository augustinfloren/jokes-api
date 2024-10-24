const debug = require('debug')('app:model');
const { DataTypes } = require('sequelize');
const sequelize = require('./dbClient');

const Joke = sequelize.define('Joke', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'jokes',
  timestamps: false, 
});

module.exports = Joke;
