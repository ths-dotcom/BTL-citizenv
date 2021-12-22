const createHttpError = require('http-errors');

// function authorization(req, res, next) {
//     if(!req.login) return next(createHttpError(200, 'Chưa đăng nhập'));
//     next();
// }

class authorization {
    a1(req, res, next) {
        if(req.login && req.user.role_id === 1) next();
        else next(createHttpError(200, 'không được quyền'));
    }

    a12(req, res, next) {
        if(req.login && req.user.role_id <= 2) next();
        else next(createHttpError(200, 'không được quyền'));
    }

    a123(req, res, next) {
        if(req.login && req.user.role_id <= 3) next();
        else next(createHttpError(200, 'không được quyền'));
    }

    a123b1(req, res, next) {
        if(req.login && req.user.role_id < 5) next();
        else next(createHttpError(200, 'không được quyền'));
    }

    all(req, res, next) {
        if(!req.login) return next(createHttpError(200, 'Chưa đăng nhập'));
        next();
    }
}

module.exports = new authorization;