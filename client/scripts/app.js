/* ========================================================================== 


  App

  Author:     Stephen Zsolnai (http://www.zolla.co.uk)
  Decription: Initialisation point for the app.
  Changelog:  2015/01/10 : File created.

========================================================================== */


var $ = global.$ || {};

var mediator = require('mediatorjs');
var Modules = require('./modules');
var Ui = require('./ui');

var App = function App() {};

/* Friendly logs
========================================================================== */
global.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};

/* Initialise...
========================================================================== */
var modules = new Modules();
var ui = new Ui();

/* Public api
========================================================================== */
App.prototype.start = function() { 
  log('app starting...');
};

module.exports = App;