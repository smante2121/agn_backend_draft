const moment = require('moment') //imports moment js library for time
// middle ware function that takes request, response, and next action
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();// call next to pass control to the next middleware function
};
module.exports = logger //exports the logger middleware 
// logs information about every http request that comes to your express server
// middle ware functions in express are functions that have access to the request object, response, and next middleware
// can execute code, modify requests, and end the request, response cycle
// can be imported to use in different parts of application, can be enabled/disabled globally or for specific routes
