const debug = require('debug')('app:api');
// const Experience = require('../models/experienceModel');
// TO-DO: pagination, null values
const experiences = [
    {
        _id: "123",
        petID: "1234",
        petName: "Leonard",
        image: null,
        experience: "I really liked the service everyone was nice, love my animal so much!:…",
        isAnon: false,
        likes: 5,
        userID: "12345",
        userFirstName: "Lamia",
        userLastName: "Mohammed",
    }, {
        _id: "12",
        petID: "123w4",
        petName: "Leonard",
        image: null,
        experience: "I really liked the service everyone was nice, love my animal so much!:…",
        isAnon: true,
        likes: 7,
        userID: "12345",
        userFirstName: "Lamia",
        userLastName: "Mohammed",
    }, {
        _id: "1",
        petID: "1234f",
        petName: "Leonard",
        image: null,
        experience: "I really liked the service everyone was nice, love my animal so much!:…",
        isAnon: false,
        likes: 0,
        userID: "12345",
        userFirstName: "Lamia",
        userLastName: "Mohammed",
    },

];

// post request
// take the attribute names from ward
const createExperience = async (req, res) => {
    req.body
    debug('submit an experience');
    res.redirect('../requests/response');
};

// put request 
// output number of likes, experience id
// like is just a string {"like", "remove like"}
const like = async (req, res) => {
    debug(req.body.like);
    if (req.body.like === "like") {
        var l = 9;
    } else {
        var l = 5;
    }
    res.send({ likes: l, id: req.params.id });
};

// get request
// no params
// return all experiences 
// TO-DO pagination
const getExperiences = async (req, res) => {
    
    debug('get experiences');
    res.send(experiences);
};

// get the user experiences
const getExperience = async (req, res) => {
    const userID = req.params.id;
    debug('get an experience');
    res.send(experiences);
};

// delete request
// only return the experience id
const deleteExperience = async (req, res) => {
    const experienceID = req.params.id;
    debug('delete an experience');
    res.send({ id: experienceID });
};

module.exports = {
    createExperience,
    like,
    getExperiences,
    getExperience,
    deleteExperience,
};