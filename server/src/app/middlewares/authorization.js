const createHttpError = require('http-errors');

function authorization(req, res, next) {
    if(!req.login) return next(createHttpError(200, 'Chưa đăng nhập'));
    next();
}

module.exports = authorization;