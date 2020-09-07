const jwt = require('jsonwebtoken');

mongoose = require('mongoose');

function adminPermission(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Access denied, no admin permission');

    next();
}

module.exports = adminPermission;