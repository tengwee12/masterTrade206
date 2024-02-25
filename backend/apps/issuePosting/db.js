const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    'issuePostingDB',
    'root',
    'root',{
        dialect:'mysql',
        host:'localhost'
    }
);

const connectToDB = async () => {
    try{
        await sequelize.authenticate();
        console.log("connected to DB");
    } catch(error) {
        console.log(error);
    }
}

module.exports = {sequelize, connectToDB}