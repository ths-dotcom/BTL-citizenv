const createHttpError = require('http-errors');
const User = require('../models/User');

function signupCheck(req, rex, next) {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if(!user) return next();
            else next(createHttpError(500, 'Username đã tồn tại'));
        })
        .catch(err => next(createHttpError(500, 'Lỗi hệ thống')));
}

module.exports = signupCheck;

