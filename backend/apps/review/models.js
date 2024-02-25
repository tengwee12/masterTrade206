const {sequelize} = require('./db');
const {DataTypes} = require('sequelize');

sequelize.define('Review', {
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
        validate:{
            max:20
        }
    },
    description:{
        type:DataTypes.STRING
    },
    dateTime:{
        type:DataTypes.STRING
    },
    rating:{
        type:DataTypes.INTEGER,
    }

})

const syncModels = async () => {
    sequelize.sync().then(() => {
        console.log('Issue Posts table created');
    }).catch((error)=> {
        console.errog('Unable to create table : ', error);
    });
}

module.exports = {syncModels}