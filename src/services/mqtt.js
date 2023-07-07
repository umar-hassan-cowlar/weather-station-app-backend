const mqtt = require('mqtt')
const fs = require('fs')

const Weather = require('../models/weatherModel')

// MQTT Broker configuration
const brokerUrl = `${process.env.MQTT_SOCKET}://${process.env.MQTT_HOST}`
const topic = 'weather'

const caFile = process.env.EQMX_CERT_PATH
const username = process.env.MQTT_USERNAME
const password = process.env.MQTT_PASSWORD

// config options
const options = {
  ca: fs.readFileSync(caFile),
  username: username,
  password: password,
}

const client = mqtt.connect(brokerUrl, options)

// listening to incoming messages
client.on('message', async (topic, message) => {
  const weatherData = JSON.parse(message.toString())
  console.log('Received weather data:', weatherData)

  const existingWeather = await Weather.findOne({
    where: { channel: topic },
  })

  if (existingWeather) {
    await existingWeather.update({
      humidity: weatherData.humidity,
      temperature: weatherData.temperature,
      pressure: weatherData.pressure,
    })
  } else {
    await Weather.create({
      channel: topic,
      humidity: weatherData.humidity,
      temperature: weatherData.temperature,
      pressure: weatherData.pressure,
    })
  }
})

// on connection with broker
client.on('connect', () => {
  console.log('Connected to MQTT Broker')
  client.subscribe(topic)
})

if (client.connected) {
  try {
    client.end(false, () => {
      console.log('disconnected successfully')
    })
  } catch (error) {
    console.log('disconnect error:', error)
  }
}
