const express = require("express");

// controller import
const userController = require("../controllers/userController");

// middleware import
const validationMiddleware = require("../middlewares/validations/validationMiddleware");
const userValidationSchema = require("../middlewares/validations/userSchema");

// router
const router = express.Router();

// login user

// signup user

// get all users
router.get("/all", userController.getAllUsers);

// get single user
router.get("/:id", userController.getUser);

// add user
router.post(
  "/add",
  validationMiddleware(userValidationSchema),
  userController.addUser
);

// update user
router.patch("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;