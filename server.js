// Server configuration and main routing endpoints

/* 1. IMPORTS */
const express = require('express');
const sqlite3 = require('sqlite3'); // Added missing import
const cors = require('cors');        // Removed duplicate line

/* 2. INITIALIZATION */
const app = express();
const db = new sqlite3.Database('database.sqlite');

/* 3. MIDDLEWARE */ 
app.use(cors());
app.use(express.json());


/* 4. DATABASE SETUP */
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT,
        completed INTEGER DEFAULT 0
    )`);
});


/* GET ROUTE */
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err,rows) => {
        res.json(rows);
    })
})


/* POST ROUTE */
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    db.run('INSERT INTO tasks (title) VALUES (?)', [title], () => {
        res.json({ message: 'Task added!' });
    });
});

/* PUT ROUTE */
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    
    db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], () => {
        res.json({ message: 'Task updated!' });
    });
});

/* DELETE ROUTE */
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM tasks WHERE id = ?', [id], () => {
        res.json({ message: 'Task deleted!' });
    });
});


/* SERVER STARTUP */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});







