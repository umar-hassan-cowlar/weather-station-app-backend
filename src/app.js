const express = require('express')

const logger = require('./config/logger')
const sequelize = require('./config/dbConfig')

const errorMiddleware = require('./middlewares/errorMiddleware')
const notFoundMiddleware = require('./middlewares/routeMiddleware')

// importing routes
const userRoutes = require('./routes/userRoute')
const weatherRoutes = require('./routes/weatherRoute')

// initializing app
const app = express()

app.use(express.json())

// using routes
app.use('/user', userRoutes)
app.use('/weather', weatherRoutes)

// default route
app.get('/', (req, res) => {
  res.json({ message: 'OK??' })
})

// using middlewares
app.use(notFoundMiddleware)
app.use(errorMiddleware)

sequelize
  .sync()
  .then(() => {
    const port = process.env.SERVER_PORT || 3000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((err) => {
    console.error(`Something went wrong ${err}`)
  })

module.exports = app
