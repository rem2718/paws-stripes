const debug = require('debug')('app:api');
const {Experience, validateExperience} = require('../models/experienceModel');
// TO-DO: pagination, null values

// post request
const createExperience = async (req, res) => {
    const experience = new Experience(req.body);
    const {error} = validateExperience(experience);
    if (error){
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    await experience.save();
    debug('submit an experience');
    res.redirect('../requests/response');
};

// put request 
// output number of likes, experience id
// like is just a string {"like", "remove like"}
const like = async (req, res) => {
    const experienceID = req.params.id;
    const experience = await Experience.findById(experienceID);
    if(!experience){
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    let likes = experience.numOfLikes;
    if (req.body.like === "like") {
        likes++;
    } else {
        likes--;
    }
    if(likes<0){
        return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    debug(req.body.like);

    res.send({experience, likes});
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
    const userID = req.user._id;
    const experience = await Experience.findById(userID);
    if(!experience){
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    debug('get an experience');
    res.send([experience]); //do pagination here
};

// delete request
// only return the experience id
const deleteExperience = async (req, res) => {
    const experienceID = req.params.id;
    const result = await Experience.deleteOne(experienceID);
    debug('delete an experience');
    if (result.deletedCount === 1) {
    res.send({ id: experienceID });
    }
    else
    res.status(404).render("err-response", { err: 404, msg: 'Experience not deleted :\( please check the ID and try again' });
};

module.exports = {
    createExperience,
    like,
    getExperiences,
    getExperience,
    deleteExperience,
};