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



// POST: Create a new task with server-side validation
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    // Check if title is missing or just whitespace
    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Task title is required" });
    }

    db.run("INSERT INTO tasks (title) VALUES (?)", [title], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title });
    });
});



// PUT: Update a task's title
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    db.run("UPDATE tasks SET title = ? WHERE id = ?", [title, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
    });
});

// DELETE: Remove a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM tasks WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted", changes: this.changes });
    });
});

app.listen(3000, () => console.log('API running at http://localhost:3000'));