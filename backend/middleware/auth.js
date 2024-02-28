const jwt = require("jsonwebtoken");

function issueJWT(user) {
  const email = user.email;

  const expiresIn = "1d";

  const payload = {
    sub: email,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, "secret", {
    expiresIn: expiresIn
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports.issueJWT = issueJWT;