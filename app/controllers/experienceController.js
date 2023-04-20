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
const createExperience = async (req, res) => {
    debug('submit an experience');
    res.redirect('../requests/response');
};

const like = async (req, res) => {
    if (req.body.like === "like") {
        // increment likes
    } else {
        // decrement likes
    }
    res.send({ likes: 5, id: req.params.id });
};

const getExperiences = async (req, res) => {
    debug('get experiences');
    res.send(experiences);
};

const getExperience = async (req, res) => {
    debug('get an experience');
    res.send(experiences);
};

const deleteExperience = async (req, res) => {
    // delete experience
    debug('delete an experience');
    res.send({ id: req.params.id });
};

module.exports = {
    createExperience,
    like,
    getExperiences,
    getExperience,
    deleteExperience,
};