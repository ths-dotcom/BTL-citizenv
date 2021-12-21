const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const districtController = require('../app/controllers/DistrictController');
const check = require('../app/middlewares/check');
const authorization = require('../app/middlewares/authorization');

router.put('/:districtId', validator, authorization.a12, districtController.updateDistrict);

// router.delete('/:districtId', authorization.a12, districtController.deletedistrict);

// router.post('/list', authorization.a12, districtController.listOfCities);
router.get('/list', authorization.a12, districtController.listOfDistricts);

router.post('/', validator, authorization.a12, 
    check.checkPassword, check.checkDistrict,
    districtController.createDistrict
);

module.exports = router;