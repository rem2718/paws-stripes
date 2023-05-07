const debug = require('debug')('app:api');
const { Experience, validate } = require('../models/experienceModel');
const { User } = require('../models/userModel');

const createExperience = async (req, res) => {
    const experience = req.body;
    experience.image = req.file.buffer;
    experience.isAnon = experience.isAnon === "yes" ? true : false;
    experience.sharePost = experience.sharePost === "yes" ? true : false;
    experience.user = req.user._id;
    experience.numOfLikes = 0;
    const petInfo = experience.pet.split(',');
    experience.pet = petInfo[0];
    experience.petName = petInfo[1];
    const user = await User.findById(experience.user);
    experience.firstName = user.firstName;
    experience.lastName = user.lastName;

    const { error } = validate(experience);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const experienceModel = new Experience(experience);
    await experienceModel.save();
    res.redirect('../requests/response');
};

const like = async (req, res) => {
    const experienceID = req.params.id;
    let experience;

    if (req.body.like === "like") {
        experience = await Experience.findByIdAndUpdate(experienceID, { $inc: { numOfLikes: 1 } }, { new: true });
    } else {
        experience = await Experience.findByIdAndUpdate(experienceID, { $inc: { numOfLikes: -1 } }, { new: true });
    }
    if (experience.numOfLikes < 0) {
        experience.numOfLikes = 0;
        await experience.save();
    }

    res.send({ id: experienceID, likes: experience.numOfLikes });
};

const getExperiences = async (req, res) => {
    const page = req.query.pageNumber;
    const limit = req.query.pageSize;
    const count = await Experience.countDocuments();
    const skip = (page - 1) * limit;
    let end = false;
    if (skip >= count) end = true;
    try {
        const experiences = await Experience.find()
            .skip(skip)
            .limit(limit)
            .where({ sharePost: true })
            .select({ image: 0, sharePost: 0, pet: 0, user: 0 });

        return res.status(200).send({ experiences, end: end });
    } catch (error) {
        debug(error);
        return res.status(404).send({ message: "no experiences" })
    }
};

const getExperience = async (req, res) => {
    const page = req.query.pageNumber;
    const limit = req.query.pageSize;
    const count = await Experience.countDocuments();
    const skip = (page - 1) * limit;
    let end = false;
    if (skip >= count) end = true;
    try {
        const experiences = await Experience.find()
            .skip(skip)
            .limit(limit)
            .where({ sharePost: true, user: req.user._id })
            .select({ image: 0, sharePost: 0, pet: 0, user: 0 });
        return res.status(200).send({ experiences, end: end });
    } catch (error) {
        debug(error);
        return res.status(404).send({ message: "no experiences" })
    }
};

const getExperienceImage = async (req, res) => {
    const experienceID = req.params.id;
    const experience = await Experience.findById(experienceID);
    if (!experience) {
        return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    res.set('Content-Type', "png");
    res.send(experience.image);
}

const deleteExperience = async (req, res) => {
    const experienceID = req.params.id;
    const userID = req.user._id;

    const experience = await Experience.findById(experienceID);
    if (!experience) return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });

    if (req.user.type === "admin" || experience.user == userID) {
        const result = await Experience.findByIdAndDelete(experienceID);
        if (result) return res.send({ _id: result._id });
    }
    else {
        return res.status(403).render("err-response", { err: 403, msg: 'access denied... forbidden' });
    }

};

module.exports = {
    createExperience,
    like,
    getExperiences,
    getExperience,
    getExperienceImage,
    deleteExperience,
};