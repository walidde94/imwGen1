// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // Register a new user
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
  
//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create and save the new user
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (err) {
//     console.error('Registration Error:', err.message || err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     // Basic validation
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Please enter all fields' });
//     }
  
//     try {
//       // Check if the user exists
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ msg: 'User not found' });
//       }
  
//       // Validate password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ msg: 'Invalid credentials' });
//       }
  
//       // Generate JWT token
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       // Return token and user data
//       res.json({ 
//         token, 
//         user: { id: user._id, username: user.username, email: user.email } 
//       });
//     } catch (err) {
//       console.error('Login Error:', err.message || err);
//       res.status(500).json({ msg: 'Server error' });
//     }
//   });
  
// module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router(); // Add this line to define `router`

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err.message || err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Login Error:', err.message || err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user info
router.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('User Fetch Error:', err.message || err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

module.exports = router;
