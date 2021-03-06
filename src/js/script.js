var $ = require("jquery");
var Chart = require('chart.js');
import * as ColorPalette from './palette.js';

var inputDegree = $('#degree');
var inputSaturation = $('#saturation');
var inputBrightness = $('#brightness');
var inputRangeComplementary = $('#range');
var inputStepDegreeComplementary = $('#step-degree');
var inputRangeAnalogous = $('#range-analogous');
var inputStepDegreeAnalogous = $('#step-degree-analogous');
var selectAnalogousType = $('#analogous-type');
var inputRangeMono = $('#range-mono');
var inputStepDegreeMono = $('#step-degree-mono');
var inputRangeRandom = $('#range-random');
var inputPercRandom = $('#perc-random');
var selectMonoType = $('#mono-type');
var button = $('#send');

//chartjs
var canvasTriad = $('#doughnut__canvas-triad');
var canvasComplementary = $('#doughnut__canvas-complementar');
var canvasSplit = $('#doughnut__canvas-split');
var canvasAnalogous = $('#doughnut__canvas-analogous');
var canvasSquare = $('#doughnut__canvas-square');
var canvasTetradic = $('#doughnut__canvas-tetradic');
var canvasMono = $('#doughnut__canvas-mono');
var canvasRandom = $('#doughnut__canvas-random');
var chart = {
  'triadic' : null,
  'complementary' : null,
  'splitComplementary' : null,
  'analogous' : null,
  'square' : null,
  'tetradic' : null,
  'mono' : null,
  'random' : null,
};

$(document).ready(function(){

  button.click(function(){
    sendData();
  });

  $(document).keypress(function(e) {
    if (e.which === 13) {
      sendData();
    }
  });

});

function sendData(){
  var degree = parseFloat(inputDegree.val()) ;
  var saturation = parseFloat(inputSaturation.val());
  var brightness = parseFloat(inputBrightness.val());
  var rangeComplementary = Math.floor(parseInt(inputRangeComplementary.val()));
  var stepDegreeComplementary = parseFloat(inputStepDegreeComplementary.val());
  var rangeAnalogous = Math.floor(parseInt(inputRangeAnalogous.val()));
  var stepDegreeAnalogous = parseFloat(inputStepDegreeAnalogous.val());
  var analogousType = selectAnalogousType.val();
  var rangeMono = Math.floor(parseInt(inputRangeMono.val()));
  var stepDegreeMono = parseFloat(inputStepDegreeMono.val());
  var monoType = selectMonoType.val();
  var rangeRandom = Math.floor(parseInt(inputRangeRandom.val()));
  var percRandom = Math.floor(parseInt(inputPercRandom.val()));

  if(!isNaN(degree) && !isNaN(saturation) && !isNaN(brightness)){
    try {
      var color = new ColorPalette.Hsl(degree, saturation, brightness);
      var palette = new ColorPalette.SetColorPalette(color);

      $('.results .squares .row').html('');
      $('.results .doughnut canvas').html('');

        insertTriad(color, palette);
       insertComplementary(color, palette, rangeComplementary, stepDegreeComplementary);
       triadWheel(palette, canvasTriad);
       complementarWheel(palette, stepDegreeComplementary, canvasComplementary);
       insertSplitComplementary(color, palette);
       splitComplementarWheel(palette, canvasSplit);
       insertAnalogous(color, palette, rangeAnalogous, stepDegreeAnalogous, analogousType);
       analogousWheel(palette, analogousType, stepDegreeAnalogous, canvasAnalogous);
       insertSquare(color, palette);
       squareWheel(palette, canvasSquare);
       insertTetradic(color, palette);
       tetradicWheel(palette, canvasTetradic);
       insertMono(color, palette, rangeMono, stepDegreeMono, monoType);
       monoWheel(palette, monoType, stepDegreeMono, canvasMono);
       insertRandomDominant(color, palette, rangeRandom, percRandom);
       randomDominantWheel(palette, canvasRandom);

    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Inserisci i dati');
  }

}

function insertTriad(color, palette){
  $('.basecolor').html('');
  var scheme = $('.template .scheme').clone();
  scheme.children('.scheme__title').html('Your colour');
  var colorTpl = scheme.find('.scheme__color').clone();
  scheme.find('.scheme__colors').html('');
  colorTpl.css('background', color.printHsl()).addClass('first-color');
  colorTpl.html(color.printHsl());
  scheme.find('.scheme__colors').append(colorTpl);
  $('.basecolor').append(scheme);

  try {
    // var triad = getTriad(color);
    var triad = palette.triad();
    var scheme = $('.template .scheme').clone();
    scheme.children('.scheme__title').html('Triad colours');

    $('.triad').html('');
    //clono schema e cancello
    var colorTpl = scheme.find('.scheme__color').clone();
    scheme.find('.scheme__colors').html('');

    for (var i = 0; i < triad.length; i++) {
      var thisColor = colorTpl.clone();
      thisColor.css('background', triad[i].printHsl());
      thisColor.html(triad[i].printHsl());
      scheme.find('.scheme__colors').append(thisColor);
    }

    $('.triad').append(scheme);
  } catch (error) {
    console.log(error);
  }
}

function insertComplementary(color, palette,  range, degree){
  try {
    var complementar = palette.complementar(range, degree);
    var scheme = $('.template .scheme').clone();

    //se non sono inserti i dati si visualizzano quelli di default
    if(color && range && degree){
      scheme.children('.scheme__title').html('Complementary colours.<br>Range: ' + range + ', Degree: ' + degree);
    } else {
      scheme.children('.scheme__title').html('Complementary colours. Range: Default, Degree: Default');
    }

    //clono schema e cancello
    var colorTpl = scheme.find('.scheme__color').clone();
    scheme.find('.scheme__colors').html('');

    for (var i = 0; i < complementar.length; i++) {
      var thisColor = colorTpl.clone();
      thisColor.css('background', complementar[i].printHsl());
      thisColor.html(complementar[i].printHsl());
      scheme.find('.scheme__colors').append(thisColor);
    }

    $('.complementary').append(scheme);

  } catch (error) {
    console.log(error);
  }
}

function insertSplitComplementary(color, palette){
  try {
    var splitComplementar = palette.splitComplementar();
    var scheme = $('.template .scheme').clone();
    scheme.children('.scheme__title').html('Split Complementary colours.');

    //clono schema e cancello
    var colorTpl = scheme.find('.scheme__color').clone();
    scheme.find('.scheme__colors').html('');

    for (var i = 0; i < splitComplementar.length; i++) {
      var thisColor = colorTpl.clone();
      thisColor.css('background', splitComplementar[i].printHsl());
      thisColor.html(splitComplementar[i].printHsl());
      scheme.find('.scheme__colors').append(thisColor);
    }

    $('.split-complementary').append(scheme);

  } catch (error) {
    console.log(error);
  }
}

function insertAnalogous(color, palette,  range, degree, analogousType){
  try {
    var analogous = palette.analogous(analogousType, range, degree);

    var scheme = $('.template .scheme').clone();

    //se non sono inserti i dati si visualizzano quelli di default
    if(color && range && degree){
      scheme.children('.scheme__title').html('Analogous colours.<br>Range: ' + range + ', Degree: ' + degree);
    } else {
      scheme.children('.scheme__title').html('Analogous colours. Range: Default, Degree: Default');
    }

    //clono schema e cancello
    var colorTpl = scheme.find('.scheme__color').clone();
    scheme.find('.scheme__colors').html('');

    for (var i = 0; i < analogous.length; i++) {
      var thisColor = colorTpl.clone();
      thisColor.css('background', analogous[i].printHsl());
      thisColor.html(analogous[i].printHsl());
      scheme.find('.scheme__colors').append(thisColor);
    }

    $('.analogous').append(scheme);

  } catch (error) {
    console.log(error);
  }
}

function insertSquare(color, palette){
  try {
    var square = palette.square();

    var scheme = $('.template .scheme').clone();


      scheme.children('.scheme__title').html('Square colours');

    //clono schema e cancello
    var colorTpl = scheme.find('.scheme__color').clone();
    scheme.find('.scheme__colors').html('');

    for (var i = 0; i < square.length; i++) {
      var thisColor = colorTpl.clone();
      thisColor.css('background', square[i].printHsl());
      thisColor.html(square[i].printHsl());
      scheme.find('.scheme__colors').append(thisColor);
    }

    $('.square').append(scheme);

  } catch (error) {
    console.log(error);
  }
}

function insertTetradic(color, palette){
  try {
    var tetradic = palette.tetradic();

    var scheme = $('.template .scheme').clone();


      scheme.children('.scheme__title').html('Tetradic colours');

    //clono schema e cancello
    var colorTpl = scheme.find('.scheme__color').clone();
    scheme.find('.scheme__colors').html('');

    for (var i = 0; i < tetradic.length; i++) {
      var thisColor = colorTpl.clone();
      thisColor.css('background', tetradic[i].printHsl());
      thisColor.html(tetradic[i].printHsl());
      scheme.find('.scheme__colors').append(thisColor);
    }

    $('.tetradic').append(scheme);

  } catch (error) {
    console.log(error);
  }
}

function insertMono(color, palette, numColor, stepDegree, typeScheme){
  try {
    var monoPalette = palette.mono(numColor, stepDegree, typeScheme);
    var scheme = $('.template .scheme').clone();

    scheme.children('.scheme__title').html('Monochrome colours.<br> Degree: ' + stepDegree);


    //clono schema e cancello
    var colorTpl = scheme.find('.scheme__color').clone();
    scheme.find('.scheme__colors').html('');

    for (var i = 0; i < monoPalette.length; i++) {
      var thisColor = colorTpl.clone();
      //console.log(monoPalette);
      thisColor.css('background', monoPalette[i].printHsl());
      thisColor.html(monoPalette[i].printHsl());
      scheme.find('.scheme__colors').append(thisColor);
    }

    $('.mono').append(scheme);

  } catch (error) {
    console.log(error);
  }
}

function insertRandomDominant(color, palette, numColor, percDominant){
  try {
    var randomDominant = palette.randomDominant(numColor, percDominant);

    var scheme = $('.template .scheme').clone();

    scheme.children('.scheme__title').html('Random Dominant');

    //clono schema e cancello
    var colorTpl = scheme.find('.scheme__color').clone();
    scheme.find('.scheme__colors').html('');

    for (var i = 0; i < randomDominant.length; i++) {
      var thisColor = colorTpl.clone();
      thisColor.css('background', randomDominant[i].printHsl());
      thisColor.html(randomDominant[i].printHsl());
      scheme.find('.scheme__colors').append(thisColor);
    }

    $('.random-dominant').append(scheme);

  } catch (error) {
    console.log(error);
  }
}

function triadWheel(palette, canvas) {
  var triad = palette.getTriad();
  var basecolor = palette.getBasecolor();
  triad.push(basecolor);
  getChart(triad, canvas, 30, 'Triad', 'triadic');
}

function complementarWheel(palette, step, canvas) {
  var complementar = palette.getComplementar();
  var basecolor = palette.getBasecolor();
  complementar.push(basecolor);
  getChart(complementar, canvas, step, 'Complementary Range', 'complementary');
}

function splitComplementarWheel(palette, canvas) {
  var splitComplementar = palette.getSplitComplementar();
  var basecolor = palette.getBasecolor();
  splitComplementar.push(basecolor);
  getChart(splitComplementar, canvas, 30, 'Split Complementary', 'splitComplementary');
}

function analogousWheel(palette, typeScheme, stepDegree, canvas) {
  var analogous = palette.getAnalogous();
  var basecolor = palette.getBasecolor();
  analogous[typeScheme].push(basecolor);
  getChart(analogous[typeScheme], canvas, 30, 'Analogous', 'analogous');
}

function squareWheel(palette,  canvas) {
  var square = palette.getSquare();
  getChart(square, canvas, 30, 'Square', 'square');
}

function tetradicWheel(palette, canvas) {
  var tetradic = palette.getTetradic();
  getChart(tetradic, canvas, 30, 'Tetradic', 'tetradic');
}

function monoWheel(palette, typeScheme, stepDegree, canvas) {
  var monopalette = palette.getMono();
  monopalette = monopalette[typeScheme];
  var basecolor = palette.getBasecolor();
  monopalette.push(basecolor);
  getChartMono(basecolor, monopalette, stepDegree, canvas, typeScheme, 'mono', 'MonoChrome');
}

function randomDominantWheel(palette, canvas) {
  var randomDominant = palette.getRandomDominant();
  var step = 360 / randomDominant.length;
  getChart(randomDominant, canvas, step, 'Random Dominant', 'random');
}

function getChart(palette, canvas, step, title, type) {
  if(chart[type] !== null){
    if(chart[type].constructor === Chart){
      chart[type].destroy();
    }
  }

  var degrees = [];
  var colorsLabel = [];

  for (var i = 0; i < 360 ; i++) {
  //tutti i gradi hanno valore 1 per comparire nella chart
    degrees.push(1);
    //tutti i gradi hanno il colore di background ad opacità 0.2
    colorsLabel.push('hsl('+ i + ', 50%, 50%, 0.2)');
  }

  //inserisco i gradi della palette con dato uguale allo step usato per generare la palette
  for (var i = 0; i < palette.length; i++) {
    var degree = palette[i].getHue();
    degrees[degree] =  step;
    colorsLabel[degree] = palette[i].printHsl();
  }

  var data = {
    datasets: [{
      data: degrees,
      backgroundColor: colorsLabel,
      borderWidth: 0
    }],
    labels: colorsLabel
  };

  chart[type] = new Chart(canvas, {
    type: 'doughnut',
    data: data,
    options:
      {
        title: {
          display: true,
          text: title
        },
        legend: {
          display: false
        }
        //rotation: 2 * Math.PI
      }
  });
}

function getChartMono(baseColor, palette, step, canvas, typeScheme, type, title) {
  if(chart[type] !== null){
    if(chart[type].constructor === Chart){
      chart[type].destroy();
    }
  }
  var degrees = [];
  var colorsLabel = [];

  for (var i = 0; i < 100 ; i++) {
    //tutti i gradi hanno valore 1 per comparire nella chart
    degrees.push(1);
    //tutti i gradi hanno colore base come quello di partenza ma con saturazione e luminosità fissi
    if(typeScheme === 'saturation'){
      colorsLabel.push('hsl('+ baseColor.getHue() + ', 100%, 90%)');
    }
    else if(typeScheme === 'brightness') {
      colorsLabel.push('hsl('+  baseColor.getHue() + ', 100%, 90%)');
    }
  }

  //inserisco i gradi della palette con dato uguale allo step usato per generare la palette
  for (var i = 0; i < palette.length; i++) {
    var degree;
    if(typeScheme === 'saturation'){
      degree = palette[i].getSaturation();
    }
    else if(typeScheme === 'brightness') {
      degree = palette[i].getBrightness();
    }
    degrees[degree] =  step;
    colorsLabel[degree] = palette[i].printHsl();
  }

  var data = {
    datasets: [{
      data: degrees,
      backgroundColor: colorsLabel,
      borderWidth: 0
    }],
    labels: colorsLabel
  };
  chart[type] = new Chart(canvas, {
    type: 'doughnut',
    data: data,
    options:
        {
          title: {
            display: true,
            text: title
          },
          legend: {
            display: false
          }
          //rotation: 2 * Math.PI
        }
  });
}