const express = require('express');
const router = express.Router();

// In-memory users
let users = [
  { id: 1, username: "admin", password: "admin123" }
];

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
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ message: "Login successful", user });
});

module.exports = router;