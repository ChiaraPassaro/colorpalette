# ColorPalette

Script che genera diversi tipi di palette a partire da un colore di base

V1.4.1

## Funzionalità

### Crea colore Hsl:<br/>
```
var baseColor = new Hsl(degree, saturation, brightness)
```

##### Argomenti: <br/>
Gradi (1-360)<br/>
Saturazione (1-100)<br/> 
Luminosità (1-100)<br/>

##### Metodi:
```
baseColor.getDegree() -> number
baseColor.getSaturation() -> number
baseColor.getBrightness() -> number
baseColor.setDegree(number) 
baseColor.setSaturation(number)
baseColor.setBrightness(number)
baseColor.printHsl() -> string hsl(degre, saturation% , brightness%)

```

### Crea palette:<br/>
```
var palette = new SetColorPalette(baseColor)
```
##### Argomenti: <br/>
Colore di base [obj Hsl]

##### Metodi:

### Colore di base
```
palette.getBasecolor() -> obj Hsl()
updateColorPalette(newColor)
```
### Palette Triadica:<br/>
#### Crea palette Triadica:<br/>
```
palette.triad()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```
#### Get palette Triadica 
```
palette.getTriad()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```


### Crea palette di colori complementari:<br/>
```
palette.complementar(numColor, stepDegree)
```
##### Argomenti:<br/>
Numero di colori desiderati - numero pari <br/>
Step in gradi tra un colore e l'altro<br/>
Gradi massimi consentiti numColor*step = 140<br/>
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```
#### Get palette di colori complementari 
```
palette.getComplementar()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```


### Crea palette di colori complementari divergenti:<br/>
```
palette.splitComplementar()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl()]
```
#### Get palette di colori complementari divergenti 
```
palette.splitComplementar()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```


### Crea palette di colori analoghi:<br/>
```
palette.analogous(typeScheme, numColor, stepDegree)
```
##### Argomenti:<br/>
Tipo di schema: 'allArch', 'cold', 'warm'<br/> 
Numero di colori desiderati - numero pari<br/>
Step in gradi tra un colore e l'altro<br/>
Gradi massimi consentiti numColor*step = 60<br/>
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```
#### Get palette di colori analoghi 
```
palette.getAnalogous()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```


### Crea palette di colori tetradica:<br/>
```
palette.tetradic()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl()]
```
#### Get palette di colori tetradica 
```
palette.getTetradic()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```


### Crea palette di colori quadratica:<br/>
```
palette.square()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl()]
```
#### Get palette di colori quadratica 
```
palette.getSquare()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```


### Crea palette di colori monocromo:<br/>
```
palette.mono (numColor, stepDegree, typeScheme)
```
##### Argomenti:<br/>
Numero di colori desiderati - numero pari <br/>
Step in gradi tra un colore e l'altro<br/>
Gradi massimi consentiti numColor*step = 100<br/>
Tipo di schema = Saturation / Brightness
##### Ritorna:
```
Array [obj Hsl(), obj Hsl()]
```
#### Get palette di colori monocromo 
```
palette.getMono()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```


### Crea palette di colori Random con Dominante
```
palette.randomDominant(numColor, percDominant
```
##### Argomenti:<br/>
Numero di colori desiderati - numero pari <br/>
Percentuale del colore di base dominante<br/>
##### Ritorna:
```
Array [obj Hsl(), obj Hsl()]
```
#### Get palette di colori Random con Dominante 
```
palette.getRandomDominant()
```
##### Ritorna:
```
Array [obj Hsl(), obj Hsl(), ...]
```

### TODO
Conversione Hsl to RGBA, Hex
Export to Text and ASE

![Color Palette](screen/screen141.png)
