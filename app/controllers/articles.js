var express = require('express');
var router = express.Router();
var ApiaryEndpoint = require('../api/apiary');

module.exports = function (app) {
  app.use('/', router);
};

var endPoint = new ApiaryEndpoint();

//var testing = {"id" : "1","title" : "Article one","author" : "Author Name","summary" : "Article one summary","content" : "<p>Some content for the article. Some content for the article. Some content for the article. </p><p>Some content for the article. Some content for the article. Some content for the article. </p><p>Some content for the article. Some content for the article. Some content for the article. </p>","imgSrc" : "/img/600x338.gif","imgAlt" : "Article image alt text","url" : "Article/one"};

/* All mock articles
========================================================================== */
router.get('/articles', function (req, res, next) {
  //Always result in JSON. Just a simple mock endpoint.
  endPoint.get('articles', function(err, result) {
    if(err) {return next (err);}

    //add the layout and pass straight in
    result.layout = '2-col-right-side-bar';
    res.render('pages/articles', result);
  });
});

/* Single mock article
========================================================================== */
router.get('/article/:id', function (req, res, next) {
  //Always result in JSON. Just a simple mock endpoint.
  endPoint.get('article/' + req.params.id, function(err, result) {
    if(err) {return next (err);}

    //add the layout and pass straight in
    result.layout = '2-col-right-side-bar';
    res.render('pages/article', result);
  });
});


