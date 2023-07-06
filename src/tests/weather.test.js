const request = require('supertest')
require('dotenv').config()

const app = require('../app')
const User = require('../models/userModel')

describe('Weather Routes', () => {
  describe('Fetch Weather Data', () => {
    let server // Declare a variable to store the server instance

    beforeAll((done) => {
      server = app.listen(3001, () => {
        done()
      })
    })

    afterAll((done) => {
      server.close(done) // Close the server after the tests are complete
    })

    it('should sign up a user if payload is correct format', async () => {
      const response = await request(app).post('/user/signup').send({
        name: 'peach',
        email: 'peach@peach.com',
        password: 'peach123',
      })
      expect(response.statusCode).toBe(201)
      expect(response.body.token).not.toBeNull()
    })

    it('should fetch weather data if user is authenticated and authorized', async () => {
      const response = await request(app).post('/user/login').send({
        email: 'peach@peach.com',
        password: 'peach123',
      })
      expect(response.statusCode).toBe(200)

      const token = response.body.token

      const weatherResponse = await request(app)
        .get('/weather/all')
        .set('Authorization', `Bearer ${token}`)
      expect(weatherResponse.statusCode).toBe(200)
    })

    it('should return error if user token is invalid', async () => {
      const response = await request(app).post('/user/login').send({
        email: 'peach@peach.com',
        password: 'peach123',
      })
      expect(response.statusCode).toBe(200)

      const token = 'not valid'

      const weatherResponse = await request(app)
        .get('/weather/all')
        .set('Authorization', `Bearer ${token}`)
      expect(weatherResponse.statusCode).toBe(400)
    })
  })
})
