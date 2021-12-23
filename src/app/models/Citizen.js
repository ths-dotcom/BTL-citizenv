const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db/sequelize');

const Citzen = sequelize.define('citizen', {
    citizen_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    home_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permanent_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    temporary_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    religion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    academic_level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

module.exports = Citzen;