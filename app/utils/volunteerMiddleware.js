const {User} = require('../models/userModel');

const isVolunteer = async (req, res, next) => {
    const userID = req.user._id;
    const user = await User.findOne({_id: userID});
    if (user.volunteerHistory) return res.status(403).render("err-response", { err: 403, msg: 'you already submitted the form!' });  
    next();
}

module.exports = isVolunteer;