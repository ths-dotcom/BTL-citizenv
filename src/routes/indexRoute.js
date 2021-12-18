const createHttpError = require('http-errors');
const ErrorController = require('../app/controllers/ErrorController');
const loginRouter = require('./login');
const userRouter = require('./user');
const authorization = require('../app/middlewares/authorization');

function route(app) {
    app.get('/', (req, res) => {
        res.render('login.ejs');
    });
    app.get('/home', authorization, (req, res) => {
        res.render('home.ejs');
    })
    app.use('/api/login', loginRouter);
    app.use('/api/user', userRouter);

    app.all('*', (req, res, next) => {
        next(createHttpError(404, 'Route không tồn tại'));
    })

    // xử lí lỗi
    app.use(ErrorController.index);
}

module.exports = route;

