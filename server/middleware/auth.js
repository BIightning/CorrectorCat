const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        req.error = { code: 401, msg: 'Access denied, no jwt token provided' }
        return;
    }
    try {
        let decoded = jwt.verify(token, process.env.JWT_AUTH_TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        req.error = { code: 403, msg: 'Access denied, no permission' }
    }
    next();
}

module.exports = auth;