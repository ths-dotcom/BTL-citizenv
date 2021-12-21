const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const authorization = require('../app/middlewares/authorization');
const check = require('../app/middlewares/check');
const UserController = require('../app/controllers/UserController');

router.get('/city/list', authorization.a1, UserController.userCity);

router.patch('/declare-permission/:userId', authorization.a123b1, 
    UserController.declarePermission
);
router.post('/signup', validator, authorization.a123b1, 
    check.checkSignup, UserController.signup
);
router.get('/info', authorization.all, UserController.info);

module.exports = router;