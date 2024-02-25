const {sequelize} = require('./db');
const {DataTypes} = require('sequelize');

sequelize.define('Customer', {
    username:{
        type:DataTypes.STRING,
        validate:{
            max:20
        }
    },
    language:{
        type:DataTypes.STRING
    }
})

const syncModels = async () => {
    sequelize.sync().then(() => {
        console.log('Customer table created');
    }).catch((error)=> {
        console.errog('Unable to create table : ', error);
    });
}

module.exports = {syncModels}
