"use strict";

var mongoose = require("mongoose"),
  Data = mongoose.model("Data");
/**
 *  
 */
exports.showAllData = function(req, res) {
  res.send("route works");
};
