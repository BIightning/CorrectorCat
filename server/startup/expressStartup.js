const express = require('express');
const morgan = require('morgan');
const apiRoutes = require('../routes/apiRoutes.js');
const expressErrorHandler = require('../middleware/expressErrorHandler.js');

module.exports = function(app) {

    //enable logging for dev environment
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        console.log('Application is in development environment.\n -> Morgan logger enabled.');
    }

    app.use(express.json());
    app.use('/api', apiRoutes);
    app.use(expressErrorHandler);
}