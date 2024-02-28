const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Issue = db.define('Issue', {
    issueID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerId:{
        type:DataTypes.INTEGER
    },
    description:{
        type:DataTypes.TEXT,
        validate: {
            max: 1000
        }
    },
    title:{
        type:DataTypes.STRING
    },
    imageLink:{
        type:DataTypes.STRING
    },
    category:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    },
    startDate: {
        type:DataTypes.DATEONLY
    },
    endDate: {
        type:DataTypes.DATEONLY
    }
})

module.exports = Issue;
