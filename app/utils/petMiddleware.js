const { Adopt } = require('../models/adoptModel');
const { Pet } = require('../models/petModel');

const getPets = async (req, res, next) => {
    const id = req.user._id;
    const adopts = await Adopt.find({ user: id, status: "accepted" });

    const pets = [];
    for (const adopt of adopts) {
        let pet = await Pet.findById(adopt.pet);
        pets.push({
            petID: adopt.pet,
            petName: pet.petName
        })
    };

    req.pets = pets;
    next();
};

module.exports = getPets;