const debug = require('debug')('app:api');
const {Volunteer, validate, validateVolunteerStatus} = require('../models/volunteerModel');
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
    let {error} = validate(volunteer);
    if(error){
        return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    const volunteerModel = volunteer;
    await volunteerModel.save();
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


const getStatuses = async (req, res) => {
    const userID = req.user;
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
    const user = await User.findById(volunteer.user)
    const updatedStatus = await Volunteer.findByIdAndUpdate(id, {status: status}, { new: true });
    if(status == "approved"){
        const updatedUser = await User.findByIdAndUpdate(volunteer.user, {isVolunteer: true, volunteerHours: 4}, {new: true});
        res.send(updatedStatus, updatedUser);
    }
    
    debug('change volunteer status');
    res.send(updatedStatus);
};

module.exports = {
    volunteer,
    getStatus,
    getStatuses,
    updateStatus,
};