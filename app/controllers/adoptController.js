const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');

// get request(tho its wrong here but i wont create a form for this nor fetch)
// you can get the userID from the session TO-DO
// for now get it from cookies
const adopt = async (req, res) => {
    const petID = req.params.id;
    const userID = req.cookies.userID
    debug('adopt');
    res.redirect('/requests/response');
};

// leave it for now TO-DO
const recommend = async (req, res) => {
    debug('recommend');
    res.render('recommendation', { cookies: req.cookies || false });
}

// get request
const getStatus = async (req, res) => {
    const userID = req.params.id;
    debug('get adopt status');
    res.send({requestID:"3456", status: "pending"});
};

// api
const updateStatus = async (req, res) => {
    debug('change adopt status');
};

module.exports = {
    adopt,
    recommend,
    getStatus,
    updateStatus,
};