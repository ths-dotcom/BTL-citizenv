require('dotenv').config();
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const User = require('../models/User');

class UserController {

    // [POST] /api/user/signup
    signup(req, res, next) {
        const hash = bcrypt.hashSync(req.body.data.password, SALT_ROUNDS);
        req.body.data.password = hash;
        User.create(req.body.data)
            .then(() => res.status(201).json({
                success: true,
                message: 'Tạo tài khoản thành công'
            }))
            .catch(err => next(createHttpError(500, 'Lỗi tạo tài khoản')));
    }

    // [GET] /api/user/infor
    infor(req, res, next) {
        User.findOne({
            where: {
                id: req.user.id
            }
        })
            .then(user => res.json({user}))
            .catch(err => next(createHttpError(500, ' Lỗi')));
    }
}

module.exports = new UserController;