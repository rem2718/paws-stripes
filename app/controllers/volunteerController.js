const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

// post request
// take the attribute names from ward
const volunteer = async (req, res) => {
    req.params.attribute
    debug('volunteer');
    res.redirect('../requests/response');
};

//reguler get
const getStatus = async (req, res) => {
    debug('get volunteer status');
};

const updateStatus = async (req, res) => {
    debug('change volunteer status');
};

module.exports = {
    volunteer,
    updateStatus,
};