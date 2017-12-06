require("./styles.scss");
import ajax from "./ajax.js";
import * as d3Geo from "d3-geo";
import * as d3GeoPro from "d3-geo-projection";
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
  // Config
  var worldData = res,
    width = 900,
    height = 700,
    sens = 0.25,
    focused;

  // Orthopgraphic the study of elevated terrain
  var projection = d3
    .geoOrthographic()
    .scale(245)
    .rotate([0, 0])
    .translate([width / 2, height / 2])
    .clipAngle(90);

  // Geographical path

  var path = d3.geoPath().projection(projection);

  // SVG container

  var canvas = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Water datum is binding the data to one svg element
  canvas
    .append("path")
    .datum({ type: "Sphere" })
    .attr("class", "water")
    .attr("d", path);

  // getting the tooltips ready

  var countryTooltip = d3
      .select("body")
      .append("div")
      .attr("class", "countryToolTip"),
    countryList = d3
      .select("body")
      .append("select")
      .attr("name", "countries");

  render(worldData);

  // rendering the globe

  function render(world) {
    // parse the data
    let root = JSON.parse(world);

    var countryById = {},
      countryData = counrtyListMake(root);

    // fill up the options for the dropdown list and grab ids
    countryData.forEach(d => {
      countryById[d.id] = d.name;
      var option = countryList.append("option");
      option.text(d.name);
      option.property("value", d.id);
    });

    // draw paths and the countries

    var group = canvas
      .selectAll("g")
      .data(root[0].features)
      .enter()
      .append("g");

    var countries = group
      .append("path")
      .attr("d", path)
      .attr("class", "country")
      .attr("fill", "steelblue");

    d3.timer(function() {
      var angle = velocity * (Date.now() - then);
      projection.rotate([angle, 0, 0]);
      svg.selectAll("path").attr("d", path.projection(projection));
    });
  }

  // Helpers
  function counrtyListMake(data) {
    console.log(data);
    var list = [];
    data[0].features.forEach(d => {
      let obj = {};
      obj.name = d.properties.country;
      list.push(obj);
    });
    return list;
  }

  // //
  // var canvas = d3
  //   .select("body")
  //   .append("svg")
  //   .attr("width", 900)
  //   .attr("height", 700);

  // let root = JSON.parse(res);

  // if (root.length > 0) {
  //   // load the data

  //   // append each member of the features collection to a path
  //   var group = canvas
  //     .selectAll("g")
  //     .data(root[0].features)
  //     .enter()
  //     .append("g");

  //   // set up projection for the map
  //   var projection = d3GeoPro.geoGilbert();

  //   // generate a path and pass in the projection
  //   var path = d3.geoPath().projection(projection);

  //   // draw and fill the paths of each country from the dataset
  //   var countries = group
  //     .append("path")
  //     .attr("d", path)
  //     .attr("class", "country")
  //     .attr("fill", "steelblue");

  //   //
  //   var div = d3
  //     .select("body")
  //     .append("div")
  //     .attr("class", "tooltip");

  //   // add tooltip attribites on x and y
  //   group
  //     .attr("x", d => {
  //       return path.centroid(d)[0];
  //     })
  //     .attr("y", d => {
  //       return path.centroid(d)[1];
  //     })
  //     .on("mouseover", d => {
  //       console.log(d);
  //       var list = createList(d.properties.national_animal);
  //       console.log(list);
  //       div
  //         .transition()
  //         .duration(200)
  //         .style("opacity", 0.9);
  //       div
  //         .html(d.properties.country + "</br>")
  //         .style("left", d3.event.pageX + "px")
  //         .style("top", d3.event.pageY - 28 + "px");
  //     });
  //   // .on("mouseout", d => {
  //   //   div
  //   //     .transition()
  //   //     .duration(500)
  //   //     .style("opacity", 0);
  //   // });
  // }

  // function createList(arr) {
  //   var list = document.createElement("ul");
  //   arr.forEach(el => {
  //     var item = document.createElement("li");
  //     var txt = document.createTextNode(el);
  //     list.appendChild(item);
  //   });
  //   return list;
  // }
}
