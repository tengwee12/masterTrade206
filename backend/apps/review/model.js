const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Review = db.define('Review', {
    reviewID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerId:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    plumberId:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type:DataTypes.STRING
    },
    dateTime:{
        type:DataTypes.STRING,
        allowNull: false
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    media:{
        type:DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }

});

module.exports = Review;