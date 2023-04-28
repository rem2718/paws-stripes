const mongoose = require('mongoose');
const Joi = require('joi');
//mongoose.connect('mongodb://localhost/playground').then(() => console.log('Connected to MongoDB...'))
//.catch(err => console.error('Could not connect to mongo db...', err));

const rescueSchema = new mongoose.Schema({
    isSick: { type: Boolean, default: false, required: true },
    canFoster: { type: Boolean, default: true, required: true },
    dateOfRescue: {
        type: Date,
        validate: {
            validator: function (v) {
                return v instanceof Date && v <= new Date();
            },
            message: 'rescue date must be a valid Date'
        }, required: true
    },
    rescuerPhone: { type: String, required: true, match: /^05\d{8}$/ },
    rescueAddress: {
        type: String, required: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)(www\.google\.com\/maps\/|goo\.gl\/maps\/)[^\s]+$/i.test(v);
            },
            message: "Must provide a google maps valid URL!"
        }
    },
    status: {
        type: String, default: "pending", required: true, enum: ["pending", "approved", "rejected"],
        validate: {
            validator: function (v) {
                return v;
            },
            message: "request status should not be null"
        }
    },
    image: {
        type: Buffer, required: true, validate: {
            validator: function (v) {
                return v.length <= 10485760; //image is 10 mbs max. we can modify
            },
            message: "image should be less than 10 MB!"
        }
    },
    petType: { type: String, min: 2, required: true, enum: ["cat", "dog", "rabbit", "fish", "turtle", "hamster", "guinea pig", "bird", "frog"] }

}, { timestamps: { createdAt: true, updatedAt: false } });

const Rescue = mongoose.model('Rescue', rescueSchema);

// validate here
function validateRescue(rescue) {
    const schema = Joi.object({
        isSick: Joi.boolean().required(),
        canFoster: Joi.boolean().required(),
        dateOfRescue: Joi.date().max('now').required(),
        rescuerPhone: Joi.string().pattern(/^05\d{8}$/).required(),
        rescueAddress: Joi.string().pattern(/^(https?:\/\/)(www\.google\.com\/maps\/|goo\.gl\/maps\/)[^\s]+$/i).required(),
        status: Joi.string().valid('pending', 'approved', 'rejected').required().default("pending"),
        image: Joi.binary().max(10485760).required(),
        petType: Joi.string().min(2).valid("cat", "dog", "rabbit", "fish", "turtle", "hamster", "guinea pig", "bird", "frog")
    });
    return Joi.validate(rescue, schema);
}
function validateRescueStatus(status) {
    const schema = Joi.string().valid('pending', 'approved', 'rejected').required().default("pending");
    return Joi.validate(status, schema);
  }

module.exports={
    Rescue,
    validate: validateRescue,
    validateRescueStatus
}

