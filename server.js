/* 1. IMPORTS  */
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

/* 2. INITIALIZATION  */
const app = express();
const db = new sqlite3.Database('database.sqlite');

/* 3. MIDDLEWARE  */
app.use(cors());
app.use(express.json());

// Custom Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next(); // Tells Express to pass the request to the next route or middleware
});

/* 4. DATABASE SETUP  */
db.serialize(() => {
    // Adding a 'completed' column so it matches your temporary schema
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT,
            completed INTEGER DEFAULT 0
        )
    `);
});

/* 5. API ROUTES  */

// GET all tasks (Reading from SQLite)
app.get('/api/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Convert SQLite 0/1 integers back to boolean true/false for the client
        const formattedTasks = rows.map(row => ({
            id: row.id,
            title: row.title,
            completed: row.completed === 1
        }));
        res.json(formattedTasks);
    });
});

// POST a new task (Writing to SQLite)
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    db.run("INSERT INTO tasks (title, completed) VALUES (?, 0)", [title], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, title, completed: false });
    });
});


// PATCH: Toggle task completion status
app.patch('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id; // No longer strictly dependent on parseInt for safety
    const { completed } = req.body;
    const sqliteCompleted = completed ? 1 : 0;

    const sql = "UPDATE tasks SET completed = ? WHERE id = ?";
    
    // Pass parameters safely inside the array block
    db.run(sql, [sqliteCompleted, taskId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: `Task ${taskId} updated`, id: taskId, completed });
    });
});

// DELETE a task (Removing from SQLite)
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    // Pass parameters safely inside the array block
    db.run("DELETE FROM tasks WHERE id = ?", [taskId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: `Task ${taskId} deleted successfully`, id: taskId });
    });
});


/* 6. GLOBAL ERROR HANDLING */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: "Something went wrong on the server!", 
        details: err.message 
    });
});

/* 7. SERVER STARTUP  */
const PORT = process.env.PORT || 3000;


// 8. GRACEFUL SHUTDOWN
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the SQLite database connection.');
        process.exit(0);
    });
});



app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

