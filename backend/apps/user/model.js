const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password:{
        type:DataTypes.STRING,
    }
});

module.exports = User;