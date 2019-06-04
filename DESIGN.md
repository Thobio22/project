
For this deadline, you must prove that you have access to the data in a usable format!

Some parts that you should describe here:

    a list of data sources if you will get data from an external source, including information on how your are going to filter and transform the data for your project

    a diagram with an overview of the technical components of your app (visualizations, scraper etc etc)

    as well as descriptions of each of the components and what you need to implement these

    a list of APIs or D3 plugins that you will be using to provide functionality in your app



# Designer Document
Project desinger document

*Thomas Verouden
stID: 10779272*


## Data bronnen
https://data.world/finley/bee-colony-statistical-data-from-1987-2017
Bee Colony Loss.xlsx, transformatie: relevante data naar json
Sla excel file op als .csv na onrelevante colommen te hebben verwijderd. Converteer naar json (index:order) m.b.v. (python v3) pandas.


https://usda.library.cornell.edu/concern/publications/hd76s004z?locale=en&page=2
alle jaren, transformatie: relevante data naar json (zit veel losse tekst in)


https://quickstats.nass.usda.gov/#E5B74DFC-0B12-39CB-BE0B-73F735ADE73B
https://quickstats.nass.usda.gov/results/BA791169-025D-3218-9BAE-A9939FCC31FD
selecteerbare datasets aan de hand van een stapsgewijs selectieproces.
* Select Commodity => SURVEY => ANIMALS & PRODUCTS => SPECIALTY => HONEY => selecteer je gewilde data
* Select Location => STATE => selecteer alle staten met shift + arrowdown
* Select Time => alle mogelijke jaren => gelieve jaarlijks, maar maandelijks kan ook =>
* klik op [Get Data]
* spreadsheet (rechts bovenin)



De data wordt opgeslagen in excel, waarna de onnodige colommen worden verwijderd en het bestand wordt opgeslagen als .csv bestand.
Deze csv files zullen vervolgens geconverteerd worden naar .json (index:order) m.b.v. (python.v3) pandas.


## Technische componenten overzicht
Hier zullen de componenten van de visualisatie worden uitgelegd, opgesplitst in *minimum viable product* en *optionele componenten*.

### Minimum Viable Product:

#### Interactieve componenten
* Een html button [Whole USA] (eerst [RESET]) dat er voor zorgt dat de data in figuur 2 en 3 bestaat uit die van de gehele Verenigde staten
  voor het geval dat er op een staat in de datamap is geklikt, en de lezer terug wilt naar de default gehele VS data

* Een slider met jaartallen dat er voor zorgt dat alleen de data voor dat jaar wordt gebruikt in figuur 1, 2 en 3. Huidige jaartallen: 2010 t/m 2017.


#### Fig 1. Datamap van Jaarlijkse Bijen sterfte per staat in de VS.
* In de body van de .html file wordt een div aangemaakt. Hierin zal de interactieve datamap wordt geplaatst van de Verenigde Staten, met selecteerbare staten.

* De data die deze datamap laat zien is de jaarlijkse bijensterfte uit gehouden kolonies per staat, indicatief door de kleuren per staat.

* De data is selecteerbaar per jaar m.b.v. de slider (jaren 2010 t/m 2017).

* Een d3-tooltip zal worden gebruikt voor on-hover opties, waarin extra informatie wordt gegeven over de staat. Deze data bevat: de naam van de staat en het precieze percentage aan bijenkolonies dat in dat jaar is gestorven.

* Een onclick implementatie zal worden gebruikt om de data in figuur 2 en 3 te wissen, en opnieuw aan te maken met de data van alleen de geselecteerde staat.


#### Fig 2. Multiple Line-chart van Totale bijenverlies(%) met het wilde vegetatieverlies(%) per jaar.
* In de body van de .html file wordt een div gemaakt onder de datamap div. Hierin zullen figuur 2 en 3 naast elkaar worden gezet.

* De data die deze datamap laat zien is de totale bijensterfte(%) en de productie top 15 door bijen bestoven gewassen in de VS op een 2e y-as aan de rechterkant, met een x-as van jaren 2010 t/m 2017. Dit doet het door middel van meerdere lijnen, waarbij de gewassen selecteerbaar aan/uit zijn d.m.v. een checkbox. De desbetreffende gewassen zijn: appel, peer, watermeloen, alfalfa, tomaat, bramen, komkommer, pompoen, pruim, kers, blauwe bes, aardbij, kiwi, abrikoos. Elke lijn krijgt een andere kleur, met 0 t/m 15 gewassen lijnen zichtbaar (door de checkbox).

* De standaard data na het laden van de site is van heel de Verenigde Staten. De data is gelinkt aan fig 1: datamap. Als een staat wordt aangeklikt, zal de data in dit figuur alleen de data van de geselecteerde staat laten zien. 

* Data kan worden gereset naar geheel VS met een RESET knop, jaar is nog bepaald door de jaar slider.

* On hover: d3-tooltip met jaar + staat naam + bijensterfte(%) + vegetatieverlies(%).


#### Fig 3. Pie-chart van Causatie bijenverlies(%) per jaar.
De default data is van de VS in zijn geheel.

De data veranderd naar die van de geselecteerde staat in de Datamap en het jaar van de jaar slider (momenteel alleen causatie van 2015-2018 gevonden).

Titel geeft aan welke dataset wordt gebruikt (VS of geklikte staat).

Data kan worden gereset naar geheel VS met een RESET knop, jaar is nog bepaald door de jaar slider.

On hover: d3-tooltip met Causatie + bijensterfte(%)


## Optionele componenten



## Plugins
* D3-tip ()
