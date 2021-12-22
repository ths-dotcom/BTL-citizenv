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
            Ward.findAll()
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
                    }
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
                    }
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
                    }
                }
            })
                .then(wards => res.json({
                    success: true,
                    wards
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách xã')));
        }
             
    }

    //[DELETE] api/district/:districtId
    // chưa làm

    // [PUT] /api/ward/:wardId
    updateWard(req, res, next) {
        Ward.update({ward_name: req.body.data.ward_name}, {
            where: {
                ward_id: req.params.wardId
            }
        })
            .then(() => res.json({
                success: true,
                message: 'Cập nhật thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }
}

module.exports = new WardController;