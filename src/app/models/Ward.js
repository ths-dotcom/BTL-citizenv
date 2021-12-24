const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db/sequelize');

const Ward = sequelize.define('wards', {
    ward_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    ward_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

module.exports = Ward;