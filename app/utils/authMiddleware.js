const debug = require('debug')('app:middleware');
const jwt = require('jsonwebtoken');

const auth =  (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).render("err-response", { err: 401, msg: 'oh no! You have to login first' });
    try {
        const user = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = user;
        next();
    } catch (exp) {
        res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
}

module.exports = auth;