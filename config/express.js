var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var exphbs  = require('express-handlebars');

module.exports = function(app, config) {

  // Create `ExpressHandlebars` instance with a default layout.
  var hbs = exphbs.create({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/shared/', config.root + '/app/views/modules/'],
    helpers: {
        // getPartialByName: function(name, data, options) {
        //   var template = hbs.handlebars.partials[name];
        //   if (template) {
        //     if (typeof template !== 'function') {
        //         template = hbs.handlebars.compile(template);
        //     }
        //     return template(data, options);
        //   }
        // }
    }
  });




  
  app.engine('handlebars', hbs.engine);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  var apiControllers = glob.sync(config.root + '/app/api/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('pages/error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  app.locals.isDevelopment = config.isDevelopment;

};
