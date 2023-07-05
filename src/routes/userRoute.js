const express = require("express");

// importing controllers
const userController = require("../controllers/userController");

const router = express.Router();

// login user

// signup user

// get all users
router.get("/all", userController.getAllUsers);

// get single user
router.get("/:id", userController.getUser);

// add user
router.post("/add", userController.addUser);

// update user
router.patch("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
