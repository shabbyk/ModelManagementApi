"use strict";

var mongoose = require("mongoose");
var formidable = require("formidable");
const { Model, validate } = require("../models/modelManagementModel");

exports.list_all_models = async function (req, res) {
  const models = await Model.find().sort("name");
  res.send(models);
};

exports.create_a_model = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // read files from request form
  let fileUrls = [];
  new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
      file.path = `/uploads/${file.name}`;
    })
    .on('file', (name, file) => {
      console.log('file Uploaded');
      fileUrls.push(file.path);
    });
  
  req.body.fileUrls = fileUrls;
  var new_model = new Model(req.body);
  new_model = await new_model.save();

  res.send(new_model);
};

exports.read_a_model = async function (req, res) {
  const model = await Model.findById(req.params.modelId);
  if (!model)
    return res.status(404).send("The model with the given ID was not found.");

  res.send(model);
};

exports.update_a_model = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const model = await Model.findOneAndUpdate(
    { _id: req.params.modelId },
    req.body,
    { new: true }
  );

  if (!model)
    return res.status(404).send("The model with the given ID was not found.");

  res.send(model);
};

exports.delete_a_model = async function (req, res) {
  const model = await Model.remove({
    _id: req.params.modelId,
  });

  if (!model)
    return res.status(404).send("The model with the given ID was not found.");

  res.send(model);
};
