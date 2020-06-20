"use strict";
const Joi = require("joi");
var mongoose = require("mongoose");

var Model = mongoose.model(
  "Models",
  new mongoose.Schema({
    name: {
      type: String,
      required: "Kindly enter the name of the model",
      trim: true,
      minlength: 2,
      maxlength: 255,
    },
    modelWear: {
      type: String,
      required: "Kindly enter the model wear",
    },
    height: {
      type: Number,
      required: "Kindly enter the height value",
      min: 0,
    },
    bust: {
      type: Number,
      required: "Kindly enter the bust value",
      min: 0,
    },
    waist: {
      type: Number,
      required: "Kindly enter the waist value",
      min: 0,
    },
    highHip: {
      type: Number,
      required: "Kindly enter the high hip value",
      min: 0,
    },
    lowHip: {
      type: Number,
      required: "Kindly enter the low hip value",
      min: 0,
    },
  })
);

function validateModel(model) {
  const schema = {
    name: Joi.string().min(2).max(255).required(),
    modelWear: Joi.string().required(),
    height: Joi.number().min(1).required(),
    waist: Joi.number().min(1).required(),
    bust: Joi.number().min(1).required(),
    highHip: Joi.number().min(1).required(),
    lowHip: Joi.number().min(1).required(),
  };

  return Joi.validate(model, schema);
}

exports.Model = Model;
exports.validate = validateModel;
