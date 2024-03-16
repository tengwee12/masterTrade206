const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../user/model");
const Review = require("./model");
const Plumber = require("../plumber/model");
const Issue = require("../issue/model");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    if (!req.user) {
      res.status(403).json({ msg: "Forbidden" });
    } else if (req.user.id != req.params.id) {
      res.status(500).json({ msg: "Error with token!" });
    } else {
        const issueId = req.params.issueId;
        const userId = req.params.id;
        const date = new Date();

        const { description, rating, media, price } = req.body;

        const issue = await Issue.findByPk(IssueId);
        const plumber = await issue.getPlumber();

        const plumberId = plumber.id;

        const newReview = await Review.create({
            description,
            date,
            rating,
            media,
            issueId,
            plumberId,
            userId
        });

    
        const issues = await Issue.findAll({
          where: {
            PlumberId: plumberId
          }

        })
        let averageRating = 0;
        let count = 0;
        console.log(issues.length)
        for (let i = 0; i < issues.length; i++) {
          const review = await issues[i].getReview(); 
          if (review) {
            averageRating += review.rating
            count++;
          }
        }
        averageRating = averageRating / count;
        plumber.averageRating = averageRating;
        await plumber.save();
    }
  }
);

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {

//   if (!req.user) {
//     res.status(403).json({ msg: "Forbidden" });
//   } else if (req.user.id != req.params.id) {
//     res.status(500).json({ msg: "Error with token!" });
//   } else {
//   }

// });

module.exports = router;
