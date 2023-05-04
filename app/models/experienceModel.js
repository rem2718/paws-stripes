const mongoose = require('mongoose');
const Joi = require('joi');

const experienceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: {
        type: String, required: true, min: 3, max: 60, validate: {
            validator: (v) => { return /^[a-zA-Z]+$/.test(v); },
            message: "First name must contain only letters!"
        }
    },
    lastName: {
        type: String, required: true, min: 3, max: 60, validate: {
            validator: (v) => { return /^[a-zA-Z]+$/.test(v); },
            message: "Last name must contain only letters!"
        }
    },
    sharePost: { type: Boolean, default: false, required: true },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    petName: { type: String, min: 5, max: 50, trim: true, required: true, default: "Nemo" },
    isAnon: { type: Boolean, default: false, required: true },
    numOfLikes: {
        type: Number, min: 0,
        validate: {
            validator: function (v) {
                return Number.isInteger(v) && v >= 0;
            },
            message: "number of likes must be a positive integer!"
        },
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    experience: {
        type: String, min: 5, max: 500, trim: true,
        validate: {
            validator: function (v) {
                return v && v.length >= 5 && v.length <= 500
            },
            message: "post should not be null or less than 5 characters!"
        }
    },
    image: {
        type: Buffer,
        validate: {
            validator: function (v) {
                return !v || v.length <= 10485760; //10 Mb limit we can increase if we want a greater image size
            },
            message: 'Pet image size exceeds 10MB'
        }
    }

}, { timestamps: { createdAt: true, updatedAt: false } });

const Experience = mongoose.model('Experience', experienceSchema);

function validateExperience(experience) {
    const schema = Joi.object({
        user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
        firstName: Joi.string().min(3).max(60).pattern(/^[a-zA-Z]+$/).required(),
        lastName: Joi.string().min(3).max(60).pattern(/^[a-zA-Z]+$/).required(),
        sharePost: Joi.boolean().required(),
        pet: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
        petName: Joi.string().min(3).max(50).trim().required().pattern(/^[a-zA-Z\s]*$/),
        isAnon: Joi.boolean().required(),
        numOfLikes: Joi.number().integer().min(0).required(),
        experience: Joi.string().min(5).max(500).trim().required(),
        image: Joi.binary().max(10485760),

    });

    return schema.validate(experience);
}

module.exports = {
    Experience,
    validate: validateExperience
}

