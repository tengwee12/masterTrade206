const express = require('express');
const router = express.Router();


// import routes
const issueRoute = require('./issue/issue');

// add routes
router.use('/issue', issueRoute);


router.get('/', (req, res) => {
  // todo documentation
  res.send('api');
});

module.exports = router;