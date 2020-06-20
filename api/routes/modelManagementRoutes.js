"use strict";
module.exports = function (app) {
  var modelManagement = require("../controllers/modelManagementController");

  // ModelManagement Routes
  app
    .route("/models")
    .get(modelManagement.list_all_models)
    .post(modelManagement.create_a_model);

  app
    .route("/models/:modelId")
    .get(modelManagement.read_a_model)
    .put(modelManagement.update_a_model)
    .delete(modelManagement.delete_a_model);
};
