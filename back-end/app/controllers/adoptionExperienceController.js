const debug = require('debug')('app:api');
// const Experience = require('../models/adoptionExperienceModel');

const getExperiences = async (req, res) => {
    debug('get experiences');
};

const submitExperience = async (req, res) => {
    debug('submit an experience');
};

exports = {
    getExperiences,
    submitExperience,
}