const debug = require('debug')('app:api');
// const Experience = require('../models/experienceModel');
// TO-DO: pagination, null values
const experiences = [
    {
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
        petID: "123w4",
        name: "Leonard",
        image: null,
        experience: "I really liked the service everyone was nice, love my animal so much!:…",
        isAnon: true,
        likes: 7,
        userID: "12345",
        userFirstName: "Lamia",
        userLastName: "Mohammed",
    }, {
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
    debug('like or remove like');
};

const getExperiences = async (req, res) => {
    debug('get experiences');
    res.send(experiences);
};

const getExperience = async (req, res) => {
    debug('get an experience');
    res.render('adoption-experiences', { isLoggedIn: req.cookies.isLoggedIn || false });
};

const deleteExperience = async (req, res) => {
    debug('delete an experience');
};

module.exports = {
    createExperience,
    like,
    getExperiences,
    getExperience,
    deleteExperience,
};