"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DataSchema = new Schema(
  {
    type: { type: String },
    features: [
      {
        type: { type: String },
        id: String,
        properties: {
          country: String,
          national_animal: [],
          sci_name: [],
          media: []
        },
        geometry: {
          type: { type: String },
          coorindates: []
        }
      }
    ]
  },
  { collection: "national_animals" }
);

// var DataSchema = new Schema(
//   { any: Schema.Types.Mixed },
//   {
//     collection: "national_animals"
//   }
// );

module.exports = mongoose.model("Data", DataSchema);
