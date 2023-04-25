const debug = require('debug')('app:api');
const path = require('path');
const {Pet,validatePet} = require('../models/petModel');
const {User} = require('../models/userModel');


// post request
const createPet = async (req, res) => {
    const pet = new Pet(req.body);
    const {error} = validatePet(pet);
    if (error){
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    debug('create pet');
    res.redirect("/meet-our-pets");
};

// get request
// return pets
// pagination
const getPets = async (req, res) => {
    debug('get pets');
    res.send(pets);
};

// put request
const updatePet = async (req, res) => {
    //put errors here!
    const petid = req.params.id;
    let pet = await Pet.findById(petid)
    pet.petAge = req.body.petAge;
    pet.petBreed = req.body.petBreed;
    pet.petImage = req.body.petImage;//work on this and change.
    pet.petName = req.body.petName;
    pet.petPersonality = req.body.petPersonality;
    pet.petType = req.body.petType;

    debug('update pet');
    res.send(req.body);
};

// delete request
const deletePet = async (req, res) => {
    const petid = req.params.id;
    const result = await Pet.deleteOne(petid);//returns number of docs deleted. check!
    debug('delete pet');
    res.send({petid});
};

module.exports = {
    createPet,
    getPets,
    updatePet,
    deletePet,
};