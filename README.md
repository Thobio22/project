# README
## The decline of the Honey bee in the United States
Thomas Verouden
StudentID: 10779272
These plots are made with d3 (v3 and v5) and datamaps.

### Purpose
The purpose of this visualisation is to make the populace of the Netherlands more aware of the decline of the honey bee and its effects on both agriculture and nature as we know it. This visualisation shows the state of the honey bee in the United states of America over the last 9 years, and the difficulties it had to face, as well as the effects their status has on the US.

Link to the site: https://thobio22.github.io/project/index.html

### Functionality
* Upon entering the site, you will be greeted by a story as to why the visualisations were made. A navigation bar at the top will lead you to the visualisation by clicking on "Visuals". The tab "Sources" brings you to the site with links of the sources that were used for procuring the data, and writing the code for the visualisations.

#### Visuals:

![navbar](doc/navbar.png?raw=true "navbar")

* A navigation bar was added to navigate to the page you want. The available choices are: Home, the index page where the story of the visualistation is placed; Visuals, the page with the visualisations; Sources, the page with links to the sources of the data, and inspiration and basic code of the figures.

* The active page is indicated by a honey yellow fill on the navigation bar. On hover, the navigation choice is highlighted in white.



![map](doc/map.png?raw=true "map")

* The map shows the loss of bee colonies in percentages of total apiary stock per state. The data the map shows is changable with the yearslider underneath. The year you select will show under the slider.

* The data has a range of 2010 to 2016, so if you select a year further than 2016, it will simply show the data of 2016.

* High loss of colonies leads to a darker color of red, while low percentages will move to lighter yellow. Under the map is a legend, which shows the percentages the color indicates.

* If you hover your mouse over a state, the state name and bee loss % will be shown in a tooltip, and the state will be highlighted by changing color to black.

* Once you click on a state, the other 2 figures (explained below) will update to show the relevant data pertaining that state.

* point of note: Alaska has no data on bee loss, and therefore default grey, and Hawaii actually has data in 2010, but the color might be stuck on page loading.



![line](doc/line.png?raw=true "line")

* The linechart again shows the loss of bee colonies in percentages of total apiary stock over a 7 year period (2010-2016) as the red line and red y-axis on the left. The blue line and y-axis on the left show the yield (in Kg per acre) of three crops that depend heavily on bee pollination. These three crops are: apples, pears and peaches.

* The default data the linechart uses is the average bee loss and yield of the USA as a whole, indicated by the title of the linechart.

* Once a state has been clicked on the datamap, the data for the linechart transitions to the data of that specific state, and the title will change name to the clicked state.

* If the crop line is not visible when a state has been clicked, it means that the state has no data available for the public on the production of the three crops.



![pie](doc/line.png?raw=true "pie")

* The piechart shows the documented causes for the loss in bee colonies in US apiary, indicated by the title.

* More detailed data on a particular slice of the piechart is available as a tooltip, if you hover your mousepointer over the specific slice. The selected slice will showcase its cause, and loss percentage it is responsible for in the tooltip. The legend also tells you which color is connected to which cause.

* The data shows the average loss of the US on year 2015. The data is selectable with the aformentioned year slider, with available data from 2015 to 2018.

* The data is also linked to the datamap. Once a state has been clicked, the piechart will transition to the data of that state and the title will change name to that state.

* If a state is clicked, but the year slider is on a year earlier than 2015, the piechart will simply show the data for that state in the year 2015.

* Other* in the legend refers to other causes that have been added together during data collection, and therefore not seperately visible in the piechart. These causes are: "Loss by weather, starvation, insufficient forage, queen failure, hive damage or destruction, etc." as stated in the data source.



![button](doc/button.png?raw=true "button")

* A button was added to return the data used by the linechart and the piechart to that of the US as a whole.


![tip](doc/tooltip.png?raw=true "tip")

* An example of the tooltip of the map (left) and the piechart (right).


### COPYRIGHT
(c) 2019
This code is written by Thomas Verouden.
Various sources have been used as inspiration and code base in writing the visualisations in javascript, d3.
