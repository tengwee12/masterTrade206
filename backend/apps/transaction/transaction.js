const express = require('express');
const router = express.Router();
const Issue = require("../issue/model");
const Plumber = require("../plumber/model");
const User = require("../user/model");

const Transaction = require("./model");

router.get('/', async (req, res) => {  //REST API endpoint to get all the Transactions entries
    try {
        const transaction = await Transaction.findAll();  //integrated sequelize function, no need to add own boilerplate
        console.log("stuff has been fetched\n");
        res.json(transaction);
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
        // Extract data from the request body
        const { dateTime, quotation, PlumberId, IssueId } = req.body;

        //check if transaction for this issue already exists
        await Transaction.findOne({
          where: {
            IssueId: IssueId
          }
        }).then((tran) => {
            if (tran) {
                return res
                .status(400)
                .json({ success: false, msg: "issue alr has a transaction" });
            } else {
                // Create a new record in the database
                Transaction.create({
                    dateTime,
                    quotation,
                    PlumberId,
                    IssueId
                }).then((newTran) => {
                    res.status(201).json(newTran);
                  }).catch((err) => {
                    console.log(err)
                    res.status(500).end();
                  });
            }

        })
});

// Modified endpoint to fetch transactions by PlumberId
router.get('/checkExists/:PlumberId', async (req, res) => {
  try {
    const { PlumberId } = req.params; // Extract PlumberId from request parameters
    const transactions = await Transaction.findAll({ where: { PlumberId } });

    if (transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found for the given PlumberId' });
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
