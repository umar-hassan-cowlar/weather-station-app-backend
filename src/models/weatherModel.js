const { Sequelize } = require("sequelize");

const sequelizeConfig = require("../config/dbConfig");

const Weather = sequelizeConfig.define("weather", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  cityName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  humidity: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  temperature: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Weather;
