const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Meta = sequelize.define("Meta", {
  acao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prazo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  executor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  responsavel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Meta;