const express = require("express");
const {
  loadPage,
  userRegister,
  validateUserExist,
  validateLogin,
  login,
  authentication,
  createTask,
} = require("./functions");
const router = express.Router();

router.get("/", loadPage);
router.post("/register", validateUserExist, userRegister);
router.post("/login", validateLogin, login);
router.post("/mytasks", authentication, createTask);

module.exports = router;
