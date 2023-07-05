const express = require("express");

// importing controllers
const weatherController = require("../controllers/weatherController");

const router = express.Router();

// get all data
router.get("/all", weatherController.getAllData);

// get data within range
router.get("/ranged", weatherController.getRangedData);

// add weather data
router.post("/add", weatherController.addData);

module.exports = router;