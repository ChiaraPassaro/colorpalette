import * as Utilities from './utilities.js';

//************************//
//********Funzioni********//
//************************//

function Hsl(degree, saturation, brightness) {
    //controllo se i dati sono esatti
    if (isNaN(degree)) throw 'Degree in Not a Number';
    if (!Utilities.isInRange(degree, 0, 360)) throw 'Degree number out of range';
    if (isNaN(saturation)) throw 'Saturation in Not a Number';
    if (!Utilities.isInRange(saturation, 0, 100)) throw 'Saturation number out of range';
    if (isNaN(brightness)) throw 'Brightness in Not a Number';
    if (!Utilities.isInRange(brightness, 0, 100)) throw 'Brightness number out of range';

    var _degree = parseFloat(degree.toFixed(2));
    var _saturation = parseFloat(saturation.toFixed(2));
    var _brightness = parseFloat(brightness.toFixed(2));

    this.getDegree = function () {
        return _degree;
    };
    this.getSaturation = function () {
        return _saturation;
    };
    this.getBrightness = function () {
        return _brightness;
    };
    this.printHsl = function () {
        return 'hsl(' + _degree + ', ' + _saturation + '%, ' + _brightness + '%)';
    };

    this.setDegree = function (newDegree) {
        if (isNaN(newDegree)) throw 'Degree in Not a Number';
        if (!Utilities.isInRange(newDegree, 0, 360)) throw 'Degree number out of range';
        _degree = parseFloat(newDegree.toFixed(2));
    };

    this.setSaturation = function (newSaturation) {
        if (isNaN(newSaturation)) throw 'Saturation in Not a Number';
        if (!Utilities.isInRange(newSaturation, 0, 100)) throw 'Saturation number out of range';
        _saturation = parseFloat(newSaturation.toFixed(2));
    };

    this.setBrightness = function (newBrightness) {
        if (isNaN(newBrightness)) throw 'Brightness in Not a Number';
        if (!Utilities.isInRange(newBrightness, 0, 100)) throw 'Brightness number out of range';
        _brightness = parseFloat(newBrightness.toFixed(2));
    };

    return this;
}
function SetColorPalette(baseColor) {

    if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';

    var _totalDegree = 360;
    var _baseColor = baseColor;
    var _triad;
    var _complementar;
    var _analogous = {
        'all': undefined,
        'cold': undefined,
        'warm': undefined,
    };
    var _splitComplementar;
    var _square;
    var _tetradic;
    var _mono = {
        'saturation': undefined,
        'brightness': undefined,
    };
    var _randomDominant;

    //ritorna stringa con colore base
    this.getBasecolor = function () {
        return _baseColor;
    };

    //update del colore base
    this.updateColorPalette = function (newColor) {
        if (newColor.constructor !== Hsl) throw 'Basecolor is not an object';
        _baseColor = newColor;
    };

    //funzione che crea triade
    this.triad = function () {
        _triad = getColors(240, 2, 60);
        return _triad;
    };

    this.getTriad = function (colorPalette){
        return _triad;
    };

    //funzione che crea complementari
    this.complementar = function (numColor, stepDegree) {
        if (!Utilities.isEven(numColor)) throw 'The Colors must be even';
        _complementar =  getColors(140, numColor, stepDegree, 'complementary');
        return _complementar;
    };

    this.getComplementar = function () {
        return _complementar;
    };

    //funzione che crea analoghi
    this.analogous = function (typeScheme, numColor, stepDegree) {
        if (!Utilities.isEven(numColor)) throw 'The Colors must be even';
        //console.log(typeScheme);

        switch (typeScheme) {
            case 'allArch':
                _analogous.all = getColors(120, numColor, stepDegree, 'analogous');
                return _analogous.all;
            case 'cold':
                 _analogous.cold= getColors(120, numColor, stepDegree, 'analogousCold');
                return _analogous.cold;
            case 'warm':
                _analogous.warm =  getColors(120, numColor, stepDegree, 'analogousWarm');
                return _analogous.warm;
        }

    };

    this.getAnalogous = function () {
        return _analogous;
    };

    //funzione che crea complementari divergenti
    this.splitComplementar = function () {
        _splitComplementar =  getColors(60, 2, 30, 'splitComplementary');
        return _splitComplementar;
    };

    this.getSplitComplementar = function () {
        return _splitComplementar;
    };

    //funzione che crea schema Square
    this.square = function () {
        _square =  getColors(270, 3, 90, 'square');
        return _square;
    };

    this.getSquare = function () {
        return _square;
    };

    //funzione che crea schema Tetradic
    this.tetradic = function () {
        _tetradic =  getColors(330, 10, 30, 'tetradic');
        return _tetradic;
    };

    //funzione che crea schema Monochrome
    this.mono = function (numColor, stepDegree, typeScheme) {
       // console.log(!Utilities.isEven(numColor));
        if (!Utilities.isEven(numColor)) throw 'The Colors must be even';

        switch (typeScheme) {
            case 'saturation':
                _mono.saturation =  getColorsMono(numColor, stepDegree, 'monoSaturation');
                return _mono.saturation;
            case 'brightness':
                _mono.brightness =  getColorsMono(numColor, stepDegree, 'monoBrightness');
                return _mono.brightness;
        }

    };

    this.getMono = function () {
        return _mono;
    };

    //funzione che crea colori Random with Dominant
    this.randomDominant = function (numColor, percDominant) {
        return getRandomColors(numColor, percDominant);
    };

    this.getRandomDominant = function () {
        return _randomDominant;
    };

    //funzuione che genera colori random
    function getRandomColors (numColor, percDominant) {
        var _totalDegree = 360;
        var _num = numColor || 10;
        _num = Math.floor(_num);
        var _percDominant = percDominant;
        _percDominant = Math.floor(_percDominant);
        console.log('Perc Dominant richiesta ' +_percDominant);
        var _step = [];

        while(_step.length < numColor){
            var randomStep = Utilities.getIntRandomNumber(0, _totalDegree);
            if(!_step.includes(randomStep)){
                _step.push(randomStep);
            }
        }

        var _firstSchemeColor =  Math.floor(_baseColor.getDegree());

        var _complementary =  _firstSchemeColor + 180;

        //trasformo in caso sia inferiore a 0 o maggiore di 360
        if (_complementary < 0) {
            _complementary = Math.floor((_complementary + _totalDegree));
        }

        if (Utilities.isGreaterThan(_complementary, _totalDegree)) {
            _complementary  = Math.floor((_complementary - _totalDegree));
        }

        //console.log("Complementare" + _complementary);

        //inserisco primo colore
         //var _arrayColors = [90, 350, 120, 220 , 60];

        var _arrayColors = [_firstSchemeColor];

        //genero i colori random
        for (var i = 1; i < _num; i++) {
            var _newColor = _firstSchemeColor + _step[i];
            //trasformo in caso sia inferiore a 0 o maggiore di 360
            if (_newColor < 0) {
                _newColor = Math.floor((_newColor + _totalDegree));
            }

            if (Utilities.isGreaterThan(_newColor, _totalDegree)) {
                _newColor  = Math.floor((_newColor - _totalDegree));
            }

            _arrayColors.push(_newColor);
        }

        var _firstSchemeColorInPerc = _firstSchemeColor * 100 / _totalDegree;
            //console.log('Primo colore in perc' + _firstSchemeColorInPerc);

        _arrayColors.map(function (currentValue, index) {
            //console.log('Colore di partenza ' + currentValue);

            var thisColorInPerc = currentValue * 100 / _totalDegree;
            //console.log('Colore in percentuale ' + thisColorInPerc);

            var _perc = (Math.abs(_firstSchemeColorInPerc - thisColorInPerc) / 100) * _percDominant;

           // console.log('Perc ' + _perc);
            var _newColorInPerc;

            if(thisColorInPerc > _firstSchemeColorInPerc){
                 _newColorInPerc = thisColorInPerc - _perc;
            } else {
                 _newColorInPerc = thisColorInPerc + _perc;
            }

           // console.log('nuovo valore in perc ' + _newColorInPerc);

            currentValue = _newColorInPerc / 100 * _totalDegree;

            _arrayColors[index] = Math.trunc(currentValue);
           // console.log('nuovo valore in gradi ' + _arrayColors[index]);
                //sostituisco con nuovo oggetto Hsl()
            _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());

        });

        return _arrayColors;

    }

    //funzione che crea colori
    function getColors(rangeDegree, numColor, stepDegree, scheme) {
        var _rangeDegree = parseFloat(rangeDegree.toFixed(2));

        var _num = numColor || 2;
        _num = Math.floor(_num);

        var _step = stepDegree || 10;
        _step = parseFloat(_step.toFixed(2));

        //se il numero di gradi è superiore a _rangeDegree  errore
        if (_step * _num > _rangeDegree) throw 'Out of range >' + _rangeDegree;

        var _scheme = scheme || false;
        var _firstSchemeColor = parseFloat((_baseColor.getDegree() + 180).toFixed(2));

        //se ho inserito uno schema  il primo colore inserito cambia
        if (_scheme) {
            switch (_scheme) {
                case 'complementary':
                    _firstSchemeColor = parseFloat((_baseColor.getDegree() + 180).toFixed(2));
                    break;
                case 'square':
                    _firstSchemeColor = parseFloat((_baseColor.getDegree()).toFixed(2));
                    break;
                case 'tetradic':
                    _firstSchemeColor = parseFloat((_baseColor.getDegree() - 30).toFixed(2));
                    break;
                case 'analogous':
                    _firstSchemeColor = parseFloat((_baseColor.getDegree()).toFixed(2));
                    break;
                case 'analogousCold':
                    _firstSchemeColor = parseFloat((_baseColor.getDegree()).toFixed(2));
                    break;
                case 'analogousWarm':
                    _firstSchemeColor = parseFloat((_baseColor.getDegree()).toFixed(2));
                    break;
            }
        }

        if (Utilities.isGreaterThan(_firstSchemeColor, _totalDegree)) {
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
        for (var k = 0; k < (_num / 2); k++) {
            _newColor = _arrayColors[0] + _step;
            //trasformo in un numero a due decimali
            _newColor = parseFloat(_newColor.toFixed(2));
            //aggiungo colore al primo posto
            _arrayColors.unshift(_newColor);
        }

        //sostituisco i gradi oltre i 360
        _arrayColors.map(function (currentValue, index) {
            if (Utilities.isGreaterThan(currentValue, _totalDegree)) {
                _arrayColors[index] = parseFloat((currentValue - _totalDegree).toFixed(2));
            }

            //se il numero è negativo  aggiungo  360gradi
            if (currentValue < 0) {
                _arrayColors[index] = parseFloat((currentValue + _totalDegree).toFixed(2));
            }

            //sostituisco con nuovo oggetto Hsl()
            _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());
        });

        /*//inserisco colore base
        _arrayColors.unshift(_baseColor);*/

        //se scheme è false lo elimino
        if (!scheme || scheme === 'splitComplementary') {
            _arrayColors.splice((_num / 2), 1);
        }

        //se tetradic elimino i colori generati che non servono
        if (_scheme === 'tetradic') {
            _arrayColors.splice(1, 3);
            _arrayColors.splice(2, 1);
            _arrayColors.splice(3, 3);
        }

        //per lo schema analogo inverto i dati
        if (_scheme === 'analogous') {
            _arrayColors.reverse();
        }
        if (_scheme === 'analogousCold') {
            //elimino i colori caldi
            _arrayColors.reverse();
            _arrayColors.splice((_num / 2 + 1), _arrayColors.length - 1);
        }
        if (_scheme === 'analogousWarm') {
            //elimino i colori freddi
            _arrayColors.reverse();
            _arrayColors.splice(0, (_num / 2));
        }

        return _arrayColors;
    }

    //Funzione che crea colori mono
    function getColorsMono(numColor, stepDegree, scheme) {

        var _totalColors = 100;

        var _num = numColor || 4;
        _num = Math.floor(_num);

        var _step = stepDegree || 10;
        _step = parseFloat(_step.toFixed(2));

        //se il numero di gradi è superiore a _rangeDegree  errore
        if (_step * _num > _totalColors) throw 'Out of range >' + _totalColors;

        var _scheme = scheme || false;
        switch (_scheme) {
            case 'monoSaturation':
                var _firstSchemeColor = parseFloat((_baseColor.getSaturation()).toFixed(2));
                break;
            case 'monoBrightness':
                var _firstSchemeColor = parseFloat((_baseColor.getBrightness()).toFixed(2));
                break;
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
        for (var k = 0; k < (_num / 2); k++) {
            _newColor = _arrayColors[0] + _step;
            //trasformo in un numero a due decimali
            _newColor = parseFloat(_newColor.toFixed(2));
            //aggiungo colore al primo posto
            _arrayColors.unshift(_newColor);
        }

        _arrayColors.map(function (currentValue, index) {

            if (Utilities.isGreaterThan(currentValue, _totalColors)) {
                _arrayColors[index] = parseFloat((currentValue - _totalColors).toFixed(2));
            }

            //se il numero è negativo  aggiungo  100
            if (currentValue < 0) {
                _arrayColors[index] = parseFloat((currentValue + _totalColors).toFixed(2));
            }

            switch (_scheme) {
                case 'monoSaturation':
                    _arrayColors[index] = new Hsl(_baseColor.getDegree(), _arrayColors[index], _baseColor.getBrightness());
                    break;
                case 'monoBrightness':
                    _arrayColors[index] = new Hsl(_baseColor.getDegree(), _baseColor.getSaturation(), _arrayColors[index]);
                    break;
            }
            //sostituisco con nuovo oggetto Hsl()

        });
        _arrayColors.reverse();
        return _arrayColors;
    }

    return this;
}

export {Hsl, SetColorPalette};
