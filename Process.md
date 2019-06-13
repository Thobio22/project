# MPROG process book


## 03-06-2019
* Ik heb ervoor gekozen om de datamap als hoofdgrafiek te hebben, zodat data selecteren voor de andere grafieken aan de hand van de staten makkelijker en intuïtiever is.

* De line-chart een multiple-line-chart worden en selecteerbaar zijn per staat met vegetatieverlies(%) naast bijenverlies(%), om het probleem van bijenverlies te verduidelijken.

* Er was alleen Causatie data voor bijensterfte gevonden vanaf 2015, niet eerder. Hierdoor is het grafiek nummer 3, waar pas aandacht naar wordt getrokken NA de line-chart.

* De scatteroplot zal niet meer selecteerbaar zijn per staat, omdat er anders maar 1 punt uit komt voor de hele grafiek. Hierdoor is de scatterplot met bijensterfte(%) tegen honingproductie(lb of in colonies) nu fig 4, en dus niet deel van de minimum viable product. Dit is zodat het niet deel van de linked-view datamap hoeft te zijn, en kan het data laten zien per jaar.  



## 04-06-2019
* DESIGN.md aangemaakt

* In plaats van wilde vegetatie in fig 2.: gewassen afhankelijk van bijenbestuiving. Ik heb hiervoor gekozen, omdat ik veel data al had gevonden op een eerdere data source over deze productie in de Verenigde Staten, en op dat moment minder of niets over wilde vegetatie verlies.

* Na feedback van mentor: optioneel een checkbox bij fig 2. waarbij de verschillende gewassen selecteerbaar zijn, waardoor de lijnen zichtbaar of juist niet zichtbaar worden in de linechart. Zo kan er gekozen worden welke gewassen de kijker wilt zien, tegenover bijensterfte.

* In DESIGN.md meer in detail geschreven over processen, alleen nog geen functie namen/visueel diagram.

* Datasets toegevoegd, zowel voor mvp, als optionele, als zou-misschien-van-pas-komen optionele datasets. Ik heb ervoor gekozen om maar 6 gewassen (die afhankelijk zijn van bijenbestuiving) te gebruiken, omdat de eerdere 15 te veel werk zouden zijn om hun productie naar bruikbare waardes te maken, en omdat niet elke staat genoeg van de specifieke gewassen produceert om in de datasets terecht te komen, en de verschillen in aanwezige jaren van productie data. Deze 6 hebben ook gelimiteerde jaar- en staat-ranges, maar minder dan de anderen. Ook heb ik voor deze 6 gewassen gekozen, omdat ze vrij westers zijn, en bekend in Nederland, zodat westerse/nederlandse lezers beter kunnen relateren.



## 05-06-2019
* Standup:
    * Enriko: Fig 2. lijnen per gewas zal waarschijnlijk te druk worden.
    * Teska & Pascalle: Fig 2. Misschien een idee om een totale gewassen productie/yield te gebruiken, in plaats van de 6 gewassen.

* Aan de hand van de standup feedback: fig 2. wil ik, naast bijensterfte, alleen 1 bekend, westers gewas gebruiken, waar Nederlanders zich goed aan kunnen relateren. Als optioneel wil ik dan meerdere gewassen selecteerbaar maken, zodat er meerdere lijnen zichtbaar zijn. Dit heb ik nu ook zo aangepast in DESIGN.md. Als alternatief kan ik 1 lijn (gewicht/acre productie) maken uit de gekozen gewassen voor *mvp*, met een checkbox om de gewassen individueel te laten zien voor *optioneel*. Ik heb hiervoor gekozen, omdat het anders toch te veel werk wordt om de data van alle gewassen om te zetten tot werkbare data, die allen overeenkomt in waardes. Voor nu denk ik dat 1 gewas genoeg is voor de *mvp*, met de andere gewassen nog beschikbaar en kiesbaar voor optionele aanpassingen.

* Begonnen met het schoonmaken van de data in project.py . De datasets van www.quickstats.nass.usda.gov is eerst met excel op komma gedeeld. Dit niet gedaan in python, omdat (vermoedelijk) alle colom titels als 1 titel string werden beschouwd, waardoor pandas er niets mee kon. Eenmaal via excel appel_data.csv getransformeerd te hebben, kon het met pandas bewerkt worden als dataframe. Er waren een aantal waardes gevonden die aangaven dat er niet een waarde was doorgegeven voor die staat op dat jaar, door "(X)", "(NA)", en "(D)". Ik heb al deze waardes naar "(NA)" geconverteerd voor gemak.

* Na korte bespreking met TA Jasper heb ik besloten deze waardes te interpoleren (gemiddelde van het jaar ervoor en het jaar erna, van die specifieke staat). Ook heb ik besloten om de dataset in te korten, door alleen de jaren te gebruiken die in de linechart moeten komen te staan.


## 06-06-2019
* Standup feedback: Probeer missende data punten die je wilt interpoleren te maken m.b.v. een zelf geschreven script. Focus op alleen de datamap implementeren voor vrijdag, dus ook alleen de data set die je nodig hebt voor datamap (bijensterfte).

* bijensterfte dataset staat in periodes 2010/11 t/m 2016/17. Ik zal dit opschrijven als 2010 t/m 2016. Dit is voor de juiste progressie/overgang/linked view met de andere datasets, die wel op jan-dec jaarlijkse basis staan aangegeven. De datasets verdeeld over 3-maandelijkse periodes zullen worden samengevoegd tot ze een jan-dec jaar vormen aan data.

* bijensterfte data: de data voor de staten Puerto Rico en Alaska worden uit deze dataset verwijderd, omdat er een minimaal aantal jaarpunten aanwezig zijn, en allen zijn ze leeg in de bijenverlies kolom.

* De percentages in bee_colony_loss (bijensterfte dataset) staat in excel als type perentage. Dit zorgt voor errors in python v3 pandas, en het percentage wilt niet worden omgezet naar float. Daarom heb ik de waardes zelf handmatig in excel van data type percentage naar type getal (met 3 decimalen achter de komma) gezet.

* Veel problemen met datasets die opgeslagen waren via excel. Nu in excel de decimalen aangegeven met . (ipv ,) en duizendtallen met , (ipv .). Dit fixt hopelijk het omzetten naar float probleem.

## 07-06-2019
* Standup feedback: Als het script schrijven voor nu te lang doet, kun je het voor de bijensterfte dataset misschien handmatig doen met excel.

* project.html gevuld met divs voor de figuren. De interactieve componenten er in gezet (zonder linkende werking nog).

* project.css aangemaakt, hier wil ik het meeste, al dan niet alle stijl opties in zetten. Dit staat nog niet vast voor elke grafiek, omdat ik nog niet goed weet hoe dit werkt voor de datamap. Background color licht geel gekozen, want bijen. De interactieve componenten een honingkleur gegeven voor dezelfde reden.

* d3-tip.js en datamaps.uda.min.js toegevoegd aan de repository voor gebruik. Voor de datamap laadt ik D3v3 in, en voor al het andere dat ik project.js komt gebruik ik D3v5. Dit doe ik omdat de datamaps niet worden ondersteund door d3v5.

* Handmatig de bijendata aan het extrapoleren en interpoleren. (extrapoleren vb: District of columbia, excel TREND(2011 t/m 2013 data voor datapunt 2010)

## 10-06-2019
* Alleen aan data opschonen gezeten. Missende datapunten zullen worden geextrapoleerd of geinterpoleerd waar toepasbaar (in excel zelf voor gemak). Extrapoleren wordt gedaan met behulp van de =trend() functie in excel. Interpoleren wordt gedaan door het gemiddelde te pakken van de twee aangrenzende waardes (1 jaar eerder, 1 jaar later).


## 11-06-2019
* Standup feedback: Data opschonen gewoon blijven doen via excel, scheelt tijd ipv een heel programma schrijven.

* Verder met data opschonen voor gebruik. "OTHER STATES" in de gewassen data zal niet worden gebruikt voor de line-chart, omdat het niet selecteerbaar is met de datamap.

* Het maken van de datamap plot.

## 12-06-2019
* Standup: Niet extra/interpoleren, bewaar dat voor optioneel.

* Besloten om de bij de datasets alleen de yield in weight/acre te nemen (dus geen production in total, etc) voor gemak in gebruik, aangezien hetr verwijderen van rijen in pandas niet goed lukt. pear_data.csv: https://quickstats.nass.usda.gov/results/E83FEECB-C6E3-37B4-B4EA-BE9380C2BD19. Dit wordt gedaan door alleen YIELD --> WEIGHT / ACRE in de selectiemoegelijkheden.

* In excel zullen de staat ISO codes worden toegevoegd aan bee_colony_loss voor datamap. Dit doe ik, omdat dit het makkelijkst te doen is in excel, en tijd bespaard voor de data selecteren voor de datamap. MultistateOperation zal handmatig worden verwijderd, aangezien het niet te linken is aan een staat.

* Data zit nu in nested dictionary: index = ["Year", "State ISO"]. Dit is handig voor het selecteren van de data: de slider selecteerd het jaar van alle grafieken, de state ISO is dan voor de map (map data wordt: dataset[geselcteerde jaar]). De data die wordt doorgegeven van slider naar line/pie is het jaar + eventueel geselecteerde staat (standaard gehele VS). Als een staat geselecteerd is, en daarna met de slider een ander jaar wordt gegeven, moet de vorige staat onthouden worden.

* Eindelijk data in de juiste formaat gekregen (nested dictionary). Dit kan ik nu toepassen op mijn andere datasets. De dataset heb ik vervolgens met json.dump in een json file moeten zetten.


## 13-06-2019
* Standup feednback: alles wat ik nu doe vergt gewoon tijd.

* Map heb ik kunnen tekenen, al zijn er nog wat fouten in de data: sommige bijenverlies percentages zijn float met 10 decimalen, en anderen weer niet. De bee_colony_loss.json die wordt gebruikt voor het tekenen van de map wordt niet geupdate, ook al typ ik er handmatig wat bij.

* map + pie-chart aan het maken. Voor pie-chart en line-chart gebruik ik d3-graph-gallery.com
