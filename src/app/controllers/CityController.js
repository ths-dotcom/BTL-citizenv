require('dotenv').config();
const createHttpError = require('http-errors');
const { Op } = require("sequelize");
const City = require('../models/City');
const User = require('../models/User');

class CityController {
    // [POST] /api/city
    createCity(req, res, next) {
        City.create({
            city_id: req.body.data.city_id,
            city_name: req.body.data.city_name
        })
            .then(() => res.status(201).json({
                success: true,
                message: 'Tạo thành phố thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi tạo thành phố')));
    }

    // [GET] api/city/list
    listOfCities(req, res, next) {
        City.findAll({
            where: {
                is_deleted: false
            }
        })
            .then(cities => res.json({
                success: true,
                cities
            }))
            .catch(err => next(createHttpError(
                500, 
                'Lỗi lấy danh sách thành phố'
            )));
    }

    // [POST] api/city/list
    searchCities(req, res, next) {
        City.findAll({
            where: {
                city_name : {
                    [Op.substring]: req.body.data.city_name
                },
                is_deleted: false
            }
        })
            .then(cities => res.json({
                success: true,
                cities
            }))
            .catch(err => next(createHttpError(
                500, 
                'Lỗi lấy danh sách thành phố'
            )));   
    }

    //[DELETE] api/city/:cityId
    deleteCity(req, res, next) {
        City.update({is_deleted: true}, {
            where: {
               city_id : req.params.cityId 
            }
        })
            .then(() => {
                User.update({is_deleted: true}, {
                    where: {
                        per_scope: {
                            [Op.startsWith]: req.params.cityId
                        }
                    }
                })
                    .then(() => res.json({
                        success: true,
                        message: "Xóa thành phố thành công"
                    }))
                    .catch(err => next(createHttpError(500, err)));
                
            })
            .catch(err => next(createHttpError(500, err)));
    }

    // [PUT] /api/city/:cityId
    updateCity(req, res, next) {
        City.update({city_name: req.body.data.city_name}, {
            where: {
                city_id: req.params.cityId
            }
        })
            .then(() => {
                User.update({name: "A2 " + req.body.data.city_name + " - " + req.params.cityId}, {
                    where: {
                        per_scope: req.params.cityId
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

    // [GET] /api/city/progress
    progress(req, res, next) {
        User.findAll({
            where: {
                role_id: 2
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

module.exports = new CityController;