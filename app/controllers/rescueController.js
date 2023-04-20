const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

// post request
// take the attribute names from ward
const rescue = async (req, res) => {
    req.params.attribute
    debug('rescue');
    res.redirect('../requests/response');
};

//reguler get
const getStatus = async (req, res) => {
    debug('get rescue status');
};

const updateStatus = async (req, res) => {
    debug('change rescue status');
};

module.exports = {
    rescue,
    updateStatus,
};