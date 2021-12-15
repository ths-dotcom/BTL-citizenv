const express = require('express');
const app = express();
const path = require('path');
const route = require('./routes/indexRoute');
const cors = require('cors');
require('dotenv').config();
const authentication = require('./app/middlewares/authentication');
const db = require('./config/db/connect');

app.use(
    express.urlencoded({
        extended: true,
    }),
  );
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname + '/public')));
app.use(authentication);

// connect to DB
db.connect();

route(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})