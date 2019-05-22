# Project
Minor prog - programmeer project

Deze course focust op processing en visualiseren van een of meerdere eigen
datasets voor ondersteuning in het begrijpen van het probleem, en oplossingen
voor dit project.


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

### fig 1. lijn grafiek met jaarlijks verlies aan bijen in de VS
- interacties:
  muis over punt in lijn: d3-tip met aanvullende/preciezere data,
                          highlight de amerikaanse staat met het meeste
                          verlies in bijen in fig 2

  klik op punt in lijn: zet aangeklikte jaar voor de scatterplot data in fig 3


### fig 2. datamap met bijen verlies per staat
- interacties:
  data selecteerbaar per jaar door middel van een dropdown

  muis over staat: d3-tip met aanvullende/preciezere data

  klik op staat: zet aangeklikte staat + van te voren gekozen jaartal als benodigdheden
                 voor de data gevisualiseerd in fig 3


### fig 3. scatterplot met bijen verlies tegenover honingproductie in de VS
- interacties:
  muis over datapunt: d3-tip met aanvullende/preciezere data

  zie interacties bij fig 1+2 voor interacties op fig 3


### knop [RESET]: zet fig 1 en 2 naar actuele jaar (met volledige VS data voor fig 3)


## Optional features:

### 4e figuur met taartdiagram (piechart) oorzaak van verlies
- interacties:
  fig 1, klik op jaarpunt ==> selecteert jaar voor taartdiagram
  fig 2, klik op staat ==> selecteert verlies causatie in taartdiagram
  muis over taartpunt: d3-tip met aanvullende/preciezere data

### 4e/5e figuur met scatter bijen verlies tegen (door bijen bestuifde)krop productie


# Data sources
https://data.world/finley/bee-colony-statistical-data-from-1987-2017
Bee Colony Loss.xlsx, transformatie: relevante data naar json

https://usda.library.cornell.edu/concern/publications/rn301137d
alle jaren, transformatie: relevante data naar json (zit veel losse tekst in)

https://usda.library.cornell.edu/concern/publications/hd76s004z?locale=en&page=2
alle jaren, transformatie: relevante data naar json (zit veel losse tekst in)


# External components
- d3-tip
- Datamaps


# Similar visualisations
geen hadden (gelinkte) interactie, nog geen taartdiagram van causatie gevonden.
wel al bijen afname per staat, in een map, met kleuren als indicatie voor afname, wat ik ook kan doen.

# Moeilijkste gedeelte
datamaps werkend krijgen, met ook nog linked view. Al aan datamaps zitten met data-processing om werking onder de knie te krijgen.

taartdiagram met linked view.
