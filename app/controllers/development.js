var express = require('express');
var router = express.Router();
var ApiaryEndpoint = require('../api/apiary');

module.exports = function (app) {
  app.use('/', router);
};

var endPoint = new ApiaryEndpoint();

router.get('/grid', function (req, res, next) {

  res.render('development/grid', {
    title: 'The Grid system'
  });
});

router.get('/vertical-rhythm', function (req, res, next) {

  res.render('development/vertical-rhythm', {
    title: 'Typography and Vertical Rhythm'
  });
});

router.get('/testpage', function (req, res, next) {

  res.render('development/testpage', {
    title: 'test page'
  });
});

router.get('/style-guide', function (req, res, next) {

  res.render('development/style-guide', {
    title: 'Style Guide'
  });
});

router.get('/module-testbed', function (req, res, next) {
  endPoint.get('articles', function(err, result) {
    if(err) {return next (err);}
    res.render('development/module-testbed', result);
  });
});

router.get('/module-testbed/:module', function (req, res, next) {
  endPoint.get(req.params.module, function(err, result) {
    if(err) {return next (err);}
    res.render('development/module-testbed/' + req.params.module, result);
  });
});