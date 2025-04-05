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

// Define models
db.SourceAGN = require("./sourceagn.model.js")(sequelize, Sequelize)
db.Photometry = require("./photometry.model.js")(sequelize, Sequelize)
db.Classification = require("./classification.model.js")(sequelize, Sequelize)
db.RedshiftMeasurement = require("./redshift.model.js")(sequelize, Sequelize)
db.Observation = require("./observation.model.js")(sequelize, Sequelize)

// Define relationships
db.SourceAGN.hasMany(db.Photometry, { foreignKey: 'agn_id' })
db.Photometry.belongsTo(db.SourceAGN, { foreignKey: 'agn_id' })

db.SourceAGN.hasMany(db.Classification, { foreignKey: 'agn_id' })
db.Classification.belongsTo(db.SourceAGN, { foreignKey: 'agn_id' })

db.SourceAGN.hasMany(db.RedshiftMeasurement, { foreignKey: 'agn_id' })
db.RedshiftMeasurement.belongsTo(db.SourceAGN, { foreignKey: 'agn_id' })

module.exports = db; //exports the db object
