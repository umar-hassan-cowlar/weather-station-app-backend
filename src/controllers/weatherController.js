const Weather = require('../models/weatherModel')

// find all
exports.getAllData = async (req, res) => {
  try {
    const weatherResponse = await Weather.findAll()
    res.status(200).json(weatherResponse)
  } catch (err) {
    res.status(500).json({ err: err })
  }
}

// find one (skip for now)
exports.getRangedData = async (req, res) => {
  try {
    // const { destructureDataForRangeHere } = req.query;
  } catch (err) {
    res.status(500).json({ err: err })
  }
}
