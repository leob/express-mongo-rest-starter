//
// Main app module
//

const express = require('express');
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// Import the util/log module which will configure the default Winston console logger;
// for an explanation of this technique see: http://stackoverflow.com/a/17737613/2474068

const logger = require('util/log');

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

logger.debug('mongo: ' + process.env.MONGODB_URI + ' autoIndex: ' + (process.env.MONGODB_AUTOINDEX === 'true'));
mongoose.connect(process.env.MONGODB_URI, {config: {autoIndex: process.env.MONGODB_AUTOINDEX === 'true'}});

mongoose.connection.on('error', () => {
    logger.error('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

// Make "morgan" (which simply logs all HTTP requests) use the Winston logger that we configured in util/log.js -
// for an explanation of this technique see: http://stackoverflow.com/a/28824464/2474068

app.use(require("morgan")("combined", {
    "stream": {
        write: (message, encoding) => {
            logger.info(message);
        }
    }
}));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes/controllers
app.use('/api/projects', require('controllers/projects'));
// more routes/controllers here ...

/**
 * Error handling middleware, see:
 *
 * https://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
 */
app.use( (err, req, res, next) => {
    logger.error("error", err);

    res.status(err.status || 500);
    res.send(err.showMessage ? err.message : 'error');
});

module.exports = app;
