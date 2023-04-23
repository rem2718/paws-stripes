const mongoose = require('mongoose');
const Joi = require('joi');
const Adopt = require('./adoptModel');
const Handover = require('./handoverModel');
const Rescue = require('./rescueModel');
const Volunteer = require('./volunteerModel');
//mongoose.connect('mongodb://localhost/playground').then(() => console.log('Connected to MongoDB...'))
//.catch(err => console.error('Could not connect to mongo db...', err));

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, min: 3, max: 60, validate:{
        validator:{
            function(v){
                return /^[a-zA-Z]+$/.test(v);
            },
            message: "First name must contain only letters!"
        }
    }},
    lastName: {type: String, required: true, min: 3, max: 60, validate:{
        validator:{
            function(v){
                return /^[a-zA-Z]+$/.test(v);
            },
            message: "Last name must contain only letters!"
        }
    }},
    email: {type: String, required: true, unique: true, lowercase: true, max: 255, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/}, validate:{
        validator: {
            function(v){
                return v && v>3;
            },
            message: "invalid email address"
        }
    },
    phoneNumber: {type: String, unique: true, required: true, match:/^05\d{8}$/},
    password: {type: String, min:10, max:255, required: true},
    gender: {type: String, enum: ["male", "female", "prefer not to say"]},
    region: {type: String, required: true,  enum:[ "Riyadh",  "Layla",  "'Afif",  "al-Duwadmi",  "al-Ghat",  "al-Gwayiyyah",  "al-Hareeg",  "Al Kharj",  "Al Majmaah",  "Al-Muzahmiyyah",  "al-Sulayyil",  "Dhruma",  "Diriyyah",  "Hotat Bani Tamim",  "Huraymila",  "Rimah",  "Shagra",  "Thadig",  "Wadi ad-Dawasir",  "Markaz",  "Yabrin",  "Zulfy City"]},
    adoptHistory:{type:[
        {type:mongoose.Schema.Types.ObjectId, ref: 'Adopt'}
    ], default: []},
    handoverHistory:{type:[
        {type:mongoose.Schema.Types.ObjectId, ref:'Handover'}
    ], default: []},
    rescueHistory:{type:[
        {type:mongoose.Schema.Types.ObjectId, ref: 'Rescue'}
    ], default:[]},
    volunteerHistory:{type:[
        {type:mongoose.Schema.Types.ObjectId, ref: 'Volunteer'}
    ], default:[]},
    isAdmin: {type: Boolean, default: false, required: true},
    isVolunteer: {type: Boolean, default: false, required: true},
    volunteerHours: {type: Number, default: 0, min: 0, required: function(){
        return this.isVolunteer;
    }, validate: {
        validator:{
            function(v){
                return Number.isInteger(v) && v >= 0;
            },
            message: "number of volunteer hours should be a positive integer!"
        }
    }}
})

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(60).pattern(/^[a-zA-Z]+$/).required(),
        lastName: Joi.string().min(3).max(60).pattern(/^[a-zA-Z]+$/).required(),
        email: Joi.string().email().required().max(255),
        phoneNumber: Joi.string().pattern(/^05\d{8}$/).required(),
        password: Joi.string().min(10).max(255).required(),
        gender: Joi.string().valid('male', 'female', 'prefer not to say'),
        region: Joi.string().valid('Riyadh', 'Layla', "'Afif", 'al-Duwadmi', 'al-Ghat', 'al-Gwayiyyah', 'al-Hareeg', 'Al Kharj', 'Al Majmaah', 'Al-Muzahmiyyah', 'al-Sulayyil', 'Dhruma', 'Diriyyah', 'Hotat Bani Tamim', 'Huraymila', 'Rimah', 'Shagra', 'Thadig', 'Wadi ad-Dawasir', 'Markaz', 'Yabrin', 'Zulfy City').required(),
        adoptHistory: Joi.array().items(Joi.string().objectId()),
        handoverHistory: Joi.array().items(Joi.string().objectId()),
        rescueHistory: Joi.array().items(Joi.string().objectId()),
        volunteerHistory: Joi.array().items(Joi.string().objectId()),
        isAdmin: Joi.boolean().required().default(false),
        isVolunteer: Joi.boolean().required().default(false),
        volunteerHours: Joi.number().integer().positive().min(0).when('isVolunteer', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
});
    return Joi.validate(user, schema)
}

//exports
exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;