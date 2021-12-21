require('dotenv').config();
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const { Op } = require("sequelize");
const User = require('../models/User');

class UserController {

    // [POST] /api/user/signup
    signup(req, res, next) {
        const hash = bcrypt.hashSync(req.body.data.password, SALT_ROUNDS);
        req.body.data.password = hash;
        User.create({
            username: req.body.data.username,
            password: req.body.data.password,
            name: req.body.data.username.slice(0, 2),
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
    info(req, res, next) {
        res.json({
            success: true,
            user: req.user
        })
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