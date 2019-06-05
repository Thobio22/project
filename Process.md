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

* Aan de hand van de standup feedback: fig 2. wil ik, naast bijensterfte, alleen 1 bekend, westers gewas gebruiken, waar Nederlanders zich goed aan kunnen relateren. Als optioneel wil ik dan meerdere gewassen selecteerbaar maken, zodat er meerdere lijnen zichtbaar zijn. Dit heb ik nu ook zo aangepast in DESIGN.md. Als alternatief kan ik 1 lijn (gewicht/acre productie) maken uit de gekozen gewassen voor *mvp*, met een checkbox om de gewassen individueel te laten zien voor *optioneel*. Ik heb hiervoor gekozen, omdat
