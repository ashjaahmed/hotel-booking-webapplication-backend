const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middleware/authMiddleware');
const router = express.Router();

let users = [{ id: 1, username: "admin", password: "admin123" }];

// Signup
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.json({ message: "Signup successful", user: newUser });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Generate JWT
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: "Login successful", token });
});

module.exports = router;