const mongoose = require('mongoose');
const Joi = require('joi');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);


const handoverSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    handoverReason: { type: String, min: 5, max: 500, trim: true, required: true },
    canFoster: { type: Boolean, default: true },
    breed: { type: String, min: 5, max: 100, trim: true },
    petType: { type: String, min: 5, required: true, enum: ["cat", "dog", "rabbit", "fish", "turtle", "hamster", "guinea pig", "bird", "frog"], required: true },
    handoverAddress: {
        type: String, required: true,
        validate: {
            validator: (v) => {
                return /^(https?:\/\/)(www\.google\.com\/maps\/|goo\.gl\/maps\/)[^\s]+$/i.test(v);
            },
            message: "Must provide a google maps valid URL!"
        }
    },
    petAge: {
        type: Number, min: 0, max: 600,
        validate: {
            validator: (v) => {
                return Number.isInteger(v) && v >= 0;
            },
            message: "age should be a positive integer!"
        },
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    petImage: {
        type: Buffer, required: true,
        validate: {
            validator: (v) => {
                return v.length <= 10485760; //image is 10 mbs max. we can modify
            },
            message: "image should be less than 10 MB!"
        }
    },
    petPersonality: {
        type: [{
            type: String,
            enum: [
                'fun', 'social', 'calm', 'active', 'loves people',
                'hates people', 'loves to eat', 'picky eater',
                'likes attention', 'prefers to be alone', 'bold',
                'aggressive', 'shy', 'patient', 'intelligent', 'clumsy',
                'curious', 'likes to play', 'confident', 'timid', 'enjoys routine'
            ]
        }],
        default: []
    },
    status: {
        type: String, required: true, enum: ["pending", "approved", "rejected"], default: "pending",
        validate: {
            validator: (v) => {
                return v;
            },
            message: "request status should not be null"
        }
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Handover = mongoose.model('Handover', handoverSchema);

const validateHandover = (handover) => {
    const schema = Joi.object({
        user: Joi.string().objectId().required(),
        handoverReason: Joi.string().min(5).max(500).trim().required(),
        canFoster: Joi.boolean().default(true),
        breed: Joi.string().min(5).max(100).trim(),
        petType: Joi.string().min(5).valid('cat', 'dog', 'rabbit', 'fish', 'turtle', 'hamster', 'guinea pig', 'bird', 'frog').required(),
        handoverAddress: Joi.string().required().pattern(/^(https?:\/\/)(www\.google\.com\/maps\/|goo\.gl\/maps\/)[^\s]+$/i),
        petAge: Joi.number().min(0).max(600).integer().positive(),
        petImage: Joi.binary().required().max(10485760),
        petPersonality: Joi.array().items(Joi.string().valid('fun', 'social', 'calm', 'active', 'loves people', 'hates people', 'loves to eat', 'picky eater', 'likes attention', 'prefers to be alone', 'bold', 'aggressive', 'shy', 'patient', 'intelligent', 'clumsy', 'curious', 'likes to play', 'confident', 'timid', 'enjoys routine')),
        status: Joi.string().valid('pending', 'approved', 'rejected').required().default("pending")
    });

    return Joi.validate(handover, schema);
}

//do exports here
module.exports = {
    Handover,
    validate: validateHandover,
}