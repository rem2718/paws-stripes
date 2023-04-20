const jwt = require('jsonwebtoken');

const admin = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).render("err-response", { err: 403, msg: 'access denied, forbidden' });
    next();
}

module.exports = admin;