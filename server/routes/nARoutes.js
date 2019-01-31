"use strict";

module.exports = function(app) {
  var data = require("../controllers/nAController.js");
  // Route

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  app.route("/").get(data.showAllData);
};
