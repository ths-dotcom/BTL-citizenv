const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const citizenController = require('../app/controllers/CitizenController');
const check = require('../app/middlewares/check');
const authorization = require('../app/middlewares/authorization');

router.get('/detail/:citizenId', authorization.all, citizenController.detailCitizen);
router.post('/list', authorization.all, citizenController.searchCitizen);
router.get('/list', authorization.all, citizenController.listOfCitizens);
router.put('/:citizenId', validator, authorization.all, 
    check.checkCitizen, citizenController.updateCitizen
);
router.delete('/:citizenId', authorization.all, citizenController.deleteCitizen);
router.post('/', validator, authorization.all, 
    check.checkCitizen, citizenController.addCitizen
);

module.exports = router;