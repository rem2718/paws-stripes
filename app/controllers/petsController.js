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
        "petID": "1234",
        "name": "Leonard",
        "type": "cat",
        "breed": "Persian",
        "age": "3 months",
        "personality": ["fun", "social"],
        "likes": ["banana", "toys"],
        "dislikes": ["sun", "babies"],
        "image": null
    }];


const createPet = async (req, res) => {
    debug('create pet');
};

const getPets = async (req, res) => {
    debug('get pets');
    res.render('meet-our-pets', { isLoggedIn: req.cookies.isLoggedIn || false, pets });
};

const updatePet = async (req, res) => {
    debug('update pet');
};

const deletePet = async (req, res) => {
    debug('delete pet');
};

module.exports = {
    createPet,
    getPets,
    updatePet,
    deletePet,
};