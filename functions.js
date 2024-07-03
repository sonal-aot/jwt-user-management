const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userData = [];
const taskData = [];

const secretkey = "zoro";

const uuidNumber = () => {
  const uuid = uuidv4();
  let uuidNum = (parseInt(uuid.replace(/-/g, ""), 16) % 80000) + 1;
  return crypto.randomInt(uuidNum);
};

const loadPage = (req, res) => {
  res.json({ userData: userData, taskData: taskData });
};

const validateUserExist = (req, res, next) => {
  const { username, email } = req.body;
  const isUser = userData.find((user) => user.username === username);
  const isEmail = userData.find((user) => user.email === email);

  if (isUser || isEmail) {
    res.status(400).send("User already exist");
  } else {
    next();
  }
};

const userRegister = (req, res) => {
  const { username, password, number, email, fullname } = req.body;
  const id = uuidNumber();
  const user = { id, username, password, number, email, fullname };
  userData.push(user);
  res.send(user);
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

const login = (req, res) => {
  const { username, password } = req.body;
  const loginData = { username, password };
  const user = userData.find((u) => u.username === loginData.username);
  const token = jwt.sign({ user }, secretkey);

  console.log("====================================");
  console.log(token);
  console.log("====================================");

  // const userTask = [];

  const filteredTask = taskData.filter((t) => t.id == user.id);

  console.log("filterrrr :", filteredTask);

  // filteredTask.forEach((task) => {
  //   userData.push(task.title);
  // });

  res.json({ message: "Login Success", token: token, taskData: filteredTask });
};

const authentication = (req, res, next) => {
  const authorization = req.headers.authorization;
  const tokenData = jwt.verify(authorization, secretkey);

  if (tokenData) {
    console.log("Authorized");
    req.token = tokenData;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const createTask = (req, res) => {
  const { title } = req.body;
  const taskId = req.token.user.id;
  console.log(taskId);
  const task = { taskId, title };
  taskData.push(task);
  res.json(task);
};

module.exports = {
  loadPage,
  userRegister,
  validateUserExist,
  validateLogin,
  login,
  authentication,
  createTask,
};
