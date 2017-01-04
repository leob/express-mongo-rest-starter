//
// Configure the default logger which can be used in any other module just via "const logger = require('winston')".
//
// For an explanation of this technique see http://stackoverflow.com/a/17737613 and http://stackoverflow.com/a/10341078
//

const winston = require('winston');

winston.remove(winston.transports.Console);

winston.add(winston.transports.Console, {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: true,
    handleExceptions: true,
    json: false,
    colorize: true
  }
);

winston.info('Initialized Winston');

module.exports = winston;