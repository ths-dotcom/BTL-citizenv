require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const Ward = require('../models/Ward');
const Hamlet = require('../models/Hamlet');
const User = require('../models/User');

class HamletController {
    // [POST] /api/hamlet
    async createHamlet(req, res, next) {
        const ward = await Ward.findOne({
            where: {
                ward_id: req.user.per_scope 
            }
        })
        console.log('abc');
        Hamlet.create({
            hamlet_id: req.body.data.hamlet_id,
            hamlet_name: req.body.data.hamlet_name,
            ward_id: ward.dataValues.ward_id
        })
            .then(() => res.status(201).json({
                success: true,
                message: 'Tạo thôn thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi tạo thôn')));
    }

    // [GET] api/hamlet/list
    listOfHamlets(req, res, next) {
        if(!req.user.per_scope) {
            Hamlet.findAll({
                where : {
                    is_deleted: false
                }
            })
                .then(hamlets => res.json({
                    success: true,
                    hamlets
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách thôn')))
        }
        else {
            Hamlet.findAll({
                where: {
                    hamlet_id : {
                        [Op.startsWith]: req.user.per_scope
                    },
                    is_deleted: false
                }
            })
                .then(hamlets => res.json({
                    success: true,
                    hamlets
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách thôn')))
        }
    }

    // [POST] /api/search/hamlet
    searchHamlet(req, res, next) {
        if(!req.user.per_scope) {
            Hamlet.findAll({
                where: {
                    hamlet_name : {
                        [Op.substring]: req.body.data.hamlet_name
                    },
                    is_deleted: false
                }
            })
                .then(hamlets => res.json({
                    success: true,
                    hamlets
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách thôn')));
        }
        else {
            Hamlet.findAll({
                where: {
                    hamlet_name : {
                        [Op.substring]: req.body.data.hamlet_name
                    },
                    hamlet_id: {
                        [Op.startsWith] : req.user.per_scope
                    },
                    is_deleted: false
                }
            })
                .then(hamlets => res.json({
                    success: true,
                    hamlets
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách thôn')));
        }     
    }

    //[DELETE] api/hamlet/:hamletId
    deleteHamlet(req, res, next) {
        Hamlet.update({is_deleted: true}, {
            where: {
                hamlet_id : req.params.hamletId 
            }
        })
            .then(() => {
                User.update({is_deleted: true}, {
                    where: {
                        per_scope: {
                            [Op.startsWith]: req.params.hamletId
                        }
                    }
                })
                    .then(() => res.json({
                        success: true,
                        message: "Xóa thôn thành công"
                    }))
                    .catch(err => next(createHttpError(500, err)));
                
            })
            .catch(err => next(createHttpError(500, err)));
    }

    // [PUT] /api/hamlet/:hamletId
    updateHamlet(req, res, next) {
        Hamlet.update({hamlet_name: req.body.data.hamlet_name}, {
            where: {
                hamlet_id: req.params.hamletId
            }
        })
            .then(() => res.json({
                success: true,
                message: 'Cập nhật thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }
}

module.exports = new HamletController;