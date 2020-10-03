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

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-auth-token, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
        next();
    });
    app.use(express.json());
    app.use('/api', apiRoutes);
    app.use(expressErrorHandler);
}