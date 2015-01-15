var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

//index page with links to all pages
router.get('/', function (req, res, next) {
  
  res.render('pages/index', {
    title: 'Stadion'
  });
});

//Actual homepage
router.get('/home', function (req, res, next) {

  res.render('pages/home', {
    title: 'Stadion homepage'
  });
});