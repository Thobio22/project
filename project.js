// !/usr/bin/env python
// Name: Thomas Verouden
// Student number: 10779272
//
// This file determines the style of the given classes of the .js file.
//
// The dropdown menu is from https://guide.freecodecamp.org/javascript/tutorials/how-to-create-a-dropdown-menu-with-css-and-javascript/
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
    // window.piedata = response[3];

    // set default variables for updating figures
    var state = "TO";
    var period = "year";


    // get slider year value
    var slider = document.getElementById("year_slider");
    var year = slider.value;


    // update slider data on select
    var slider_output = document.getElementById("slid_year");
    slider_output.innerHTML = year;


    //get elements from dropdown (link source in code description)
    var dropdownTitle = document.querySelector('.dropdown .title');
    var dropdownOptions = document.querySelectorAll('.dropdown .option');


    //bind listeners to dropdown elements gotten (link source in code description)
    dropdownTitle.addEventListener('click', toggleMenuDisplay);
    dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));
    document.querySelector('.dropdown .title').addEventListener('change', handleTitleChange); // changes periodvar html variable
    document.querySelector('.dropdown .title').addEventListener('change', function(){periodUpdate(data_cause)}); // gives data needed in updatePie


    // act when default button has been pressed
    d3v5.select("#defaultButton").on("click", function(){getButton(data_cause, data_bee_line, data_crop)});

    function getButton(data_cause) {
      // set selected html variable to desired value
      document.getElementById("periodvar").value = "year";
      document.getElementById("statevar").value = "TO"

      // get html variables
      var selectedYear = document.getElementById("yearvar").value
      var selectedState = document.getElementById("statevar").value
      var selectedPeriod = document.getElementById("periodvar").value
      console.log(selectedPeriod)
      // updatePie(selectedYear, selectedState, selectedPeriod);
      // updateLine(selectedState);
    };


    // initialise figures
    drawMap(data_bee, year);
    drawLinechart(data_crop, data_bee_line, state);
    drawPiechart(data_cause, year, state);


    // on slider change = give new year
    slider.oninput = function() {
        // set year to wanted variable
        year = this.value;
        slider_output.innerHTML = year;
        document.getElementById("yearvar").value = year;

        // update figures
        drawLinechart.updateLine();
        drawPiechart.updatePie();

    };
  });
};


function updateFigures(dataPie, year, state, radius, svgPie) {
    updatePie(dataPie, year, state, radius, svgPie);
    updateLine(state);
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
                  // removes all lines in linechart
                  console.log("komt in onclick map")
                  console.log(geography);
                  document.getElementById("statevar").value = geography.id;
                  console.log(document.getElementById("statevar").value)
                  // d3v5.selectAll("#path").remove();
                  // updateFigures(year, geography.id);
                  drawPiechart.updatePie();
                })
              }
  });

  d3v5.select("#year_slider").on("input", function(e) {
    selectedYear = parseInt(document.getElementById("year_slider").value)
    console.log(selectedYear)

    if (selectedYear >= 2017) {
      selectedYear = 2016;
    };

    linkedMap.updateChoropleth(dataset[selectedYear]);
  })



  var slidermap = document.getElementById("year_slider");

  slidermap.oninput = function() {
    console.log("map_update")

    // year = slider value
    var selectedYear = this.value;

    if (selectedYear > 2016) {
      selectedYear = 2016;
    }

  };


  // draw a legend on map
  // linkedMap.legend({
  //   labels: {
  //     90: "90 to 100%",
  //     80: "80 to 90%",
  //     70: "70 to 80%",
  //     60: "60 to 70%",
  //     50: "50 to 60%",
  //     40: "40 to 50%",
  //     30: "30 to 40%",
  //     20: "20 to 30%",
  //     10: "10 to 20%",
  //     0: " 00 to 10%",
  //   }
  // });


};


function updateMap(dataset) {

}


function drawPiechart(dataset, year, state) {
  // This draws the pie-chart of bee loss causation in the pie_div

  // pie chart only has years 2015 - 2018
  if (year < 2015) {
    year = 2015;
  };

  // set dimension + margins of graph
  var pieDim = { width: 450,
                 height: 450,
                 margin: 40,
                 legendW: 150,
                 legendH: 150,
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

  var legendPie = svgPieLegend.selectAll(".legendPie")
                              .data(dataReady)
                              .enter()
                            .append("g")
                              .attr("class", "legend")
                              .attr("transform", function(d, i){
                                return "translate(" + 0 + "," + (i * 15 + 20) + ")";
                              });

  legendPie.append("rect")
             .attr("width", 10)
             .attr("height", 10)
             .attr("fill", function(d) {
                 return color(d.data.key);
             });

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

  drawPiechart.updatePie = updatePie;



  function updatePie() {
  // updates the pie chart when called on

       // console.log(window.piedata)
       console.log("kom in updatePie")


       // set color of the pie parts
       var color = d3v5.scaleOrdinal()
                       .domain(["a", "b", "c", "d", "e", "f"])
                       .range(d3v5.schemeDark2);


       // set dimension + margins of graph
       var pieDim = { width: 450,
                      height: 450,
                      margin: 40,
                      legendW: 150,
                      legendH: 150,
                    };


       // set radius of the piechart
       var radius = pieDim.width / 2 - pieDim.margin;


       // get html variables for updating figures
       var selectedYear = document.getElementById("yearvar").value;
       var selectedState = document.getElementById("statevar").value;
       var selectedPeriod = document.getElementById("periodvar").value;


       if (selectedYear <= 2014) {
         selectedYear = 2015;
       };



       // set data to needed part of dataset
       console.log(dataset)
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


       // remake radius
       var radius = pieDim.width / 2 - pieDim.margin;


       // select already made causeTip
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

       console.log("na d3 tip")


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


      svg.selectAll(".pieGroup")
         .data(dataUpdate)
         .exit()
         .remove();




   };


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
                     d3v5.min(data_bee_line[state], function (d) {return d["Year"] }),
                     d3v5.max(data_bee_line[state], function (d) {return d["Year"]})])
                   .range([lineDim.top, lineDim.width]);


  var yScaleBee = d3v5.scaleLinear()
                      .domain([0, 100])
                      .range([lineDim.height - lineDim.top, lineDim.top]);


  var yScaleCrop = d3v5.scaleLinear()
                   .domain([
                     d3v5.min(data_crop[state], function (d) {return d["Kg_per_Acre"] }) - (d3v5.min(data_crop[state], function (d) {return d["Kg_per_Acre"] })/2),
                     d3v5.max(data_crop[state], function (d) {return d["Kg_per_Acre"] }) + (d3v5.max(data_crop[state], function (d) {return d["Kg_per_Acre"] })/2)])
                   .range([lineDim.height - lineDim.top, lineDim.top]);


  // define x and both y axes
  var xAxis = d3v5.axisBottom(xScale)
                  .tickFormat(d3v3.format("d"))
                  .tickValues(tickYears)

  var yAxisBee = d3v5.axisLeft(yScaleBee);

  var yAxisCrop = d3v5.axisRight(yScaleCrop);


  // // create tip for extra information
  // var beelineTip = d3v5.tip()
  //                   .attr('class', 'd3-tip')
  //                   .offset([-10, 0])
  //                   .html(function(d) {
  //                     return "Year: " + d["Year"] + "<br>" + "Bee Loss: " + d["Total_Annual_Loss"];
  //                    })
  //                   .attr("stroke", "black");
  //
  // var croplineTip = d3v5.tip()
  //                   .attr('class', 'd3-tip')
  //                   .offset([-10, 0])
  //                   .html(function(d) {
  //                     return "Year: " + d["Year"] + "<br>" + "Yield: " + d["Kg_per_Acre"];;
  //                    })
  //                   .attr("stroke", "black");
  //
  // // make interactive animation work
  // svg.call(beelineTip);
  // svg.call(croplineTip);


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
              // console.log(d)
              return yScaleCrop(d["Kg_per_Acre"]);
            });


  // Add bee loss line
  svg.append("path")
       .attr("class", "beeLine")
       .attr("stroke", "red")
       .attr("fill", "none")
       .attr("d", lineBee(data_bee_line[state]))
       // .on('mouseover', beelineTip.show)
       // .on('mouseout', beelineTip.hide);


  svg.append("path")
       .attr("class", "beeLine")
       .attr("stroke", "blue")
       .attr("fill", "none")
       .attr("d", lineCrop(data_crop[state]))
       // .on('mouseover', croplineTip.show)
       // .on('mouseout', croplineTip.hide);


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


  function updateLinechart() {

    console.log("komt in update line, state: ", state)

    // get html variables for updating figures
    var selectedYear = document.getElementById("yearvar").value;
    var selectedState = document.getElementById("statevar").value;
    var selectedPeriod = document.getElementById("periodvar").value;


  }

};


function toggleClass(elem,className){
	if (elem.className.indexOf(className) !== -1) {
		elem.className = elem.className.replace(className,'');
	}
	else {
		elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
	};

	return elem;
};


function toggleDisplay(elem) {
	var curDisplayStyle = elem.style.display;

	if (curDisplayStyle === 'none' || curDisplayStyle === ''){
		elem.style.display = 'block';
	}
	else{
		elem.style.display = 'none';
	}
};


function toggleMenuDisplay(e) {
	var dropdown = e.currentTarget.parentNode;
	var menu = dropdown.querySelector('.menu');
	var icon = dropdown.querySelector('.fa-angle-right');

	toggleClass(menu,'hide');
	toggleClass(icon,'rotate-90');
};


function handleOptionSelected(e) {
	toggleClass(e.target.parentNode, 'hide');

	var id = e.target.id;
	var newValue = e.target.textContent + ' ';
	var titleElem = document.querySelector('.dropdown .title');
	var icon = document.querySelector('.dropdown .title .fa');


	titleElem.textContent = newValue;
	titleElem.appendChild(icon);

	//trigger custom event
	document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
	//setTimeout is used so transition is properly shown
	setTimeout(() => toggleClass(icon,'rotate-90',0));
};


function handleTitleChange(e) {
    // set selected html variable to desired value
    document.getElementById("periodvar").value = e.target.innerText;
};


function periodUpdate(data_cause) {
  // call in all needed variables
  var selectedYear = document.getElementById("yearvar").value
  var selectedState = document.getElementById("statevar").value
  var selectedPeriod = document.getElementById("periodvar").value
  console.log(selectedPeriod)
  drawPiechart.updatePie();
};
