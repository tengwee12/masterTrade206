const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../../middleware/auth");

const Plumber = require("./model");

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.post("/login", async (req, res, next) => {
    Plumber.findOne({where: { email: req.body.email }})
    .then((plumber) => {
        if (!plumber) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }

        if (plumber.password === req.body.password) {
            const tokenObject = auth.issueJWT(plumber);  //this is the part that needs middleware
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

        } else {
            res.status(401).json({ success: false, msg: "you entered the wrong password" });

        }

    })
    .catch((err) => console.log(err));

});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    Plumber.findOne({where: { email: req.body.email }})
    .then((plumber) => {
        if (plumber) {
            return res.status(400).json({ success: false, msg: "this email already exists"});
        } else {
            Plumber.create({
                email,
                password
            })
              .catch((err) => {
                response.status(500).end();
              });
            res.status(200).json({ success: true, msg: "you are now registered!"})
        }
    })
});

module.exports = router;