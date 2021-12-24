const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db/sequelize');

const City = sequelize.define('cities', {
    city_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    city_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

module.exports = City;