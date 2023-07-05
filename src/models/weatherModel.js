const { Sequelize } = require("sequelize");

const sequelize_config = require("../config/dbConfig");

const Weather = sequelize_config.define("weather", {
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
