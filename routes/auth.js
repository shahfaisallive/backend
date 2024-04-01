// auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../sendEmail'); // Import sendEmail function

// Load User model
const User = require('../models/User');

// @route   POST /api/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Send welcome email
    await sendEmail(
      email,
      'Welcome to Our App',
      `Thank you for signing up! Your account has been successfully created.`
    );

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
