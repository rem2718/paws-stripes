const debug = require('debug')('app:api');
const path = require('path');
const {Pet,validatePet, petSchema} = require('../models/petModel');
const {User} = require('../models/userModel');
const mongoosePaginate = require('mongoose-paginate-v2');
// TO-DO: pagination, null values



// post request
const createPet = async (req, res) => {
    const pet = new Pet(req.body);
    const {error} = validatePet(pet);
    if (error){
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    await pet.save();
    debug('create pet');
    res.redirect("/meet-our-pets");
};

// get request
// return pets
// pagination
const getPets = async (req, res) => {
    petSchema.plugin(mongoosePaginate);

    try{
        const result = await Pet.paginate({page: req.query.pageNumber, limit: req.query.pageSize});
        res.send(result);
    } catch(error){
        res.status(404).render("err-response", { err: 400, msg: 'Cat detected a bad request..' })
    }
    debug('get pets');
    
};

// put request
const updatePet = async (req, res) => {
    const petid = req.params.id;
    let pet = await Pet.findById(petid);
    if(!pet){
        res.status(404).render("err-response", { err: 404, msg: 'page not found :\( please check the URL and try again' });
    }
    pet.petAge = req.body.petAge;
    pet.petBreed = req.body.petBreed;
    pet.petImage = req.body.petImage;//work on this and change.
    pet.petName = req.body.petName;
    pet.petPersonality = req.body.petPersonality;
    pet.petType = req.body.petType;
    const {error} = validatePet(pet);
    if (error){
    return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    }
    debug('update pet');
    res.send(pet);
};

// delete request
const deletePet = async (req, res) => {
    const petid = req.params.id;
    const result = await Pet.deleteOne(petid);
    if (result.deletedCount === 1) {
        res.send({ petid});
        }
    else
            res.status(404).render("err-response", { err: 404, msg: 'Experience not deleted :\( please check the ID and try again' });
    
    debug('delete pet');
};

module.exports = {
    createPet,
    getPets,
    updatePet,
    deletePet,
};