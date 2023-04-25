const debug = require('debug')('app:api');
const {Handover, validateHandover} = require('..models/handoverModel');
const {User} = require('../models/userModel');

// post request
// take the attribute names from ward
const handover = async (req, res) => {
    const handover = new Handover(req.body);
    const {error} = validateHandover(handover);
    if (error){
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    debug('handover');
    res.redirect('../requests/response');
};

//breed, timestamps, status
const getStatus = async (req, res) => {
    const userID = req.user;
    try{
        const user = await User.findById(userID);
        const handoverRequests = user.handoverHistory;

        const arrayOfRequests = await handoverRequests.map(
            async(ObjectId) =>{
                const request = await Handover.findById(ObjectId);
                return {ObjectId: ObjectId, status: request.status, timeCreated: request.timestamps};
            });
            
            res.status(200).send([arrayOfRequests]);
        } catch(error){
            //i'll do this later
        }
    debug('get handover status');
    //res.send([{ type: "gg", breed: "ghgfd", timestamp: "2:00am", status: "pending" }, { type: "asdf", breed: "ghgfd", timestamp: "2:00am", status: "pending" }]);

};

// put , reject, accept
const updateStatus = async (req, res) => {
    const handoverid = req.params.id;
    const status = req.body.status;
    const handover = await Handover.findById(handoverid);
    handover.status = status;
    debug('change handover status');
    res.send({handoverid, status});
};

module.exports = {
    handover,
    getStatus,
    updateStatus,
};