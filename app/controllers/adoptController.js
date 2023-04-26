const debug = require('debug')('app:api');
const {Pet} = require('../models/petModel');
const {User} = require('../models/userModel');
const {Adopt, validateAdopt} = require('../models/adoptModel')

// const Handover = require('../models/requestModel');

var pets = [
    {
        "petID": "1234",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    },  {
        "petID": "12wert34",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    },  {
        "petID": "123sdf4",
        "petName": "Leonard",
        "petType": "cat",
        "petBreed": "Persian",
        "petAge": "3 months",
        "petPersonality": ["678", "123"],
        "petImage": null
    }, ];

// get request(tho its wrong here but i wont create a form for this nor fetch)
// you can get the userID from the session TO-DO
// for now get it from cookies
const adopt = async (req, res) => {
    const petID = req.params.id;
    const userID = req.cookies.userID
    debug('adopt');
    const user = await User.findById(userID);
    
    const userPhone = user.phoneNumber;
    const adopt = new Adopt({
        user: userID, 
        pet: petID,
        status: "pending",
        phone: userPhone});
    const {error} = validateAdopt(adopt);
    if (error) 
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    
    
    res.redirect('/requests/response');
};

// post req
// submit adoption form
const recommend = async (req, res) => {
    req.body;

    debug('recommend');
    res.render('recommendation', { cookies: req.cookies.token, user: req.user, adoptID: "123" });
}

// get req
// we need to check the adoptID with the session
const getRecommendations = async (req, res) => {
    const adoptID = req.params.adoptID;
    // logic(body)
    debug("get recommendation");
    res.send(pets);
}

// get request (name, timestamps, status)
const getStatus = async (req, res) => {
  
        const userID = req.user;
        const adopts = await Adopt.find({user: userID});
       
        //type, breed, timestamp, status,
        
        const adoptRequests = adopts.map(adopt => ({
            type: adopt.pet.petType,
            breed: adopt.pet.petBreed,
            createdAt: adopt.createdAt,
            status: adopt.status
        }));
        
    
    debug('get adopt status');

    res.send([adoptRequests]);

    

//    res.send([{ type: "gg", breed: "ghgfd", timestamp: "2:00am", status: "pending" }, { type: "asdf", breed: "ghgfd", timestamp: "2:00am", status: "pending" }]);

};

// put req (accept, reject)
const updateStatus = async (req, res) => {
    const adoptid = req.params.id;
    const status = req.body.status;
    const adopt = await Adopt.findById(adoptid);
    adopt.status = status;
    debug('change adopt status');
    res.send(adopt);
};

module.exports = {
    adopt,
    recommend,
    getRecommendations,
    getStatus,
    updateStatus,
};