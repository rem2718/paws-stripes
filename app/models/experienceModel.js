const mongoose = require('mongoose');
const Joi = require('joi');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);
const User = require('./userModel');
const Pet = require('./petModel');

const experienceSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    sharePost: {type: Boolean, default: false, required: true},
    pet: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true},
    isAnon: {type: Boolean,default: false, required: true},
    numOfLikes: {type: Number, min: 0, 
        validate: {
            validator: function(v) {
              return Number.isInteger(v) && v >= 0;
            },
            message: "number of likes must be a positive integer!"
          },
        get: v => Math.round(v),
        set: v => Math.round(v)
        },
    experience: {type: String, min: 5, max: 500, trim: true,
        validate:{
            validator: function(v){
                return v && v>=5
            },
            message: "post should not be null or less than 5 characters!"
        }},
    petImage: {type: Buffer, 
        validate: {
            validator: function(v) {
            return !v || v.length <= 10485760; //10 Mb limit we can increase if we want a greater image size
        },
        message: 'Pet image size exceeds 10MB'
      }}
   
}, {timestamps: { createdAt: true, updatedAt: false }});

const Experience = mongoose.model('Experience', experienceSchema);

function validateExperience (experience){
    const schema = Joi.object({
        user: Joi.string().objectId().required(),
        sharePost: Joi.boolean().required(),
        pet: Joi.objectId().required(),
        isAnon: Joi.boolean().required(),
        numOfLikes: Joi.number().integer().min(0).required(),
        experience: Joi.string().min(5).max(500).trim().required(),
        petImage: Joi.binary().max(10485760),

    });

    return Joi.validate(experience, schema);
}

//do exports here
exports.Experience = Experience;
exports.experienceSchema = experienceSchema;
exports.validate = validateExperience;