require('dotenv').config();
const { Sequelize } = require('sequelize');
const db_host = process.env.DB_HOST;
const db_dialect = process.env.DB_DIALECT;   
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

const sequelize = new Sequelize(database, username, password, {
    host: db_host,
    dialect: db_dialect,
    define: {
        freezeTableName: true,
        timestamps: false
    },
});

// mất cả tiếng với cái này vì exports nhầm :))
module.exports = sequelize;