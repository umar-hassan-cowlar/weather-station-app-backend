const request = require('supertest')
require('dotenv').config()

const app = require('../app')
const User = require('../models/userModel')

describe('User Routes', () => {
  const userPayload = {
    name: 'peach',
    email: 'peach@peach.com',
    password: 'peach123',
  }

  beforeAll(async () => {
    await User.destroy({ where: { email: userPayload.email } })
  })

  describe('Get All Users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/user/all')
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('User Sign Up', () => {
    it('should return error if user name is missing ', async () => {
      const response = await request(app).post('/user/signup').send({
        name: '',
        email: 'peach@peach.com',
        password: 'peach123',
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return error if email is missing', async () => {
      const response = await request(app).post('/user/signup').send({
        name: 'peach',
        email: '',
        password: 'peach123',
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return error if email is invalid (not having @)', async () => {
      const response = await request(app).post('/user/signup').send({
        name: 'peach',
        email: 'pechu.com',
        password: 'peach123',
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return error if email is invalid (not having .)', async () => {
      const response = await request(app).post('/user/signup').send({
        name: 'peach',
        email: 'pechu@com',
        password: 'peach123',
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return error if password is missing', async () => {
      const response = await request(app).post('/user/signup').send({
        name: 'peach',
        email: 'peach@peach.com',
        password: '',
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return error if password is less than 6', async () => {
      const response = await request(app).post('/user/signup').send({
        name: 'peach',
        email: 'peach@peach.com',
        password: 'peach',
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should sign up a user if payload is correct format', async () => {
      const response = await request(app).post('/user/signup').send(userPayload)
      expect(response.statusCode).toBe(201)
      expect(response.body.token).not.toBeNull()
    })

    it('should return error if user already exists', async () => {
      const response = await request(app).post('/user/signup').send(userPayload)
      expect(response.statusCode).toBe(409)
    })
  })

  describe('User Log In', () => {
    it('should return error if email is missing', async () => {
      const response = await request(app).post('/user/login').send({
        email: '',
        password: 'peach123',
      })

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return error if email is missing @', async () => {
      const response = await request(app).post('/user/login').send({
        email: 'peach.com',
        password: 'peach123',
      })

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return error if email is missing .', async () => {
      const response = await request(app).post('/user/login').send({
        email: 'peach@com',
        password: 'peach123',
      })

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return error if password is missing', async () => {
      const response = await request(app).post('/user/login').send({
        email: 'peach@peach.com',
        password: '',
      })

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toMatch('Failed')
    })

    it('should return token if payload is correct', async () => {
      const response = await request(app).post('/user/login').send({
        email: 'peach@peach.com',
        password: 'peach123',
      })

      expect(response.statusCode).toBe(200)
      expect(response.body.token).not.toBeNull()
    })
  })
})
