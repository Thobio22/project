# Project
Minor prog - programmeer project

Deze course focust op processing en visualiseren van een of meerdere eigen
datasets voor ondersteuning in het begrijpen van het probleem, en oplossingen
voor dit project.

Thomas Verouden


# Probleem
Van de 100 gewassen soorten die wereldwijd 90% van het voedsel leveren, worden
er 71 bestoven door bijen. In de afgelopen 20 jaar hebben de bijenpopulaties echter
per jaar steeds meer afgenomen. Dit is vooral veelvoorkomend in Europa en de
Verenigde Staten. Het realiseren van deze informatie over de toestand in de VS
is van belang voor zowel agricultuur, als honing productie in Nederland.


# Oplossing
Deze visualisatie zal het besef van dit probleem verstevigen in Nederland, zodat er
meer zal worden gedaan om dit probleem te verhelpen.


# Main features

## minimum viable product:
![Sketch](doc/paint_sketch_MVP_small.png?raw=true "Sketch")

#### Fig 1. Datamap van Jaarlijkse Bijen sterfte per staat in de VS.
De data is selecteerbaar per jaar m.b.v. een dropdown selector (2010 t/m 2017).

De kleur is een indicatie voor de bijensterfte (donkerder = meer sterfte).

On hover: d3-tooltip met staat naam + precieze bijensterfte(%).

On click: 2 gelinkte grafieken zullen de dataset gebruiken van die specifieke staat.


#### Fig 2. Multiple Line-chart van Totale bijenverlies(%) met het wilde vegetatieverlies(%) per jaar.
De default data is van de VS in zijn geheel (2010 t/m 2017).

De data veranderd naar die van de geselecteerde staat in de Datamap.

Data kan worden gereset naar geheel VS met een RESET knop, jaar is nog bepaald door de dropdown selector.

On hover: d3-tooltip met jaar + staat naam + bijensterfte(%) + vegetatieverlies(%).


#### Fig 3. Pie-chart van Causatie bijenverlies(%) per jaar.
De default data is van de VS in zijn geheel.

De data veranderd naar die van de geselecteerde staat in de Datamap en het jaar van de dropdown selector (momenteel alleen causatie van 2015-2018 gevonden).

Titel geeft aan welke dataset wordt gebruikt (VS of geklikte staat).

Data kan worden gereset naar geheel VS met een RESET knop, jaar is nog bepaald door de dropdown selector.

On hover: d3-tooltip met Causatie + bijensterfte(%)



## Optional features
![Sketch2](doc/paint_sketch_OPTIONAL_small.png?raw=true "Sketch2")

#### Fig 4. Scatterplot van bijensterfte(%) tegen honingproductie(L) per jaar.
De default data is van de VS in zijn geheel

De data veranderd naar het geselecteerde jaar in de dropdown selector.

De titel veranderd aan de hand van het geselecteerde jaar in de dropdown selector.

On hover: d3-tooltip staat naam + exacte bijenpercentage(%) en honingproductie(L).


# Data sources
https://data.world/finley/bee-colony-statistical-data-from-1987-2017
Bee Colony Loss.xlsx, transformatie: relevante data naar json

https://usda.library.cornell.edu/concern/publications/rn301137d
alle jaren, transformatie: relevante data naar json (zit veel losse tekst in)

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



# External components
- d3-tip
- Datamaps


# Similar visualisations
geen hadden (gelinkte) interactie, nog geen taartdiagram van causatie gevonden.
wel al bijen afname per staat, in een map, met kleuren als indicatie voor afname, wat ik ook kan doen.


# Moeilijkste gedeelte
Datamaps werkend krijgen (met d3 v5 en v3), met ook nog linked view, dit is in de vorige opdracht nog niet goed gelukt. Om dit te verhelpen kan ik de map als eerste implementeren, zodat eventuele problemen vroeg in het project kunnen worden verholpen.
