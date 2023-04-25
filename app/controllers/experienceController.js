const debug = require('debug')('app:api');
const {Experience, validateExperience} = require('../models/experienceModel');
// TO-DO: pagination, null values

// post request
// take the attribute names from ward
const createExperience = async (req, res) => {
    const experience = new Adopt(req.body);
    const {error} = validateExperience(experience);
    if (error){
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    debug('submit an experience');
    res.redirect('../requests/response');
};

// put request 
// output number of likes, experience id
// like is just a string {"like", "remove like"}
const like = async (req, res) => {
    const experience = req.params.id;
    let likes = expereince.numOfLikes;
    if (req.body.like === "like") {
        likes++;
    } else {
        likes--;
    }
    debug(req.body.like);

    res.send({experience, likes});

    //catch error here later!!
};

// get request
// no params
// return all experiences 
// TO-DO pagination-check from reem first
const getExperiences = async (req, res) => {
    
    debug('get experiences');
    res.send({experiences, end:false});

};

// get the user experiences
const getExperience = async (req, res) => {
    const userID = req.user;
    const experience = await Experience.findById(userID);
    debug('get an experience');
    res.send({experiences, end:false});
    //do error handling here!
};

// delete request
// only return the experience id
const deleteExperience = async (req, res) => {
    const experienceID = req.params.id;
    const result = await Experience.deleteOne(experienceID);
    debug('delete an experience');
    res.send({ id: experienceID });
};

module.exports = {
    createExperience,
    like,
    getExperiences,
    getExperience,
    deleteExperience,
};