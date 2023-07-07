// import statements
require('dotenv').config()
const sequelize = require('./config/dbConfig')
const logger = require('./config/logger')

// importing app
require('./app')

// import mqtt
require('./services/mqtt')
