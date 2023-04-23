const debug = require('debug')('app:api');
// const Handover = require('../models/requestModel');
var pets = [
    {
        "petID": "1234",
        "name": "Leonard",
        "type": "cat",
        "breed": "Persian",
        "age": "3 months",
        "personality": ["678", "123"],
        "image": null
    }, {
        "petID": "asdf",
        "name": "Leonard",
        "type": "cat",
        "breed": "Persian",
        "age": "3 months",
        "personality": ["hu", "asdf"],
        "image": null
    }, {
        "petID": "wert",
        "name": "Leonard",
        "type": "cat",
        "breed": "Persian",
        "age": "3 months",
        "personality": ["fun", "social"],
        "image": null
    }];

// get request(tho its wrong here but i wont create a form for this nor fetch)
// you can get the userID from the session TO-DO
// for now get it from cookies
const adopt = async (req, res) => {
    const petID = req.params.id;
    const userID = req.cookies.userID
    debug('adopt');
    res.redirect('/requests/response');
};

// post req
// submit adoption form
const recommend = async (req, res) => {
    req.body;
   
    debug('recommend');
    res.render('recommendation', { cookies: req.cookies || false, body: req.body});
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
    res.send([{ requestID: "3456", status: "pending" }, { requestID: "34s356", status: "pending" }]);
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