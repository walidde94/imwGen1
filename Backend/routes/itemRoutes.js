const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items from MongoDB
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();  // Fetch items from MongoDB
    res.json(items);  // Send items as response
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST a new item to MongoDB
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = new Item({ name });

    await newItem.save();
    res.json(newItem);  // Return the newly created item
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
