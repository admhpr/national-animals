var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Data = require(__dirname + "/models/nAModel"),
  bodyParser = require("body-parser");

var mongoURI = "mongodb://datavis.online/local";

mongoose.connect(mongoURI);
var db = mongoose.connection;
db.on("error", err => {
  console.log(err.message);
});
db.once("open", () => {
  console.log("mongodb connection is open");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require(__dirname + "/routes/nARoutes");
routes(app); // register

app.listen(port);
console.log(`national animals API server listening on:${port}`);
