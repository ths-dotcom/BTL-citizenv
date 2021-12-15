const express = require('express');
const router = express.Router();
const validator = require('../app/middlewares/validator');
const LoginController = require('../app/controllers/LoginController');

router.post('/', LoginController.login);

module.exports = router;