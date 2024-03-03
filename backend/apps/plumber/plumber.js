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

// Update description, by ID
router.put("/description/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { description } = req.body;
      const plumber = await Plumber.findByPk(id);
      if (plumber) {
        //update begins here
        plumber.description = description;
        await plumber.save();
        res.json(plumber);
      } else {
        res.status(404).json({ error: "Plumber account not found" });
      }
    } catch (error) {
      console.error("Error retrieving plumber account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
// Update license, by ID
router.put("/license/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { license } = req.body;
      const plumber = await Plumber.findByPk(id);
      if (plumber) {
        //update begins here
        plumber.license = license;
        await plumber.save();
        res.json(plumber);
      } else {
        res.status(404).json({ error: "Plumber account not found" });
      }
    } catch (error) {
      console.error("Error retrieving plumber account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Update profile pic, by ID
router.put("/image/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { image } = req.body;
      const plumber = await Plumber.findByPk(id);
      if (plumber) {
        //update begins here
        plumber.image = image;
        await plumber.save();
        res.json(plumber);
      } else {
        res.status(404).json({ error: "Plumber account not found" });
      }
    } catch (error) {
      console.error("Error retrieving plumber account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;