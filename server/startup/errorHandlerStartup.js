const winston = require('winston');
require('winston-mongodb');

module.exports = function(dbPath = Text) {
    winston.add(new winston.transports.MongoDB({ db: dbPath, level: 'error' }));

    processErrorHandler();

    if (!process.env.JWT_AUTH_TOKEN_SECRET) {
        throw new Error('Security violation: JWT_AUTH_TOKEN_SECRET env variable is not defined. Terminating application.');
    }
}

function processErrorHandler() {
    process.on('uncaughtException', (ex) => {
        console.error('\n' + '\x1b[31m%s\x1b[0m' + '\n', ex);
        winston.error(ex.message, ex);
        process.exit(1);
    });
    process.on('unhandledRejection', ex => {
        throw ex;
    })
}