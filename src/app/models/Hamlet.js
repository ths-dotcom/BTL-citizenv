const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db/sequelize');

const Hamlet = sequelize.define('hamlets', {
    hamlet_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    hamlet_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ward_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = Hamlet;