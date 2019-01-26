Hsl//************************//
//********Funzioni********//
//************************//


function Hsl(degree, saturation, brightness){
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

  this.getDegree = function() {
    return _degree;
  };
  this.getSaturation = function() {
    return _saturation;
  };
  this.getBrightness = function() {
    return _brightness;
  };
  this.printHsl = function() {
    return 'hsl(' + _degree + ',' + _saturation + '%,' + _brightness + '%)';
  };

}

function setColorPalette(baseColor){
  if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';

  var _totalDegree = 360;
  var _baseColor = baseColor;


  this.triad = function(){
    return getColors(240, 2, 60);
  }

  function getColors(rangeDegree, numColor, stepDegree, complementar){
    var _rangeDegree = parseFloat(rangeDegree.toFixed(2));

    var _num = numColor || 2;
    _num = Math.floor(_num);

    var _step = stepDegree || 10;
    _step = parseFloat(_step.toFixed(2));

    var _complementar = complementar || false;
    var _complementarColor = parseFloat((_baseColor.getDegree() + 180).toFixed(2));


    if(isGreaterThan(_complementarColor, _totalDegree)){
      _complementarColor = _complementarColor - _totalDegree;
    }
    var _arrayColors = [_complementarColor];

    //ciclo che prende colore precedente e inserisce -_step
    for (var i = _num / 2; i >= 1; i--) {
      var _newColor = _arrayColors[_arrayColors.length - 1] - _step;
      //trasformo in un numero a due decimali
      _newColor = parseFloat(_newColor.toFixed(2));
      //aggiungo colore all'ultimo posto
      _arrayColors.push(_newColor);
    }

    //ciclo che prende colore precedente e inserisce +_step
    for (var k = 0 ; k < (_num / 2); k++) {
      _newColor = _arrayColors[0] + _step;
      //trasformo in un numero a due decimali
      _newColor = parseFloat(_newColor.toFixed(2));
      //aggiungo colore al primo posto
      _arrayColors.unshift(_newColor);
    }

    //sostituisco i gradi oltre i 360
    _arrayColors.map(function(currentValue, index){
      if(isGreaterThan(currentValue, _totalDegree)){
        _arrayColors[index] = parseFloat((currentValue - _totalDegree).toFixed(2));
      }
      console.log(_arrayColors);

      //sostituisco con nuovo oggetto Hsl()
      _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());
    });

    //inserisco colore base
    _arrayColors.unshift(_baseColor);

    //se complementar è false lo elimino
    if(!complementar){
      _arrayColors.splice((_num / 2 + 1), 1);
    }

    return _arrayColors;
  }
}



//funzione che richiama un range di colori complementari
//se il numero di colori e gli step non sono specificati default 3 colori e 10 step
function getComplementar(baseColor, numColor, stepDegree){
  if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';

  var _baseColor = baseColor;
  var _totalDegree = 360;

  var _step = stepDegree || 10;
  _step = parseFloat(_step.toFixed(2));

  var _num = numColor || 3;
  _num = Math.floor(_num);

  //se il numero di gradi è superiore a 140 errore
  if(_step * _num > 140) throw 'Out of range > 140degree';

  var _firstComplementar = parseFloat((_baseColor.getDegree() + 180).toFixed(2));

  if(isGreaterThan(_firstComplementar, _totalDegree)){
    _firstComplementar = _firstComplementar - _totalDegree;
  }
  var _arrayColors = [_firstComplementar];

  //ciclo che prende colore precedente e inserisce -_step
  for (var i = _num / 2; i >= 1; i--) {
    var _newColor = _arrayColors[_arrayColors.length - 1] - _step;
    //trasformo in un numero a due decimali
    _newColor = parseFloat(_newColor.toFixed(2));
    //aggiungo colore all'ultimo posto
    _arrayColors.push(_newColor);
  }

  //ciclo che prende colore precedente e inserisce +_step
  for (var k = 0 ; k < (_num / 2 - 1); k++) {
    _newColor = _arrayColors[0] + _step;
    //trasformo in un numero a due decimali
    _newColor = parseFloat(_newColor.toFixed(2));
    //aggiungo colore al primo posto
    _arrayColors.unshift(_newColor);
  }

  //sostituisco i gradi oltre i 360
  _arrayColors.map(function(currentValue, index){
    if(isGreaterThan(currentValue, _totalDegree)){
      _arrayColors[index] = parseFloat((currentValue - _totalDegree).toFixed(2));
    }
    //sostituisco con nuovo oggetto Hsl()
    _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());
  });

  //inserisco colore base
  _arrayColors.unshift(_baseColor);

  return _arrayColors;
}


//funzione che genera colori analoghi
function getAnalogous(baseColor, numColor, stepDegree){

  if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';

  var _baseColor = baseColor;
  var _totalDegree = 360;

  var _step = stepDegree || 20;
  _step = parseFloat(_step.toFixed(2));

  var _num = numColor || 3;
  _num = Math.floor(_num);

  //se il numero di gradi è superiore a 60 errore
  if(_step * _num > 60) throw 'Out of range > 60degree';

  var _firstAnalogous = parseFloat((_baseColor.getDegree() + 60).toFixed(2));

  if(isGreaterThan(_firstAnalogous, _totalDegree)){
    _firstAnalogous = _firstAnalogous - _totalDegree;
  }
  var _arrayColors = [_firstAnalogous];

  //ciclo che prende colore precedente e inserisce -_step
  for (var k = 0 ; k < (_num - 1); k++) {
    _newColor = _arrayColors[0] - _step;
    //trasformo in un numero a due decimali
    _newColor = parseFloat(_newColor.toFixed(2));
    //aggiungo colore al primo posto
    _arrayColors.unshift(_newColor);
  }

  //sostituisco i gradi oltre i 360
  _arrayColors.map(function(currentValue, index){
    if(isGreaterThan(currentValue, _totalDegree)){
      _arrayColors[index] = parseFloat((currentValue - _totalDegree).toFixed(2));
    }
    //sostituisco con nuovo oggetto Hsl()
    _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());
  });

  //inserisco colore base
  _arrayColors.unshift(_baseColor);

  return _arrayColors;
}
