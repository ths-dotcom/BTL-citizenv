require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const City = require('../models/City');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Hamlet = require('../models/Hamlet');
const User = require('../models/User');
const Citizen = require('../models/Citizen');

class AnalystController {

    // [GET] /api/analyst/count
    async countAll(req, res, next) {
        if(!req.user.per_scope) {
            const citizens = await Citizen.findAll({
                where: {
                    is_deleted: false
                }
            });
            res.json({
                success: true,
                count: citizens.length
            })
        }
        else {
            const citizens = await Citizen.findAll({
                where: {
                    hamlet_id: {
                        [Op.startsWith]: req.user.per_scope
                    },
                    is_deleted: false
                }
            });
            res.json({
                success: true,
                count: citizens.length
            })
        }
    }
    
    // [GET] /api/analyst/gender
    async gender(req, res, next) {
        if(!req.user.per_scope) {
            const nam = await Citizen.findAll({
                where: {
                    is_deleted: false,
                    gender : 'nam'
                }
            });
            const nu = await Citizen.findAll({
                where: {
                    is_deleted: false,
                    gender : 'nữ'
                }
            })
            res.json({
                success: true,
                gender: {
                    nam: nam.length,
                    nu: nu.length
                }
            })
        }
        else {
            const nam = await Citizen.findAll({
                where: {
                    is_deleted: false,
                    gender : 'nam',
                    hamlet_id: {
                        [Op.startsWith]: req.user.per_scope
                    }
                }
            });
            const nu = await Citizen.findAll({
                where: {
                    is_deleted: false,
                    gender : 'nữ',
                    hamlet_id: {
                        [Op.startsWith]: req.user.per_scope
                    }
                }
            })
            res.json({
                success: true,
                gender: {
                    nam: nam.length,
                    nu: nu.length,
                }
            })
        }
    }

    // [GET] /api/analist/age
    age(req, res, next) {
        
    }

}

module.exports = new AnalystController;