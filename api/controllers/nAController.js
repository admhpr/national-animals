"use strict";

var mongoose = require("mongoose"),
  Data = mongoose.model("Data");

exports.show_all_data = function(req, res) {
  //   res.send("route works");
  Data.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};
