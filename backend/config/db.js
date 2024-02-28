const Sequelize = require('sequelize');
const db = require('./dbConfig');

const sequelize = new Sequelize(db.database, db.username, db.password, {
        dialect:'mysql',
        host:'localhost',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
    }
);

module.exports = sequelize;