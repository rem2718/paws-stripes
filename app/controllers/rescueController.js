const debug = require('debug')('app:api');
const {Rescue, validate, validateRescueStatus}= require('../models/rescueModel');
const {User} = require('../models/userModel');

const rescue = async (req, res) => {
    const rescue = req.body;
    if(req.user) rescue.user = req.user._id;
    rescue.isSick = rescue.isSick === "yes"? true: false;
    rescue.canFoster = rescue.canFoster === "yes"? true: false;
    rescue.status = "pending";
    rescue.image = req.file.buffer; 

    let {error} = validate(rescue); debug(error);
    if(error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const newRescue = await new Rescue(rescue).save();
    await User.findByIdAndUpdate(req.user._id, { $push: { rescueHistory: newRescue._id } });
    res.redirect('../requests/response');
};

const getStatus = async (req, res) => {
    const userID = req.user._id;
    const rescues = await Rescue.find({user: userID}).select({petName:1, petType:1, createdAt:1, status:1});
    res.send(rescues);
};

const getStatuses = async (req, res) => {
    const rescues = await Rescue.find().select({ image: 0 });
    res.send(rescues);
};

const getPetImage = async (req, res) => {
    const rescueID = req.params.id;
    const rescue = await Rescue.findById(rescueID);
    if (!rescue) {
        return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    res.set('Content-Type', "png");
    res.send(rescue.image);
}

const updateStatus = async (req, res) => {
    const rescueID = req.params.id;
    const status = req.body.status;

    const { error } = validateRescueStatus(status);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const rescue = await Rescue.findById(rescueID);
    if (!rescue) return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });

    const updatedStatus = await Rescue.findByIdAndUpdate(rescueID, { status: status }, { new: true }).select({ _id: 1, status: 1 });
    res.send(updatedStatus);
};

module.exports = {
    rescue,
    getStatus,
    getStatuses,
    getPetImage,
    updateStatus,
};