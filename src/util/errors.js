const logger = require('winston');   // this retrieves default logger which was configured in log.js

function reject(message) {
    return Promise.reject(err(message));
}

function err(message) {
    return {status: 400, message, showMessage: true}
}

//
// Log error and chain to next middleware, see:
//
// https://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
//
function handleErr(next, err, context) {
    if (context) {
        err.context = context;
    }

    next(err);
}

module.exports = {reject, err, handleErr};