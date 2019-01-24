//************************//
//********Funzioni********//
//************************//


function hsl(degree, saturation, brightness){
  //controllo se i dati sono esatti

  if(isNaN(degree)) throw 'Degree in Not a Number';
  if(!isInRange(degree, 0, 360)) throw 'Degree number out of range';
  if(isNaN(saturation)) throw 'Saturation in Not a Number';
  if(!isInRange(saturation, 0, 360)) throw 'Saturation number out of range';
  if(isNaN(brightness)) throw 'Brightness in Not a Number';
  if(!isInRange(brightness, 0, 360)) throw 'Brightness number out of range';

  var _degree = parseFloat(degree.toFixed(2));
  var _saturation = parseFloat(saturation.toFixed(2));
  var _brightness = parseFloat(brightness.toFixed(2));

  this.getDegree = function functionName() {
    return _degree;
  };
  this.getSaturation = function functionName() {
    return saturation;
  };
  this.getBrightness = function functionName() {
    return brightness;
  };
  this.printHsl = function functionName() {
    return 'hsl(' + degree + ',' + saturation + '%,' + brightness + '%)';
  };

}

function getTriad(baseColor){
  //controllo i dati
    if(typeof baseColor != 'object') throw 'Basecolor is not an object';

    var _baseColor = baseColor;

    var totalDegree = 360;
    var secondColor = parseFloat((_baseColor.getDegree() + totalDegree/3).toFixed(2));
    var thirdColor = parseFloat((_baseColor.getDegree() + (totalDegree/3) * 2).toFixed(2));

    //se i gradi sono di più di 360
    if (isGreaterThan(secondColor, totalDegree)){
      secondColor = secondColor - totalDegree;
    }
    secondColor = new hsl(secondColor, _baseColor.getSaturation(), _baseColor.getBrightness());

    //se i gradi sono di più di 360
    if (isGreaterThan(thirdColor, totalDegree)){
      thirdColor = thirdColor - totalDegree;
    }
    thirdColor = new hsl(thirdColor, _baseColor.getSaturation(), _baseColor.getBrightness());

    return [_baseColor, secondColor, thirdColor];

}

//funzione che richiama un range di colori complementari
//se il numero di colori e gli step non sono specificati default 3 colori e 10 step
function getComplementar(baseColor, numColor, stepDegree){

  var step = stepDegree || 10;
  step = parseFloat(step.toFixed(2));
  var num = numColor || 3;
  num = Math.floor(num);

  //se il numero di gradi è superiore a 140 errore
  if(step * num > 140) throw 'Out of range > 140degree';

  var totalDegree = 360;
  var firstComplementar = parseFloat((baseColor.getDegree() + 180).toFixed(2));

  if(isGreaterThan(firstComplementar, totalDegree)){
    firstComplementar = firstComplementar - totalDegree;
  }
  var arrayColors = [firstComplementar];

  //ciclo che prende colore precedente e inserisce -step
  for (var i = num / 2; i >= 1; i--) {
    var newColor = arrayColors[arrayColors.length - 1] - step;
    //trasformo in un numero a due decimali
    newColor = parseFloat(newColor.toFixed(2));
    //aggiungo colore all'ultimo posto
    arrayColors.push(newColor);
  }

  //ciclo che prende colore precedente e inserisce +step
  for (var k = 0 ; k < (num / 2 - 1); k++) {
    newColor = arrayColors[0] + step;
    //trasformo in un numero a due decimali
    newColor = parseFloat(newColor.toFixed(2));
    //aggiungo colore al primo posto
    arrayColors.unshift(newColor);
  }

  //sostituisco i gradi oltre i 360
  arrayColors.map(function(currentValue, index){
    if(isGreaterThan(currentValue, totalDegree)){
      arrayColors[index] = parseFloat((currentValue - totalDegree).toFixed(2));
    }
    //sostituisco con nuovo oggetto hsl()
    arrayColors[index] = new hsl(arrayColors[index], baseColor.getSaturation(), baseColor.getBrightness());
  });

  return arrayColors;
}
