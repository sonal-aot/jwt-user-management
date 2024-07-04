const { userData } = require("../helpers/registerUser");

const validateUserExist = (req, res, next) => {
  const { username } = req.body;
  const isUser = userData.find((user) => user.username === username);

  if (isUser) {
    res.status(400).send("User already exist");
  } else {
    next();
  }
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const loginData = { username, password };
  const isUser = userData.find((user) => user.username === loginData.username);
  const isPassword = userData.find(
    (user) => user.password === loginData.password
  );
  if (isUser && isPassword) {
    next();
  } else {
    res.status(400).json({ message: "Login Failed" });
  }
};

module.exports = { validateUserExist, validateLogin };
