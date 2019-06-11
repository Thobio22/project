// !/usr/bin/env python
// Name: Thomas Verouden
// Student number: 10779272
//
// This file determines the style of the given classes of the .js file.
//
// python -m http.server 8888 &
// http://localhost:8888/project.html


window.onload = function() {

  d3v5.json("bee_loss.json").then(function(dataset) {

    var mapDataset = getMapDataset(dataset);


  })






}

function getMapDataset(dataset) {

  // list of all ISO of the used countries
  mapISO = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", \
            "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", \
            "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", \
            "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", \
            "UT", "VT", "VA", "WA", "WV", "WI", "WY"];


  // create list with all relevant state data
  var stateData = {};

  mapISO.forEach(function(d, i) {
    console.log(d, i)
    stateData[d] = {
      




    }
  }


  return

};
