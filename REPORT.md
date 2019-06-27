# REPORT

### Description
This visualisation shows the decline of the Honey bee in apiary of the United states, the effects of this decline on crop yield and the documented causes for this decline.

![report](doc/report.png?raw=true "report")


### Technical design

#### Overview
##### Componentes:
* Navigation bar with 3 pages (home, visuals, sources)
* Datamap of the United states of America: shows the percentage loss of bee colonies in apiary per state, per year.
  * The states on the datamap are selectable, updating the line and piechart.
  * Has a tooltip that shows state name and bee loss % on hover.
* Linechart of percentage bee loss and beepollination-dependant crop yield per state.
* Piechart of percentage documented causes for loss of bee colonies per state, per year.
  * Has a tooltip that shows the cause of the slice + % bee loss on hover.
* Yearslider that tell the figures to use the data of the year you selected with it.
  * Shows selected year underneath.
* Button: resets line and piechart to show data of the US, instead of a specific state that has been clicked on the datamap.


### Detailed
#### Files:
* datamaps.usa.min.js: Standard file from datamaps (link to site in Sources page) available to the public.
* Both d3 min.js files: standard files from https://d3js.org/ available to the public. Necessary for d3 to work.
* project.py: Cleans csv files and converts to .json.
* index.html: Home page with text, explaining the reason for the visualisations.
* visuals.html: Page with the visualisations.
* links.html: Page with hyperlinks to the data sources and visualisation base code/inspiration.
* initialise.js: Contains all functions that take place on window load of visuals.html.
* drawMap.js: Contains all functions for loading in the datamap.
* drawLine.js Contains all functions for loading in the linechart.
* drawPie.js Contains all functions for loading in the piechart.
* project.css: Contains all (were possible) style options used in the entire site.



#### Functions:
* initialise.js is the starting file when visuals.html is loaded. It begins by loading in the datasets, and initialising the figures by calling on the functions drawMap, drawLinechart and drawPie, while giving data with it needed for making the figures (year, state and the datasets they must make the figures with). It also sets up the functions that recover the input of the year slider (slider.oninput) and the button (getButton()). Once these functions are called upon, they update the year and state variables that are in visuals.html, set as invisible variables, and then call upon the update function of the line and piechart. (drawLinechart.updateLine() and drawPiechart.updatePie()). These update functions are located in their respective javascrypt files (drawLine.js and drawPie.js).

* drawMap.js is the file with the function that initialises the datamap (function drawMap(dataset, year)) and datamap legend, and updates it when there has been a slider input. It initialises the map by first selecting the <div> space for it, then fills that div with the map. It updates the map with a preexisting function present in datamaps.usa.min.js (updateChoropleth()), by first calling on the updated year variable, which selects a different part of the dataset in updateChoropleth. It also contains the update function once a state has been clicked, after .done, in the drawMap function. It updates both the line and piechart by updating the state variable in the .html to the selected state, and then calls upon the update functions.

* drawLine.js is the file with the function that initialises the linechart, which also contains the update function for the linechart. It initialises the linechart by first calling on the <div> where it will be placed, then making an svg in that div. It also makes all necessary variables. It scales the data to the appropriate fitting size, before appending paths to the svg element and drawing the lines, axes and labels. It updates by first calling on the (then updated) html variables, and then uses those variables to select a different portion of the given dataset on initialisation. It makes a new line, merges it or removes the old line.

* drawPie.js is the file with the function that initialises the piechart, which also contains the update function for the piechart. It first initialises all necessary variables, then places an svg in the <div> where it should be placed. Afterwards, it makes the legend with the dataset. It updates by first calling on the (then updated) html variables, and then uses those variables to select a different portion of the given dataset on initialisation. It makes new slice and merges it with the old one, or, if an old one is not present for merging, removes the old unrelevant slice.


### Challenges
There were a couple of challenges, mostly pertaining the correct format and use of datasets

* The first challenge was actually finding available datasets. I first wanted wild nature vegetation loss instead of crop yield. However, data on wild vegetation loss in the USA was hard to come by. Thus, I chose crop yield of crops that are highly dependant on pollination by bees.


* The second challenge was formatting the crop datasets in the correct format. I had 6 crop datasets that I wanted to use in the linechart, but decided on 3 when 3 of those datasets could not be correctly converted to json file, and not correctly combined into the total crop yield json (combined_crop.json). I then chose to focus on other matters first, so I could come back to those 3 datasets to see if I could make them work. The plan was to make an additional checkbox to select a specific (or multiple) crop(s) to show in the linechart, with as default a combined line. This took too much time and effort, and I focussed on the combined crop only. This was good, because I struggled too long on making all these datasets correct (2.5 weeks), which took away time I should have spent on writing javascript code. This left me with no time to both fix the other 3 crop datasets, and make the crops seperately selectable on the site.

* The third challenge was formatting the causation dataset. I could not put in a third index with periods in python (making it selectable by year, state and 3 month period to make up for the few available years), and eventually chose try again do so after I made the minimum viable product. This was the correct choice, because I ended up having no time to implement the extra datasets. I did make a dropdown selector with selectalbe periods that actually could update the piechart, but without the necessary data, it could do nothing. This was a time sensitive challenge, and I chose for making the mvp first.

* The fourth challenge was making a 4th chart, a scatterplot, with honey production against bee loss(%). I wanted to implement this, but changed my mind and wanted a second linechart with cost for replacing honey bee colonies. But because of the minimal interaction, I decided to make the mvp first, which ended up being the correct choice, because I used up all my available time on cleaning and formatting the datasets, and then making the functions for initialising and updating the charts.
