const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const cityController = require('../app/controllers/CityController');
const check = require('../app/middlewares/check');
const authorization = require('../app/middlewares/authorization');

router.post('/create', validator, authorization, 
    check.checkPassword, check.checkCity,
    cityController.createCity
);

module.exports = router;