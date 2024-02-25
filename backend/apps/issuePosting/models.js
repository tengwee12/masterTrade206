const {sequelize} = require('./db');
const {DataTypes} = require('sequelize');

sequelize.define('Issue', {
    issueID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerId:{
        type:DataTypes.INTEGER,
    },
    description:{
        type:DataTypes.STRING
    },
    title:{
        type:DataTypes.STRING
    },
    image_link:{
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


const syncModels = async () => {
    sequelize.sync().then(() => {
        console.log('Issue Posts table created');
    }).catch((error)=> {
        console.errog('Unable to create table : ', error);
    });
}

module.exports = {syncModels}
