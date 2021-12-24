const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const hamletController = require('../app/controllers/HamletController');
const check = require('../app/middlewares/check');
const authorization = require('../app/middlewares/authorization');

router.put('/:hamletId', validator, authorization.a123b1, hamletController.updateHamlet);

router.delete('/:hamletId', authorization.a123b1, hamletController.deleteHamlet);

router.post('/list', authorization.a123b1, hamletController.searchHamlet);
router.get('/list', authorization.a123b1, hamletController.listOfHamlets);

router.post('/', validator, authorization.a123b1, 
    check.checkPassword, check.checkHamlet,
    hamletController.createHamlet
);

module.exports = router;