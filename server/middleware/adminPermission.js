function adminPermission(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Access denied, no permission. Contact an administrator if this is an error!');
    next();
}

module.exports = adminPermission;