const db = require("./db");

const Issue = require("../apps/issue/model");
const Review = require("../apps/review/model");
const User = require("../apps/user/model");
const Plumber = require("../apps/plumber/model");
const Transaction = require("../apps/transaction/model");


const setUpDB = (drop) => {
  db.authenticate()
    .then(() => {
      console.log("database connected");
    })
    .then(() => {
      User.hasMany(Issue);

      //sus??
      Issue.belongsTo(Plumber);
      Issue.hasOne(Review);
      Issue.hasOne(Transaction);

      Plumber.hasMany(Review);

      Review.belongsTo(Issue);
      Review.belongsTo(User);
      Review.belongsTo(Plumber);

      Transaction.belongsTo(Issue);

      db.sync({
        force: drop,
      })
        .then(() => {
          console.log("created initial tables");
          // load initial data

          User.create({
            email: "test@gmail.com",
            username: "Tester",
            password: "12345",
          })
            .then(() => {
              console.log("successfully added intial user data");

              Plumber.bulkCreate([
                {
                  email: "chuan@gmail.com",
                  password: "12345",
                  name: "Plumber Chuan",
                  license: true,
                  description: "More than 15 years experience in the industry, Plumber Phua is always committed to being responsible and responsive to all his customers’ issues",
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/mario.png",
                    services: "Sink;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/sink-leak.jpg;$80-100;Water Tap;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/tap-leak.jpg;$90-100;Toilet Bowl;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/toilet-leak.jpg;$60;",
                  averageRating: 4,
                },
                {
                  email: "luigi@gmail.com",
                  password: "12345",
                  name: "Plumber Luigi",
                  description: "With a keen eye for detail and a passion for excellence, Luigi tackles every job with precision and professionalism. From minor repairs to major installations, you can trust Luigi to get the job done efficiently and effectively.",
                  license: false,
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/luigi.jpeg",
                    services: "Sink;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/sink-leak.jpg;$80-100;Water Tap;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/tap-leak.jpg;$90-100;Toilet Bowl;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/toilet-leak.jpg;$60;",
                  averageRating: 3.9,
                },
                {
                  email: "kirby@gmail.com",
                  password: "12345",
                  name: "Plumber Kirby",
                  description: "From routine maintenance to intricate installations, Kirby's precision and skill ensure quality workmanship and lasting results. Count on Plumber Kirby for reliable service, personalized solutions, and a seamless experience from start to finish.",
                  license: true,
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/kirby.jpg",
                    services: "Sink;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/sink-leak.jpg;$80-100;Water Tap;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/tap-leak.jpg;$90-100;Toilet Bowl;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/toilet-leak.jpg;$60;",
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
                        PlumberId: 1,
                        UserId: 1
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
