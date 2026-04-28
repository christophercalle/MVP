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

// GET: Read all tasks
app.get('/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST: Create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    db.run("INSERT INTO tasks (title) VALUES (?)", [title], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title });
    });
});

app.listen(3000, () => console.log('API running at http://localhost:3000'));