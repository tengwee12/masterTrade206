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

          User.bulkCreate([
            {
              email: "test@gmail.com",
              username: "Tester",
              password: "12345",
            },
            {
              email: "test2@gmail.com",
              username: "Tester2",
              password: "12345",
            },
            {
              email: "test3@gmail.com",
              username: "Tester3",
              password: "12345",
            },
          ])
            .then(() => {
              console.log("successfully added intial user data");

              Plumber.bulkCreate([
                {
                  email: "chuan@gmail.com",
                  password: "12345",
                  name: "Plumber Chuan",
                  license: true,
                  description:
                    "More than 15 years experience in the industry, Plumber Phua is always committed to being responsible and responsive to all his customers’ issues",
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/mario.png",
                  services:
                    "Sink;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/sink-leak.jpg;$80-100;Water Tap;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/tap-leak.jpg;$90-100;Toilet Bowl;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/toilet-leak.jpg;$60;",
                  averageRating: 4,
                },
                {
                  email: "luigi@gmail.com",
                  password: "12345",
                  name: "Plumber Luigi",
                  description:
                    "With a keen eye for detail and a passion for excellence, Luigi tackles every job with precision and professionalism. From minor repairs to major installations, you can trust Luigi to get the job done efficiently and effectively.",
                  license: false,
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/luigi.jpeg",
                  services:
                    "Sink;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/sink-leak.jpg;$80-100;Water Tap;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/tap-leak.jpg;$90-100;Toilet Bowl;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/toilet-leak.jpg;$60;",
                  averageRating: 3.9,
                },
                {
                  email: "kirby@gmail.com",
                  password: "12345",
                  name: "Plumber Kirby",
                  description:
                    "From routine maintenance to intricate installations, Kirby's precision and skill ensure quality workmanship and lasting results. Count on Plumber Kirby for reliable service, personalized solutions, and a seamless experience from start to finish.",
                  license: true,
                  image:
                    "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/kirby.jpg",
                  services:
                    "Sink;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/sink-leak.jpg;$80-100;Water Tap;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/tap-leak.jpg;$90-100;Toilet Bowl;https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/toilet-leak.jpg;$60;",
                  averageRating: 2,
                },
              ])
                .then(() => {
                  console.log("successfully added intial user(plumber) data");

                  Issue.bulkCreate([
                    {
                      description:
                        "注意到我的马桶管道待续滴水, 尽快需要有经验的水管工！🛠️ ",
                      title: "马桶水管漏水",
                      media:
                        "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/post_img.png",
                      category: "管道",
                      address: "盛港",
                      startDate: "2024-04-10 18:00:00",
                      endDate: "2024-04-10 21:00:00",
                      UserId: 1,
                    },
                    {
                      description:
                        "我家的天花板最近出现了严重的漏水问题，每次下雨都会有水滴从天花板渗出来，严重影响了居住环境和家庭生活。我们急需找一位专业的水管工来解决这个问题。希望能找到有经验、技术过硬的水管工，能够快速准确地定位并修复漏水处。如果您是一位水管工，并且能够及时处理此问题，请随时与我联系。谢谢！",
                      title: "天花板漏水",
                      media:
                        "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/ceilingLeak.jpeg",
                      category: "天花板",
                      address: "宏茂桥",
                      startDate: "2024-04-11 18:00:00",
                      endDate: "2024-04-11 20:00:00",
                      UserId: 1,
                    },
                  ])
                    .then(() => {
                      console.log("successfully added initial posting data");

                      Review.bulkCreate([
                        {
                          customerId: 1, // Example customer ID
                          description: "Phua was extremely professional. He ran tests on all the pipes in my house to identify the root cause of the choke and explained how the piping network runs so that I could get a better understanding. His dedication and sincerely was greatly appreciated. Highly recommend!!!", // Example review description
                          dateTime: "2024-03-04 12:00:00", // Example date and time
                          rating: 5, // Example rating
                          media: "https://mastertrade-bucket1173044-spm.s3.ap-southeast-1.amazonaws.com/public/reviewPhoto.webp", // Example media URLs
                          IssueId: 1, // Example issue ID
                          price: 6.9,
                          PlumberId: 1,
                          UserId: 1,
                        },
                        {
                          customerId: 2,
                          description: "Phua was very responsive and he fixed the following day to visit my home for inspection. He quoted me the pipe replacement charges on instantly get it fixed. I'm very much appreciated, highly recommended on his service and responsiveness.",
                          dateTime: "2024-03-02 12:00:00",
                          rating: 4,
                          media: "",
                          IssueId: 2,
                          price: 70,
                          PlumberId: 1,
                          UserId: 2,
                        },
                        {
                          customerId: 3,
                          description: "Water leakage in bathroom via heater. Plumber is efficient and reliable. Can resolve problems effectively. Thank you",
                          dateTime: "2024-03-01 12:00:00",
                          rating: 4,
                          media: "",
                          IssueId: 2,
                          price: 70,
                          PlumberId: 1,
                          UserId: 3,
                        },
                        {
                          customerId: 1,
                          description:
                            "Quoted an acceptable price but wanted to charge me more afterwards. As he's already held me hostage so had to agreed to him. This happened about a year ago when I had accidentally broken my built-in water supply pipe.",
                          dateTime: "2024-03-07 12:00:00",
                          rating: 3,
                          media: "",
                          IssueId: 2,
                          price: 70,
                          PlumberId: 2,
                          UserId: 1,
                        },
                        {
                          customerId: 2,
                          description:
                            "Doesn't solve the issue, charges me $120,not recommend!",
                          dateTime: "2024-03-07 12:00:00",
                          rating: 2,
                          media: "",
                          IssueId: 2,
                          price: 70,
                          PlumberId: 2,
                          UserId: 2,
                        },
                        {
                          customerId: 3,
                          description:
                            "Didn't really fix my problem correctly. the sink just started to leak again",
                          dateTime: "2024-03-07 12:00:00",
                          rating: 4,
                          media: "",
                          IssueId: 2,
                          price: 70,
                          PlumberId: 2,
                          UserId: 3,
                        },
                      ])
                        .then(() => {
                          Transaction.bulkCreate([
                            {
                              dateTime: new Date(),
                              quotation: 80,
                              PlumberId: 1,
                              IssueId: 1,
                            },
                          ])
                            .then(() => {})
                            .catch((err) => console.log("done!!!!!"));
                        })
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

  Transaction.bulkCreate([
    {
      dateTime: new Date(),
      quotation: 100.0,
      PlumberId: 1, // Assuming PlumberId 1 exists in your database
      IssueId: 2,
    },
    {
      dateTime: new Date(),
      quotation: 120.0,
      PlumberId: 2, // Assuming PlumberId 2 exists in your database
      IssueId: 3,
    },
    {
      dateTime: new Date(),
      quotation: 90.0,
      PlumberId: 3, // Assuming PlumberId 3 exists in your database
      IssueId: 4,
    },
  ])
    .then(() => {
      console.log("Successfully added 3 separate transactions");
    })
    .catch((error) => {
      console.error("Error adding transactions:", error);
    });
};

module.exports = { setUpDB };
