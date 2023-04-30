const debug = require('debug')('app:api');
const { Handover, validate, validateHandoverStatus } = require('../models/handoverModel');
const { User } = require('../models/userModel');

const handover = async (req, res) => {
    const handover = req.body;
    handover.image = req.file.buffer;
    handover.user = req.user._id;
    const user = await User.findById(req.user._id);
    handover.userName = `${user.firstName} ${user.lastName}`;
    handover.canFoster = req.canFoster === "yes" ? true : false;
    handover.status = "pending";
    debug(handover);

    const { error } = validate(handover);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const newHandover = await new Handover(handover).save();
    await User.findByIdAndUpdate(req.user._id, { $push: { handoverHistory: newHandover._id } });

    res.redirect('../requests/response');
};

const getStatus = async (req, res) => {
    const userID = req.user._id;
    const handovers = await Handover.find({ user: userID }).select({ petName: 1, petType: 1, createdAt: 1, status: 1 });
    res.send(handovers);
};

const getStatuses = async (req, res) => {
    const handovers = await Handover.find().select({ image: 0 });
    res.send(handovers);
};

const getPetImage = async (req, res) => {
    const handoverID = req.params.id;
    const handover = await Handover.findById(handoverID);
    if (!handover) {
        return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    res.set('Content-Type', "png");
    res.send(handover.image);
}

const updateStatus = async (req, res) => {
    const handoverID = req.params.id;
    const status = req.body.status;

    const { error } = validateHandoverStatus(status);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const handover = await Handover.findById(handoverID);
    if (!handover) return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });

    const updatedStatus = await Handover.findByIdAndUpdate(handoverID, { status: status }, { new: true }).select({ _id: 1, status: 1 });
    res.send(updatedStatus);
};

module.exports = {
    handover,
    getStatus,
    getStatuses,
    getPetImage,
    updateStatus,
};