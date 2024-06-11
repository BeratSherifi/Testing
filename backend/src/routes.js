const express = require('express');
const router = express.Router();
const db = require('./db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  stmt.run(username, password, function(err) {
    if (err) {
      return res.status(500).send("Registration failed");
    }
    res.send("Registration successful");
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (err) {
      return res.status(500).send("Login failed");
    }
    if (row) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

module.exports = router;
