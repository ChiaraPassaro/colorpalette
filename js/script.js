var inputDegree = $('#degree');
var inputSaturation = $('#saturation');
var inputBrightness = $('#brightness');
var inputRangeComplementary = $('#range');
var inputStepDegreeComplementary = $('#step-degree');
var inputRangeAnalogous = $('#range-analogous');
var inputStepDegreeAnalogous = $('#step-degree-analogous');
var selectAnalogousType = $('#analogous-type');
var button = $('#send');

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
      var color = new Hsl(degree, saturation, brightness);
      var palette = new SetColorPalette(color);
      //console.log(palette.basecolor.printHsl());
      insertTriad(color, palette);
      $('.complementary').html('');
      $('.split-complementary').html('');
      $('.analogous').html('');
       insertComplementary(color, palette, rangeComplementary, stepDegreeComplementary);
       insertSplitComplementary(color, palette);
       insertAnalogous(color, palette, rangeAnalogous, stepDegreeAnalogous, analogousType);
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
