const debug = require('debug')('app:api');
const {Rescue, validateRescue}= require('../models/rescueModel');
const {User} = require('../models/userModel');

// post request
// take the attribute names from ward
const rescue = async (req, res) => {

   
    const rescue = new Rescue({
        isSick: req.params.isSick,
        canFoster: req.parms.canFoster,
        dateOfRescue: req.params.dateOfRescue,
        rescuerPhone: req.params.rescuerPhone,
        rescueAddress:req.params.rescueAddress,
        status: req.params.status,
        petImage: req.params.petImage,
        petType: req.params.petType
    });
    let {error} = validateRescue(rescue);
    if(error){
        return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    debug('rescue');
    res.redirect('../requests/response');
};

// get request, same as handover
const getStatus = async (req, res) => {
    const userID = req.user;
    const rescues = await Rescue.find({user: userID});
   
    //type, breed, timestamp, status,
    
    const rescueRequests = rescues.map(rescue => ({
        type: rescue.petType,
        createdAt: rescue.createdAt,
        status: rescue.status
    }));
    debug('get rescue status');
    res.send([rescueRequests]);
};

const updateStatus = async (req, res) => {
    let status = req.body.status;
    const reqID = req.params.id;
    let rescue = await Rescue.findById(reqID);
    //if error here
    rescue.status = status;

    debug('change rescue status');
    res.send({ reqID, status});
};

module.exports = {
    rescue,
    getStatus,
    updateStatus,
};