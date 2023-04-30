const mongoose = require('mongoose');
const Joi = require('joi');

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
    userName: {
        type: String, required: true, min: 6, max: 120, validate: {
            validator: (v) => { return /^[a-zA-Z\s]+$/.test(v); },
            message: "First name must contain only letters!"
        }
    },
    status: {
        type: String, required: true, enum: ["pending", "accepted", "rejected"], default: "pending", validate: {
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
        user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
        userName: Joi.string().min(6).max(120).pattern(/^[a-zA-Z\s]+$/).required(),
        status: Joi.string().valid('pending', 'accepted', 'rejected').required().default("pending")
    });
    return schema.validate(volunteer);
}
function validateVolunteerStatus(status) {
    const schema = Joi.string().valid('pending', 'accepted', 'rejected').required().default("pending");
    return schema.validate(status);
}

module.exports = {
    Volunteer,
    validate: validateVolunteer,
    validateVolunteerStatus
}

