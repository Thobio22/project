// !/usr/bin/env python
// Name: Thomas Verouden
// Student number: 10779272
//
// This file determines the style of the given classes of the .js file.
//
// python -m http.server 8888 &
// http://localhost:8888/index.html

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
