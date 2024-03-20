const { DataTypes } = require('sequelize');
const db = require('../../config/db');

// 1 Transaction belongs to 1 Issue
// i Issue has 1 Transaction
const Transaction = db.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dateTime:{
        type:DataTypes.DATE,
        allowNull: false
    },
    quotation:{
        type:DataTypes.DOUBLE,
        allowNull: false
    },
    PlumberId: {
        type:DataTypes.INTEGER,
        allowNull: false
    }

});

module.exports = Transaction;