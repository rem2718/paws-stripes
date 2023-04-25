const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

// post request
// take the attribute names from ward
const rescue = async (req, res) => {
    req.params.attribute
    debug('rescue');
    res.redirect('../requests/response');
};

// get request, same as handover
const getStatus = async (req, res) => {
    const userID = req.params.id;
    debug('get rescue status');
    res.send([{ type: "gg", breed: "ghgfd", timestamp: "2:00am", status: "pending" }, { type: "asdf", breed: "ghgfd", timestamp: "2:00am", status: "pending" }]);
};

const updateStatus = async (req, res) => {
    debug('change rescue status');
    res.send({ id: req.params.id, status: req.body.status });
};

module.exports = {
    rescue,
    getStatus,
    updateStatus,
};