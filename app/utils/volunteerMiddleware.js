const debug = require('debug')('app:middleware');
const { User } = require('../models/userModel');

const isVolunteer = async (req, res, next) => {
    const userID = req.user._id;
    const user = await User.findOne({ _id: userID });
    if (user.volunteerHistory.length != 0) return res.status(403).render("err-response", { err: 403, msg: 'you already submitted the form!' });
    next();
}

module.exports = isVolunteer;