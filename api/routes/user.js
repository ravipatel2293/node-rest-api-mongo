const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const userController = require("../controllers/user")

router.post('/login', userController.userLogin)

router.post('/signup', userController.userSignup)

module.exports = router