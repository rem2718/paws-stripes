
const jwt = require('jsonwebtoken');

const auth = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('access denied, no token provided');
    try {
        const decoded = jwt.vertify(token, env.process.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (exp) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;