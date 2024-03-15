const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const User = require("../apps/user/model");
const Plumber = require("../apps/plumber/model");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

// module.exports = (passport) => {
//   passport.use(
//     new Strategy(jwtOptions, (jwtPayload, done) => {
//       console.log(jwtPayload);

//       Plumber.findOne({ username: jwtPayload.username })
//         .then((user) => {
//           if (user) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         })
//         .catch((err) => done(err, null));
//     })
//   );
// }

module.exports = (passport) => {
  passport.use(
    new Strategy(jwtOptions, (jwtPayload, done) => {
      console.log(jwtPayload);

      if (jwtPayload.type == "user") {

        User.findOne({ where: { id: jwtPayload.sub } })
          .then((user) => {
            console.log(user);
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch((err) => done(err, null));
      } else if (jwtPayload.type == "plumber") {
        Plumber.findOne({ where: { id: jwtPayload.sub } })
          .then((user) => {
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch((err) => done(err, null));
      } else {
        return done(null, false);
      }
      
    })
  );
};
