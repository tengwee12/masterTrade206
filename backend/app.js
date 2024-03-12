require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport);
const authMiddleware = require("./middleware/auth");

// database
const { Sequelize } = require('sequelize');
const mySQLDB = require('./config/dbConnection');

// connect to DB
mySQLDB.setUpDB(true); // set to false to prevenet dropping tables

// main app
const app = express();


// import routes
const apiRoute = require('./apps/api');

// Body parser middleware to parse HTTP body in order to read HTTP data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
// app.use(authMiddleware.verifyJWT);

// cors
app.use(cors());

// use routes
app.use('/api', apiRoute);

// default route
app.get('/', (req, res) => {
    res.send('server is running!');
});

app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('auth success!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
