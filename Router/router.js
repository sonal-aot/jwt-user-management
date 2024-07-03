const express = require('express');
const { userRegister } = require('../helpers/registerUser');
const { generateToken, authentication } = require('../middlewares/jwtFunction');
const { validateUserExist, validateLogin } = require('../middlewares/validateUserExist');
const { createTask, displayTask } = require('../helpers/taskFunction');


const router = express.Router();


router.post('/register', validateUserExist, userRegister)
router.post('/login',validateLogin,generateToken)
router.post('/createtask',authentication,createTask)
router.get('/mytasks',authentication,displayTask)

module.exports = router