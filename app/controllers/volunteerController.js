const debug = require('debug')('app:api');
// const Volunteer = require('../models/volunteerModel');

const createVolunteer = async (req, res) => {
    debug('create volunteer');
    res.render('response');
};

const updateStatus = async (req, res) => {
    debug('update volunteer status');
};

module.exports = {
    createVolunteer,
    updateStatus,
};