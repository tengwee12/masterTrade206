const {Sequelize} = require('./db');
const {DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

export class Customer extends Model {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    customerID;

    @Attribute(DataTypes.STRING)
    @NotNull
    username;

    @Attribute(DataTypes.STRING)
    @NotNull
    language;
}

sequelize.sync().then(() => {
    console.log('Customer table created');
}).catch((error)=> {
    console.errog('Unable to create table : ', error);
});