const uuidNumber = require("../middlewares/uuidGenerator");

const userData = [];
const taskData = [];
const userRegister = (req, res) => {
  const { username, password, number, email, fullname } = req.body;
  const user = {
    username,
    password,
    number,
    email,
    fullname,
    id: uuidNumber()
    };
    userData.push(user);
    res.status(200).json({ message: "User registered successfully" });
};

module.exports = {
  userRegister,
  userData,
  taskData,
};
