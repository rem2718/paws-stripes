const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');
var pets = [
    {
        "petID": "1234",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    },  {
        "petID": "12wert34",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    },  {
        "petID": "123sdf4",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    }, ];

// get request(tho its wrong here but i wont create a form for this nor fetch)
// you can get the userID from the session TO-DO
// for now get it from cookies
const adopt = async (req, res) => {
    const petID = req.params.id;
    const userID = req.user._id
    debug('adopt');
    res.redirect('/requests/response');
};

// post req
// submit adoption form
const recommend = async (req, res) => {
    req.body;

    debug('recommend');
    res.render('recommendation', { cookies: req.cookies.token, user: req.user, adoptID: "123" });
}

// get req
// we need to check the adoptID with the session
const getRecommendations = async (req, res) => {
    const adoptID = req.params.adoptID;
    // logic(body)
    debug("get recommendation");
    res.send(pets);
}

// get request (name, timestamps, status)
const getStatus = async (req, res) => {
    const userID = req.params.id;
    debug('get adopt status');
    res.send([{ type: "gg", breed: "ghgfd", timestamp: "2:00am", status: "pending" }, { type: "asdf", breed: "ghgfd", timestamp: "2:00am", status: "pending" }]);
};

// put req (accept, reject)
const updateStatus = async (req, res) => {
    debug('change adopt status');
    res.send({ id: req.params.id, status: req.body.status });
};

module.exports = {
    adopt,
    recommend,
    getRecommendations,
    getStatus,
    updateStatus,
};