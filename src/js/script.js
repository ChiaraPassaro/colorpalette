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
var button = $('#send');
var canvasTriad = $('#doughnut__canvas-triad');
var canvasComplementary = $('#doughnut__canvas-complementar');
var canvasSplit = $('#doughnut__canvas-split');
var canvasAnalogous = $('#doughnut__canvas-analogous');
var canvasSquare = $('#doughnut__canvas-square');

$(document).ready(function(){

  button.click(function(){
    sendData();
  });

  $(document).keypress(function(e) {
    if (e.which == 13) {
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

  if(!isNaN(degree) && !isNaN(saturation) && !isNaN(brightness)){
    try {
      var color = new ColorPalette.Hsl(degree, saturation, brightness);
      var palette = new ColorPalette.SetColorPalette(color);
      //console.log(palette.basecolor.printHsl());
      insertTriad(color, palette);
      $('.complementary').html('');
      $('.split-complementary').html('');
      $('.analogous').html('');
       insertComplementary(color, palette, rangeComplementary, stepDegreeComplementary);
       triadWheel(palette, canvasTriad);
       complementarWheel(palette, rangeComplementary, stepDegreeComplementary, canvasComplementary);
       insertSplitComplementary(color, palette);
       splitComplementarWheel(palette, canvasSplit);
       insertAnalogous(color, palette, rangeAnalogous, stepDegreeAnalogous, analogousType);
       analogousWheel(palette, analogousType, rangeAnalogous, stepDegreeAnalogous, canvasAnalogous);
       insertSquare(color, palette);
       squareWheel(palette, canvasSquare);
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

function triadWheel(palette, canvas) {
  var triad = palette.triad();
  var basecolor = palette.getBasecolor();
  triad.push(basecolor);
  getChart(triad, canvas, 30, 'Triad');
}

function complementarWheel(palette, range, step, canvas) {
  var complementar = palette.complementar(range, step);
  var basecolor = palette.getBasecolor();
  complementar.push(basecolor);
  getChart(complementar, canvas, step, 'Complementary Range');
}

function splitComplementarWheel(palette, canvas) {
  var splitComplementar = palette.splitComplementar();
  var basecolor = palette.getBasecolor();
  splitComplementar.push(basecolor);
  getChart(splitComplementar, canvas, 30, 'Split Complementary');
}

function analogousWheel(palette, typeScheme, numColor, stepDegree,  canvas) {
  var analogous = palette.analogous(typeScheme, numColor, stepDegree);
  var basecolor = palette.getBasecolor();
  analogous.push(basecolor);
  getChart(analogous, canvas, 30, 'Analogous');
}

function squareWheel(palette,  canvas) {
  var tetradic = palette.square();
  var basecolor = palette.getBasecolor();
  tetradic.push(basecolor);
  getChart(tetradic, canvas, 30, 'Square');
}

function getChart(palette, canvas, step, title) {

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
    var degree = palette[i].getDegree();
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

  var thisChart = new Chart(canvas, {
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