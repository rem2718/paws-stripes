const debug = require('debug')('app:api');
const path = require('path');
// const Pets = require('../models/petModel');

const createPet = async (req, res) => {
    debug('create pet');
}

const getPets = async (req, res) => {
    debug('get pets');
    res.render('meet-our-pets', { isLoggedIn: req.cookies.isLoggedIn || false });
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