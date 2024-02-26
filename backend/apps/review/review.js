const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const {sequelize, connectToDB} = require('./db');
const {syncModels} = require('./models')
const { Reviews } = require('./models'); // Import the Reviews model
const bodyParser = require('body-parser'); //imports the middleware to access REST requests

app.get('/', (req, res) => {
    res.send('reviews backend is running!');
});


app.listen(PORT, async ()=> {
    console.log(`Server is running on port ${PORT}`);
    await connectToDB();
    await syncModels();
});

// Create a route to test the connection
app.get('/', (req, res) => {
  res.send('MySQL connection established!');
});

app.use(bodyParser.json()); //basically allows middleware to access and parse REST requests

app.get('/reviews', async (req, res) => {  //REST API endpoint to get all the rows in Reviews
    try {
        const reviews = await Reviews.findAll();  //integrated sequelize function, no need to add own boilerplate
        console.log("stuff has been fetched\n");
        res.json(reviews);
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/reviews', async (req, res) => {
    try {
        // Extract data from the request body
        const { customerId, plumberId, description, dateTime, rating } = req.body;

        // Create a new review record in the database
        const newReview = await Reviews.create({
            customerId,
            plumberId,
            description,
            dateTime,
            rating
        });

        // Respond with the newly created review
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding new review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve review by ID
app.get('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Reviews.findByPk(id);
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

