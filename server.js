const express = require('express');  /*  Provides methods to handle web traffic like GET and POST requests.  */
const sqlite3 = require('sqlite3');  /*  Allows JS to talk to a db file on your hard drive */
const cors = require('cors');        /*  Allows browser to talk to the backend */

const app = express();
const db = new sqlite3.Database('database.sqlite');