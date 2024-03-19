const express = require("express");
const router = express.Router();

const Issue = require("./model"); // Import the Issue model
const { Op } = require("sequelize");


/**
 * Get all issue
 */
router.get("/", async (req, res) => {
  Issue.findAll()
    .then((issue_list) => {
      res.status(200).json(issue_list);
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(500);
    });
});

/**
 * Add an issue
 */
router.post("/", async (req, res) => {

  const { customerId, description, title, image_link, category, address, startDate, endDate } = req.body;

  Issue.create({
    customerId,
    description,
    title,
    image_link,
    category,
    address,
    startDate,
    endDate,
  })
    .then((issue) => {
      res.json(issue);
    })
    .catch((err) => {
      res.status(500).json();
      console.error(err.message)
    });
});

//returns any issue in the database that has an overlapping daterange with the input daterange
router.get("/date-range", async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  try {
    const issues = await Issue.findAll({
      where: {
        [Op.or]: [
          { startDate: { [Op.lte]: startDate }, endDate: { [Op.gte]: startDate } },

          { startDate: { [Op.gte]: startDate }, startDate: { [Op.lte]: endDate } },
        ],
      },
    });
    res.json(issues);
  } catch (error) {
    console.error("Error retrieving issues by date range:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Get issue by id
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findByPk(id);
    if (issue) {
      res.json(issue);
    } else {
      res.status(404).json({ error: "Issue not found" });
    }
  } catch (error) {
    console.error("Error retrieving issue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update startDate, endDate, by ID
router.put("/date-range/:id", async (req, res) => {
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
      res.status(404).json({ error: "Issue not found" });
    }
  } catch (error) {
    console.error("Error retrieving issue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update image_link, by ID
router.put("/image/:id", async (req, res) => {
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
      res.status(404).json({ error: "Issue not found" });
    }
  } catch (error) {
    console.error("Error retrieving issue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Delete an issue by Id
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the issue post by ID
    const issue = await Issue.findByPk(id);

    // If issue post doesn't exist, return 404 Not Found
    if (!issue) {
      return res.status(404).json({ error: "Issue post not found" });
    }

    // Delete the issue post
    await issue.destroy();

    // Respond with a success message
    res.json({ message: "Issue post deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
