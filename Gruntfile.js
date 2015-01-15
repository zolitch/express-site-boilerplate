'use strict';

var request = require('request');
var remapify = require('remapify');

//Build TODO:
// 1 - Build task for production site.
//        - copy .styl files to dist modules
//        - copy js to to dist modules
//        - compile stylus in dist
//        - minify css in dist
//        - compile browserify js. All modules files in dist combined
//        - minify js
// 2 - Copy handlebars templates to modules folder if needed.

/*
  Paths for assets
--------------------------------------------------------------------------*/
var clientRoot = 'client';
var modulesRoot = 'client/modules';
var buildPath = 'build';
var publicPath = 'public';
var distPath = 'dist';
var serverAppRoot = 'app';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;



  var appConfig = {
    clientRoot: clientRoot,
    modulesRoot: modulesRoot,
    publicPath: publicPath,
    distPath: distPath,
    buildPath: buildPath,
    serverAppRoot: serverAppRoot
  };


  grunt.initConfig({
    app: appConfig,
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    clean: {
        build: ['<%= app.buildPath %>'],
        dev: {
            src: [
              '<%= app.buildPath %>/**/*.js',
              '<%= app.buildPath %>/**/*.css',
              '<%= app.serverAppRoot %>/views/modules/*',
              '!<%= app.serverAppRoot %>/views/modules/**/*.md' //keep readme file
            ]
        },
        prod: ['<%= app.distPath %>'],
        prodLeftovers: [
          '<%= app.distPath %>/client/modules/**/*.spec.js',
          '<%= app.distPath %>/client/views/modules',
          '<%= app.distPath %>/client/views/development'
        ]
    },
    folder_list: {
      default: {
        options: {
          files: true,
          folders: false
        },
        files: {
          '<%= app.distPath %>/tmp/cssModulesFolderList.json': ['<%= app.modulesRoot %>/**/*.styl']
        }
      }
    },
    stylus: {
      options: {
        compress: false,
        use: [ require('kouto-swiss') ],
        import: [ 'kouto-swiss' ],
        urlfunc: {
          name: 'embedurl',
          limit: 30000 // limit in kb for filesize
        },
        paths: ['./node_modules', '<%= app.clientRoot %>/styles', '<%= app.modulesRoot %>/' ] // allow import between modules!
      },
      dev: {
        linenos: true,
        files: {
          '<%= app.buildPath %>/style.css': ['<%= app.clientRoot %>/styles/core.styl', '<%= app.modulesRoot %>/**/*.styl']
        },

      },
      prod: {
        files: {
          '<%= app.distPath %>/client/css/style.css': '<%= app.clientRoot %>/styles/core.styl',
          //TODO: work out how we can read from a json file created by the folder_list task to create individual css files.
          //For now we'll copy over the styl files and compile then in the build step on the production site.
          //'<%= app.distPath %>/modules/article/article.css': '<%= app.clientRoot %>/modules/article/article.styl'
        },
      }
    },
    browserify: {
        // options: {
        //   debug: true
        // },
        // options: {
        //   preBundleCB: function (b) {
        //     b.plugin(remapify, [
        //       {
        //         cwd: './client/', // set the directory to look in
        //         src: '**/*.js', // glob for the files to remap
        //         expose: 'client' // this will expose `__dirname + /client/views/home.js` as `views/home.js`
        //       }
        //     ]);
        //   }
        // },
        // vendor: {
        //     src: ['client/scripts/vendor/**/*.js'],
        //     dest: '<%= app.buildPath %>/vendor.js',
        //     options: {
        //         shim: {
        //             jquery: {
        //                 path: 'client/scripts/vendor/jquery.js',
        //                 exports: '$'
        //             },
        //             underscore: {
        //                 path: 'client/scripts/vendor/underscore.js',
        //                 exports: '_'
        //             },
        //             backbone: {
        //                 path: 'client/scripts/vendor/backbone.js',
        //                 exports: 'Backbone'
        //                 // depends: {
        //                 //     underscore: 'underscore'
        //                 // }
        //             },
        //             'backbone.marionette': {
        //                 path: 'client/scripts/vendor/backbone.marionette.js',
        //                 exports: 'Marionette',
        //                 depends: {
        //                     jquery: '$',
        //                     backbone: 'Backbone'
        //                     //underscore: '_'
        //                 }
        //             }
        //         }
        //     }
        // },
        dev: {
            files: {
                '<%= app.buildPath %>/app.js': ['<%= app.clientRoot %>/scripts/main.js']
            },
            options: {
                browserifyOptions: {
                  debug: true,
                  exclude: ['<%= app.modulesRoot %>/**/*.spec.js']
                },
                transform: ['hbsfy']
            }
        },
        prod: {
            files: {
                'dist/app.js': ['<%= app.clientRoot %>/scripts/main.js']
            },
            options: {
                transform: ['hbsfy']
            }
        },
        test: {
            files: {
                '<%= app.buildPath %>/tests.js': [
                    '<%= app.clientRoot %>/spec/**/*.test.js',
                    '<%= app.modulesRoot %>/**/*.spec.js'
                ]
            },
            options: {
                transform: ['hbsfy']
            }
        }
    },
    // concat: {
    //   vendor: {
    //     src: ['<%= app.clientRoot %>/scripts/vendor/jquery.js'],
    //     dest: '<%= app.buildPath %>/vendor.js'
    //   }
    // },

    copy: {
        css: {
            src: '<%= app.buildPath %>/style.css',
            dest: 'public/css/style.css'
        },
        dev: {
            files: [{
                src: '<%= app.clientRoot %>/development/gridpak/*',
                dest: 'public/development/gridpack/',
                expand: true,
                flatten: true
            }, {
                src: '<%= app.buildPath %>/app.js',
                dest: 'public/js/app.js'
            },  {
                src: '<%= app.clientRoot %>/scripts/vendor/*.js',
                dest: 'public/js/vendor',
                expand: true,
                flatten: true
            }, {
                src: '<%= app.clientRoot %>/img/*',
                dest: 'public/img/',
                expand: true,
                flatten: true
            }]
        },
        devTemplates: {
          files: [{
            //copy templates from client/modules folders to modules view for express server.
            src: '<%= app.clientRoot %>/modules/**/*.handlebars',
            dest: '<%= app.serverAppRoot %>/views/modules',
            expand: true,
            flatten: true
          }]
        },
        prod: {
            files: [
              {
                //images
                src: ['<%= app.clientRoot %>/img/*'],
                dest: '<%= app.distPath %>/'
              },{
                //copy each module's .styl file to dist. It will be copied accross to the production site and built there.
                src: ['<%= app.clientRoot %>/modules/**/*.styl'],
                dest: '<%= app.distPath %>/',
              },{
                //copy each module's .js files to dist. It will be copied accross to the production site and built there.
                src: ['<%= app.clientRoot %>/modules/**/*.js'],
                dest: '<%= app.distPath %>/',
              },{
                //vendor files not bundled
                src: ['<%= app.clientRoot %>/scripts/vendor/*.js'],
                dest: '<%= app.distPath %>/client/js/vendor',
                expand: true,
                flatten: true
              },{
                //copy templates from client/modules to modules folder in dist.
                src: '<%= app.clientRoot %>/modules/**/*.handlebars',
                dest: '<%= app.distPath %>/'
              },{
                //Shared views and layouts.
                //Exclude modules as these are copied from client source in <%= app.clientRoot %>/modules/
                cwd: '<%= app.serverAppRoot %>/views/',
                src: ['**/*.handlebars'],
                dest: '<%= app.distPath %>/client/views/',
                expand: true
              }
            ]
        }
    },

    // CSS minification.
    cssmin: {
        minify: {
            src: ['<%= app.buildPath %>/<%= pkg.name %>.css'],
            dest: 'dist/css/<%= pkg.name %>.css'
        }
    },

    // Javascript minification.
    uglify: {
        prod: {
          options: {
              compress: true,
              verbose: true
          },
          files: [
            {
              src: 'build/app.js',
              dest: 'dist/client/js/app.js'
            }
          ]
        }
    },
    browserSync: {
      bsFiles: {
        src : 'public/css/style.css'
      },
      options: {
        proxy: 'localhost:3000',
        watchTask: true
      }
    },

    watch: {
      js: {
          files: ['<%= app.clientRoot %>/modules/**/*.handlebars', '<%= app.clientRoot %>/**/*.js'],
          tasks: ['clean:dev', 'browserify:dev', 'copy:dev','copy:devTemplates'],
          options: {
            nospawn: true,
            livereload: reloadPort
          }
      },
      stylus: {
        files: ['<%= app.clientRoot %>/styles/*.styl', '<%= app.modulesRoot %>/**/*.styl'],
        tasks: ['stylus:dev', 'copy:css'],
        options: { livereload: reloadPort }
      },
      views: {
        files: [
          'app/views/*.handlebars',
          'app/views/**/*.handlebars'
        ],
        options: { livereload: reloadPort }
      }
    },
    // for front-end tdd
    karma: {
        options: {
            configFile: 'karma.conf.js'
        },
        watcher: {
            background: true,
            singleRun: false
        },
        test: {
            singleRun: true
        }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'build:dev',
    'develop',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build:dev', [
    'clean:dev',
    'stylus:dev',
    'browserify:dev',
    //'browserify:test',
    'copy:dev',
    'copy:devTemplates',
    //'karma:test'
  ]);

  grunt.registerTask('test', ['karma:test']);

  grunt.registerTask('build:prod-assets', [
    //clean dist folder.
    'clean:prod',
    //generate base css file in dist.
    'stylus:prod',
    //generate a list folders to read from. TODO.
    //'folder_list',
    //generate seperate css files for each module in dist. //TODO: this will be handled in the prod site for now
    //run js tests.
    //generate base js file in dist.
    'uglify:prod',
    //generate seperate js files for each module in dist.
    //copy base image assets to dist.
    //copy base icons/svg assets to dist.
    //copy views into modules
    'copy:prod',
    'clean:prodLeftovers',
    
    // 'clean:prod',
    // //'browserify:vendor',
    // 'browserify:app',
    // 'cssmin',
    // 'uglify',
    // 'copy:prod'
  ]);

  grunt.registerTask('build:prod', [
    'build:prod-assets',
    //'clean:prod',
    //'browserify:vendor',
    //'browserify:app',
    //'cssmin',
    //'copy:prod'
  ]);


};
