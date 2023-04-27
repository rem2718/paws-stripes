const jwt = require('jsonwebtoken');
// TO-DO: cookies
const admin = (req, res, next) => {
    if (req.user.type != "admin") return res.status(403).render("err-response", { err: 403, msg: 'access denied, forbidden' });
    next();
}

module.exports = admin;