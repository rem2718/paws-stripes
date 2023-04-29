const debug = require('debug')('app:api');
const { Pet, validate } = require('../models/petModel');
// TO-DO: pagination, null values

const createPet = async (req, res) => {
    const pet = req.body;
    pet.image = req.file.buffer;

    const { error } = validate(pet);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const petModel = new Pet(pet);
    await petModel.save();

    res.redirect("/meet-our-pets");
};

// plz find a way to send 'end' correctly
const getPets = async (req, res) => {
  
    debug('get pets');
    let page = req.query.pageNumber;
    let limit = req.query.pageSize;

    try {
        const pets = await Pet.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .select({ image: 0 });

        return res.status(200).send({ pets, end: true });
    } catch (error) {
        debug(error);
        return res.status(404).send({ message: "no pets" })
    }
};

const getPetImage = async (req, res) => {
    const petID = req.params.id;
    const pet = await Pet.findById(petID);
    if (!pet) {
        return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    res.set('Content-Type', "png");
    res.send(pet.image);
}

const updatePet = async (req, res) => {
    const petID = req.params.id;
    let pet = await Pet.findById(petID);
    if (!pet) {
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }

    const updates = req.body;
    if (!req.file) updates.image = pet.image;
    else updates.image = req.file.buffer;

    const { error } = validate(updates);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const updatedPet = await Pet.findByIdAndUpdate(petID, updates, { new: true });
    res.send(updatedPet);
};

const deletePet = async (req, res) => {
    const petID = req.params.id;
    const result = await Pet.findByIdAndDelete(petID);
    if (result) return res.send({ _id: petID });

    return res.status(404).render("err-response", { err: 404, msg: 'Experience not deleted :\( please check the ID and try again' });
};

module.exports = {
    createPet,
    getPets,
    getPetImage,
    updatePet,
    deletePet,
};