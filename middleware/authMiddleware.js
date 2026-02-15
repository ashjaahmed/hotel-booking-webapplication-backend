const jwt = require('jsonwebtoken');

// Secret key (in production, store securely in environment variables)
const SECRET_KEY = "your_secret_key_here";

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Access token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Attach decoded user info to request
    next();
  });
}

module.exports = { authenticateToken, SECRET_KEY };