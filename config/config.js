var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    port = process.env.PORT || 3000,
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    isDevelopment: true,
    apiRoot: 'http://private-003c2-stephenzsolnai.apiary-mock.com/',
    app: {
      name: 'express-boilerplate'
    },
    port: port,
  },

  test: {
    root: rootPath,
    isDevelopment: false,
    apiRoot: 'http://private-003c2-stephenzsolnai.apiary-mock.com/',
    app: {
      name: 'express-boilerplate'
    },
    port: port,
  },

  production: {
    root: rootPath,
    isDevelopment: false,
    apiRoot: null,
    app: {
      name: 'express-boilerplate'
    },
    port: port
  }
};

module.exports = config[env];
