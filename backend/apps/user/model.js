const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;