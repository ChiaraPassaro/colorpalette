/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/palette.js":
/*!***************************!*\
  !*** ./src/js/palette.js ***!
  \***************************/
/*! exports provided: Hsl, SetColorPalette */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hsl", function() { return Hsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetColorPalette", function() { return SetColorPalette; });
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities.js */ "./src/js/utilities.js");
 //************************//
//********Funzioni********//
//************************//

function Hsl(degree, saturation, brightness) {
  //controllo se i dati sono esatti

  /*   console.log(degree);
     console.log(saturation);
     console.log(brightness);*/
  if (isNaN(degree)) throw 'Degree in Not a Number';
  if (!_utilities_js__WEBPACK_IMPORTED_MODULE_0__["isInRange"](degree, 0, 360)) throw 'Degree number out of range';
  if (isNaN(saturation)) throw 'Saturation in Not a Number';
  if (!_utilities_js__WEBPACK_IMPORTED_MODULE_0__["isInRange"](saturation, 0, 360)) throw 'Saturation number out of range';
  if (isNaN(brightness)) throw 'Brightness in Not a Number';
  if (!_utilities_js__WEBPACK_IMPORTED_MODULE_0__["isInRange"](brightness, 0, 360)) throw 'Brightness number out of range';

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

  this.setBrightness = function (newBrightness) {
    if (isNaN(newBrightness)) throw 'Brightness in Not a Number';
    if (!_utilities_js__WEBPACK_IMPORTED_MODULE_0__["isInRange"](newBrightness, 0, 360)) throw 'Brightness number out of range';
    _brightness = parseFloat(newBrightness.toFixed(2));
  };

  return this;
}

function SetColorPalette(baseColor) {
  if (baseColor.constructor !== Hsl) throw 'Basecolor is not an object';
  var _totalDegree = 360;
  var _baseColor = baseColor; //ritorna stringa con colore base

  this.getBasecolor = function () {
    return _baseColor;
  }; //update del colore base


  this.updateColorPalette = function (newColor) {
    if (newColor.constructor !== Hsl) throw 'Basecolor is not an object';
    _baseColor = newColor;
  }; //funzione che crea triade


  this.triad = function () {
    return getColors(240, 2, 60);
  }; //funzione che crea complementari


  this.complementar = function (numColor, stepDegree) {
    if (!_utilities_js__WEBPACK_IMPORTED_MODULE_0__["isEven"](numColor)) throw 'The Colors must be even';
    return getColors(140, numColor, stepDegree, 'complementary');
  }; //funzione che crea analoghi


  this.analogous = function (typeScheme, numColor, stepDegree) {
    if (!_utilities_js__WEBPACK_IMPORTED_MODULE_0__["isEven"](numColor)) throw 'The Colors must be even'; //console.log(typeScheme);

    switch (typeScheme) {
      case 'allArch':
        return getColors(120, numColor, stepDegree, 'analogous');

      case 'cold':
        return getColors(120, numColor, stepDegree, 'analogousCold');

      case 'warm':
        return getColors(120, numColor, stepDegree, 'analogousWarm');
    }
  }; //funzione che crea complementari divergenti


  this.splitComplementar = function () {
    return getColors(60, 2, 30, 'splitComplementary');
  }; //funzione che crea colori


  function getColors(rangeDegree, numColor, stepDegree, scheme) {
    var _rangeDegree = parseFloat(rangeDegree.toFixed(2));

    var _num = numColor || 2;

    _num = Math.floor(_num);

    var _step = stepDegree || 10;

    _step = parseFloat(_step.toFixed(2)); //se il numero di gradi è superiore a _rangeDegree  errore

    if (_step * _num > _rangeDegree) throw 'Out of range >' + _rangeDegree;

    var _scheme = scheme || false;

    var _firstSchemeColor = parseFloat((_baseColor.getDegree() + 180).toFixed(2)); //se ho inserito uno schema  il primo colore inserito cambia


    if (_scheme) {
      switch (_scheme) {
        case 'complementary':
          _firstSchemeColor = parseFloat((_baseColor.getDegree() + 180).toFixed(2));
          break;

        case 'analogous':
          _firstSchemeColor = parseFloat(_baseColor.getDegree().toFixed(2));
          break;

        case 'analogousCold':
          _firstSchemeColor = parseFloat(_baseColor.getDegree().toFixed(2));
          break;

        case 'analogousWarm':
          _firstSchemeColor = parseFloat(_baseColor.getDegree().toFixed(2));
          break;
      }
    }

    if (_utilities_js__WEBPACK_IMPORTED_MODULE_0__["isGreaterThan"](_firstSchemeColor, _totalDegree)) {
      _firstSchemeColor = _firstSchemeColor - _totalDegree;
    }

    var _arrayColors = [_firstSchemeColor]; //ciclo che prende colore precedente e inserisce -_step

    for (var i = _num / 2; i >= 1; i--) {
      var _newColor = _arrayColors[_arrayColors.length - 1] - _step; //trasformo in un numero a due decimali


      _newColor = parseFloat(_newColor.toFixed(2)); //aggiungo colore all'ultimo posto

      _arrayColors.push(_newColor);
    } //ciclo che prende colore precedente e inserisce +_step


    for (var k = 0; k < _num / 2; k++) {
      _newColor = _arrayColors[0] + _step; //trasformo in un numero a due decimali

      _newColor = parseFloat(_newColor.toFixed(2)); //aggiungo colore al primo posto

      _arrayColors.unshift(_newColor);
    } //sostituisco i gradi oltre i 360


    _arrayColors.map(function (currentValue, index) {
      if (_utilities_js__WEBPACK_IMPORTED_MODULE_0__["isGreaterThan"](currentValue, _totalDegree)) {
        _arrayColors[index] = parseFloat((currentValue - _totalDegree).toFixed(2));
      } //se il numero è negativo  aggiungo  360gradi


      if (currentValue < 0) {
        _arrayColors[index] = parseFloat((currentValue + _totalDegree).toFixed(2));
      } //sostituisco con nuovo oggetto Hsl()


      _arrayColors[index] = new Hsl(_arrayColors[index], _baseColor.getSaturation(), _baseColor.getBrightness());
    });
    /*//inserisco colore base
    _arrayColors.unshift(_baseColor);*/
    //se scheme è false lo elimino


    if (!scheme || scheme === 'splitComplementary') {
      _arrayColors.splice(_num / 2, 1);
    } //per lo schema analogo inverto i dati


    if (_scheme === 'analogous') {
      _arrayColors.reverse();
    }

    if (_scheme === 'analogousCold') {
      //elimino i colori caldi
      _arrayColors.reverse();

      _arrayColors.splice(_num / 2 + 1, _arrayColors.length - 1);
    }

    if (_scheme === 'analogousWarm') {
      //elimino i colori freddi
      _arrayColors.reverse();

      _arrayColors.splice(0, _num / 2);
    }

    return _arrayColors;
  }

  return this;
}



/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/*! exports provided: isGreaterThan, isEven, isInRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGreaterThan", function() { return isGreaterThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEven", function() { return isEven; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInRange", function() { return isInRange; });
// Utilities
function isGreaterThan(num, max) {
  if (num > max) {
    return true;
  }
}

function isInRange(num, min, max) {
  if (num >= min && num <= max) {
    return true;
  }
}

function isEven(number) {
  var even = false;
  var number = number;

  if (number % 2 == 0) {
    even = true;
  }

  return even;
}



/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./src/js/palette.js ./src/scss/style.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/kja/sites/www/html/palettecolori/src/js/palette.js */"./src/js/palette.js");
module.exports = __webpack_require__(/*! /home/kja/sites/www/html/palettecolori/src/scss/style.scss */"./src/scss/style.scss");


/***/ })

/******/ });