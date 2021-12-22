const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const City = require('../models/City');
const District = require('../models/District');
const Ward = require('../models/Ward');
const Hamlet = require('../models/Hamlet');

class check {

    checkSignup(req, res, next) {
        User.findOne({
            where: {
                username: req.body.data.username
            }
        })
            .then(user => {
                if(!user) return next();
                else next(createHttpError(500, 'Username đã tồn tại'));
            })
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }

    checkPassword(req, res, next) {
        bcrypt.compare(req.body.data.password, req.user.password, function (err, result) {
            if (err) return next(createHttpError(500, 'Lỗi hệ thống'));
            if (result) next();
            else next(createHttpError(404, 'Mật khẩu không đúng'));
        });
    }

    checkCity(req, res, next) {
        City.findOne({
            where: {
                city_id: req.body.data.city_id
            }
        })
            .then(city => {
                if(!city) return next();
                else next(createHttpError(500, 'city_id đã tồn tại'));
            })
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }

    checkDistrict(req, res, next) {
        // if(req.user.per_scope && !req.body.data.district_id.startsWith(req.user.per_scope)) {
        //     return next(createHttpError(400, 'Mã huyện không trong quyền quản lý'));
        // }
        District.findOne({
            where: {
                district_id: req.body.data.district_id
            }
        })
            .then(district => {
                if(!district) return next();
                else next(createHttpError(500, 'district_id đã tồn tại'));
            })
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }

    checkWard(req, res, next) {
        // if(req.user.per_scope && !req.body.data.ward_id.startsWith(req.user.per_scope)) {
        //     return next(createHttpError(400, 'Mã xã không trong quyền quản lý'));
        // }
        Ward.findOne({
            where: {
                ward_id: req.body.data.ward_id
            }
        })
            .then(ward => {
                if(!ward) return next();
                else next(createHttpError(500, 'ward_id đã tồn tại'));
            })
            .catch(err => next(createHttpError(500, err)));
    }

    checkHamlet(req, res, next) {
        // if(req.user.per_scope && !req.body.data.hamlet_id.startsWith(req.user.per_scope)) {
        //     return next(createHttpError(400, 'Mã thôn không trong quyền quản lý'));
        // }
        Hamlet.findOne({
            where: {
                hamlet_id: req.body.data.hamlet_id
            }
        })
            .then(hamlet => {
                if(!hamlet) return next();
                else next(createHttpError(500, 'hamlet_id đã tồn tại'));
            })
            .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
    }

}

module.exports = new check;