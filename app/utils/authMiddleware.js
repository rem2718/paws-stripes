const debug = require('debug')('app:middleware');
const jwt = require('jsonwebtoken');

const auth = function (req, res, next) {
    const token = req.cookies.token;
    // if (!token) return res.status(401).send({ msg: 'oh no! You have to login to fill this form' });
    if (!token) return res.status(401).render("err-response", { err: 401, msg: 'oh no! You have to login first' });
    try {
        const user = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = user;
        debug(user);
        next();
    } catch (exp) {
        // return res.status(400).send({ msg: 'Cat detected a bad request..' });
        res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
}

module.exports = auth;