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


/* 4. DATABASE SETUP */
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT,
        completed INTEGER DEFAULT 0
    )`);
});



app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err,rows) => {
        res.json(rows);
    })
})


/* SERVER STARTUP */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});







