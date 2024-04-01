const express = require('express');
const router = express.Router();

// Load Category model
const Category = require('../models/Category');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/categories
// @desc    Create a new category
// @access  Public
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
