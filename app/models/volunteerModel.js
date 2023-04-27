const mongoose = require('mongoose');
const Joi = require('joi');
const User = require('./userModel');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);
//mongoose.connect('mongodb://localhost/playground').then(() => console.log('Connected to MongoDB...'))
//.catch(err => console.error('Could not connect to mongo db...', err));

const volunteerSchema = new mongoose.Schema({
    volunteerBefore: { type: Boolean, default: false, required: true },
    timeVolunteerBefore: {
        type: Number, min: 0, required: function () {
            return this.volunteerBefore;
        }, validate: {
            validator: function (v) {
                return Number.isInteger(v) && v >= 0;
            },
            message: "number of months of experience must be a positive integer!"
        }
        , get: v => Math.round(v),
        set: v => Math.round(v)
    },
    animalsFamiliarWith: {
        type:
            [{
                type: String, trim: true, enum:
                    ["cat", "dog", "rabbit", "fish", "turtle", "hamster", "guinea pig", "bird", "frog"]
            }], default: []
    },
    volunteerTime: {
        type: String, enum: ["day", "night"], trim: true, default: "day", required: true
    },
    volunteerInterests: {
        type: [
            { type: String, enum: ["rescue", "transportation", "clinic", "office", "pet screening", "adoption work"] }
        ], required: true, default: ["rescue"]
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String, required: true, enum: ["pending", "approved", "rejected"], default: "pending", validate: {
            validator: function (v) {
                return v;
            },
            message: "request status should not be null"
        }
    }
}, { timestamps: { createdAt: true, updatedAt: false } });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

function validateVolunteer(volunteer) {
    const schema = Joi.object({
        volunteerBefore: Joi.boolean().required(),
        timeVolunteerBefore: Joi.number().integer().min(0).when('volunteerBefore', { is: true, then: Joi.required(), otherwise: Joi.forbidden() }),
        animalsFamiliarWith: Joi.array().items(
            Joi.string().trim().valid('cat', 'dog', 'rabbit', 'fish', 'turtle', 'hamster', 'guinea pig', 'bird', 'frog')
        ).default([]),
        volunteerTime: Joi.string().valid('day', 'night').trim().default('day').required(),
        volunteerInterests: Joi.array().items(
            Joi.string().valid('rescue', 'transportation', 'clinic', 'office', 'pet screening', 'adoption work')
        ).required().default(['rescue']),
        user: Joi.string().objectId().required(),
        status: Joi.string().valid('pending', 'approved', 'rejected').required().default("pending")
    });
    return Joi.validateVolunteer(volunteer, schema)
}
//exports here
module.exports = {
    Volunteer,
    volunteerSchema,
    validate: validateVolunteer,
}