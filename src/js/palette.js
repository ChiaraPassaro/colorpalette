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

    //ritorna stringa con colore base
    this.getBasecolor = function (){
     return _baseColor;
    };

    //update del colore base
    this.updateColorPalette = function(newColor){
        if (newColor.constructor !== Hsl) throw 'Basecolor is not an object';
        _baseColor = newColor;
    };

    //funzione che crea triade
    this.triad = function () {
        return getColors(240, 2, 60);
    };

    //funzione che crea complementari
    this.complementar = function (numColor, stepDegree) {
        if (!Utilities.isEven(numColor)) throw 'The Colors must be even';
        return getColors(140, numColor, stepDegree, 'complementary');
    };

    //funzione che crea analoghi
    this.analogous = function (typeScheme, numColor, stepDegree) {
        if (!Utilities.isEven(numColor)) throw 'The Colors must be even';
        //console.log(typeScheme);

        switch (typeScheme) {
            case 'allArch':
                return getColors(120, numColor, stepDegree, 'analogous');
            case 'cold':
                return getColors(120, numColor, stepDegree, 'analogousCold');
            case 'warm':
                return getColors(120, numColor, stepDegree, 'analogousWarm');
        }

    };

    //funzione che crea complementari divergenti
    this.splitComplementar = function () {
        return getColors(60, 2, 30, 'splitComplementary');
    };

    //funzione che crea schema Square
    this.square = function () {
        return getColors(270, 3, 90, 'square');
    };

    //funzione che crea schema Tetradic
    this.tetradic = function () {
        return getColors(330, 10, 30, 'tetradic');
    };

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
        if (_scheme === 'tetradic') {
            //elimino i colori inutili
            _arrayColors.splice(1, 3);
            _arrayColors.splice(2, 1);
            _arrayColors.splice(3, 3);
        }

        return _arrayColors;
    }
    return this;
}

export {Hsl, SetColorPalette};
