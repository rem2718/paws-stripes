const debug = require('debug')('app:api');
const path = require('path');
// const Pets = require('../models/petModel');

var pets = [
    {
        "petID": "1234",
        "name": "Leonard",
        "type": "cat",
        "breed": "Persian",
        "age": "3 months",
        "personality": ["fun", "social"],
        "likes": ["banana", "toys"],
        "dislikes": ["sun", "babies"],
        "image": null
    }, {
        "petID": "123w4",
        "name": "Leonard",
        "type": "cat",
        "breed": "Persian",
        "age": "3 months",
        "personality": ["fun", "social"],
        "likes": ["banana", "toys"],
        "dislikes": ["sun", "babies"],
        "image": null
    }, {
        "petID": "12g34",
        "name": "Leonard",
        "type": "cat",
        "breed": "Persian",
        "age": "3 months",
        "personality": ["fun", "social"],
        "likes": ["banana", "toys"],
        "dislikes": ["sun", "babies"],
        "image": null
    }];

// post request
const createPet = async (req, res) => {
    debug('create pet');
    res.redirect("/meet-our-pets");
};

// get request
// return pets
const getPets = async (req, res) => {
    debug('get pets');
    res.send(pets);
};

// POST request
const updatePet = async (req, res) => {
    debug('update pet');
    res.send(req.body);
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