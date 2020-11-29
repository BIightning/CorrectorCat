const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

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
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-auth-token, x-upload-owner, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
        next();
    });

    const uploadLimit = '150mb';

    app.use(bodyParser.json({ limit: uploadLimit }));
    app.use(bodyParser.urlencoded({ extended: true, uploadLimit }));

    app.use(express.json());
    app.use('/api', apiRoutes);

    app.get("*.*", express.static("dist/correctorcat")); //root folder of angular app
    app.use(express.static('./uploads')); //upload folder

    app.all("*", (req, res) => {
        res.sendFile("/", { root: "dist/correctorcat" });
    });


    //app.use(expressErrorHandler);
}