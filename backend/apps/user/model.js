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
    },
    password:{
        type:DataTypes.STRING,
    }
});

module.exports = User;