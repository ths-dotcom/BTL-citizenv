require('dotenv').config();
const createHttpError = require('http-errors');
const City = require('../models/City');

class CityController {
    // [POST] /api/city/create
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
}

module.exports = new CityController;