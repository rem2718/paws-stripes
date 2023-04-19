const debug = require('debug')('app:middleware');
const jwt = require('jsonwebtoken');

const auth = function (req, res, next) {
    const token = req.cookies.token;
    let err = 401;
    let msg = 'access denied, no token provided';
    if (!token) return res.status(err).render('error-responses.ejs', { err, msg });
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        res.isLoggedIn = true;
        next();
    } catch (exp) {
        err = 400;
        msg = 'Cat detected a bad request..';
        return res.status(err).render('error-responses.ejs', { err, msg });
    }
}

module.exports = auth;