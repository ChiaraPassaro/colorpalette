#ColorPalette

Script che genera diversi tipi di palette a partire da un colore di base

V1.1

##Funzionalità

###Crea colore hsl:<br/>
Funzione hsl(degree, saturation, brightness)<br/>
Argomenti - gradi (1-360), saturazione (1-100), luminosità (1-100)<br/>

###Crea palette Triadica:<br/>
Funzione getTriad(baseColor)<br/>
Argomenti - colore di base<br/>

###Crea palette di colori complementari:<br/>
Funzione getComplementar(baseColor, numColor, step)<br/>
Argomenti - colore di base, numero di colori desiderati, step in gradi tra un colore e l'altro<br/>
Gradi massimi consentiti numColor*step 140<br/>


###ToDo color schemes<br/>
Analogous, Split-Complementary, Tetradic, Square, Monochrome<br/>

![Color Palette](screen/screen11.png)
