const express = require('express');
const app = express();
const path = require('path');
const route = require('./routes/indexRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authentication = require('./app/middlewares/authentication');
const db = require('./config/db/connect');

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(authentication);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));


// connect to DB
db.connect();

route(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})