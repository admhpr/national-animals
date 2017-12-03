"use strict";

module.exports = function(app) {
  var data = require("../controllers/nAController.js");
  // Route

  app.route("/map").get(data.show_all_data);
};
