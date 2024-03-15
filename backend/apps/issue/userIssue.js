const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../user/model");
const Issue = require("./model");
const Review = require("../review/model");

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

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {

  const id = req.params.id;

  if (req.user) {
    Issue.findOne({
      where: {
        id: id,
      },
      order: [["createdAt", "DESC"]],
    }).then((issue) => {
      if (issue.UserId != req.user.id) {
        res.status(403).json({ msg: "Forbidden" });
      } else {
        Review.findOne({where: { IssueId: id}}).then((review) =>{
          res.json({ msg: "success", data: issue, review: review});
        }) .catch((err) => console.log(err));
       
      }
    });
  } else {
    res.status(500).json({ msg: "Error with token!" });
  }

});

module.exports = router;
