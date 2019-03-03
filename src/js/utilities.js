
// Utilities
function isGreaterThan(num, max){
  if(num > max){
    return true;
  }
}

function isInRange(num, min, max){
  if(num >= min && num <= max){
    return true;
  }
}

function isEven(number) {
    var even = false;
    var number = number;

    if (number % 2 == 0){
        even = true;
    }
    return even;
}

function getIntRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function numberToHex(number) {
    var hex = number.toString(16);

    if(hex.length === 1) {
        hex = '0' + hex;
    }
    return hex;
}

function hexToNumber(hex) {
    var num = parseInt(hex, 16);
    return num;
}

function isHex(hex) {
    var isHex = false;
    var num = parseInt(hex,16);

    if(num.toString(16) === hex.toLowerCase()){
        isHex = true;
    }

    return isHex;
}

export {isGreaterThan, isEven, isInRange, getIntRandomNumber, numberToHex, hexToNumber, isHex};