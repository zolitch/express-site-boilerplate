var attachFastClick = require('fastclick');

var Ui = function() {
  attachFastClick(document.body);
};

module.exports = Ui;