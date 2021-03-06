const createHttpError = require('http-errors');
const ErrorController = require('../app/controllers/ErrorController');
const authorization = require('../app/middlewares/authorization');
const loginRouter = require('./login');
const userRouter = require('./user');
const cityRouter = require('./city');
const districtRouter = require('./district');
const wardRouter = require('./ward');
const hamletRouter = require('./hamlet');
const citizenRouter = require('./citizen');
const analystRouter = require('./analyst');

function route(app) {
    app.get('/', (req, res) => {
        res.render('login.ejs');
    });
    app.get('/home', authorization.all, (req, res) => {
        res.render('home.ejs');
    })

    app.use('/api/analyst', analystRouter);
    app.use('/api/citizen', citizenRouter);
    app.use('/api/hamlet', hamletRouter)
    app.use('/api/ward', wardRouter);
    app.use('/api/district', districtRouter);
    app.use('/api/city', cityRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/user', userRouter);

    app.all('*', (req, res, next) => {
        next(createHttpError(404, 'Route không tồn tại'));
    })

    // xử lí lỗi
    app.use(ErrorController.index);
}

module.exports = route;

