function validator(req, res, next) {
    req.body.username = req.body.username.trim();
    req.body.password = req.body.password.trim();
    req.body.name = req.body.name.trim();
    next();
}

module.exports = validator;