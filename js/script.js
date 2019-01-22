
$(document).ready(function(){

  var color = new hsl(0, 80, 50);
  var triad = getTriad(color);

  $('body').prepend('<h1>Your colour</h1><div class="first-color" style="background: '+ color.printHsl() +'">'+ color.getDegree() +'/'+ color.getSaturation() + '/' + color.getBrightness() + '<div>');

  $('.triad').append('<h1>Triad colours</h1>');
  for (var i = 0; i < triad.length; i++) {
    $('.triad').append('<div class="color" style="background: '+ triad[i].printHsl() +'">'+ triad[i].getDegree() +'/'+ triad[i].getSaturation() + '/' + triad[i].getBrightness() + '<div>');
  }

  var range = 40;
  var degree = 6;
  var complementar = getComplementar(color, range, degree);

  $('.complementary').append('<h1>Complementary colours. Range: ' + range + ', Degree: ' + degree +'.</h1>');
  for (var i = 0; i < complementar.length; i++) {
    $('.complementary').append('<div class="color" style="background: '+ complementar[i].printHsl() +'">'+ complementar[i].getDegree() +'/'+ complementar[i].getSaturation() + '/' + complementar[i].getBrightness() + '<div>')
  }

});
