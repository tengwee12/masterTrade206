const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('post backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'issuePostingDB'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Create a route to test the connection
app.get('/', (req, res) => {
  res.send('MySQL connection established!');
});


