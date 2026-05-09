/*  1. IMPORTS  */
const express = require('express');  /* Provides methods to handle web traffic like GET and POST requests. */
const sqlite3 = require('sqlite3');  /* Allows JS to talk to a db file on your hard drive */
const cors = require('cors');        /* Allows browser to talk to the backend */

/*  2. INITIALIZATION  */
const app = express();
const db = new sqlite3.Database('database.sqlite');

/*  3. MIDDLEWARE  */
app.use(cors());
app.use(express.json());

/*  4. DATABASE SETUP  */
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)");
});

/*  5. SERVER STARTUP  */
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

/* API ROUTES */

// GET: Retrieve all tasks
app.get('/tasks', (req,res) => {
    res.send('API is working! Next we wil connect this to the database');
});