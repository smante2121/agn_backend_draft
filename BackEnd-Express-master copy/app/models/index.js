const dbConfig = require("../config/db.config") //importing the db config
const Sequelize = require("sequelize") //importing the sequelize
// sequelize is a objet relational mapping library, converts data between incompatible types
//specifically translates between javascript objects to and sql database tables
// connecting to database using credentials from dbConfig
const sequelize = new Sequelize( //creates a new sequelize instance with the database credentials
    dbConfig.DB,
    dbConfig.User,
    dbConfig.PASSWORD,
    {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
    }
)

const db = {} //creates a empty object to store our models and sequelize instances

db.Sequelize = Sequelize // adds sequelize library to the db object, gives access to datatypes and utilities
db.sequelize = sequelize //gives access to database connection

module.exports = db; //exports the db object
