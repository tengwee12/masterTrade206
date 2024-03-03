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
    },
    plumberId:{
        type:DataTypes.INTEGER,
    },
    description:{
        type:DataTypes.STRING
    },
    dateTime:{
        type:DataTypes.STRING
    },
    rating:{
        type:DataTypes.INTEGER,
    },
    media:{
        type:DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }

});

module.exports = Review;