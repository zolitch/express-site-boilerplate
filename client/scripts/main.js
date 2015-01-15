
/* ========================================================================== 


  Title

  Author:     Stephen Zsolnai (http://www.zolla.co.uk)
  Decription: description
  Changelog:  2015/10/05 : File created.

  Styleguide: Events: 
              custom events are to be trigger through the node base mediator module.
              Eisier this way as using the Marionette vent is a bit pointless unlees we jump though
              hoops getting the Application object (App) to more global. To fiddly after many attempts.
              Inter-module comms done via node mediator following syntax (MODULEORIGINATOR:EVENTNAME) eg (APP:SATRTED)
              Private Methods:
              To be appended to modules  with '_' and 'exposed' but not used. This is to allow for api testing. 


========================================================================== */

var App = require('./app');
var app = new App();
app.start();

