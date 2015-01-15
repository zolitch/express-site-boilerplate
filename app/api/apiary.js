/* ========================================================================== 


  Apiary controller

  Author:     Stephen Zsolnai (http://www.zolla.co.uk)
  Decription: Communicates directly with the mock api located at:
              http://private-003c2-stephenzsolnai.apiary-mock.com/
              append end points for different sections of the site. 
              Very immature t this point. Just a straight got to end point and return json.
  Changelog:  2014/0114 : File created.

========================================================================== */


var request = require('request');
var config = require('../../config/config');

var apiRoot = config.apiRoot;

var Apiary = function() {

};

/* Public api
========================================================================== */
Apiary.prototype.get = function(endPoint, callback) {
  request(apiRoot + endPoint, function (error, res, body) {
    var result;
    if (error) {
      return callback(error);
    }
    try {
       result = JSON.parse(body);
    }
    catch (e) {
      return callback(e);
    }
    if (res.statusCode == 200) {
      console.log(result);
      return callback(null, result);
    } else {
      var err = new Error('Api response error');
      err.status = res.statusCode;
      return callback(err);
    }
  });
};

/* Private
========================================================================== */



module.exports = Apiary;