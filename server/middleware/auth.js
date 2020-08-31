const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied, no jwt token provided');
    try {
        let decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(403).send('Access denied, no permission!');
    }
    next();
}

module.exports = auth;