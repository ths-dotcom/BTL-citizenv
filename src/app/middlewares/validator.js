const createHttpError = require('http-errors');

function validator(req, res, next) {
    // req.body.username = req.body.username.trim();
    // req.body.password = req.body.password.trim();
    // req.body.name = req.body.name.trim();
    if (!req.body.data) return next(createHttpError(400, 'Chưa nhập thông tin'));
    next();
}

module.exports = validator;