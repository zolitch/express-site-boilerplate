var $ = require('jquery-browserify');

var Carousel = function(one, two) {
  //stupid test data for now...
  this.firstValue = one;
  this.secondValue = two;
  $('.carousel').append('The carousel module has loaded!');
};

Carousel.prototype.add = function() {
  return this.firstValue + this.secondValue;
};


module.exports = Carousel;