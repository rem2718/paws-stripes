const debug = require('debug')('app:api');
const { Volunteer, validate, validateVolunteerStatus } = require('../models/volunteerModel');
const { User } = require('../models/userModel');

const volunteer = async (req, res) => {
    const volunteer = req.body;
    volunteer.user = req.user._id;
    const user = await User.findById(req.user._id);
    volunteer.userName = `${user.firstName} ${user.lastName}`;
    volunteer.status = "pending";
    volunteer.volunteerBefore = volunteer.volunteerBefore === "yes" ? true : false;

    let { error } = validate(volunteer);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    await new Volunteer(volunteer).save();
    res.redirect('../requests/response');
};

const getStatus = async (req, res) => {
    const userID = req.user._id;
    const volunteers = await Volunteer.find({ user: userID }).select({ petName: 1, petType: 1, createdAt: 1, status: 1 });
    res.send(volunteers);
};

const getStatuses = async (req, res) => {
    const volunteers = await Volunteer.find();
    res.send(volunteers);
};

const updateStatus = async (req, res) => {
    const volunteerID = req.params.id;
    const status = req.body.status;

    const { error } = validateVolunteerStatus(status);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const volunteer = await Volunteer.findById(volunteerID);
    if (!volunteer) return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    if (status === "accepted") await User.findByIdAndUpdate(volunteer.user, { isVolunteer: true, volunteerHours: 4 });
    const updatedStatus = await Volunteer.findByIdAndUpdate(volunteerID, { status: status }, { new: true }).select({ _id: 1, status: 1 });
    res.send(updatedStatus);
};

module.exports = {
    volunteer,
    getStatus,
    getStatuses,
    updateStatus,
};