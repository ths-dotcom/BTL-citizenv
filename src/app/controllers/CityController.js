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
        City.findAll()
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
                }
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
    // chưa xong
    deleteCity(req, res, next) {
        City.destroy({
            where: {
                city_id: req.params.cityId
            }
        })
            .then(() => {
                User.destroy({
                    where: {
                        per_scope: req.params.cityId
                    }
                })
                    .then(() => res.json({
                        success: true,
                        message: 'Xóa thành công'
                    }))
                    .catch(err => next(createHttpError(
                        500,
                        'Lỗi xóa thành phố'
                    )))
            })
            .catch(err => next(createHttpError(
                500,
                'Lỗi xóa thành phố'
            )))
    }

    // [PUT] /api/city/:cityId
    updateCity(req, res, next) {
        City.update({city_name: req.body.data.city_name}, {
            where: {
                city_id: req.params.cityId
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