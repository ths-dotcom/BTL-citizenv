const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db/sequelize');

const User = sequelize.define('users', {
    // id: {
    //     type: DataTypes.NUMBER,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
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
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports = User;