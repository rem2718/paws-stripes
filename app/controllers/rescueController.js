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
    res.send([{ requestID: "36456", status: "pending" }, { requestID: "343u56", status: "rejected" }]);
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