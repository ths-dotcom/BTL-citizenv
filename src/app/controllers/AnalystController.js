require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const City = require('../models/City');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Hamlet = require('../models/Hamlet');
const User = require('../models/User');
const Citizen = require('../models/Citizen');
const sequelize = require('../../config/db/sequelize');

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
    async age(req, res, next) {
        if(!req.user.per_scope) {
            const citizens = await Citizen.findAll({
                where: {
                    is_deleted: false
                }
            });
            let kid = 0, adult = 0, elder = 0;
            let now = new Date();
            for(let i of citizens) {
                let age = now.getFullYear() - i.dataValues.dob.slice(0, 4);
                if(age <= 14) ++kid;
                else if(age <65) ++ adult;
                else ++ elder;
            }
            res.json({
                success: true,
                age: {
                    kid,
                    adult, 
                    elder
                }
            })
        }
        else {
            const citizens = await Citizen.findAll({
                where: {
                    is_deleted: false,
                    hamlet_id: {
                        [Op.startsWith]: req.user.per_scope
                    }
                }
            });
            let kid = 0, adult = 0, elder = 0;
            let now = new Date();
            for(let i of citizens) {
                let age = now.getFullYear() - i.dataValues.dob.slice(0, 4);
                if(age <= 14) ++kid;
                else if(age <65) ++ adult;
                else ++ elder;
            }
            res.json({
                success: true,
                age: {
                    kid,
                    adult, 
                    elder
                }
            })
        }
    }

}

module.exports = new AnalystController;