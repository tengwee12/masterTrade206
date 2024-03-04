const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Plumber = db.define('Plumber', {
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
    },
    description:{
        type:DataTypes.TEXT
    },
    license:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    image:{
        type:DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }

});

module.exports = Plumber;