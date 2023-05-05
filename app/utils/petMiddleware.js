const { Adopt } = require('../models/adoptModel');
const { Pet } = require('../models/petModel');

const getPets = async (req, res, next) => {
    const id = req.user._id;
    const pets = await Adopt.find({ user: id, status: "accepted" }).select({pet:1, petName:1});
    if (!pets) return res.status(401).render("err-response", { err: 401, msg: 'oh no! You didn\'t adopt any pet yet' });

    req.pets = pets;
    next();
};

module.exports = getPets;