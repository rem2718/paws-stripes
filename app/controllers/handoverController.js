const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

// post request
// take the attribute names from ward
const handover = async (req, res) => {
    req.body.attribute
    debug('handover');
    res.redirect('../requests/response');
};

//get request type, breed, timestamps, status
const getStatus = async (req, res) => {
    const userID = req.params.id;
    debug('get handover status');
    res.send([{ requestID: "3a456", status: "pending" }, { requestID: "343k56", status: "accepted" }]);
};

// put , reject, accept
const updateStatus = async (req, res) => {
    debug('change handover status');
    res.send({ id: req.params.id, status: req.body.status });
};

module.exports = {
    handover,
    getStatus,
    updateStatus,
};