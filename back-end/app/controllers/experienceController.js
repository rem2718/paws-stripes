const debug = require('debug')('app:api');
// const Experience = require('../models/experienceModel');

const createExperience = async (req, res) => {
    debug('submit an experience');
};

const getExperiences = async (req, res) => {
    debug('get experiences');
};

const getExperience = async (req, res) => {
    debug('get an experience');
};

const deleteExperience = async (req, res) => {
    debug('delete an experience');
};

module.exports = {
    createExperience,
    getExperiences,
    getExperience,
    deleteExperience,
};