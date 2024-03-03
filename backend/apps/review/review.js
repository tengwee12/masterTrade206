const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/auth")

const Review = require("./model");

router.get('/', async (req, res) => {  //REST API endpoint to get all the rows in Reviews
    try {
        const reviews = await Reviews.findAll();  //integrated sequelize function, no need to add own boilerplate
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
        const { customerId, plumberId, description, dateTime, rating, media } = req.body;

        // Create a new review record in the database
        const newReview = await Review.create({
            customerId,
            plumberId,
            description,
            dateTime,
            rating,
            media
        });

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

module.exports = router;
