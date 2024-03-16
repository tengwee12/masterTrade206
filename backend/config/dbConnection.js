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
      User.hasMany(Issue);

      Issue.belongsTo(Plumber);
      Issue.hasOne(Review);
      

      Plumber.hasMany(Review);

      Review.belongsTo(Issue);
      Review.belongsTo(User);
      Review.belongsTo(Plumber);

      db.sync({
        force: drop,
      })
        .then(() => {
          console.log("created initial tables");
          // load initial data

          User.create({
            email: "test@gmail.com",
            password: "12345",
          })
            .then(() => {
              console.log("successfully added intial user data");

              Plumber.bulkCreate([
                {
                  email: "plumberChuan@gmail.com",
                  password: "12345",
                  name: "Plumber Chuan",
                  license: true,
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/mario.png",
                    services: "Sink Choke or Leak; Toilet Bowl Choke or Leak; Water Tap Leak; Water Heater Installation;",
                  averageRating: 4,
                },
                {
                  email: "plumberPhua@gmail.com",
                  password: "12345",
                  name: "Plumber Phua",
                  license: false,
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/luigi.jpeg",
                  averageRating: 3.9,
                },
                {
                  email: "kirby@gmail.com",
                  password: "12345",
                  name: "Plumber Kirby",
                  license: true,
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/kirby.jpg",
                  averageRating: 2,
                },
              ])
                .then(() => {
                  console.log("successfully added intial user(plumber) data");

                  Issue.bulkCreate([
                    {
                      description: "test description",
                      title: "test title",
                      media: "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/post_img.png",
                      category: "test category",
                      address: "test address",
                      startDate: Date.now(),
                      endDate: Date.now(),
                      UserId: 1,
                      PlumberId: 1,
                    },
                    {
                      description: "test description",
                      title: "test title",
                      imageLink: "test image link",
                      category: "test categry",
                      address: "test address",
                      startDate: Date.now(),
                      endDate: Date.now(),
                      UserId: 1,
                      PlumberId: 1,
                    },
                  ])
                    .then(() => {
                      console.log("successfully added intial posting data");

                      Review.create({
                        customerId: 1, // Example customer ID
                        description: "Great service!", // Example review description
                        dateTime: "2024-03-04 12:00:00", // Example date and time
                        rating: 5, // Example rating
                        media: "image1.com", // Example media URLs
                        IssueId: 1, // Example issue ID
                        price: 6.9,
                      })
                        .then(() => console.log("Review created successfully"))
                        .catch((err) =>
                          console.error("Error creating review:", err)
                        );
                    })
                    .then(() => console.log("Review created successfully"))
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
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
