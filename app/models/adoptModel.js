const mongoose = require('mongoose');
const Joi = require('joi');

const adoptSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   userName: {
      type: String, required: true, min: 6, max: 120, validate: {
         validator: (v) => { return /^[a-zA-Z\s]+$/.test(v); },
         message: "First name must contain only letters!"
      }
   },
   phoneNumber: { type: String, ref: 'User.phoneNumber' },
   pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
   petName: {
      type: String, min: 5, max: 50, trim: true, required: true, default: "Nemo",
      validate: {
         validator: function (v) {
            return /^[a-zA-Z\s]*$/.test(v);
         },
         message: "Pet name can only contain letters and spaces!"
      }
   }, petType: {
      type: String, min: 2, required: true,
      enum: ["cat", "dog", "rabbit", "fish", "turtle", "hamster", "guinea pig", "bird", "frog"], required: true
   },
   status: {
      type: String, required: true, enum: ["pending", "accepted", "rejected"],
      validate: {
         validator: function (v) {
            return v;
         },
         message: "request status should not be null"
      }, default: "pending"
   }
}, { timestamps: { createdAt: true, updatedAt: false } });

adoptSchema.index({ user: 1, pet: 1 }, { unique: true }); //compound index will be used in controllers

const Adopt = mongoose.model('Adopt', adoptSchema);

function validateAdopt(adopt) {
   const schema = Joi.object({
      user: Joi.string().pattern(/^[0-9a-fA-F\s]{24}$/).required(),
      userName: Joi.string().min(6).max(120).pattern(/^[a-zA-Z\s]+$/).required(),
      phone: Joi.string().required(),
      pet: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
      petName: Joi.string().min(3).max(50).trim().required().pattern(/^[a-zA-Z\s]*$/),
      petType: Joi.string().min(2).required().valid("cat", "dog", "rabbit", "fish", "turtle", "hamster", "guinea pig", "bird", "frog"),
      status: Joi.string().valid('pending', 'accepted', 'rejected').required().default("pending")
   });

   return schema.validate(adopt);
}

const validateAdoptStatus = (status) => {
   const schema = Joi.string().valid('pending', 'accepted', 'rejected').required().default("pending");
   return schema.validate(status);
}

module.exports = {
   Adopt,
   validate: validateAdopt,
   validateAdoptStatus,
}


