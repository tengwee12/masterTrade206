const jwt = require("jsonwebtoken");


function issueJWT(user, userType) {
  const id = user.id;

  const expiresIn = "1d";

  const payload = {
    sub: id,
    iat: Date.now(),
    type: userType
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
    console.log("AAAAAAAAAAAAA");
    console.log(req.user);
    console.log(req.user.sub);
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports.verifyJWT = verifyJWT;