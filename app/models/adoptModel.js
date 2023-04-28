const mongoose = require('mongoose');
const Joi = require('joi');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);
const User = require('./userModel');
const Pet = require('./petModel');


const adoptSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   phoneNumber: { type: String, ref: 'User.phoneNumber' },
   pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
   status: {
      type: String, required: true, enum: ["pending", "approved", "rejected"],
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
      user: Joi.string().objectId().required(),
      phone: Joi.string().required(),
      pet: Joi.string().objectId().required(),
      status: Joi.string().valid('pending', 'approved', 'rejected').required().default("pending")
   });

   return Joi.validate(adopt, schema);
}

//do exports here
module.exports = {
   Adopt,
   validate: validateAdopt
}