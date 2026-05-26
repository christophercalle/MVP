/* IMPORTS */
const express = require('express');
const cors = require('cors');

/* INITIALIZATION */
const app = express();

/* MIDDLEWARE */ 
app.use(cors());
app.use(express.json());



/* SERVER STARTUP */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})