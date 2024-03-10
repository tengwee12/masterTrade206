const db = require("./db");

const Issue = require("../apps/issue/model");
const Review = require("../apps/review/model");
const User = require("../apps/user/model");
const Plumber = require("../apps/plumber/model");

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
            .then(() => console.log("successfully added intial posting data"))
            .catch((err) => console.log(err));
          
            User.create({
              email: "test@gmail.com",
              password: "12345"
            })
            .then(() => console.log("successfully added intial user data"))
            .catch((err) => console.log(err));

            Plumber.create({
              email: "plumberChuan@gmail.com",
              password: "12345"
            })
            .then(() => console.log("successfully added intial user(plumber) data"))
            .catch((err) => console.log(err));
            
            Review.create({
              customerId: 1, // Example customer ID
              plumberId: 1, // Example plumber ID
              description: "Great service!", // Example review description
              dateTime: "2024-03-04 12:00:00", // Example date and time
              rating: 5, // Example rating
              media: "image1.com" // Example media URLs
            })
              .then(() => console.log("Review created successfully"))
              .catch((err) => console.error("Error creating review:", err));
            
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
