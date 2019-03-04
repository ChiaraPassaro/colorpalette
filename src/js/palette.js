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

function Rgb(red, green, blue) {
    //controllo se i dati sono esatti
    if (isNaN(red)) throw 'Red in Not a Number';
    if (!Utilities.isInRange(red, 0, 255)) throw 'Red number out of range';
    if (isNaN(green)) throw 'Green in Not a Number';
    if (!Utilities.isInRange(green, 0, 255)) throw 'Green number out of range';
    if (isNaN(blue)) throw 'Blue in Not a Number';
    if (!Utilities.isInRange(blue, 0, 255)) throw 'Blue number out of range';

    var _red = red;
    var _green = green;
    var _blue = blue;

    this.getRed = function () {
        return _red;
    };

    this.getGreen = function () {
        return _green;
    };

    this.getBlue = function () {
        return _blue;
    };

    this.printRgb = function () {
        return 'rgb(' + _red + ', ' + _green + ', ' + _blue + ')';
    };

    this.setRed = function (newRed) {
        if (isNaN(newRed)) throw 'Red in Not a Number';
        if (!Utilities.isInRange(newRed, 0, 255)) throw 'Red number out of range';
        _red = newRed;
    };

    this.setGreen = function (newGreen) {
        if (isNaN(newGreen)) throw 'Green in Not a Number';
        if (!Utilities.isInRange(newGreen, 0, 255)) throw 'Green number out of range';
        _green = newGreen;
    };

    this.setBlue = function (newBlue) {
        if (isNaN(newBlue)) throw 'Blue in Not a Number';
        if (!Utilities.isInRange(newBlue, 0, 255)) throw 'Blue number out of range';
        _blue = newBlue;
    };

    return this;
}

function Hex(hex) {
    var _hex = hex.replace('#', '');

    if (!Utilities.isHex(_hex)) throw 'This is in Not a Hex';

    this.printHex = function () {
        return '#'+ _hex;
    };

    this.setHex = function (newHex) {
        newHex = newHex.replace('#', '');
        if (!Utilities.isHex(newHex)) throw 'This is in Not a Hex';
        _hex = newHex;
    };

    return this;
}

function SetColorPalette(baseColor) {

    if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';
    //Setto variabili interne per i getters
    var _totalDegree = 360;
    var _baseColor = baseColor;
    var _triad;
    var _complementar;
    var _analogous = {
        'allArch': null,
        'cold': null,
        'warm': null,
    };
    var _splitComplementar;
    var _square;
    var _tetradic;
    var _mono = {
        'saturation': null,
        'brightness': null,
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

    //funzione che ritorna la triade settata
    this.getTriad = function (){
        return _triad;
    };

    //funzione che crea complementari
    this.complementar = function (numColor, stepDegree) {
        if (!Utilities.isEven(numColor)) throw 'The Colors must be even';
        _complementar =  getColors(140, numColor, stepDegree, 'complementary');
        return _complementar;
    };

    //funzione che ritorna i complementari settati
    this.getComplementar = function () {
        return _complementar;
    };

    //funzione che crea analoghi
    this.analogous = function (typeScheme, numColor, stepDegree) {
        if (!Utilities.isEven(numColor)) throw 'The Colors must be even';
        //console.log(typeScheme);

        switch (typeScheme) {
            case 'allArch':
                _analogous.allArch = getColors(120, numColor, stepDegree, 'analogous');
                return _analogous.allArch;
            case 'cold':
                 _analogous.cold= getColors(120, numColor, stepDegree, 'analogousCold');
                return _analogous.cold;
            case 'warm':
                _analogous.warm =  getColors(120, numColor, stepDegree, 'analogousWarm');
                return _analogous.warm;
        }

    };

    //funzione che ritorna gli analoghi settati
    this.getAnalogous = function () {
        return _analogous;
    };

    //funzione che crea complementari divergenti
    this.splitComplementar = function () {
        _splitComplementar =  getColors(60, 2, 30, 'splitComplementary');
        return _splitComplementar;
    };

    //funzione che ritorna i complementari divergenti settati
    this.getSplitComplementar = function () {
        return _splitComplementar;
    };

    //funzione che crea schema Square
    this.square = function () {
        _square =  getColors(270, 3, 90, 'square');
        return _square;
    };

    //funzione che ritorna lo Square settato
    this.getSquare = function () {
        return _square;
    };

    //funzione che crea schema Tetradic
    this.tetradic = function () {
        _tetradic =  getColors(330, 10, 30, 'tetradic');
        return _tetradic;
    };

    //funzione che ritorna i tetradici  settati
    this.getTetradic = function () {
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

    //funzione che ritorna lo schema Monochrome settato
    this.getMono = function () {
        return _mono;
    };

    //funzione che crea colori Random with Dominant
    this.randomDominant = function (numColor, percDominant) {
        _randomDominant = getRandomColors(numColor, percDominant);
        return _randomDominant;
    };

    //funzione che ritorna schema Random Dominant settato
    this.getRandomDominant = function () {
        return _randomDominant;
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

    //funzione che crea colori random
    function getRandomColors (numColor, percDominant) {
        var _totalDegree = 360;
        var _num = numColor || 10;
        _num = Math.floor(_num);
        var _percDominant = percDominant;
        _percDominant = Math.floor(_percDominant);
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

        _arrayColors.map(function (currentValue, index) {

            var thisColorInPerc = currentValue * 100 / _totalDegree;
            var _perc = (Math.abs(_firstSchemeColorInPerc - thisColorInPerc) / 100) * _percDominant;

            var _newColorInPerc;

            if(thisColorInPerc > _firstSchemeColorInPerc){
                _newColorInPerc = thisColorInPerc - _perc;
            } else {
                _newColorInPerc = thisColorInPerc + _perc;
            }

            currentValue = _newColorInPerc / 100 * _totalDegree;

            _arrayColors[index] = Math.trunc(currentValue);

            _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());

        });

        return _arrayColors;

    }

    return this;
}

function HslConvert(h, s, l) {
    if (isNaN(h)) throw 'Hue in Not a Number';
    if (!Utilities.isInRange(h, 0, 360)) throw 'Hue number out of range';
    if (isNaN(s)) throw 'Saturation in Not a Number';
    if (!Utilities.isInRange(s, 0, 100)) throw 'Saturation number out of range';
    if (isNaN(l)) throw 'Brightness in Not a Number';
    if (!Utilities.isInRange(l, 0, 100)) throw 'Brightness number out of range';

    var _h = h;
    var _s = s/100;
    var _l = l/100;

    /*
    Frome code by
    Vahid Kazemi https://gist.github.com/vahidk/05184faf3d92a0aa1b46aeaa93b07786
    */

    var c = (1 - Math.abs(2 * _l - 1)) * _s;
    var hp = _h / 60.0;
    var x = c * (1 - Math.abs((hp % 2) - 1));
    var rgb1;

    if (isNaN(_h)) rgb1 = [0, 0, 0];
    else if (hp <= 1) rgb1 = [c, x, 0];
    else if (hp <= 2) rgb1 = [x, c, 0];
    else if (hp <= 3) rgb1 = [0, c, x];
    else if (hp <= 4) rgb1 = [0, x, c];
    else if (hp <= 5) rgb1 = [x, 0, c];
    else if (hp <= 6) rgb1 = [c, 0, x];

    var m = _l - c * 0.5;

    var _r =  Math.round(255 * (rgb1[0] + m));
    var _g =   Math.round(255 * (rgb1[1] + m));
    var _b =  Math.round(255 * (rgb1[2] + m));

    var _rToHex = Utilities.numberToHex(_r);
    var _gToHex = Utilities.numberToHex(_g);
    var _bToHex = Utilities.numberToHex(_b);

    this.getRgb = function () {
        return new Rgb(_r, _g, _b);
    };

    this.getR = function () {
        return _r;
    };

    this.getG = function () {
        return _g;
    };

    this.getB = function () {
        return _b;
    };

    this.getHex = function(){
        var thisHex = '#' + _rToHex + _gToHex + _bToHex;
        return new Hex(thisHex);
    };

    return this;

}

function RgbConvert(r, g, b) {
    if (isNaN(r)) throw 'Red in Not a Number';
    if (!Utilities.isInRange(r, 0, 255)) throw 'Red number out of range';
    if (isNaN(g)) throw 'Green in Not a Number';
    if (!Utilities.isInRange(g, 0, 255)) throw 'Green number out of range';
    if (isNaN(b)) throw 'Blue in Not a Number';
    if (!Utilities.isInRange(b, 0, 255)) throw 'Blue number out of range';

    /*
      Frome code by
      Vahid Kazemi https://gist.github.com/vahidk/05184faf3d92a0aa1b46aeaa93b07786
    */

    var _r = r / 255;
    var _g = g / 255;
    var _b = b / 255;

    var max = Math.max(_r, _g, _b);
    var min = Math.min(_r, _g, _b);
    var _d = max - min;
    var _h;

    if (_d === 0) _h = 0;
    else if (max === _r) _h = (_g - _b) / _d % 6;
    else if (max === _g) _h = (_b - _r) / _d + 2;
    else if (max === _b) _h = (_r - _g) / _d + 4;

    var _l = (min + max) / 2;
    var _s = _d === 0 ? 0 : _d / (1 - Math.abs(2 * _l - 1));
    _h = _h * 60;

    _l = Math.floor(_l * 100);
    _s = Math.floor(_s * 100);

    var _rToHex = Utilities.numberToHex(_r);
    var _gToHex = Utilities.numberToHex(_g);
    var _bToHex = Utilities.numberToHex(_b);

    this.getH = function () {
        return _h;
    };

    this.getS = function () {
        return _s;
    };

    this.getL = function () {
        return _l;
    };

    this.getHsl = function () {
        return new Hsl( _h,  _s, _l);
    };

    this.getHex = function(){
        var hex = '#' + _rToHex + _gToHex + _bToHex;
        return new Hex(hex);
    };

    return this;
}

function HexConvert(hex) {
    var _hex = hex.replace('#', '');

    if (!Utilities.isHex(_hex)) throw 'This is in Not a Hex';

    var rgb = {
        'r' : '',
        'g' : '',
        'b' : ''
    };

    rgb.r = parseInt(_hex.slice(0, 2), 16);
    rgb.g = parseInt(_hex.slice(2, 4), 16);
    rgb.b = parseInt(_hex.slice(4, 6), 16);

    this.getRgb = function(){
        return new Rgb(rgb.r, rgb.g, rgb.b);
    };

    this.getR = function () {
        return rgb.r;
    };

    this.getG = function () {
        return rgb.g;
    };

    this.getB = function () {
        return rgb.b;
    };

    var hslConvert = new RgbConvert(rgb.r, rgb.g, rgb.b);

    this.getHsl = function () {
        return hslConvert.getHsl();
    };

    this.getH = function () {
        return hslConvert.getH();
    };

    this.getS = function () {
        return hslConvert.getS();
    };

    this.getL = function () {
        return hslConvert.getL();
    };
}


export {Hsl, SetColorPalette, HslConvert, RgbConvert, HexConvert};
