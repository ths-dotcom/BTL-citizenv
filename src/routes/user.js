const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const authorization = require('../app/middlewares/authorization');
const check = require('../app/middlewares/check');
const UserController = require('../app/controllers/UserController');

router.post('/signup', validator, authorization, check.checkSignup, UserController.signup);
router.get('/infor', authorization, UserController.infor);

module.exports = router;