module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		//Store the project settings
		pkg: grunt.file.readJSON('package.json'),

		responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1600,
            suffix: '_large_2x',
            quality: 30
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png,svg}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    }, //responsive
    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    }, //clean
    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    }, //mkdir
    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['images_src/fixed/*.{gif,jpg,png,svg}'],
          dest: 'images/',
          flatten: true,
        }]
      },
    }, //copy
		concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['_/src/js/*/js'],
        dest: '_/js/script.js',
      },
    }, //concat
    jshint: {
      files: ['gruntfile.js', '_/src/js/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    }, //jshint
    csslint: {
      // define the files to lint
      files: ['_/css/*.css'],
      strict: {
        options: {
            "import": 2
        }
      }
    }, //csslint
		uglify: {
			my_target: {
				files: {
					"_/js/script.js": ["_/src/js/*.js"]
				} //files
			} //my_target
		}, //uglify
		compass: {
			dev: {
				options: {
					config: "config.rb"
				} //options
			} //dev
		}, //compass
		watch: {
			options: {livereload: true},
			scripts: {
				files: ["_/src/js/*.js"],
				tasks: ["uglify"]
			}, //scripts
			sass: {
				files: ["_/src/scss/*.scss"],
				tasks: ["compass:dev"]
			}, //sass
			html: {
				files: ["*.html"]
			} //html
		} //watch
	}) //initConfig
	grunt.registerTask("default",['clean', 'mkdir', 'copy', 'responsive_images', "watch"]);
} // exports