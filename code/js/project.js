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
    var dataBee = response[0];
    var dataBeeLine = response[1];
    var dataCrop = response[2];
    var dataCause = response[3];

    // set default variables for updating figures
    var state = "TO";
    var period = "year";


    // get slider year value
    var slider = document.getElementById("year_slider");
    var year = slider.value;


    // update slider data on select
    var slider_output = document.getElementById("slid_year");
    slider_output.innerHTML = year;


    // act when default button has been pressed
    d3v5.select("#defaultButton").on("click", function(){getButton()});


    // function when button clicked
    function getButton(dataCause, dataBeeLine, dataCrop) {
      // set selected html variable to desired value
      document.getElementById("periodvar").value = "year";
      document.getElementById("statevar").value = "TO"


      // update piechart
      drawPiechart.updatePie();
      drawLinechart.updateLine();
    };


    // initialise figures
    drawMap(dataBee, year);
    drawLinechart(dataCrop, dataBeeLine, state);
    drawPiechart(dataCause, year, state);


    // on slider change = give new year
    slider.oninput = function() {
        // set year to wanted variable
        year = this.value;
        slider_output.innerHTML = year;
        document.getElementById("yearvar").value = year;

        // update piechart
        drawPiechart.updatePie();


    };
  });
};


function drawMap(dataset, year) {

  // map does not have year 2017-2018, but pie chart does
  if (year >= 2017) {
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
                  // sets state to selected state
                  document.getElementById("statevar").value = geography.id;

                  // updates figures
                  drawPiechart.updatePie();
                  drawLinechart.updateLine();
                })
              }
  });

  d3v5.select("#year_slider").on("input", function(e) {

    // set selectedYear to slider value
    selectedYear = parseInt(document.getElementById("year_slider").value)

    if (selectedYear >= 2017) {
      selectedYear = 2016;
    };

    // update map
    linkedMap.updateChoropleth(dataset[selectedYear]);
  });


  // draw a legend on map
  linkedMap.legend({
    labels: {
      90: "90 to 100%",
      80: "80 to 90%",
      70: "70 to 80%",
      60: "60 to 70%",
      50: "50 to 60%",
      40: "40 to 50%",
      30: "30 to 40%",
      20: "20 to 30%",
      10: "10 to 20%",
      0: " 00 to 10%",
    }
  });


};


function drawPiechart(dataset, year, state) {
  // This draws the pie-chart of bee loss causation in the pie_div

  // pie chart only has years 2015 - 2018
  if (year < 2015) {
    year = 2015;
  };

  // set dimension + margins of graph
  var pieDim = { width: 350,
                 height: 350,
                 margin: 40,
                 legendW: 150,
                 legendH: 150,
                 top: 20
               };

  // set radius of the piechart
  var radius = pieDim.width / 2 - pieDim.margin;


  // create svg on pie_div
  var svg = d3v5.select("#pie_div")
              .append("svg")
                .attr("class", "standardPie")
                .attr("width", pieDim.width)
                .attr("height", pieDim.height)
              .append("g")
                .attr("transform", "translate(" + pieDim.width / 2 + "," + pieDim.height / 2 + ")");

  // set color of the pie parts
  var color = d3v5.scaleOrdinal()
                  .domain(["a", "b", "c", "d", "e", "f"])
                  .range(d3v5.schemeDark2);


  // set data to needed part of dataset
  var data = dataset[year][state];


  // set position of each causastion group on pie
  var pie = d3v5.pie()
                .value(function(d) {
                  return d.value;
                });

  // sets data to correct format for piechart
  var dataReady = pie(d3v5.entries(data));


  // shape helper to build arc on piechart group
  var arcBuilder = d3v5.arc()
                       .innerRadius(0)
                       .outerRadius(radius);

  // build d3v5.tooltip
  var causeTip = d3v5.tip()
                     .attr("class", "d3-tip")
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
                         };
                     })
                     .attr("stroke", "black");

  // make interactive animation work
  svg.call(causeTip);


  // build the piechart
  pie = svg.selectAll(".pieGroup")
               .data(dataReady)
               .enter()
             .append("path")
             .merge(svg.selectAll(".pieGroup"))
               .attr("class", "pieGroup")
               .attr("d", arcBuilder)
               .attr("fill", function(d) {
                 return (color(d.data.key))
               })
               .attr("stroke", "black")
               .on('mouseover', causeTip.show)
               .on('mouseout', causeTip.hide);


  // create svg on pie_div
  var svgPieLegend = d3v5.select("#pie_div")
                       .append("svg")
                          .attr("class", "legendPie")
                          .attr("width", pieDim.legendW)
                          .attr("height", pieDim.legendH)
                          .attr("transform", "translate(" + 0 + "," + -140 + ")")

  // create legend on svg
  var legendPie = svgPieLegend.selectAll(".legendPie")
                              .data(dataReady)
                              .enter()
                            .append("g")
                              .attr("class", "legend")
                              .attr("transform", function(d, i){
                                return "translate(" + 0 + "," + (i * 15 + 20) + ")";
                              });

  // colors rect based on names
  legendPie.append("rect")
             .attr("width", 10)
             .attr("height", 10)
             .attr("fill", function(d) {
                 return color(d.data.key);
             });

  // appends names to legend
  legendPie.append("text")
             .text(function(d){
               if (d.data.key == "Varroa_mites") {
                 return "Varroa mites"
               }
               else if (d.data.key == "Other_pests_and_parasites") {
                 return "Other pests and parasites"
               }
               else if (d.data.key == "Other*") {
                 return "Weather, starvation, queen failure or hive destruction"
               }
               else {
                 return d.data.key
               };
             })
             .style("font-size", 12)
             .attr("y", 10)
             .attr("x", 11);


  // state iso to state name. source: http://code.activestate.com/recipes/577305-python-dictionary-of-us-states-and-territories/
  // added TO: The United States
  isoToState = { 'AK': 'Alaska', 'AL': 'Alabama', 'AR': 'Arkansas', 'AS': 'American Samoa',
                 'AZ': 'Arizona', 'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut',
                 'DC': 'District of Columbia', 'DE': 'Delaware', 'FL': 'Florida',
                 'GA': 'Georgia', 'GU': 'Guam', 'HI': 'Hawaii', 'IA': 'Iowa', 'ID': 'Idaho',
                 'IL': 'Illinois', 'IN': 'Indiana', 'KS': 'Kansas', 'KY': 'Kentucky',
                 'LA': 'Louisiana', 'MA': 'Massachusetts',  'MD': 'Maryland', 'ME': 'Maine',
                 'MI': 'Michigan', 'MN': 'Minnesota', 'MO': 'Missouri', 'MP': 'Northern Mariana Islands',
                 'MS': 'Mississippi', 'MT': 'Montana', 'NA': 'National', 'NC': 'North Carolina',
                 'ND': 'North Dakota', 'NE': 'Nebraska', 'NH': 'New Hampshire',
                 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NV': 'Nevada', 'NY': 'New York',
                 'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania',
                 'PR': 'Puerto Rico', 'RI': 'Rhode Island', 'SC': 'South Carolina',
                 'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
                 'VA': 'Virginia', 'VI': 'Virgin Islands', 'VT': 'Vermont', 'WA': 'Washington',
                 'WI': 'Wisconsin', 'WV': 'West Virginia', 'WY': 'Wyoming', "TO": "The United States"
               };


  // add title
 svg.append("text")
      .attr("class", "pieTitle")
      .attr("x", 0)
      .attr("y", 0 - (pieDim.legendH + pieDim.margin*1.5))
      .attr("text-anchor", "middle")
      .text("Cause for bee loss in " + isoToState[state]);


  // make updatePie available to call on
  drawPiechart.updatePie = updatePie;


  // updates the pie chart when called on
  function updatePie() {
       // set color of the pie parts
       var color = d3v5.scaleOrdinal()
                       .domain(["a", "b", "c", "d", "e", "f"])
                       .range(d3v5.schemeDark2);


       // set dimension + margins of graph
       var pieDim = { width: 350,
                      height: 350,
                      margin: 40,
                      legendW: 150,
                      legendH: 150,
                    };


       // remake radius of the updated piechart values
       var radius = pieDim.width / 2 - pieDim.margin;


       // get html variables for updating figures
       var selectedYear = document.getElementById("yearvar").value;
       var selectedState = document.getElementById("statevar").value;
       var selectedPeriod = document.getElementById("periodvar").value;


       // set year to available data
       if (selectedYear <= 2014) {
         selectedYear = 2015;
       };


       // set data to needed part of dataset
       var data = dataset[selectedYear][selectedState];


       // set position of each causastion group on pie
       var pie = d3v5.pie()
                     .value(function(d) {
                       return d.value;
                     });


       // define updated data
       var dataUpdate = pie(d3v5.entries(data));


       // remake shape helper to build arc on piechart group
       var arcBuilder = d3v5.arc()
                            .innerRadius(0)
                            .outerRadius(radius);


       // build d3v5.tooltip
       var causeUpTip = d3v5.tip()
                          .attr("class", "d3-tip")
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
                              };
                          })
                          .attr("stroke", "black");

       // call tip
       svg.call(causeTip);


       // update the slices
       newPie = svg.selectAll(".pieGroup")
                   .data(dataUpdate)
                   .enter()
                 .append("path")
                   .on('mouseover', causeTip.show)
                   .on('mouseout', causeTip.hide)
                 .merge(svg.selectAll(".pieGroup"))
                   .transition()
                   .duration(1000)
                   .attr("class", "pieGroup")
                   .attr("d", arcBuilder)
                   .attr("fill", function(d) {
                     return (color(d.data.key))
                    })
                   .attr("stroke", "black");


       // removes excess piechart slices
       svg.selectAll(".pieGroup")
          .data(dataUpdate)
          .exit()
          .remove();


       // update figure title
       d3v5.select(".pieTitle")
           .text("Cause for bee loss in " + isoToState[selectedState]);

   };


};


function drawLinechart(dataCrop, dataBeeLine, state) {
  // this makes the multiple-linechart based on given dataset, year and state.

  var lineDim = {
                top: 20,
                right: 60,
                left: 60,
                bottom: 25,
                width: 480,
                height: 400
                };


  // create svg for piechart
  var svg = d3v5.select("#line_div")
              .append("svg")
                .attr("class", "linesvg")
                .attr("width", lineDim.width + lineDim.left + lineDim.right + lineDim.bottom)
                .attr("height", lineDim.height + lineDim.top + lineDim.bottom)
              .append("g")
                .attr("transform", "translate(" + lineDim.left + "," + lineDim.top + ")");

  var tickYears = ["2010", "2011", "2012", "2013", "2014", "2015", "2016"];

  // create x, y scaling for placing data in svg pixels
  var xScale = d3v5.scaleTime()
                   .domain([
                     d3v5.min(dataBeeLine[state], function (d) {return d["Year"] }),
                     d3v5.max(dataBeeLine[state], function (d) {return d["Year"]})])
                   .range([lineDim.top, lineDim.width]);


  var yScaleBee = d3v5.scaleLinear()
                      .domain([0, 100])
                      .range([lineDim.height - lineDim.top, lineDim.top]);


  var yScaleCrop = d3v5.scaleLinear()
                   .domain([
                     d3v5.min(dataCrop[state], function (d) {return d["Kg_per_Acre"] }) - (d3v5.min(dataCrop[state], function (d) {return d["Kg_per_Acre"] })/2),
                     d3v5.max(dataCrop[state], function (d) {return d["Kg_per_Acre"] }) + (d3v5.max(dataCrop[state], function (d) {return d["Kg_per_Acre"] })/2)])
                   .range([lineDim.height - lineDim.top, lineDim.top]);


  // define x and both y axes
  var xAxis = d3v5.axisBottom(xScale)
                  .tickFormat(d3v3.format("d"))
                  .tickValues(tickYears)

  var yAxisBee = d3v5.axisLeft(yScaleBee);

  var yAxisCrop = d3v5.axisRight(yScaleCrop);


  // Add the bee loss line
  var lineBee = d3v5.line()
            .x(function(d) {
              return xScale(d["Year"]);
            })
            .y(function(d) {
              return yScaleBee(d["Total_Annual_Loss"]);
            });

  var lineCrop = d3v5.line()
            .x(function(d) {
              return xScale(d["Year"]);
            })
            .y(function(d) {
              return yScaleCrop(d["Kg_per_Acre"]);
            });


  // Add bee loss line
  svg.append("path")
       .attr("class", "beeLine")
       .merge(svg.selectAll(".beeLine"))
       .transition()
       .duration(500)
       .attr("stroke", "red")
       .attr("fill", "none")
       .attr("d", lineBee(dataBeeLine[state]));


  // Add crop production line
  svg.append("path")
       .attr("class", "cropLine")
       .merge(svg.selectAll(".cropLine"))
       .transition()
       .duration(500)
       .attr("stroke", "blue")
       .attr("fill", "none")
       .attr("d", lineCrop(dataCrop[state]));


  // create x axis by calling on xAxis
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + (lineDim.height - lineDim.top) + ")")
     .call(xAxis);


  // create yAxis percentage loss by calling on yAxisBee
  svg.append("g")
     .attr("class", "yAxisBee")
     .attr("transform", "translate(" + lineDim.top + ",0)")
     .call(yAxisBee);


  // create yAxis yield by calling on yAxisCrop
  svg.append("g")
     .attr("class", "yAxisCrop")
     .attr("transform", "translate(" + lineDim.width + ",0)")
     .call(yAxisCrop);


  // create x-axis label
  svg.append("text")
       .attr("class", "xLabel")
       .attr("text-anchor", "end")
       .attr("x", lineDim.width / 2 + lineDim.top)
       .attr("y", lineDim.height + lineDim.top)
       .text("Year");


  // create y-axis beelabel
  svg.append("text")
       .attr("class", "yBeeLabel")
       .attr("text-anchor", "end")
       .attr("y", -lineDim.bottom)
       .attr("x", -lineDim.right*2)
       .attr("dy", "1em")
       .attr("transform", "rotate(-90)")
       .text("Bee loss in colonies (%)")
       .style("font-size", 20);


  // create y-axis croplabel
  svg.append("text")
       .attr("class", "yCropLabel")
       .attr("text-anchor", "end")
       .attr("y", - (lineDim.width + lineDim.right + lineDim.top))
       .attr("x", lineDim.width / 2)
       .attr("dy", "1em")
       .attr("transform", "rotate(90)")
       .text("Yield in Kg per Acre");


  // state iso to state name. source: http://code.activestate.com/recipes/577305-python-dictionary-of-us-states-and-territories/
  // added TO: The United States
  isoToState = {'AK': 'Alaska', 'AL': 'Alabama', 'AR': 'Arkansas', 'AS': 'American Samoa',
                'AZ': 'Arizona', 'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut',
                'DC': 'District of Columbia', 'DE': 'Delaware', 'FL': 'Florida',
                'GA': 'Georgia', 'GU': 'Guam', 'HI': 'Hawaii', 'IA': 'Iowa', 'ID': 'Idaho',
                'IL': 'Illinois', 'IN': 'Indiana', 'KS': 'Kansas', 'KY': 'Kentucky',
                'LA': 'Louisiana', 'MA': 'Massachusetts',  'MD': 'Maryland', 'ME': 'Maine',
                'MI': 'Michigan', 'MN': 'Minnesota', 'MO': 'Missouri', 'MP': 'Northern Mariana Islands',
                'MS': 'Mississippi', 'MT': 'Montana', 'NA': 'National', 'NC': 'North Carolina',
                'ND': 'North Dakota', 'NE': 'Nebraska', 'NH': 'New Hampshire',
                'NJ': 'New Jersey', 'NM': 'New Mexico', 'NV': 'Nevada', 'NY': 'New York',
                'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania',
                'PR': 'Puerto Rico', 'RI': 'Rhode Island', 'SC': 'South Carolina',
                'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
                'VA': 'Virginia', 'VI': 'Virgin Islands', 'VT': 'Vermont', 'WA': 'Washington',
                'WI': 'Wisconsin', 'WV': 'West Virginia', 'WY': 'Wyoming', "TO": "The United States"
              };


  // add title
  svg.append("text")
       .attr("class", "lineTitle")
       .attr("x", lineDim.right + lineDim.top/2)
       .attr("y", 0 - (lineDim.top / 3))
       .style("text-decoration", "underline")
       .text("Bee loss and crop yield in " + isoToState[state]);


  // make updateLine available for calling on outside the drawLinechart
  drawLinechart.updateLine = updateLine;


  function updateLine() {
      // get html variables for updating figures
      var selectedYear = document.getElementById("yearvar").value;
      var selectedState = document.getElementById("statevar").value;
      var selectedPeriod = document.getElementById("periodvar").value;


      // set line dimensions
      var lineDim = {
                    top: 20,
                    right: 60,
                    left: 60,
                    bottom: 25,
                    width: 480,
                    height: 400
                    };


      // create x, y scaling for placing data in svg pixels
      var xScale = d3v5.scaleTime()
                       .domain([
                         d3v5.min(dataBeeLine[selectedState], function (d) {return d["Year"] }),
                         d3v5.max(dataBeeLine[selectedState], function (d) {return d["Year"]})])
                       .range([lineDim.top, lineDim.width]);

      var yScaleBee = d3v5.scaleLinear()
                          .domain([0, 100])
                          .range([lineDim.height - lineDim.top, lineDim.top]);

      var yScaleCrop = d3v5.scaleLinear()
                       .domain([
                         d3v5.min(dataCrop[selectedState], function (d) {return d["Kg_per_Acre"] }) - (d3v5.min(dataCrop[selectedState], function (d) {return d["Kg_per_Acre"] })/2),
                         d3v5.max(dataCrop[selectedState], function (d) {return d["Kg_per_Acre"] }) + (d3v5.max(dataCrop[selectedState], function (d) {return d["Kg_per_Acre"] })/2)])
                       .range([lineDim.height - lineDim.top, lineDim.top]);


      // initialise line data formatting
      var lineBee = d3v5.line()
                 .x(function(d) {
                   return xScale(d["Year"]);
                 })
                 .y(function(d) {
                   return yScaleBee(d["Total_Annual_Loss"]);
                 });

      var lineCrop = d3v5.line()
                 .x(function(d) {
                   return xScale(d["Year"]);
                 })
                 .y(function(d) {
                   return yScaleCrop(d["Kg_per_Acre"]);
                 });


      // initialise new yAxis for crop
      var newYaxisCrop = d3v5.axisRight(yScaleCrop);

      svg.selectAll(".yAxisCrop")
         .transition()
         .duration(500)
         .call(newYaxisCrop);


      // initialise new bee line
      var newBee = svg.selectAll(".beeLine")
                      .data([dataBeeLine[selectedState]]);

      // place new line and merge
      newBee.enter()
        .append("path")
           .attr("class", "beeLine")
           .attr("stroke", "red")
           .attr("fill", "none")
        .merge(newBee)
           .transition()
           .duration(500)
           .attr("d", function(d) {
             return lineBee(d);
           });

      // remove excess lines
      newBee.exit().remove();


      // initialise new crop line
      var newCrop = svg.selectAll(".cropLine")
                       .data([dataCrop[selectedState]]);

      // place new line and merge
      newCrop.enter()
          .append("path")
             .attr("class", "cropLine")
             .attr("stroke", "blue")
             .attr("fill", "none")
          .merge(newCrop)
             .transition()
             .duration(500)
             .attr("d", function(d) {
               return lineCrop(d);
             });

      // remove excess lines
      newCrop.exit().remove();


      // update figure title
      d3v5.select(".lineTitle")
          .text("Bee loss and crop yield in " + isoToState[selectedState]);
  };

};
