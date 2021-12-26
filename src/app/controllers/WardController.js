require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const District = require('../models/District');
const Ward = require('../models/Ward');
const User = require('../models/User');

class WardController {
    // [POST] /api/ward
    async createWard(req, res, next) {
        const district = await District.findOne({
            where: {
                district_id: req.user.per_scope 
            }
        })
        Ward.create({
            ward_id: req.body.data.ward_id,
            ward_name: req.body.data.ward_name,
            district_id: district.dataValues.district_id
        })
            .then(() => res.status(201).json({
                success: true,
                message: 'Tạo xã thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi tạo xã')));
    }

    // [GET] api/ward/list
    listOfWards(req, res, next) {
        if(!req.user.per_scope) {
            Ward.findAll({
                where: {
                    is_deleted: false
                }
            })
                .then(wards => res.json({
                    success: true,
                    wards
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách xã')))
        }
        else {
            Ward.findAll({
                where: {
                    ward_id : {
                        [Op.startsWith]: req.user.per_scope
                    },
                    is_deleted: false
                }
            })
                .then(wards => res.json({
                    success: true,
                    wards
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách xã')))
        }
    }

    // [POST] /api/search/district
    searchWard(req, res, next) {
        if(!req.user.per_scope) {
            Ward.findAll({
                where: {
                    ward_name : {
                        [Op.substring]: req.body.data.ward_name
                    },
                    is_deleted: false
                }
            })
                .then(wards => res.json({
                    success: true,
                    wards
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách xã')));
        }
        else {
            Ward.findAll({
                where: {
                    ward_name : {
                        [Op.substring]: req.body.data.ward_name
                    },
                    ward_id: {
                        [Op.startsWith] : req.user.per_scope
                    },
                    is_deleted: false
                }
            })
                .then(wards => res.json({
                    success: true,
                    wards
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách xã')));
        }
             
    }

    //[DELETE] api/ward/:wardId
    deleteWard(req, res, next) {
        Ward.update({is_deleted: true}, {
            where: {
               ward_id : req.params.wardId 
            }
        })
            .then(() => {
                User.update({is_deleted: true}, {
                    where: {
                        per_scope: {
                            [Op.startsWith]: req.params.wardId
                        }
                    }
                })
                    .then(() => res.json({
                        success: true,
                        message: "Xóa xã thành công"
                    }))
                    .catch(err => next(createHttpError(500, err)));
                
            })
            .catch(err => next(createHttpError(500, err)));
    }

    // [PUT] /api/ward/:wardId
    updateWard(req, res, next) {
        Ward.update({ward_name: req.body.data.ward_name}, {
            where: {
                ward_id: req.params.wardId
            }
        })
            .then(() => {
                User.update({name: "A3 " + req.body.data.ward_name + " - " + req.params.wardId}, {
                    where: {
                        per_scope: req.params.wardId
                    }
                })
                    .then(() => res.json({
                        success: true,
                        message: 'Cập nhật thành công'
                    }))
                    .catch(err => next(createHttpError(500, err)));
            })
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }

    // [GET] /api/ward/progress
    progress(req, res, next) {
        User.findAll({
            where: {
                per_scope: {
                    [Op.startsWith] : req.user.per_scope
                },
                role_id: 4
            }
        })
            .then(users => {
                let count = 0;
                for(let i of users) {
                    if(i.dataValues.is_done) ++count;
                }
                res.json({
                    success: true,
                    progress: {
                        finish: count,
                        all: users.length
                    }
                })
            })
            .catch(err => next(createHttpError(500, err)))
    }
}

module.exports = new WardController;