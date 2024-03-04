const express = require('express');
const router = express.Router();


// import routes
const issueRoute = require('./issue/issue');
const userRoute = require('./user/user');
const plumberRoute = require('./plumber/plumber');
const reviewRoute = require('./review/review');

const Plumber = require("./plumber/model");

// add routes
router.use('/issue', issueRoute);
router.use('/user', userRoute);
router.use('/plumber',plumberRoute);
router.use('/review', reviewRoute);

router.get('/', (req, res) => {
  // todo documentation
  res.send('api');
});

// Get all plumbers
router.get('/getAllPlumbers', async (req, res) => {
  try {
    // Find all plumbers
    const plumbers = await Plumber.findAll();

    // Return the plumbers as JSON
    res.json(plumbers);
  } catch (error) {
    console.error("Error retrieving plumbers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;