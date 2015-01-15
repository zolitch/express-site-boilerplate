/* ========================================================================== 


  Modules

  Author:     Stephen Zsolnai (http://www.zolla.co.uk)
  Decription: Entry point for all modules on the site.
              We check if modules exist here and initialise them if they do.
  Changelog:  2015/01/06 : File created.

========================================================================== */
  
//var ArticleOperator = require('../modules/article/articleoperator');
var mediator = require('mediatorjs');

var moduleList = [
  'articles',
  'carousel'
];

var Modules = function Modules() {
  //mediator.on('APP:STARTED', ev_initialiseModules.bind(this));
  this._init();
};

/* Public api
========================================================================== */
// Modules.prototype.method = function() {
//   //init here...
// };




/* Event listeners
========================================================================== */
function ev_initialiseModules(options) {
  this._init(options);
} 

/* Private methods and logic
========================================================================== */


Modules.prototype._init = function(options) {
  global.modules = {};
  for (var i = 0; i < moduleList.length; i++) {
    var Module = loadModule(moduleList[i]);
    global.modules[moduleList[i]] = new Module();
  }
};

function loadModule( name ) {

  // try{
  //   // return require('../modules/' + name + '/' + name + '');
  //   return require('../modules/article/article');
  // } catch(err){
  //   log('Module load error for ' + name + ': ' + err.code);
  //   return false;
  // }
  switch (name.toLowerCase()) {
    case 'articles':
      try{
        return require('../modules/articles/articles');
      } catch(err){
        log('Module load error: ' + err.code);
        return false;
      }
      break;
    case 'carousel':
      try{
        return require('../modules/carousel/carousel');
      } catch(err){
        log('Module load error: ' + err.code);
        return false;
      }
      break;
    default:
      //statements_def
      break;
  }
}


module.exports = Modules;

