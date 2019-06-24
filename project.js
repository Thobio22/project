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


  Promise.all(requests).then(function(response) {

    // get data once everything is loaded in
    var data_bee = response[0];
    var data_bee_line = response[1];
    var data_crop = response[2];
    var data_cause = response[3];

    // set default variables for updating figures
    var state = "TO";
    var radius = "emtpyvariable"
    var svgPie = "emptyvariable"
    var defaultButton = "TO"

    // get slider year value
    var slider = document.getElementById("year_slider");
    var year = slider.value;

    // update slider data on select
    var slider_output = document.getElementById("slid_year");
    slider_output.innerHTML = year;

    drawMap(data_bee, year);

    drawLinechart(data_crop, data_bee_line, state);

    drawPiechart(data_cause, year, state)

    function variableCheck() {
      
    }

    slider.oninput = function() {
      slider_output.innerHTML = this.value;
      year = this.value;
      updateFigures(year, state);

    };

  });


};


function updateFigures(dataPie, year, state, radius, svgPie) {
    updatePie(dataPie, year, state, radius, svgPie);
    updateLine(state);
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
                90: "#7a0000",
                80: "#800026",
                70: "#b2182b",
                60: "#bd0026",
                50: "#e31a1c",
                40: "#fc4e2a",
                30: "#fd8d3c",
                20: "#feb24c",
                10: "#fed976",
                0: "#ffeda0",
                defaultFill: "grey"
              },
              scope: "usa",
              data: dataset[year],
              geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                highlightFillColor: 'black',
                borderColor: "black",
                popupTemplate: function(geo, data) {
                  return ['<div class="hoverinfo"><strong>',
                          data.State,'<br>Bee loss: ' + data.Total_Annual_Loss,
                          '%</strong></div>'].join('');
                }

              },
              done: function(linkedMap) {
                // on click: update figures
                linkedMap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
                  // removes all lines in linechart
                  d3v5.selectAll("#path").remove();
                  updateFigures(year, geography.id);
                });
              };
  });


};



function drawPiechart(dataset, year, state) {
  // This draws the pie-chart of bee loss causation in the pie_div

  // set dimension + margins of graph
  var pieDim = { width: 450,
                 height: 450,
                 margin: 40
               };

  // set radius of the piechart
  radius = pieDim.width / 2 - pieDim.margin;

  // create svg on pie_div
  svgPie = d3v5.select("#pie_div")
          .append("svg")
            .attr("width", pieDim.width)
            .attr("height", pieDim.height)
          .append("g")
            .attr("transform", "translate(" + pieDim.width / 2 + "," + pieDim.height / 2 + ")");

  // set color of the pie parts
  var color = d3v5.scaleOrdinal()
                  .domain(["a", "b", "c", "d", "e", "f"])
                  .range(d3v5.schemeDark2);

  updatePie(dataset, year, state, radius, svgPie);

};


function updatePie(dataset, year, state, radius, svgPie) {
// updates the pie chart when called on

  // pie chart only has years 2015 - 2018
  if (year < 2015) {
    year = 2015;
  };

  // set data to needed part of dataset
  var data = dataset[year][state];

  // set position of each causastion group on pie
  var pie = d3v5.pie()
                .value(function(d) {
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
                       if (d.data.key == "Varroa_mites") {
                         return "Loss by Varroa mites: <span style='color:red'>"
                                + d.data.value + "%</span>"
                       }
                       else if (d.data.key == "Other_pests_and_parasites") {
                         return "Loss by Other pests and parasites: <span style='color:red'>"
                                + d.data.value + "%</span>"
                       }
                       else if (d.data.key == "Other*") {
                         return "Loss by weather, starvation, queen failure <br>" +
                                "or hive destruction: <span style='color:red'>"
                                + d.data.value + "%</span>"
                       }
                       else {
                         return "Loss by " + d.data.key + ":  <span style='color:red'>"
                              + d.data.value + "%</span>"
                       }
                     })
                     .attr("stroke", "black");


  // make interactive animation work
  svgPie.call(causeTip);

  // build the piechart
  var upPie = svgPie.selectAll("slices")
               .data(dataReady)


  upPie
     .enter()
   .append("path")
     .attr("class", "pieGroup")
     .merge(pie)
     .transition()
     .duration(1000)
     .attr("d", arcBuilder)
     .attr("fill", function(d) {
       return (color(d.data.key))
     })
     .attr("stroke", "black")
     .on('mouseover', causeTip.show)
     .on('mouseout', causeTip.hide);

  upPie
    .exit()
    .remove()

};


function drawLinechart(data_crop, data_bee_line, state) {
  // this makes the multiple-linechart based on given dataset, year and state.

  var lineDim = {
                top: 20,
                right: 60,
                left: 60,
                bottom: 25,
                width: 480,
                height: 400
                };

  var svg = d3v5.select("#line_div")
              .append("svg")
                .attr("class", "linesvg")
                .attr("width", lineDim.width + lineDim.left + lineDim.right)
                .attr("height", lineDim.height + lineDim.top + lineDim.bottom)
              .append("g")
                .attr("transform", "translate(" + lineDim.left + "," + lineDim.top + ")");

  // create x, y scaling for placing data in svg pixels
  var xScale = lineXscale(lineDim);

  var yScaleBee = lineYscale(lineDim);

  var yScaleCrop = cropYscale(lineDim, data_crop[state]);



  // define x and y axis
  var xAxis = d3v5.axisBottom(xScale);

  var yAxisBee = d3v5.axisLeft(yScaleBee);

  var yAxisCrop = d3v5.axisRight(yScaleCrop);


  // Add the bee loss line
  var lineBee = d3v5.line()
            .x(function(d) {
              console.log(d)
              return xScale(d["Year"])
            })
            .y(function(d) {
              console.log(d)
              return yScaleBee(d["Total_Annual_Loss"])
            });

  var lineCrop = d3v5.line()
            .x(function(d) {
              return xScale(d["Year"])
            })
            .y(function(d) {
              console.log(d)
              return yScaleCrop(d["Kg_per_Acre"])
            });

  // Add bee loss line
  svg.append("path")
       .data(data_bee_line[state])
       .attr("class", "beeLine")
       .attr("stroke", "red")
       .attr("d", lineBee);


  svg.append("path")
       .data(data_bee_line[state])
       .attr("class", "beeLine")
       .attr("stroke", "blue")
       .attr("d", lineCrop);


  // //   svg.append("path")
  //
  // // Add the line for bee loss
  // svg.append("path")
  //     .data(data_bee_line[state])
  //     .attr("fill", "none")
  //     .attr("stroke", "red")
  //     .attr("stroke-width", 1.5)
  //     .attr("d", d3v5.line()
  //       .x(function(d) {
  //         console.log(d["Year"])
  //         return xScaleBee(d["Year"])
  //       })
  //       .y(function(d) { return yScaleBee(d["Total_Annual_Loss"]) })
  //       )
  //
  //
  //   // add the line for crop yield per acre
  //   svg.append("path")
  //       .data(data_crop[state])
  //       .attr("fill", "none")
  //       .attr("stroke", "steelblue")
  //       .attr("stroke-width", 1.5)
  //       .attr("d", d3v5.line()
  //         .x(function(d) { return xScaleBee(d["Year"]) })
  //         .y(function(d) { return yScaleCrop(d["Kg_per_Acre"]) })
  //         )
  //
  //
  //
  //
  //
  //
  //
  //
    // create x axis by calling on xAxis
    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + (lineDim.height - lineDim.top) + ")")
       .call(xAxis);


    // create yAxis percentage loss by calling on yAxisBee
    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(" + lineDim.top + ",0)")
       .call(yAxisBee);


    // create yAxis yield by calling on yAxisCrop
    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(" + lineDim.width + ",0)")
       .call(yAxisCrop)


};


function lineXscale(lineDim) {
  var xScale = d3v5.scaleLinear()
                   .domain([2010, 2016])
                   .range([lineDim.top, lineDim.width]);

  return xScale;
};


function lineYscale(lineDim) {
  var yScale = d3v5.scaleLinear()
                   .domain([0, 100])
                   .range([lineDim.height - lineDim.top, lineDim.top]);

  return yScale;
};


function cropYscale(lineDim, data) {
  var yScale = d3v5.scaleLinear()
                   .domain(d3v5.max([0, d3v5.max(data, function (d) {
                     return d["Kg_per_Acre"]
                   } ) ]) )
                   .range([lineDim.height - lineDim.top, lineDim.top]);

  return yScale
};


function getButton() {
  var state = "TO";


};
