const { Sequelize } = require('sequelize');
const dbConfig = require("./app/config/db.config");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.User,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
);

async function checkDatabase() {
    try {
        // Test connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Get all tables
        const [results] = await sequelize.query('SHOW TABLES;');
        console.log('\nExisting tables:');
        console.log(results);

        // For each table, show its structure
        for (const row of results) {
            const tableName = row[`Tables_in_${dbConfig.DB}`];
            const [tableInfo] = await sequelize.query(`DESCRIBE ${tableName};`);
            console.log(`\nStructure of table ${tableName}:`);
            console.log(tableInfo);
        }

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

checkDatabase(); 