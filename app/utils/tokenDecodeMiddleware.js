const debug = require('debug')('app:middleware');
const jwt = require('jsonwebtoken');

const tokenDecode = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        req.cookies.token = false;
        req.user = false;
        next();
        return;
    }
    try {
        const user = jwt.decode(token, process.env.PRIVATE_KEY);
        req.user = user;
        next();
    } catch (exp) {
        return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
}

module.exports = tokenDecode;