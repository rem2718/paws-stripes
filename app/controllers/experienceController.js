const debug = require('debug')('app:api');
const { Experience,  validate } = require('../models/experienceModel');
const {User} = require('../models/userModel');
// TO-DO: pagination, null values

// post request
const createExperience = async (req, res) => {
    const experience = req.body;
    experience.image = req.file.buffer; 

    const { error } = validate(experience);
    if (error) {
        return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    const experienceModel = new Experience(experience);
    await experienceModel.save();
    debug('submit an experience');
    res.redirect('../requests/response');
};

// put request 
// output number of likes, experience id
// like is just a string {"like", "remove like"}
const like = async (req, res) => {
    const experienceID = req.params.id;
    const experience = await Experience.findById(experienceID);
    if (!experience) {
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    let likes = experience.numOfLikes;
    if (req.body.like === "like") {
        likes++;
    } else {
        likes--;
    }
    if (likes < 0) {
        return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    debug(req.body.like);

    res.send({ experience, likes });
};

const getExperiences = async (req, res) => {

    debug('get experiences');
    
    let page = req.query.pageNumber;
    let limit = req.query.pageSize;

    try {
        const experiences = await Experience.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .select({ image: 0 });

        return res.status(200).send({ experiences, end: true });
    } catch (error) {
        debug(error);
        return res.status(404).send({ message: "no experiences" })
    }
};

// get the user experiences
const getExperience = async (req, res) => {
    const userID = req.user._id;
    const experience = await Experience.findById(userID);
    if (!experience) {
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    debug('get an experience');
    res.send([experience]); //do pagination here
};

const getExperienceImage = async (req, res) => {
    const experienceID = req.params.id;
    const experience = await Experience.findById(experienceID);
    if (!experience) {
        return res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    res.set('Content-Type', "png");
    res.send(experience.image);
}

// delete request
// only return the experience id
const deleteExperience = async (req, res) => {
    const experienceID = req.params.id;
    const experience = await Experience.findById(experienceID);
    if(!experience)
         res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    
    const userID = req.user._id;
    const user = await User.findById(userID);
    if(user.isAdmin == true || user.isAdmin == false && experience.user == userID){
        const result = await Experience.findByIdAndDelete(experienceID);
        if (result)
        return res.send({ _id: experienceID });
    }
    else {
        res.status(403).render("err-response", {err:403, msg: 'access denied... forbidden' });
    }



    debug('delete an experience');
};

module.exports = {
    createExperience,
    like,
    getExperiences,
    getExperience,
    getExperienceImage,
    deleteExperience,
};