const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)");
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  stmt.run(username, hashedPassword, function (err) {
    if (err) {
      return res.status(400).send('User already exists');
    }
    res.status(200).send('Registration successful');
  });
  stmt.finalize();
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT password FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (!row) {
      return res.status(401).send('Invalid credentials');
    }
    if (bcrypt.compareSync(password, row.password)) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
