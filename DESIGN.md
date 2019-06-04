
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
* De data wordt opgeslagen in excel, waarna de onnodige colommen en teksten worden verwijderd en het bestand wordt opgeslagen als .csv bestand.
Deze csv files zullen vervolgens geconverteerd worden naar .json (index:order) m.b.v. (python.v3) pandas.

https://data.world/finley/bee-colony-statistical-data-from-1987-2017
Bee Colony Loss.xlsx, transformatie: relevante data naar json
Sla excel file op als .csv na onrelevante colommen te hebben verwijderd. Converteer naar json (index:order) m.b.v. (python v3) pandas.

https://usda.library.cornell.edu/concern/publications/hd76s004z?locale=en&page=2
alle jaren, transformatie: relevante data naar json (zit veel losse tekst in)

https://usda.library.cornell.edu/concern/publications/rn301137d?locale=en
Honey bee colonies: Hier staat ook de data in van bee loss causation.
Alle gegeven jaren zullen worden gebruikt (2015 t/m 2017). Transformatie: relevante data (alleen waardes) zal eerst in een excel worden gezet, waarna het als .csv kan worden opgeslagen, waarna het kan worden geconverteerd naar .json (index:order) m.b.v. (python v3) pandas.

##### Selecteerbare datasets aan de hand van een stapsgewijs selectieproces:
Select Commodity => SURVEY => ANIMALS & PRODUCTS => SPECIALTY => HONEY => selecteer je gewilde data
* Select Location => STATE => selecteer alle staten met shift + arrowdown
* Select Time => alle mogelijke jaren => gelieve jaarlijks, maar maandelijks kan ook =>
* klik op [Get Data]
* spreadsheet (rechts bovenin)

https://quickstats.nass.usda.gov/#E5B74DFC-0B12-39CB-BE0B-73F735ADE73B
H. bijenverlies -dead out per staat (2015-2018)

https://quickstats.nass.usda.gov/results/BA791169-025D-3218-9BAE-A9939FCC31FD
Honing productie per staat in $, in lb, en in lb per colony. (1987 - 2018)

https://quickstats.nass.usda.gov/results/299B60B7-FB53-360C-83E5-307DE83D0F2C
Toegevoegde en vervangen bijenkolonies (2015-2018)

https://quickstats.nass.usda.gov/results/EDFD27BF-6DA7-3DB1-97EB-A0C67C17199A
H. bijverlies in kolonies door colony collapse disorder (2015 - 2018)

https://quickstats.nass.usda.gov/results/0C293D5F-9347-3788-AFC8-0AD1BE2FE3B0
H. bijen inkomsten door bestuiving en andere producten (2015 - 2018)

https://quickstats.nass.usda.gov/results/5FEA36CD-B1C3-387F-A1A5-290E9E1B9F9C
H. bijenkolonies in inventory (1987 - 2018)

https://quickstats.nass.usda.gov/results/F5251883-849B-3817-8406-2B7B8F192D6D
H bijenkolonies die geplaagd zijn met ziektes (2015 - 2018)

https://quickstats.nass.usda.gov/results/1272B3BF-4C54-311A-A2D4-7278116899F7
H bijenkolonies die geplaagd zijn door andere oorzaken (2015-2018)

https://quickstats.nass.usda.gov/results/C769DC43-9959-3261-80E3-B34D60BDCEDD
H bijenkolonies die geplaagd zijn door *Varroa* mijten (2015 - 2018)









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

* De data die deze linechart laat zien is de totale bijensterfte(%) en de productie top 15 door bijen bestoven gewassen in de VS op een 2e y-as aan de rechterkant, met een x-as van jaren 2010 t/m 2017. Dit doet het door middel van meerdere lijnen, waarbij de gewassen selecteerbaar aan/uit zijn d.m.v. een checkbox. De desbetreffende gewassen zijn: appel, peer, watermeloen, alfalfa, tomaat, bramen, komkommer, pompoen, pruim, kers, blauwe bes, aardbij, kiwi, abrikoos. Elke lijn krijgt een andere kleur, met 0 t/m 15 gewassen lijnen zichtbaar (door de checkbox).

* De standaard data na het laden van de site is van heel de Verenigde Staten. De data is gelinkt aan fig 1: datamap. Als een staat wordt aangeklikt, zal de data in dit figuur alleen de data van de geselecteerde staat laten zien.

* Data kan worden gereset naar geheel VS met een RESET knop, jaar is nog bepaald door de jaar slider.

* On hover: d3-tooltip met jaar + staat naam + bijensterfte(%) + vegetatieverlies(%).


#### Fig 3. Pie-chart van Causatie bijenverlies(%) per jaar.
* In de body van de .html file wordt een div gemaakt onder de datamap div. Hierin zullen figuur 2 en 3 naast elkaar worden gezet.

* De data die deze piechart laat zien is de veronderstelde causatie van bijensterfte(%) in de jaren 2015 t/m 2017. De kleuren zullen indicatief zijn voor de causaties. De categoriën voor bijensterfte zijn: *Varroa* mites, other pests/parastites(including Tracheal mites, nosema, hive beetle, wax moths, etc.), diseases(including foulbrood, chalkbrood, stonebrood, acute and chronic paralysis, kashmir, deformed wing disease, sacbrood, IAPV, etc.), pesticides, other (including weather, starvation, insufficient forage, queen failure, hive damage/destruction, etc.).

* De standaard data na het laden van de site is van heel de Verenigde Staten. De data is gelinkt aan fig 1: datamap. Als een staat wordt aangeklikt, zal de data in dit figuur alleen de data van de geselecteerde staat laten zien.

* Het jaar van de dataset kan worden aangepast d.m.v. de jaar slider.

* Titel geeft aan welke dataset wordt gebruikt (VS of geklikte staat).

* Data kan worden gereset naar geheel VS met een RESET knop, jaar is nog bepaald door de jaar slider.

* On hover: d3-tooltip met Causatie + bijensterfte(%)


## Optionele componenten
#### Interactieve componenten
* Een checkbox voor selectie van de verschillende gewassen die in figuur 2 worden laten zien. Bij selectie van de gewenste gewassen zal het figuur alleen de gekozen gewassen lijnen laten zien (bijensterfte is altijd aan). Deze checkbox kan eventueel worden verwerkt in de legenda, waardoor je de legenda punten kunt aanklikken voor de gewenste data.

* De [RESET] knop zal nu ook alle highlights ongedaan maken.


#### Fig 3. Extra interactie op de pie-chart
Als een van de punten in de pie-chart wordt geselecteerd, zal de staat die het grootste percentage aan bijensterfte heeft te danken aan deze optie gehighlight worden. Deze highlight zal de staat zelf zwart maken, en een witte/lichtgrijze omtrek geven.


#### Fig 4. Scatterplot van Bijenverlies(%) tegen honingproductie(in colonies, of in lb) per staat, per jaar.
* De data die de scatterplot laat zien is het bijenverlies(%) tegen de honingproductie per staat, per jaar selecteerbaar d.m.v. de jaar slider. Elk apart bolletje is de waarde van één staat. Hierdoor worden alle staten weergegeven per geselecteerde jaar.

* De data die als eerst is geselecteerd is de data van het jaar waar de slider op begint.

* On hover geeft de staat naam, precieze bijensterfte en honingproductie.

* Als een bolletje, dus een staat, wordt aangeklikt, zal de desbetreffende staat in de datamap gehighlight worden, en zal dezelfde linked-view functie hebben als de datamap. De selectie zal figuur 2 en 3 ook data laten zien van de geselecteerde staat.

* Staat selecties die zullen worden gemaakt in Fig 1. zullen het bijbehorende bolletje in de scatterplot highlighten. Hierdoor zal het bolletje zwart worden, met een witte/lichtgrijze omtrek.


## Plugins
* D3-tip ()
* Datamaps
