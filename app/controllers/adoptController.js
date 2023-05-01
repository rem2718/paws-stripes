const debug = require('debug')('app:api');
const { User } = require('../models/userModel');
const { Pet } = require('../models/petModel');
const { Adopt, validate, validateAdoptStatus } = require('../models/adoptModel');


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
    adoption.numPeople = parseInt(adoption.numPeople);

    let pets = await choosePet(adoption);
    let rec = true;
    if (pets.length == 0) rec = false
    req.session.pets = pets;
    res.render('recommendation', { cookies: req.cookies.token, user: req.user, rec });
}

const getRecommendations = async (req, res) => {
    const petIDs = req.session.pets;
    const pets = [];
    for (const id of petIDs) {
        let pet = await Pet.findById(id).select({ image: 0 });
        pets.push(pet);
    }
    res.send(pets);
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

const choosePet = async (adoption) => {
    var pets = await Pet.find().select({ image: 0 });
    if (!adoption.secureEnvironment) return []

    if (!adoption.petExperience) {
        let negative = ['hates people', 'prefers to be alone', 'aggressive'];
        pets = pets.filter((pet) => {
            if (!pet.petPersonality.some(item => negative.includes(item))) return pet;
        });
    }

    let introvert = ['hates people', 'shy', 'prefers to be alone', 'timid'];
    if (adoption.numPeople < 3) {
        pets = pets.filter((pet) => {
            if (pet.petPersonality.some(item => introvert.includes(item))) return pet;
        });
    } else {
        pets = pets.filter((pet) => {
            if (!pet.petPersonality.some(item => introvert.includes(item))) return pet;
        });
    }

    let breeds = [];
    let cur = [];
    if (adoption.mbti[0] === "I") {
        cur = ["german", "ragdoll", "persian", "american", "lop", "dwarf", "pekin"];
    } else {
        cur = ["labrador", "golden", "pekin"];
    }
    breeds = [...new Set(breeds.concat(cur))];
    if (adoption.mbti[1] === "N") {
        cur = ["golden", "ragdoll", "persian", "pekin"];
    } else {
        cur = ["labrador", "german", "american", "lop", "dwarf", "pekin"];
    }
    breeds = [...new Set(breeds.concat(cur))];
    if (adoption.mbti[2] === "T") {
        cur = ["german", "american", "pekin"];
    } else {
        cur = ["labrador", "golden", "ragdoll", "persian", "lop", "dwarf", "pekin"];
    }
    breeds = [...new Set(breeds.concat(cur))];
    if (adoption.mbti[3] === "J") {
        cur = ["labrador", "german", "ragdoll", "persian", "american", "lop", "dwarf", "pekin"];
    } else {
        cur = ["golden", "german", "american", "lop", "dwarf", "pekin"];
    }
    breeds = [...new Set(breeds.concat(cur))];
    pets = pets.filter((pet) => {
        if (breeds.includes(pet.petBreed)) return pet;
    });

    if (adoption.petType.length != 0) {
        pets = pets.filter((pet) => {
            if (pet.petType === adoption.petType) return pet;
        });
    }

    if (adoption.petBreed.length != 0) {
        pets = pets.filter((pet) => {
            if (pet.petBreed === adoption.petBreed) return pet;
        });
    }

    pets.map((pet) => pet._id);
    return pets;
};


module.exports = {
    adopt,
    recommend,
    getRecommendations,
    getStatus,
    getStatuses,
    updateStatus,
};


