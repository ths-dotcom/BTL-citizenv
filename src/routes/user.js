const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const authorization = require('../app/middlewares/authorization');
const check = require('../app/middlewares/check');
const UserController = require('../app/controllers/UserController');

router.post('/set-date-range/:userId', authorization.all, UserController.setDateRange);
router.patch('/done/:hamletId', authorization.all, UserController.done);
router.get('/hamlet/list', authorization.a123b1, UserController.userHamlet);
router.get('/ward/list', authorization.a123, UserController.userWard);
router.get('/district/list', authorization.a12, UserController.userDistrict);
router.get('/city/list', authorization.a1, UserController.userCity);

router.patch('/declare-permission/:userId', authorization.a123b1,
    UserController.declarePermission
);
router.post('/signup', validator, authorization.a123b1,
    check.checkSignup, UserController.signup
);
router.get('/info', authorization.all, UserController.info);

module.exports = router;