require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// database
const { Sequelize } = require('sequelize');
const mySQLDB = require('./config/dbConnection');

// connect to DB
mySQLDB.setUpDB(true); // set to false to prevenet dropping tables

// main app
const app = express();


// import routes
const apiRoute = require('./apps/api');

// use routes
app.use('/api', apiRoute);

    
// Body parser middleware to parse HTTP body in order to read HTTP data
app.use(bodyParser.json());

// default route
app.get('/', (req, res) => {
    res.send('server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
