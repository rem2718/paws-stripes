const debug = require('debug')('app:api');
// const Pets = require('../models/petModel');

const createPet = async (req, res) => {
    debug('create pet');
}

const getPets = async (req, res) => {
    debug('get pets');
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