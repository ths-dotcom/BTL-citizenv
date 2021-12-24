require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const District = require('../models/District');
const City = require('../models/City');
const User = require('../models/User');

class CityController {
    // [POST] /api/district
    async createDistrict(req, res, next) {
        // console.log(req.user);
        const city = await City.findOne({
            where: {
                city_id: req.user.per_scope 
            }
        })
        console.log(city.dataValues);
        District.create({
            district_id: req.body.data.district_id,
            district_name: req.body.data.district_name,
            city_id: city.dataValues.city_id
        })
            .then(() => res.status(201).json({
                success: true,
                message: 'Tạo huyện thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi tạo huyện')));
    }

    // [GET] api/district/list
    listOfDistricts(req, res, next) {
        if(!req.user.per_scope) {
            District.findAll({
                where: {
                    is_deleted: false
                }
            })
                .then(districts => res.json({
                    success: true,
                    districts
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách huyện')))
        }
        else {
            District.findAll({
                where: {
                    district_id : {
                        [Op.startsWith]: req.user.per_scope
                    },
                    is_deleted: false
                }
            })
                .then(districts => res.json({
                    success: true,
                    districts
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách huyện')))
        }
    }

    // [POST] /api/search/district
    searchDistrict(req, res, next) {
        if(!req.user.per_scope) {
            District.findAll({
                where: {
                    district_name : {
                        [Op.substring]: req.body.data.district_name
                    },
                    is_deleted: false
                }
            })
                .then(districts => res.json({
                    success: true,
                    districts
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách huyện')));
        }
        else {
            District.findAll({
                where: {
                    district_name : {
                        [Op.substring]: req.body.data.district_name
                    },
                    district_id: {
                        [Op.startsWith] : req.user.per_scope
                    },
                    is_deleted: false
                }
            })
                .then(districts => res.json({
                    success: true,
                    districts
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách huyện')));
        }
             
    }

    //[DELETE] api/district/:districtId
    deleteDistrict(req, res, next) {
        District.update({is_deleted: true}, {
            where: {
               district_id : req.params.districtId 
            }
        })
            .then(() => {
                User.update({is_deleted: true}, {
                    where: {
                        per_scope: {
                            [Op.startsWith]: req.params.districtId
                        }
                    }
                })
                    .then(() => res.json({
                        success: true,
                        message: "Xóa huyện thành công"
                    }))
                    .catch(err => next(createHttpError(500, err)));
                
            })
            .catch(err => next(createHttpError(500, err)));
    }

    // [PUT] /api/district/:districtId
    updateDistrict(req, res, next) {
        District.update({district_name: req.body.data.district_name}, {
            where: {
                district_id: req.params.districtId
            }
        })
            .then(() => res.json({
                success: true,
                message: 'Cập nhật thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }


}

module.exports = new CityController;