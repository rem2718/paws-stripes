const debug = require('debug')('app:api');
const {Volunteer, validateVolunteer} = require('../models/volunteerModel');
const {User, validate} = require('../models/userModel');
// post request
// take the attribute names from ward
const volunteer = async (req, res) => {
    
    const volunteer = new Volunteer({
    volunteerBefore: req.params.volunteerBefore,
    timeVolunteerBefore: req.params.timeVolunteerBefore,
    animalsFamiliarWith: req.params.animalsFamiliarWith,
    volunteerTime: req.params.volunteerTime,
    volunteerInterests: req.params.volunteerInterests,
    user: req.user,
    status: req.params.status
    });
    let {error} = validateVolunteer(volunteer);
    if(error){
        return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    debug('volunteer');
    res.redirect('../requests/response');
};

//get request
const getStatus = async (req, res) => {
    const userID = req.user;
    const volunteers = await Volunteer.find({user: userID});
    // still not sure what params.
    
const volunteerRequests = volunteers.map(volunteer => ({
    id: volunteer._id,
    createdAt: volunteer.createdAt,
    status: volunteer.status
}));
    debug('get volunteer hours');

    res.send([volunteerRequests]);

   // res.send([{ type: "gg", breed: "ghgfd", timestamp: "2:00am", status: "pending" }, { type: "asdf", breed: "ghgfd", timestamp: "2:00am", status: "pending" }]);

};

//get request
const getStatuses = async (req, res) => {
    const userID = req.user;
    const volunteers = await Volunteer.find({user: userID});
    // still not sure what params.
    
const volunteerRequests = volunteers.map(volunteer => ({
    id: volunteer._id,
    createdAt: volunteer.createdAt,
    status: volunteer.status
}));
    debug('get volunteer hours');

    res.send([volunteerRequests]);

   // res.send([{ type: "gg", breed: "ghgfd", timestamp: "2:00am", status: "pending" }, { type: "asdf", breed: "ghgfd", timestamp: "2:00am", status: "pending" }]);

};

const updateStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const volunteer = await Volunteer.find(id);
    volunteer.status = status;

    debug('change volunteer status');
    res.send({id, status });
};

module.exports = {
    volunteer,
    getStatus,
    getStatuses,
    updateStatus,
};