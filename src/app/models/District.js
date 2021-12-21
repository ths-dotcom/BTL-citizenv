const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db/sequelize');

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
})

module.exports = District;