const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const {sequelize, connectToDB} = require('./db');
const {syncModels} = require('./models')

app.get('/', (req, res) => {
    res.send('reviews backend is running!');
});


app.listen(PORT, async ()=> {
    console.log(`Server is running on port ${PORT}`);
    await connectToDB();
    await syncModels();
});

// Create a route to test the connection
app.get('/', (req, res) => {
  res.send('MySQL connection established!');
});
