const jwt = require('jsonwebtoken');

mongoose = require('mongoose');

function adminPermission(req, res, next) {
    // !!! TODO: Get this from db instead !!!
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}

module.exports = adminPermission;