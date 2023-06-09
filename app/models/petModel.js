const mongoose = require('mongoose');
const Joi = require('joi');

const petSchema = new mongoose.Schema({
    petAge: {
        type: Number, min: 0, max: 600,
        validate: {
            validator: function (v) {
                return Number.isInteger(v) && v >= 0;
            },
            message: "age should be a positive integer!"
        },
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    petBreed: { type: String, trim: true, min: 0, max: 100 },
    image: {
        type: Buffer, required: true,
        validate: {
            validator: function (v) {
                return v.length <= 10485760; //image is 10 mbs max. we can modify
            },
            message: "image should be less than 10 MB!"
        }
    },
    petName: {
        type: String, min: 5, max: 50, trim: true, required: true, default: "Nemo",
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]*$/.test(v);
            },
            get: v => Math.round(v),
            set: v => Math.round(v)
        }
    },
    petBreed: { type: String, trim: true, min: 0, max: 100 },
    image: {
        type: Buffer, required: true,
        validate: {
            validator: function (v) {
                return v.length <= 10485760; //image is 10 mbs max. we 
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
    petType: { type: String, min: 2, required: true, enum: ["cat", "dog", "rabbit", "fish", "turtle", "hamster", "guinea pig", "bird", "frog"], required: true }
});

const Pet = mongoose.model('Pet', petSchema);

function validatePet(pet) {
    const schema = Joi.object({
        petAge: Joi.number().min(0).max(600).integer().positive(),
        petBreed: Joi.string().trim().min(0).max(100),
        image: Joi.binary().max(10485760).required(),
        petName: Joi.string().min(3).max(50).trim().required().pattern(/^[a-zA-Z\s]*$/),
        petPersonality: Joi.array().items(Joi.string().valid(
            'fun', 'social', 'calm', 'active', 'loves people',
            'hates people', 'loves to eat', 'picky eater',
            'likes attention', 'prefers to be alone', 'bold',
            'aggressive', 'shy', 'patient', 'intelligent', 'clumsy',
            'curious', 'likes to play', 'confident', 'timid', 'enjoys routine'
        )),
        petType: Joi.string().min(2).required().valid("cat", "dog", "rabbit", "fish", "turtle", "hamster", "guinea pig", "bird", "frog")
    });
    return schema.validate(pet);
}

module.exports = {
    Pet,
    validate: validatePet
}

