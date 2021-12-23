require('dotenv').config();
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const { Op } = require("sequelize");
const User = require('../models/User');
const City = require('../models/City');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Hamlet = require('../models/Hamlet');

class UserController {

    // [POST] /api/user/signup
    signup(req, res, next) {
        const hash = bcrypt.hashSync(req.body.data.password, SALT_ROUNDS);
        req.body.data.password = hash;
        User.create({
            username: req.body.data.username,
            password: req.body.data.password,
            name: req.body.data.name,
            per_scope: req.body.data.username.slice(5),
            role_id: req.user.role_id + 1
        })
            .then(() => res.status(201).json({
                success: true,
                message: 'Tạo tài khoản thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi tạo tài khoản')));
    }

    // [GET] /api/user/info
    async info(req, res, next) {
        //
        if(req.user.role_id == 1) {
            console.log('cán bộ a1');
        }
        else if(req.user.role_id == 2) {
            const city = await City.findOne({
                where: {
                    city_id: req.user.per_scope
                }
            })
            req.user.addresss = city.dataValues.city_name;
            res.json({
                success: true,
                user: req.user
            })
        }
        else if(req.user.role_id == 3) {
            let address = [];
            const district = await District.findOne({
                where: {district_id: req.user.per_scope}
            })
            address.push(district.dataValues.district_name);
            const city = await City.findOne({
                where : {city_id: district.dataValues.city_id}
            })
            address.push(city.dataValues.city_name);
            req.user.address = address.join(" - ");
            res.json({
                success: true,
                user: req.user
            })
        }
        else if(req.user.role_id == 4) {
            let address = [];
            const ward = await Ward.findOne({
                where: {ward_id: req.user.per_scope}
            })
            address.push(ward.dataValues.ward_name);
            const district = await District.findOne({
                where: {district_id: ward.dataValues.district_id}
            })
            address.push(district.dataValues.district_name);
            const city = await City.findOne({
                where : {city_id: district.dataValues.city_id}
            })
            address.push(city.dataValues.city_name);
            req.user.address = address.join(" - ");
            res.json({
                success: true,
                user: req.user
            })
        }
        else if(req.user.role_id == 5) {
            let address = [];
            const hamlet = await Hamlet.findOne({
                where: {hamlet_id: req.user.per_scope}
            })
            address.push(hamlet.dataValues.hamlet_name);
            const ward = await Ward.findOne({
                where: {ward_id: hamlet.dataValues.ward_id}
            })
            address.push(ward.dataValues.ward_name);
            const district = await District.findOne({
                where: {district_id: ward.dataValues.district_id}
            })
            address.push(district.dataValues.district_name);
            const city = await City.findOne({
                where : {city_id: district.dataValues.city_id}
            })
            address.push(city.dataValues.city_name);
            req.user.address = address.join(" - ");
            res.json({
                success: true,
                user: req.user
            })
        }
    } 

    // [PATCH] api/user/declare-permission/:userId
    declarePermission(req, res, next) {
        User.findOne({
            where: {
                id: req.params.userId
            }
        })
            .then((user) => {
                if(user.declare_per) {
                    User.update({declare_per: false},{
                        where: {
                            per_scope: {
                                [Op.startsWith]: user.dataValues.per_scope
                            }
                        }
                    })
                        .then(() => res.json({
                            success: true,
                            message: 'Đã khóa quyền khai báo'
                        }))
                        .catch(err => next(createHttpError(500), 'lỗi hệ thống'))
                }
                else {
                    User.update({declare_per: true},{
                        where: {
                            per_scope: {
                                [Op.startsWith]: user.dataValues.per_scope
                            }
                        }
                    })
                        .then(() => res.json({
                            success: true,
                            message: 'Đã cấp quyền khai báo'
                        }))
                        .catch(err => next(createHttpError(500), 'lỗi hệ thống'))
                }
            })
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }

    // [GET] /api/user/city/list
    userCity(req, res, next) {
        User.findAll({
            where : {
                role_id : 2
            }
        })
            .then(users => {
                res.json({
                    success: true,
                    users
                })
            })
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')))
    }

    // [GET] /api/user/district/list
    userDistrict(req, res, next) {
        
    }
}

module.exports = new UserController;