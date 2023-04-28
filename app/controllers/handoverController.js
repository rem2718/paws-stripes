const debug = require('debug')('app:api');
const {Handover, validateHandover, validateHandoverStatus} = require('../models/handoverModel');
const {User} = require('../models/userModel');

// post request
// take the attribute names from ward
const handover = async (req, res) => {
    const handover = new Handover(req.body);
    const {error} = validateHandover(handover);
    if (error){
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    await handover.save();
    debug('handover');
    res.redirect('../requests/response');
};

//breed, timestamps, status
const getStatus = async (req, res) => {
    const userID = req.user._id;
    const handovers = await Handover.find({user: userID});
    if(!handovers){
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    //type, breed, timestamp, status,
    
    const handoverRequests = handovers.map(handover => ({
        type: handover.pet.petType,
        breed: handover.pet.petBreed,
        createdAt: handover.createdAt,
        status: handover.status
    }));
    debug('get handover status');
    res.send([handoverRequests])

   // res.send([{ type: "gg", breed: "ghgfd", timestamp: "2:00am", status: "pending" }, { type: "asdf", breed: "ghgfd", timestamp: "2:00am", status: "pending" }]);

};

//breed, timestamps, status
const getStatuses = async (req, res) => {
    const userID = req.user;
    const handovers = await Handover.find({user: userID});
   
    //type, breed, timestamp, status,
    
    const handoverRequests = handovers.map(handover => ({
        type: handover.pet.petType,
        breed: handover.pet.petBreed,
        createdAt: handover.createdAt,
        status: handover.status
    }));
    debug('get handover status');

    res.send([handoverRequests])

   // res.send([{ type: "gg", breed: "ghgfd", timestamp: "2:00am", status: "pending" }, { type: "asdf", breed: "ghgfd", timestamp: "2:00am", status: "pending" }]);
};


// put , reject, accept
const updateStatus = async (req, res) => {
    const handoverid = req.params.id;
    const status = req.body.status;
    const {error} = validateHandoverStatus(status);
    if (error) {
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    const handover = await Handover.findById(handoverid);
    if(!handover){
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    handover.status = status;
    debug('change handover status');
    res.send({handoverid, status});
};

module.exports = {
    handover,
    getStatus,
    getStatuses,
    updateStatus,
};