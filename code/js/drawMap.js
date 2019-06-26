// !/usr/bin/env python
// Name: Thomas Verouden
// Student number: 10779272
//
// This file determines the style of the given classes of the .js file.
//
// python -m http.server 8888 &
// http://localhost:8888/index.html

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
