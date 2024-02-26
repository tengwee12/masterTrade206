const {sequelize} = require('./db');
const {DataTypes} = require('sequelize');

const Reviews = sequelize.define('Review', {
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
    }

})

const syncModels = async () => {
    sequelize.sync().then(() => {
        console.log('Review table created');
    }).catch((error)=> {
        console.errog('Unable to create table : ', error);
    });
}

//module.exports = {syncModels}
module.exports = { Reviews, syncModels };  //exports the Issue model