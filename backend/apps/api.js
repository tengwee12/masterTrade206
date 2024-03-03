const express = require('express');
const router = express.Router();


// import routes
const issueRoute = require('./issue/issue');
const userRoute = require('./user/user');
const plumberRoute = require('./plumber/plumber');

// add routes
router.use('/issue', issueRoute);
router.use('/user', userRoute);
router.use('/plumber',plumberRoute);

router.get('/', (req, res) => {
  // todo documentation
  res.send('api');
});

module.exports = router;