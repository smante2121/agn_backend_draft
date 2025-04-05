const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
let compression = require("compression")
let helmet = require("helmet")

const app = express();

/**
 * Middleware for parsing JSON bodies of incoming requests.
 */
app.use(express.json())

/**
 * Middleware for parsing URL-encoded bodies of incoming requests.
 */
app.use(express.urlencoded({extended: false}))

/**
 * Middleware for logging incoming requests to the console.
 */
app.use(logger);

/**
 * Middleware for compressing responses sent to clients.
 */
app.use(compression())

/**
 * Middleware for adding basic security headers to HTTP responses.
 */
app.use(helmet())

/**
 * Routes for handling database-related API requests.
 */
app.use('/api/db_router', require('./routes/api/db_router'))

/**
 * Connect to the database and synchronize models with the database schema.
 */
const db = require("./app/models/")
db.sequelize.sync();

/**
 * Port on which the server will listen for incoming requests.
 */
const PORT = process.env.PORT || 8082

/**
 * Start the server and listen for incoming requests on the specified port.
 */
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
