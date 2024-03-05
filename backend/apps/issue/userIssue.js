const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../user/model");
const Issue = require("./model");

router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {

  if (req.user) {
    Issue.findAll({
      where: {
        UserId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    }).then((issues) => {
      res.json({ msg: "success", data: issues });
    });
  } else {
    res.status(500).json({ msg: "Error with token!" });
  }

});

module.exports = router;
