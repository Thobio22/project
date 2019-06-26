// !/usr/bin/env python
// Name: Thomas Verouden
// Student number: 10779272
//
// This file determines the style of the given classes of the .js file.
//
// python -m http.server 8888 &
// http://localhost:8888/index.html

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
                          .attr("height", pieDim.legendH - pieDim.margin)
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
      .attr("y", 0 - (pieDim.legendH + pieDim.top/2))
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
