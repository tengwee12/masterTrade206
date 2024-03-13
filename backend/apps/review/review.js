const express = require('express');
const router = express.Router();
const Issue = require("../issue/model");
const Plumber = require("../plumber/model");

const Review = require("./model");

router.get('/', async (req, res) => {  //REST API endpoint to get all the rows in Reviews
    try {
        const reviews = await Review.findAll();  //integrated sequelize function, no need to add own boilerplate
        console.log("stuff has been fetched\n");
        res.json(reviews);
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        // Extract data from the request body
        const { customerId, description, dateTime, rating, media, IssueId, price } = req.body;

        //check if review for this issue already exists
        const rev = await Review.findAll({
          where: {
            IssueId: IssueId
          }
        })

        // Create a new review record in the database
        const newReview = await Review.create({
            customerId,
            description,
            dateTime,
            rating,
            media,
            IssueId,
            price
        });
        const issue = await Issue.findByPk(IssueId);
        const plumber = await issue.getPlumber();
        const plumberId = plumber.id;
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

        // Respond with the newly created review
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding new review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve review by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByPk(id);
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ error: 'review not found' });
        }
    } catch (error) {
        console.error('Error retrieving review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the review by ID
        const review = await Review.findByPk(id);

        // If review doesn't exist, return 404 Not Found
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Delete the review
        await review.destroy();

        // Respond with a success message
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  // ADD MEDIA
  router.post("/media/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { media } = req.body;
      const review = await Review.findByPk(id);
      if (!media){
        return res.status(404).json({ error: "media invalid" });
      }
      if (review) {
        //update begins here
        review.media = review.media + ";" + media;
        await review.save();
        res.json(review);
      } else {
        res.status(404).json({ error: "review not found" });
      }
    } catch (error) {
      console.error("error retrieving the review you wanted:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Add a GET route to fetch image links for a specific review by ID
  router.get("/media/:id", async (req, res) => {
    const { id } = req.params;
    try {
      // Find the review by ID
      const review = await Review.findByPk(id);
  
      if (!review) {
        // If plumber not found, return a 404 error
        return res.status(404).json({ error: "review not found" });
      }
  
      if (!review.media) {
        // If plumber has no image links, return an empty array
        console.log("NO LINKS")
        return res.json([]);
      }
  
      // Split the concatenated image links and send them as an array
      const media = review.media.split(';').filter(Boolean); // Filter to remove empty strings
      res.json(media);
    } catch (error) {
      console.error("Error retrieving image links:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Add a DELETE route to delete a specific image link for a plumber by ID
router.delete("/media/:id", async (req, res) => {
    const { id } = req.params;
    const { media } = req.body; // Assuming the URL to delete is sent in the request body
    try {
      // Find the plumber by ID
      const review = await Review.findByPk(id);
  
      if (!review) {
        // If plumber not found, return a 404 error
        return res.status(404).json({ error: "Plumber not found" });
      }
  
      if (!review.media) {
        // If plumber has no image links, return a 404 error
        return res.status(404).json({ error: "Plumber has no image links" });
      }
  
      // Split the concatenated image links into an array
      const imageLinks = review.media.split(';');
  
      // Find the index of the image link to delete
      const indexToDelete = imageLinks.indexOf(media);
  
      if (indexToDelete === -1) {
        // If the image link to delete is not found, return a 404 error
        return res.status(404).json({ error: "media link not found for this review" });
      }
  
      // Remove the image link from the array
      imageLinks.splice(indexToDelete, 1);
  
      // Join the remaining image links back into a single string
      review.media = imageLinks.join(';');
  
      // Save the updated plumber record
      await review.save();
  
      // Send a success response
      res.json({ message: "Image link deleted successfully" });
    } catch (error) {
      console.error("Error deleting image link:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


// GET route to retrieve all reviews for a specific plumber by plumberId
router.get('/getByPlumber/:plumberId', async (req, res) => {
    const plumberId = req.params.plumberId;
  
    try {
      // Find all reviews with the specified plumberId
      const reviews = await Review.findAll({
        where: { plumberId: plumberId }
      });
  
      // Return the reviews as JSON
      res.json(reviews);
    } catch (error) {
      console.error("Error retrieving reviews:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
