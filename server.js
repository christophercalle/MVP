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

app.listen(3000, () => console.log('API running at http://localhost:3000'));