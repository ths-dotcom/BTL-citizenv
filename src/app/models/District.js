const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db/sequelize');
const City = require('../models/City');

const District = sequelize.define('districts', {
    district_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    district_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

// District.belongsTo(City, )

module.exports = District;