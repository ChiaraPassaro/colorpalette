//************************//
//********Funzioni********//
//************************//


function Hsl(degree, saturation, brightness){
  //controllo se i dati sono esatti
  /*console.log(degree);
  console.log(saturation);
  console.log(brightness);*/
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
    return 'hsl(' + _degree + ', ' + _saturation + '%, ' + _brightness + '%)';
  };

}

function setColorPalette(baseColor){
  if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';

  var _totalDegree = 360;
  var _baseColor = baseColor;


  this.triad = function(){
    return getColors(240, 2, 60);
  };

  this.complementar = function(numColor, stepDegree){
    if(!isEven(numColor)) throw 'The Colors must be even';
    return getColors(140, numColor, stepDegree, 'complementary');
  };

  this.analogous = function(typeScheme, numColor, stepDegree){
    if(!isEven(numColor)) throw 'The Colors must be even';
    console.log(typeScheme);
    switch (typeScheme) {
      case 'allArch':
        return getColors(120, numColor, stepDegree, 'analogous');
        break;
      case 'cold':
        return getColors(120, numColor, stepDegree, 'analogousCold');
        break;
      case 'warm':
        return getColors(120, numColor, stepDegree, 'analogousWarm');
        break;
    }

  };

  function getColors(rangeDegree, numColor, stepDegree, scheme){
    var _rangeDegree = parseFloat(rangeDegree.toFixed(2));

    var _num = numColor || 2;
    _num = Math.floor(_num);

    var _step = stepDegree || 10;
    _step = parseFloat(_step.toFixed(2));

    //se il numero di gradi è superiore a _rangeDegree  errore
    if(_step * _num > _rangeDegree) throw 'Out of range >' + _rangeDegree;

    var _scheme = scheme || false;
    var _firstSchemeColor = 0;

    if(_scheme){
      switch (_scheme) {
        case 'complementary':
           _firstSchemeColor = parseFloat((_baseColor.getDegree() + 180).toFixed(2));
          break;
        case 'analogous':
          _firstSchemeColor = parseFloat((_baseColor.getDegree()).toFixed(2));
          break;
        case 'analogousCold':
          _firstSchemeColor = parseFloat((_baseColor.getDegree()).toFixed(2));
          break;case 'analogousWarm':
          _firstSchemeColor = parseFloat((_baseColor.getDegree()).toFixed(2));
          break;
      }
    }

    if(isGreaterThan(_firstSchemeColor, _totalDegree)){
      _firstSchemeColor = _firstSchemeColor - _totalDegree;
    }

    var _arrayColors = [_firstSchemeColor];

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

      if(currentValue < 0){
        _arrayColors[index] = parseFloat((currentValue + _totalDegree).toFixed(2));
      }

      //sostituisco con nuovo oggetto Hsl()
      _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());
    });

    /*//inserisco colore base
    _arrayColors.unshift(_baseColor);*/

    //se scheme è false lo elimino
    if(!scheme){
      _arrayColors.splice((_num / 2 + 1), 1);
    }

    if(_scheme == 'analogous'){
      _arrayColors.reverse();
    }
    if(_scheme == 'analogousCold'){
      _arrayColors.reverse();
      _arrayColors.splice((_num / 2 + 1), _arrayColors.length - 1);
    }
    if(_scheme == 'analogousWarm'){
      _arrayColors.reverse();
      _arrayColors.splice(0, (_num / 2));
    }

    return _arrayColors;
  }
}


/*//funzione che genera colori analoghi
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
}*/
