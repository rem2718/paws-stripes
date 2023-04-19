const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

const rescue = async (req, res) => {
    debug('rescue');
    res.render('response');
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