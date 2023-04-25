const debug = require('debug')('app:api');
const path = require('path');
// const Pets = require('../models/petModel');

var pets = [
    {
        "petID": "1234",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    }, {
        "petID": "12wert34",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    }, {
        "petID": "123sdf4",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    }, {
        "petID": "12x34",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    }, {
        "petID": "12waert34",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    }, {
        "petID": "1a23sdf4",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    },];

// post request
const createPet = async (req, res) => {
    // req.body.
    debug('create pet');
    res.redirect("/meet-our-pets");
};

// get request
// return pets
// pagination
const getPets = async (req, res) => {
    debug('get pets');
    res.send({ pets, end: false });
};

// put request
const updatePet = async (req, res) => {
    // body
    debug('update pet');
    res.send({ petID: req.params.id, name: req.body.name, type: req.body.type, breed: req.body.breed, age: req.body.age, personality: req.body.personality });
};

// delete request
const deletePet = async (req, res) => {
    debug('delete pet');
    res.send({ id: req.params.id });
};

module.exports = {
    createPet,
    getPets,
    updatePet,
    deletePet,
};