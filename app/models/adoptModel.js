const mongoose = require('mongoose');
const Joi = require('joi');

const adoptSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   phoneNumber: { type: String, ref: 'User.phoneNumber' },
   pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
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
      user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
      phone: Joi.string().required(),
      pet: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
      status: Joi.string().valid('pending', 'accepted', 'rejected').required().default("pending")
   });

   return schema.validate(adopt);
}

const validateAdoptStatus = (status) => {
   const schema = Joi.string().valid('pending', 'accepted', 'rejected').required().default("pending");
   return Joi.validate(status, schema);
}

module.exports = {
   Adopt,
   validate: validateAdopt,
   validateAdoptStatus,
}


