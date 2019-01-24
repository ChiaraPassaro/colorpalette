var inputDegree = $('#degree');
var inputSaturation = $('#saturation');
var inputBrightness = $('#brightness');
var inputRange = $('#range');
var inputStepDegree = $('#step-degree');
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
  var range = Math.floor(parseInt(inputRange.val()));
  var stepDegree = parseFloat(inputStepDegree.val());
  //var color = new hsl(degree, 'saturation', 'brightness');

  if(!isNaN(degree) && !isNaN(saturation) && !isNaN(brightness)){
    var color = new hsl(degree, saturation, brightness);
    insertTriad(color);
    if(!isNaN(range) && !isNaN(stepDegree)){
      $('.complementary').html('');
      $('.complementary').append('<h1>Complementary colours. Range: ' + range + ', Degree: ' + stepDegree +'.</h1>');
      insertComplementary(color, range, stepDegree);
    } else {
      $('.complementary').html('');
      $('.complementary').append('<h1>Dati inseriti non corretti. Valori di default attivi.</h1>');
      insertComplementary(color);
    }
  } else {
    alert('Inserisci i dati');
  }

}

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

  for (var i = 0; i < complementar.length; i++) {
    $('.complementary').append('<div class="color" style="background: '+ complementar[i].printHsl() +'">'+ complementar[i].getDegree() +'/'+ complementar[i].getSaturation() + '/' + complementar[i].getBrightness() + '<div>')
  }
}
