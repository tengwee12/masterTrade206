const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //imports the middleware to access REST requests
const PORT = process.env.PORT || 3001;
const { sequelize, connectToDB } = require('./db');
const { syncModels } = require('./models')
const { Issue } = require('./models'); // Import the Issue model
const { Op } = require('sequelize');

app.get('/', (req, res) => {
    res.send('post backend is running!');
});


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDB();
    await syncModels();
});

const router = express.Router();

// Create a route to test the connection
app.get('/', (req, res) => {
    res.send('MySQL connection established!');
});

app.use(bodyParser.json()); //basically allows middleware to access and parse REST requests

app.get('/issues', async (req, res) => {  //REST API endpoint to get all the rows in issuePosts
    try {
        const issues = await Issue.findAll();  //integrated sequelize function, no need to add own boilerplate
        console.log("stuff has been fetched\n");
        res.json(issues);
    } catch (error) {
        console.error('Error retrieving issues:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/issues', async (req, res) => {  //REST API endpoint to update table to add new entry (issue)
    try {
        // Extract data from the request body
        const { customerId, description, title, image_link, category, address, startDate, endDate } = req.body;

        // Create a new issue record in the database
        const newIssue = await Issue.create({
            customerId,
            description,
            title,
            image_link,
            category,
            address,
            startDate,
            endDate
        });

        // Respond with the newly created issue
        res.status(201).json(newIssue);
    } catch (error) {
        console.error('Error adding new issue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//returns any issue in the database that has an overlapping daterange with the input daterange
app.get('/issues/date-range', async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  try {
        const issues = await Issue.findAll({
            where: {
              [Op.or]: [
                { startDate: { [Op.lte]: startDate },
                endDate: { [Op.gte]: startDate } }, 

                {startDate: { [Op.gte]: startDate},
                startDate: { [Op.lte]: endDate} }
              ]
            }
        });
        res.json(issues)
    } catch (error) {
        console.error('Error retrieving issues by date range:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Retrieve Issue by ID
app.get('/issues/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findByPk(id);
        if (issue) {
            res.json(issue);
        } else {
            res.status(404).json({ error: 'Issue not found' });
        }
    } catch (error) {
        console.error('Error retrieving issue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update startDate, endDate, by ID
app.put('/issues/date-range/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const { startDate, endDate } = req.body;
      const issue = await Issue.findByPk(id);
      if (issue) {
          //update begins here
          issue.startDate = startDate;
          issue.endDate = endDate;
          await issue.save();
          res.json(issue);
      } else {
          res.status(404).json({ error: 'Issue not found' });
      }
    } catch (error) {
        console.error('Error retrieving issue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update image_link, by ID
app.put('/issues/image/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const { image_link } = req.body;
      const issue = await Issue.findByPk(id);
      if (issue) {
          //update begins here
          issue.image_link = image_link;
          await issue.save();
          res.json(issue);
      } else {
          res.status(404).json({ error: 'Issue not found' });
      }
    } catch (error) {
        console.error('Error retrieving issue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/issues/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the issue post by ID
        const issue = await Issue.findByPk(id);

        // If issue post doesn't exist, return 404 Not Found
        if (!issue) {
            return res.status(404).json({ error: 'Issue post not found' });
        }

        // Delete the issue post
        await issue.destroy();

        // Respond with a success message
        res.json({ message: 'Issue post deleted successfully' });
    } catch (error) {
        console.error('Error deleting issue post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});










