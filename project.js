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

  var beeLineJson = "bee_loss_line.json";

  var cropJson = "combined_crop.json";

  var causeJson = "causation_data.json";

  var requests = [d3v5.json(beeJson), d3v5.json(beeLineJson), d3v5.json(cropJson), d3v5.json(causeJson)]
  //

  Promise.all(requests).then(function(response) {

    // get data once everything is loaded in
    var data_bee = response[0];
    //
    var data_bee_line = response[1];
    //
    var data_crop = response[2];
    //
    var data_cause = response[3];

    // set default values for year and state. TO = total
    var state = "TO";

    // get slider year value
    var slider = document.getElementById("year_slider");
    var year = slider.value;

    // update slider data on select
    var slider_output = document.getElementById("slid_year");
    slider_output.innerHTML = year;

    slider.oninput = function() {
      slider_output.innerHTML = this.value;
      year = this.value;
      // updateFigures(year, state);

    };

    // var year = getSliderYear();
    drawMap(data_bee, year);

    drawLinechart(data_crop, data_bee_line, state);

    drawPiechart(data_cause, year, state)

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


function getSliderYear() {

};


function updateFigures(year, state) {

};


function drawMap(dataset, year) {

  // map does not have year 2017-2018, but pie chart does
  if (year == 2017 || year == 2018) {
    year = 2016;
  };

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
                popupTemplate: function(geo, data) {
                return ['<div class="hoverinfo"><strong>',
                        'State: ' + data.State,
                        '<br>Bee loss: ' + data.Total_Annual_Loss,
                        '%</strong></div>'].join('');
                }

              },






  });


};


function drawLinechart(data_crop, data_bee, state) {
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

  // var data = dataset[year][state]

  // create x, y scaling for placing data in svg pixels
  var xScaleBee = lineXscale(lineDim);

  var yScaleBee = lineYscale(lineDim);

  var xScaleCrop = cropXscale(lineDim);

  var yScaleCrop = cropYscale(lineDim);




function lineXscale(lineDim) {
  var xScale = d3v5.scaleLinear()
                   .domain([2010, 2016])
                   .range([lineDim.left, lineDim.width - lineDim.right]);

  return xScale;
};


function lineYscale(lineDim) {
  var yScale = d3v5.scaleLinear()
                   .domain([0, 100])
                   .range([lineDim.top, lineDim.height - lineDim.bottom]);

  return yScale;
};


function cropXscale(lineDim) {
  var xScale = d3v5.scaleLinear()
                   .domain([2010, 2016])
                   .range([lineDim.left, lineDim.width - lineDim.right])
};


function cropYscale(lineDim) {
  var yScale = d3v5.scaleLinear()
                   .domain([0, 100000])
                   .range([lineDim.top, lineDim.height - lineDim.bottom])

};


};


function drawPiechart(dataset, year, state) {
  // This draws the pie-chart of bee loss causation in the pie_div
  // pie chart only has years 2015 - 2018
  if (year < 2015) {
    year = 2015;
  };

  // set dimension + margins of graph
  var pieDim = {width: 450,
                   height: 450,
                   margin: 40
                 };

  // set radius of the piechart
  var radius = Math.min(pieDim.width, pieDim.height) / 2 - pieDim.margin;

  // create svg on pie_div
  var svg = d3v5.select("#pie_div")
              .append("svg")
                .attr("width", pieDim.width)
                .attr("height", pieDim.height)
              .append("g")
                .attr("transform", "translate(" + pieDim.width / 2 + "," + pieDim.height + ")");

  // set data to needed part of dataset

  var data = dataset[2015][state];

  // set color of the pie parts
  var color = d3v5.scaleOrdinal()
                  .domain(data)
                  .range(["#3182bd", "31a354"]);

  // set position of each causastion group on pie
  var pie = d3v5.pie()
                .value(function(d) {
                  console.log(d.value);
                  return d.value;
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
                       return "Percentage loss" + ": " + "<span style='color:red'>"
                              + d + "%</span>"
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
                        return "Cause: " + d.data.key;
                      })
                      .attr("transform", function(d) {
                        return "translate(" + arcBuilder.centroid(d) + ")"
                      });













};
