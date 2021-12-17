const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const encodedToken = require('../../config/token/encoded');
const User = require('../models/User');

class LoginController {

    // [POST] /api/login
    async login(req, res, next) {
        const user = await User.findOne({
            where: {
                username: req.body.data.username
            }
        });
        if(!user) return next(createHttpError(404, 'Tài khoản không đúng'));
        bcrypt.compare(req.body.data.password, user.dataValues.password, function(err, result) {
            if(err) return next(createHttpError(500, 'Lỗi hệ thống'));
            if(result) {
                const token = encodedToken(user.dataValues.id);
                res.json({
                    success: true,
                    token,
                    message: 'Đăng nhập thành công'
                })
            }
            else next(createHttpError(404, 'Mật khẩu không đúng'));
        });
    }
}

module.exports = new LoginController;