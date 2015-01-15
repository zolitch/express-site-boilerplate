/* ========================================================================== 


  App

  Author:     Stephen Zsolnai (http://www.zolla.co.uk)
  Decription: Initialisation point for the app. Backbone startup.
  Changelog:  2015/10/05 : File created.

========================================================================== */


var $ = require('jquery-browserify');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var mediator = require('mediatorjs');
    //Controller = require('./controller'),
    //Router = require('./router'),
    //ContactModel = require('./models/contact'),
    //ContactsCollection = require('./collections/contacts')
    //
var Modules = require('./modules');

var welcomeTmpl = require('../templates/welcome.hbs');


var App = function App() {};

App.prototype.start = function() {
  var self = this;
  self.core = new Marionette.Application();
      /* Add application regions here */

  self.core.addRegions({
    article: '#article'
  });
  /* Add initializers here */
  self.core.addInitializer( function () {
    document.getElementById('testmessage').innerHTML = welcomeTmpl({ success: "CONGRATS!" });
  });

  self.core.on("before:start", function (options) {
    mediator.trigger('APP:PRE_START');
  });

  self.core.on('start', function(options){
    self.core.vent.trigger('app:log', 'App: Starting');
    mediator.trigger('APP:STARTING');



    //new up and views and render for base app here...
    self.core.vent.trigger('app:log', 'App: Done starting and running!');


    //Make app global as it may be easier assesing things like controller and routes from here.
    //eg: window.App.controller.home();
    window.App = self.core;

    var modules = new Modules();
    mediator.trigger('APP:STARTED');
    
  });

  self.core.vent.bind('app:log', function(msg) {
      console.log(msg);
  });

  self.core.start();

  

};

module.exports = new App();
