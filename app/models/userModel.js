const mongoose = require('mongoose');
const Joi = require('joi');
const db = require('../utils/database');

const userSchema = new mongoose.Schema({
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
    email: {
        type: String, required: true, unique: true, lowercase: true, max: 255, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

},
    phoneNumber: { type: String, unique: true, required: true, match: /^05\d{8}$/ },
    password: { type: String, min: 10, max: 255, required: true },
    gender: { type: String, enum: ["male", "female", "prefer not to say"], default: "prefer not to say" },
    age: { type: Number, min: 10, max: 100, required: true },
    region: { type: String, required: true, enum: ["Riyadh", "Layla", "'Afif", "al-Duwadmi", "al-Ghat", "al-Gwayiyyah", "al-Hareeg", "Al Kharj", "Al Majmaah", "Al-Muzahmiyyah", "al-Sulayyil", "Dhruma", "Diriyyah", "Hotat Bani Tamim", "Huraymila", "Rimah", "Shagra", "Thadig", "Wadi ad-Dawasir", "Markaz", "Yabrin", "Zulfy City"] },
    adoptHistory: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Adopt' }], default: []
},
    handoverHistory: {
    type: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Handover' }
    ], default: []
},
    rescueHistory: {
    type: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Rescue' }
    ], default: []
},
    volunteerHistory: {
    type: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }
    ], default: []
},
    isAdmin: { type: Boolean, default: false, required: true },
    isVolunteer: { type: Boolean, default: false, required: true },
    volunteerHours: {
    type: Number, default: 0, min: 0, required: () => { return this.isVolunteer }, validate: {
        validator: (v) => { return Number.isInteger(v) && v >= 0 },
        message: "number of volunteer hours should be a positive integer!"
    }
}
});

const User = mongoose.model('user', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(60).pattern(/^[a-zA-Z]+$/).required(),
        lastName: Joi.string().min(3).max(60).pattern(/^[a-zA-Z]+$/).required(),
        email: Joi.string().email().required().max(255),
        phoneNumber: Joi.string().pattern(/^05\d{8}$/).required(),
        password: Joi.string().min(10).max(255).required(),
        gender: Joi.string().valid('male', 'female', 'prefer not to say').default("prefer not to say"),
        age: Joi.number().min(10).max(100).required(),
        region: Joi.string().valid('Riyadh', 'Layla', "'Afif", 'al-Duwadmi', 'al-Ghat', 'al-Gwayiyyah', 'al-Hareeg', 'Al Kharj', 'Al Majmaah', 'Al-Muzahmiyyah', 'al-Sulayyil', 'Dhruma', 'Diriyyah', 'Hotat Bani Tamim', 'Huraymila', 'Rimah', 'Shagra', 'Thadig', 'Wadi ad-Dawasir', 'Markaz', 'Yabrin', 'Zulfy City').required(),
        adoptHistory: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        handoverHistory: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        rescueHistory: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        volunteerHistory: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        isAdmin: Joi.boolean().required().default(false),
        isVolunteer: Joi.boolean().required().default(false),
        volunteerHours: Joi.number().integer().positive().min(0).when('isVolunteer', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
    });
    return schema.validate(user);
}

const validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required().max(255),
        password: Joi.string().min(10).max(255).required(),
        userType: Joi.string().required().valid('admin', 'user')
    });
    return schema.validate(user);
}

module.exports = {
    User,
    userSchema,
    validate: validateUser,
    validateLogin,
} 