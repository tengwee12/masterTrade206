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
    token: signedToken,
    expires: expiresIn,
  };
}

module.exports.issueJWT = issueJWT;

//verification for JWT
function verifyJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Please log in first!' });
  }

  try {
    const decoded = jwt.verify(token, "secret"); 
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports.verifyJWT = verifyJWT;