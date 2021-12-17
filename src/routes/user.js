const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const authorization = require('../app/middlewares/authorization');
const signupCheck = require('../app/middlewares/signupCheck');
const UserController = require('../app/controllers/UserController');

router.post('/signup', validator, signupCheck, UserController.signup);
router.get('/infor', authorization, UserController.infor);

module.exports = router;