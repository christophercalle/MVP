const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Initialize Database
const db = new sqlite3.Database('./database.sqlite');
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT)");
});

// Health Check Route
app.get('/', (req, res) => {
  res.send('Pass 2 Server is running.');
});

// GET: Read all tasks
app.get('/tasks', (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(3000, () => console.log('API running at http://localhost:3000'));