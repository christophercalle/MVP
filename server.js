const express = require('express');  /*  Provides methods to handle web traffic like GET and POST requests.  */
const sqlite3 = require('sqlite3');  /*  Allows JS to talk to a db file on your hard drive */
const cors = require('cors');        /*  Allows browser to talk to the backend */

const app = express();
const db = new sqlite3.Database('database.sqlite');

app.use(cors());
app.use(express.json());

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)");
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});