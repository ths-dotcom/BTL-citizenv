const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const citizenController = require('../app/controllers/CitizenController');
const check = require('../app/middlewares/check');
const authorization = require('../app/middlewares/authorization');


module.exports = router;