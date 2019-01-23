var inputDegree = $('#degree');
var inputSaturation = $('#saturation');
var inputBrightness = $('#brightness');
var inputRange = $('#range');
var inputStepDegree = $('#step-degree');
var button = $('#send');

$(document).ready(function(){
  button.click(function(){
    var degree = parseInt(inputDegree.val()) ;
    var saturation = parseInt(inputSaturation.val());
    var brightness = parseInt(inputBrightness.val());
    var range = parseInt(inputRange.val());
    var stepDegree = parseInt(inputStepDegree.val());

    var color = new hsl(degree, saturation, brightness);

    insertTriad(color);
    insertComplementary(color, range, stepDegree);
  });

});

function insertTriad(color){
  var triad = getTriad(color);
  $('.basecolor').html('');
  $('.triad').html('');

  $('.basecolor').append('<h1>Your colour</h1><div class="first-color" style="background: '+ color.printHsl() +'">'+ color.getDegree() +'/'+ color.getSaturation() + '/' + color.getBrightness() + '<div>');
  $('.triad').append('<h1>Triad colours</h1>');
  for (var i = 0; i < triad.length; i++) {
    $('.triad').append('<div class="color" style="background: '+ triad[i].printHsl() +'">'+ triad[i].getDegree() +'/'+ triad[i].getSaturation() + '/' + triad[i].getBrightness() + '<div>');
  }
}

function insertComplementary(color, range, degree){
  var complementar = getComplementar(color, range, degree);

  $('.complementary').html('');

  $('.complementary').append('<h1>Complementary colours. Range: ' + range + ', Degree: ' + degree +'.</h1>');
  for (var i = 0; i < complementar.length; i++) {
    $('.complementary').append('<div class="color" style="background: '+ complementar[i].printHsl() +'">'+ complementar[i].getDegree() +'/'+ complementar[i].getSaturation() + '/' + complementar[i].getBrightness() + '<div>')
  }
}
