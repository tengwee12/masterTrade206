const express = require('express');
const router = express.Router();


// import routes
const issueRoute = require('./issue/issue');
const userRoute = require('./user/user');
const plumberRoute = require('./plumber/plumber');
const reviewRoute = require('./review/review');

// add routes
router.use('/issue', issueRoute);
router.use('/user', userRoute);
router.use('/plumber',plumberRoute);
router.use('/review', reviewRoute);

router.get('/', (req, res) => {
  // todo documentation
  res.send('api');
});

module.exports = router;