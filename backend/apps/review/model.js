const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Review = db.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    price: {
      type: DataTypes.DOUBLE,
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