const express = require('express');
const router = express.Router();

// Load Car model
const Car = require('../models/Car');

// @route   GET /api/cars
// @desc    Get all cars
// @access  Public
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/cars
// @desc    Create a new car
// @access  Public
router.post('/', async (req, res) => {
  const { category, color, model, make, registrationNo } = req.body;

  try {
    const newCar = new Car({ category, color, model, make, registrationNo });
    await newCar.save();
    res.status(201).json({ message: 'Car created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
