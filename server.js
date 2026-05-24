/* IMPORTS */
const express = require('express');
const cors = require('cors');

/* INITIALIZATION */
const app = express();

/* MIDDLEWARE */ 
app.use(cors());
app.use(express.json());
