const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const analystController = require('../app/controllers/AnalystController');
const check = require('../app/middlewares/check');
const authorization = require('../app/middlewares/authorization');

router.get('/gender', authorization.all, analystController.gender);
router.get('/count', authorization.all, analystController.countAll);

module.exports = router;