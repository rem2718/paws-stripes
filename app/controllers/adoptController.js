const debug = require('debug')('app:api');
const { User } = require('../models/userModel');
const { Pet } = require('../models/petModel');
const { Adopt, validate, validateAdoptStatus } = require('../models/adoptModel')

const adopt = async (req, res) => {
    const petID = req.params.id;
    const userID = req.user._id;

    const user = await User.findById(userID);
    const pet = await Pet.findById(petID);
    const adopt = {
        user: userID,
        userName: `${user.firstName} ${user.lastName}`,
        pet: petID,
        petName: pet.petName,
        petType: pet.petType,
        status: "pending",
        phone: user.phoneNumber
    };

    const { error } = validate(adopt);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const newAdopt = await new Adopt(adopt).save()
    await User.findByIdAndUpdate(userID, { $push: { adoptHistory: newAdopt._id } });

    res.redirect('/requests/response');
};

const recommend = async (req, res) => {
    const adoption = req.body;
    adoption.petExperience = adoption.petExperience === "yes" ? true : false;
    adoption.secureEnvironment = adoption.secureEnvironment === "yes" ? true : false;

    let pets = choosePet(adoption);
    debug('recommend');
    res.render('recommendation', { cookies: req.cookies.token, user: req.user });
}

const getRecommendations = async (req, res) => {
    // res.send(pets);
}

const getStatus = async (req, res) => {
    const userID = req.user._id;
    const Adopts = await Adopt.find({ user: userID }).select({ petName: 1, petType: 1, createdAt: 1, status: 1 });
    res.send(Adopts);
};

const getStatuses = async (req, res) => {
    const adopts = await Adopt.find();
    res.send(adopts);
}

const updateStatus = async (req, res) => {
    const adoptID = req.params.id;
    const status = req.body.status;

    const { error } = validateAdoptStatus(status);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const adopt = await Adopt.findById(adoptID);
    if (!adopt) return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });

    const updatedStatus = await Adopt.findByIdAndUpdate(adoptID, { status: status }, { new: true }).select({ _id: 1, status: 1 });
    res.send(updatedStatus);
};

const choosePet = user => {

};


module.exports = {
    adopt,
    recommend,
    getRecommendations,
    getStatus,
    getStatuses,
    updateStatus,
};


