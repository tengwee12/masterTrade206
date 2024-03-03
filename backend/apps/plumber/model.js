const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Plumber = db.define('Plumber', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password:{
        type:DataTypes.STRING,
    }
});

module.exports = Plumber;