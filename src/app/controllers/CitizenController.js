require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const City = require('../models/City');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Hamlet = require('../models/Hamlet');
const User = require('../models/User');

class CitizenController {
    // [POST] /api/citizen/
    addCitizen(req, res, next) {
        
    }
}

module.exports = new CitizenController;