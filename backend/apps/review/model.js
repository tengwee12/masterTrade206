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
    media: {
        type: DataTypes.TEXT,
        validate: {
          isValidUrls(value) {
            const urls = value.split(';');
            for (const url of urls) {
              if (!this.constructor.sequelize.Validator.isUrl(url.trim())) {
                throw new Error(`Invalid URL: ${url}`);
              }
            }
          }
        }
      }

});

module.exports = Review;