const jwt = require("jsonwebtoken");
const { userData } = require("../helpers/registerUser");
const secretkey = "zoro";

const generateToken = (req, res, next) => {
  const { username } = req.body;
  const user = userData.find((u) => u.username === username);
  const token = jwt.sign({ username: user.username, id: user.id }, secretkey);
  res.json({ token: token });
  next();
};

const authentication = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tokenData = jwt.verify(authorization, secretkey);
    req.token = tokenData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authentication, generateToken };
