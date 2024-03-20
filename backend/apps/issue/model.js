const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Issue = db.define('Issue', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    // status: {
    //   type:DataTypes.BOOLEAN,
    //   defaultValue: false
    // }

})

module.exports = Issue;
