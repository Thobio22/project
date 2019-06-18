// !/usr/bin/env python
// Name: Thomas Verouden
// Student number: 10779272
//
// This file determines the style of the given classes of the .js file.
//
// python -m http.server 8888 &
// http://localhost:8888/index.html


window.onload = function() {

  var beeJson = "bee_colony_loss.json";

  var beeLineJson = "bee_line_loss.json"

  var appleJson = "apple_yield.json";

  var requests = [d3v5.json(beeJson), d3v5.json(appleJson)]

  Promise.all(requests).then(function(response) {

    var data_bee = response[0];

    var data_apple = response[1];

    // var data_cause = "NOG MAKEN"

    var year = 2010;

    var state = "AZ";

    drawMap(data_bee, year);

    drawLinechart(data_apple, state);

    // drawPiechart(data_cause. year, state)

  });

  //
  // d3v5.json("bee_colony_loss.json").then(function(data_bee) {
  //   console.log("DATA LOADED");
  //
  //   // var mapDataset = getMapDataset(data_bee);
  //   console.log(data_bee[2010])
  // });
  //
  // d3v5.json("apple_yield.json").then(function(data_apple) {
  //   console.log("APPLEDATA LOADED")
  // })

};


// function getMapDataset(dataset) {
//
//   // // list of all ISO of the used countries
//   // mapISO = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA",
//   //           "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA",
//   //           "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",
//   //           "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX",
//   //           "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
//
//
//   // create list with all relevant state data
//   var stateData = {};
//
//   // mapISO.forEach(function(d, i) {
//   //   console.log(d, i)
//   //   stateData[d] = {
//   //     ""
//   //
//   //
//   //
//   //
//   //   }
//   // });
//
//
//   return stateData
//
// };


function drawMap(dataset, year) {
  console.log("START DRAW MAP")

  // draw map
  var linkedMap = new Datamap({
              element: document.getElementById('map_div'),
              fills: {
                "90": "#7f0000",
                "80": "#b2182b",
                "70": "#d6604d",
                "60": "#f4a582",
                "50": "#fddbc7",
                "40": "#d1e5f0",
                "30": "#92c5de",
                "20": "#4393c3",
                "10": "#2166ac",
                "0": "#023858",
                defaultFill: "grey"
              },
              scope: "usa",
              data: dataset[year],
              geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                borderColor: "black",
              },






  });


};


function drawLinechart(dataset, state) {
  // this makes the multiple-linechart based on given dataset, year and state.
  var lineDim = {
                top: 20,
                right: 60,
                left: 60,
                bottom: 30,
                width: 460,
                height: 400
                };

  var svg = d3v5.select("#line_div")
              .append("svg")
                .attr("width", lineDim.width + lineDim.left + lineDim.right)
                .attr("heigth", lineDim.height + lineDim.top + lineDim.bottom)
              .append("g")
                .attr("transform", "translate(" + lineDim.left + "," + lineDim.top + ")");

  var data = dataset[year][state]




};


function drawPiechart(dataset, year, state) {
  // This draws the pie-chart of bee loss causation in the pie_div

  // set dimension + margins of graph
  var pieDim = {width: 450,
                   height: 450,
                   margin: 40
                 };

  // set radius of the piechart
  var radius = Math.min(width, height) / 2 - margin

  // create svg on pie_div
  var svg = d3v5.select("#pie_div")
              .append("svg")
                .attr("width", pieDim.width)
                .attr("height", pieDim.height)
              .append("g")
                .attr("transform", "translate(" + pieDim.width / 2 + "," + pieDim.height)

  // set data to needed part of dataset
  var data = dataset[year][state];

  // set color of the pie parts
  var color = d3v5.scaleOrdinal()
                  .domain(data)
                  .range(d3.schemeSet2);

  // set position of each causastion group on pie
  var pie = d3v5.pie()
                .value(function(d) {
                  console.log(d.value)
                  return d.value
                });

  var dataReady = pie(d3v5.entries(data));


  // shape helper to build arc on piechart group
  var arcBuilder = d3v5.arc()
                         .innerRadius(0)
                         .outerRadius(radius);

  // build d3v5.tooltip
  var causeTip = d3v5.tip()
                     .attr('class', 'd3-tip')
                     .offset([-10, 0])
                     .html(function(d) {
                       return "wat wil je in tip hebben"
                     })
                     .attr("stroke", "black");

  // make interactive animation work
  svg.call(tip);


  // build the piechart
  var pie = svg.selectAll("slices")
               .data(dataReady)
               .enter()
             .append("path")
               .attr("class", "pieGroup")
               .attr("d", arcBuild)
               .attr("fill", function(d) {
                 return (color(d.data.key))
               })
               .attr("stroke", "black");


  // add annotation in the center of the group
  var annotation = svg.selectAll("slices")
                      .data(dataReady)
                      .enter()
                    .append("text")
                      .attr("class", "pieAnno")
                      .text(function(d) {
                        return "Cause: " + d.data.key
                      })
                      .attr("transform", function(d) {
                        return "translate(" + arcBuilder.centroid(d) + ")"
                      });













};
