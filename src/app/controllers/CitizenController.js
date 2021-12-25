require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const City = require('../models/City');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Hamlet = require('../models/Hamlet');
const User = require('../models/User');
const Citizen = require('../models/Citizen');

class CitizenController {
    // [POST] /api/citizen/
    addCitizen(req, res, next) {
        req.body.data.permanent_address = req.user.per_scope;
        req.body.data.home_address = req.user.per_scope;
        req.body.data.temporary_address = req.user.per_scope;
        req.body.data.hamlet_id = req.user.per_scope;
        Citizen.create(req.body.data)
            .then(() => res.json({
                success: true,
                message: "Đã thêm dân cư"
            }))
            .catch(err => next(createHttpError(500, err)));
    }

    // [PUT] /api/citizen/:citizenId
    updateCitizen(req, res, next) {
        req.body.data.permanent_address = req.user.per_scope;
        req.body.data.home_address = req.user.per_scope;
        req.body.data.temporary_address = req.user.per_scope;
        req.body.data.hamlet_id = req.user.per_scope;
        Citizen.update(req.body.data, {
            where: {
                citizen_id: req.params.citizenId
            }
        })
            .then(() => res.json({
                success: true,
                message: "Đã cập nhật thông tin dân cư"
            }))
            .catch(err => next(createHttpError(500, err)));
    }

    // [GET] /api/citizen/list
    listOfCitizens(req, res, next) {
        if(!req.user.per_scope) {
            Citizen.findAll({
                where: {
                    is_deleted: false
                }
            })
                .then(citizens => res.json({
                    success: true,
                    citizens
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách dân cư')))
        }
        else {
            Citizen.findAll({
                where: {
                    hamlet_id : {
                        [Op.startsWith]: req.user.per_scope
                    },
                    is_deleted: false
                }
            })
                .then(citizens => res.json({
                    success: true,
                    citizens
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách dân cư')))
        }
    }

    // [POST] /api/citizen/list
    searchCitizen(req, res, next) {
        if(!req.user.per_scope) {
            Citizen.findAll({
                where: {
                    full_name : {
                        [Op.substring]: req.body.data.full_name
                    },
                    is_deleted: false
                }
            })
                .then(citizens => res.json({
                    success: true,
                    citizens
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách dân cư')));
        }
        else {
            Citizen.findAll({
                where: {
                    full_name : {
                        [Op.substring]: req.body.data.full_name
                    },
                    hamlet_id: {
                        [Op.startsWith] : req.user.per_scope
                    },
                    is_deleted: false
                }
            })
                .then(citizens => res.json({
                    success: true,
                    citizens
                }))
                .catch(err => next(createHttpError(500, 'Lỗi lấy danh sách dân cư')));
        }     
    }

    // [DELETE] /api/citizen/:citizenId
    deleteCitizen(req, res, next) {
        // Citizen.destroy({
        //     where: {
        //         citizen_id: req.params.citizenId
        //     }
        // })

        // -- Xóa mềm
        Citizen.update({is_deleted: true}, {
            where: {
                citizen_id: req.params.citizenId
            }
        })
            .then(() => res.json({
                success: true,
                message: 'Xóa dân cư thành công'
            }))
            .catch(err => next(createHttpError(500, err)));
    }

    // [GET] /api/citizen/detail/:citizenId
    async detailCitizen(req, res, next) {
        const citizen = await Citizen.findOne({
            where: {
                citizen_id : req.params.citizenId
            }
        })
        if(!citizen) return res.json({
            success: false,
            message: 'không tìm thấy người này'
        })
        let address = [];
        const hamlet = await Hamlet.findOne({
            where: {hamlet_id: citizen.dataValues.hamlet_id}
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
        let citizenDetail = citizen.dataValues;
        citizenDetail.address_name = address.join(" - ");
        console.log(address.join(" - "));
        res.json({
            success: true,
            citizen: citizenDetail
        })
    }
}

module.exports = new CitizenController;