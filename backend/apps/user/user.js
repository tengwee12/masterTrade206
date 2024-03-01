const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../../middleware/auth");

const User = require("./model");

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.get("/login", async (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
        if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }

        if (user.password === req.body.password) {
            const tokenObject = auth.issueJWT(user);
            res.cookie("token", tokenObject.token, {
                httpOnly: true,
              });
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

        } else {
            res.status(401).json({ success: false, msg: "you entered the wrong password" });

        }

    })
    .catch((err) => console.log(err));

});

module.exports = router;