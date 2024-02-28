const db = require("./db");

const Issue = require("../apps/issue/model");
const Review = require("../apps/review/model");
const User = require("../apps/user/model");

const setUpDB = (drop) => {
  db.authenticate()
    .then(() => {
      console.log("database connected");
    })
    .then(() => {
      db.sync({
        force: drop,
      })
        .then(() => {
          console.log("created initial tables");
          // load initial data
          Issue
            .bulkCreate([
              {
                customerId: "1",
                description: "test description",
                tititletle: "test title",
                imageLink: "test image link",
                category: "test categry",
                address: "test address",
                startDate: Date.now(),
                endDate: Date.now(),
              },
              {
                customerId: "2",
                description: "test description",
                title: "test title",
                imageLink: "test image link",
                category: "test categry",
                address: "test address",
                startDate: Date.now(),
                endDate: Date.now(),
              }
            ])
            .then(() => console.log("successfully added intial data"))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { setUpDB };
