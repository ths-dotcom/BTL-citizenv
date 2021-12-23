const createHttpError = require('http-errors');
const User = require('../models/User');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

async function authToken(req, res, next) {
    var tokenHeader = req.header('Authorization');
    var token = req.cookies.token;
    //
    // token = tokenHeader;
    if (!token) {
        req.login = false;
        return next();
    }
    // Nễu là dạng "Bearer token"
    if (token.startsWith('Bearer')) token = token.split(' ')[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, async function (err, decoded) {
        if (err) return next(createHttpError(403, 'Không đúng dạng Token'));
        let now = new Date().getTime();
        if (decoded.exp < now) return next(createHttpError(200, 'Hết phiên đăng nhập'));
        console.log(decoded);
        const user = await User.findOne({
            where: {
                id: decoded.id
            }
        });
        if (!user) return next(createHttpError(200), 'Tài khoản không tồn tại');
        req.login = true;
        req.user = user.dataValues;
        res.locals.name = user.dataValues.name;
        next();
    });
}

module.exports = authToken;