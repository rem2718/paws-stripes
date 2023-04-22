const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

// post request
// take the attribute names from ward
const volunteer = async (req, res) => {
    req.params.attribute
    debug('volunteer');
    res.redirect('../requests/response');
};

//get request
const getHours = async (req, res) => {
    const userID = req.params.id;
    debug('get volunteer hours');
    res.send({ hours: 4 });
};

//get request
const getStatus = async (req, res) => {
    const userID = req.params.id;
    debug('get volunteer hours');
    res.send([{ requestID: "34q56", status: "pending" }, { requestID: "343f56", status: "pending" }]);
};

const updateStatus = async (req, res) => {
    debug('change volunteer status');
    res.send({ id: req.params.id, status: req.body.status });
};

module.exports = {
    volunteer,
    getHours,
    getStatus,
    updateStatus,
};