const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const wardController = require('../app/controllers/WardController');
const check = require('../app/middlewares/check');
const authorization = require('../app/middlewares/authorization');

router.put('/:wardId', validator, authorization.a123, wardController.updateWard);

router.delete('/:wardId', authorization.a123, wardController.deleteWard);

router.post('/list', authorization.a123, wardController.searchWard);
router.get('/list', authorization.a123, wardController.listOfWards);

router.post('/', validator, authorization.a123, 
    check.checkPassword, check.checkWard,
    wardController.createWard
);

module.exports = router;