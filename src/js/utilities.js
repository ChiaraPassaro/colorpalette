
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

export {isGreaterThan, isEven, isInRange, getIntRandomNumber};