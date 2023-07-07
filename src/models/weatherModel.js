const { Sequelize } = require('sequelize')

const sequelizeConfig = require('../config/dbConfig')

const Weather = sequelizeConfig.define('weather', {
  channel: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  temperature: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  humidity: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  pressure: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
})

module.exports = Weather
