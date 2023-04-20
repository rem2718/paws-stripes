const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

const handover = async (req, res) => {
    debug('handover');
    res.redirect('../requests/response');
};

//reguler get
const getStatus = async (req, res) => {
    debug('get handover status');
};

const updateStatus = async (req, res) => {
    debug('change handover status');
};

module.exports = {
    handover,
    updateStatus,
};