const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

const request = async (req, res) => {
    debug('request');
    res.render('response');
};

const getStatus = async (req, res) => {
    debug('get request status');
};

const updateStatus = async (req, res) => {
    debug('change request status');
};

module.exports = {
    request,
    updateStatus,
};