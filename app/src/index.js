require("./styles.scss");
import ajax from "./ajax.js";
import * as d3 from "d3";

// set up params to be passed to the ajax module

let opts = {
  url: "https://datavis.online/map",
  method: "GET"
};

// request the data

ajax.send(opts).then(res => {
  main(res);
});

function main(res) {
  // set up canvas for d3

  var canvas = d3
    .select("body")
    .append("svg")
    .attr("width", 900)
    .attr("height", 700);

  let root = JSON.parse(res);

  if (root.length > 0) {
    // load the data

    // append each member of the features collection to a path
    var group = canvas
      .selectAll("g")
      .data(root[0].features)
      .enter()
      .append("g");

    // set up projection for the map
    var projection = d3.geoMercator();

    // generate a path and pass in the projection
    var path = d3.geoPath().projection(projection);

    var areas = group
      .append("path")
      .attr("d", path)
      .class("class", "country")
      .attr("fill", "steelblue");
  }
}
