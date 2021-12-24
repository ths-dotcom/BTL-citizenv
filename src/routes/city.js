const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const cityController = require('../app/controllers/CityController');
const check = require('../app/middlewares/check');
const authorization = require('../app/middlewares/authorization');

router.put('/:cityId', validator, authorization.a1, cityController.updateCity);

router.delete('/:cityId', authorization.a1, cityController.deleteCity);

router.post('/list', authorization.a1, cityController.searchCities);
router.get('/list', authorization.a1, cityController.listOfCities);

router.post('/', validator, authorization.a1, 
    check.checkCity,
    cityController.createCity
);

module.exports = router;