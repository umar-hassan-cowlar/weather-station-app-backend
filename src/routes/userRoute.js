const express = require('express')

// controller import
const userController = require('../controllers/userController')

// middleware import
const validationMiddleware = require('../middlewares/validations/validationMiddleware')
const {
  userSignupSchema,
  userLoginSchema,
} = require('../middlewares/validations/userSchemaMiddleware')

// router
const router = express.Router()

// get all users
router.get('/all', userController.getAllUsers)

// sign in user
router.post(
  '/login',
  validationMiddleware(userLoginSchema),
  userController.signIn
)

// signup user
router.post(
  '/signup',
  validationMiddleware(userSignupSchema),
  userController.signUp
)

// update user
router.patch('/:id', userController.updateUser)

// delete user
router.delete('/:id', userController.deleteUser)

module.exports = router
