var $ = require('jquery-browserify');

var Article = function(one, two) {
  //stupid test data for now...
  this.firstValue = one;
  this.secondValue = two;
  //$('.article').append('The article module has loaded!');
};

Article.prototype.add = function() {
  return this.firstValue + this.secondValue;
};


module.exports = Article;