const debug = require('debug')('app:api');
const {Volunteer, validateVolunteer, validateVolunteerStatus} = require('../models/volunteerModel');
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
    user: req.user._id,
    status: req.params.status
    });
    let {error} = validateVolunteer(volunteer);
    if(error){
        return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    await volunteer.save();
    debug('volunteer');
    res.redirect('../requests/response');
};

//move get request to user.

const getHours = async (req, res) => {
    const userID = req.user._id;
    const user = await User.find({user: userID});
    if(!user || (user && !user.isVolunteer)){
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    
    let hours = user.volunteerHours;

    debug('get volunteer hours');
    res.send({hours});
};

//get request
const getStatus = async (req, res) => {
    const userID = req.user._id;
    const volunteers = await Volunteer.find({user: userID});
    // still not sure what params.
    if(!volunteers){
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });

    }
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
    const {error} = validateVolunteerStatus(status);
    if (error) {
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }

    const volunteer = await Volunteer.find(id);
    if(!volunteer){
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });

    }
    volunteer.status = status;
    //if status is accept make isVolunteer true and change hours to 4 hours because meshwar
    debug('change volunteer status');
    res.send({id, status });
};

module.exports = {
    volunteer,
    getHours,
    getStatus,
    updateStatus,
};