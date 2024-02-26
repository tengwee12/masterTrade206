const {sequelize} = require('./db');
const {DataTypes} = require('sequelize');

const Issue = sequelize.define('Issue', {  //creates Issue model as a const so that can export to issue.js for use in api endpoint
    issuePostID: {
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
        console.log('Issue Posts table created/updated');
    }).catch((error)=> {
        console.errog('Unable to create table : ', error);
    });
}

module.exports = {syncModels};  //exports the syncmodels function
module.exports = { Issue, syncModels };  //exports the Issue model
