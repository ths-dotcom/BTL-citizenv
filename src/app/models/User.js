const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db/sequelize');

const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    per_scope: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    declare_per: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = User;