//************************//
//********Funzioni********//
//************************//

function hsl(degree, saturation, brightness){
  this.getDegree = function functionName() {
    return degree;
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
  var totalDegree = 360;
  var secondColor = baseColor.getDegree() + totalDegree/3;
  var thirdColor = baseColor.getDegree() + (totalDegree/3) * 2;

  if (isGreaterThan(secondColor, totalDegree)){
    secondColor = secondColor - totalDegree;
  }
  secondColor = new hsl(secondColor, baseColor.getSaturation(), baseColor.getBrightness());

  if (isGreaterThan(thirdColor, totalDegree)){
    thirdColor = thirdColor - totalDegree;
  }
  thirdColor = new hsl(thirdColor, 50, 50);

  return [baseColor.printHsl(), secondColor.printHsl(), thirdColor.printHsl()];
}


//funzione che richiama un range di colori complementari
function getComplementar(baseColor, numColor, step){
  var totalDegree = 360;
  var firstComplementar = baseColor.getDegree() + 180;

  if(isGreaterThan(firstComplementar, totalDegree)){
    firstComplementar = firstComplementar - totalDegree;
  }
  var arrayColors = [firstComplementar];

  //ciclo che prende colore precedente e inserisce -1
  for (var i = numColor / 2; i >= 1; i--) {
    var newColor = arrayColors[arrayColors.length - 1] - step;
    arrayColors.push(newColor);
  }

  //ciclo che prende colore precedente e inserisce +1
  for (var k = 0 ; k < numColor / 2; k++) {
    newColor = arrayColors[0] + step;
    arrayColors.unshift(newColor);
  }

  arrayColors.map(function(currentValue, index){
    if(isGreaterThan(currentValue, totalDegree)){
      arrayColors[index] = currentValue - totalDegree;
    }
    arrayColors[index] = new hsl(arrayColors[index], baseColor.getSaturation(), baseColor.getBrightness());
    arrayColors[index] = arrayColors[index].printHsl();
  });

  return arrayColors;
}
