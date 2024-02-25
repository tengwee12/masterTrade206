const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const {sequelize, connectToDB} = require('./db');

app.get('/', (req, res) => {
    res.send('post backend is running!');
});

app.listen(PORT, async ()=> {
    console.log(`Server is running on port ${PORT}`);
    await connectToDB();
});

// Create a route to test the connection
app.get('/', (req, res) => {
  res.send('MySQL connection established!');
});


