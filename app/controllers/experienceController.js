const debug = require('debug')('app:api');
// const Experience = require('../models/experienceModel');

const createExperience = async (req, res) => {
    debug('submit an experience');
    res.render('response');
};

const getExperiences = async (req, res) => {
    debug('get experiences');
    res.render('adoption-experiences');
};

const getExperience = async (req, res) => {
    debug('get an experience');
    res.render('adoption-experiences');
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