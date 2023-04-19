const jwt = require('jsonwebtoken');

const admin = function (req, res, next) {
    let err = 403;
    let msg = 'access denied, forbidden';
    if (!req.user.isAdmin) return res.status(err).render('error-responses', { err, msg });

    next();
}

module.exports = admin;