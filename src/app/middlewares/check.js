const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const City = require('../models/City');

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
        console.log(req.body.data);
        console.log(req.user);
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


}

module.exports = new check;