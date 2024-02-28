const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const User = db.define('Review', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password:{
        type:DataTypes.STRING,
    }
});

module.exports = User;