const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../../middleware/auth");

const Plumber = require("./model");
const Review = require("../review/model");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

router.post("/login", async (req, res, next) => {
  Plumber.findOne({ where: { email: req.body.email } })
    .then((plumber) => {
      if (!plumber) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }

      if (plumber.password === req.body.password) {
        const tokenObject = auth.issueJWT(plumber, "plumber"); //this is the part that needs middleware
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => console.log(err));
});

/*
  Get all review given plumber id
*/
router.get(
  "/:id/review",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.user) {
      res.status(403).json({ msg: "Forbidden" });
    } else if (req.user.id != req.params.id) {
      res.status(500).json({ msg: "Error with token!" });
    } else {
      Review.findAll({ where: { PlumberId: req.user.id } })
        .then((result) => {
          res.status(200).json({
            success: true,
            data: result,
          });
        })
        .catch((err) => console.log(err));
    }
  }
);

// Get all plumbers
router.get("/", async (req, res) => {
  try {
    // Find all plumbers
    const plumbers = await Plumber.findAll();
    for (let i = 0; i < plumbers.length; i++){
      plumbers[i].services = parseServices(plumbers[i].services);
    }
    // Return the plumbers as JSON
    res.json(plumbers);
  } catch (error) {
    console.error("Error retrieving plumbers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  Plumber.findOne({ where: { email: req.body.email } }).then((plumber) => {
    if (plumber) {
      return res
        .status(400)
        .json({ success: false, msg: "this email already exists" });
    } else {
      Plumber.create({
        email,
        name,
        password,
      }).catch((err) => {
        response.status(500).end();
      });
      res.status(200).json({ success: true, msg: "you are now registered!" });
    }
  });
});

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    if (!req.user) {
      res.status(403).json({ msg: "Forbidden" });
    } else if (req.user.id != req.params.id) {
      res.status(500).json({ msg: "Error with token!" });
    } else {
      try {
        const { email, description, image } = req.body;
        const plumber = await Plumber.findByPk(id);
        if (plumber) {
          //update begins here
          if (email) {
            plumber.email = email;
          }
          if (description) {
            plumber.description = description;
          }
          if (image) {
            plumber.image = image;
          }
          await plumber.save();
          res.json(plumber);
        } else {
          res.status(404).json({ error: "Plumber account not found" });
        }
      } catch (error) {
        console.error("Error retrieving plumber account:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
);

// Retrieve plumber by plumber ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.user) {
      res.status(403).json({ msg: "Forbidden" });
    } else {
      const { id } = req.params;
      try {
        // Find the plumber by ID
        const plumber = await Plumber.findByPk(id);

        if (!plumber) {
          // If plumber not found, return a 404 error
          return res.status(404).json({ error: "Plumber not found" });
        }

        plumber.services = parseServices(plumber.services)
        // Return the plumber information as JSON
        res.json(plumber);
      } catch (error) {
        console.error("Error retrieving plumber account:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
);

// Update license, by ID
router.put("/license/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id } = req.params;

  if (!req.user) {
    res.status(403).json({ msg: "Forbidden" });
  } else if (req.user.id != req.params.id) {
    res.status(500).json({ msg: "Error with token!" });
  } else {
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
  }
});

// Update profile pic, by plumber ID
// router.put("/image/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { image } = req.body;
//     const plumber = await Plumber.findByPk(id); //overwrites everything though
//     if (plumber) {
//       //update begins here
//       plumber.image = image;
//       await plumber.save();
//       res.json(plumber);
//     } else {
//       res.status(404).json({ error: "Plumber account not found" });
//     }
//   } catch (error) {
//     console.error("Error retrieving plumber account:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Update profile pic, by plumber ID
// router.put("/image/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { image } = req.body;
//     const plumber = await Plumber.findByPk(id); //overwrites everything though
//     if (plumber) {
//       //update begins here
//       plumber.image = image;
//       await plumber.save();
//       res.json(plumber);
//     } else {
//       res.status(404).json({ error: "Plumber account not found" });
//     }
//   } catch (error) {
//     console.error("Error retrieving plumber account:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Add a GET route to fetch image links for a specific plumber by ID
// router.get("/image/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Find the plumber by ID
//     const plumber = await Plumber.findByPk(id);

//     if (!plumber) {
//       // If plumber not found, return a 404 error
//       return res.status(404).json({ error: "Plumber not found" });
//     }

//     if (!plumber.image) {
//       // If plumber has no image links, return an empty array
//       console.log("NO LINKS")
//       return res.json([]);
//     }

//     // Split the concatenated image links and send them as an array
//     const imageLinks = plumber.image.split(';').filter(Boolean); // Filter to remove empty strings
//     res.json(imageLinks);
//   } catch (error) {
//     console.error("Error retrieving image links:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Add a DELETE route to delete a specific image link for a plumber by ID
router.delete("/image/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id } = req.params;
  if (!req.user) {
    res.status(403).json({ msg: "Forbidden" });
  } else if (req.user.id != req.params.id) {
    res.status(500).json({ msg: "Error with token!" });
  } else {
    try {
      // Find the plumber by ID
      const plumber = await Plumber.findByPk(id);

      if (!plumber) {
        // If plumber not found, return a 404 error
        return res.status(404).json({ error: "Plumber not found" });
      }

      if (!plumber.image) {
        // If plumber has no image links, return a 404 error
        return res.status(404).json({ error: "Plumber has no image links" });
      }

      plumber.image = null;

      // // Split the concatenated image links into an array
      // const imageLinks = plumber.image.split(';');

      // // Find the index of the image link to delete
      // const indexToDelete = imageLinks.indexOf(imageLink);

      // if (indexToDelete === -1) {
      //   // If the image link to delete is not found, return a 404 error
      //   return res.status(404).json({ error: "Image link not found for this plumber" });
      // }

      // // Remove the image link from the array
      // imageLinks.splice(indexToDelete, 1);

      // // Join the remaining image links back into a single string
      // plumber.image = imageLinks.join(';');

      // Save the updated plumber record
      await plumber.save();

      // Send a success response
      res.json({ message: "Image link deleted successfully" });
    } catch (error) {
      console.error("Error deleting image link:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Add service, by ID
// router.put("/services/add/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { service } = req.body;
//     const plumber = await Plumber.findByPk(id);
//     if (plumber) {
//       if (plumber.services === ""){
//         plumber.services = service;
//       }
//       //update begins here
//       else {
//         plumber.services = plumber.services + ";" + service;
//       }
//       await plumber.save();
//       res.json(plumber);
//     } else {
//       res.status(404).json({ error: "Plumber account not found" });
//     }
//   } catch (error) {
//     console.error("Error retrieving plumber account:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Add a GET route to fetch image links for a specific plumber by ID
// router.get("/image/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Find the plumber by ID
//     const plumber = await Plumber.findByPk(id);

//     if (!plumber) {
//       // If plumber not found, return a 404 error
//       return res.status(404).json({ error: "Plumber not found" });
//     }

//     if (!plumber.image) {
//       // If plumber has no image links, return an empty array
//       console.log("NO LINKS")
//       return res.json([]);
//     }

//     // Split the concatenated image links and send them as an array
//     const imageLinks = plumber.image.split(';').filter(Boolean); // Filter to remove empty strings
//     res.json(imageLinks);
//   } catch (error) {
//     console.error("Error retrieving image links:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.put("/addService/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id } = req.params;

  if (!req.user) {
    res.status(403).json({ msg: "Forbidden" });
  } else if (req.user.id != req.params.id) {
    res.status(500).json({ msg: "Error with token!" });
  } else {
    try {
      const { license } = req.body;
      const plumber = await Plumber.findByPk(id);
      if (plumber) {
        const { name } = req.body;
        const { media } = req.body;
        const { price } = req.body;
        newService =  name + ";" + media + ";" + price + ";";
        plumber.services += newService
        await plumber.save();
        res.json(plumber);
      } else {
        res.status(404).json({ error: "Plumber account not found" });
      }
    } catch (error) {
      console.error("Error retrieving plumber account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

function parseServices(servicesString) {
  const servicesArray = servicesString.split(';').filter(service => service.trim() !== '');
  const servicesList = [];
  
  for (let i = 0; i < servicesArray.length; i += 3) {
      const name = servicesArray[i];
      const media = servicesArray[i + 1];
      const price = servicesArray[i + 2];
      servicesList.push({ name, media, price });
  }
  
  return servicesList;
}

module.exports = router;
