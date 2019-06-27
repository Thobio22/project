// !/usr/bin/env python
// Name: Thomas Verouden
// Student number: 10779272
//
// This file determines the style of the given classes of the .js file.
//
// python -m http.server 8888 &
// http://localhost:8888/index.html


window.onload = function() {

  var beeJson = "../../Datasets/json/bee_colony_loss.json";

  var beeLineJson = "../../Datasets/json/bee_loss_line.json";

  var cropJson = "../../Datasets/json/combined_crop.json";

  var causeJson = "../../Datasets/json/causation_data.json";

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
