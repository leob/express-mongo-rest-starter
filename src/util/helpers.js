//
// Error utilities
//

//const logger = require('winston'); // require **winston** - this retrieves the default logger configured in util/log !!

function reject(message) {
    return Promise.reject(err(message));
}

function err(message) {
    return {status: 400, message, showMessage: true}
}

function handleResult(req/*currently not used*/, res, data, entity) {
    if (!data) {
        return reject(entity + " not found");
    }

    res.json(data);
}

/**
 * Enrich error and chain to next middleware, see:
 * https://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
 */
function handleError(next, err, context) {
    // this log statement is not really useful, only used to show how to log something through "require('winston')" ...
    //logger.debug('There was an error', err);

    if (context) {
        err.context = context;
    }

    next(err);
}

function id(req) {
    return req.params.id;
}

module.exports = {reject, err, handleResult, handleError, id};