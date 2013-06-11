module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //config
  grunt.initConfig({

    //stylus css
    stylus: {
      compile: {
        files: {
          'app/**/*.css': 'app/**/*.styl'
        }
      }
    },

    //minify the JS file to be as small as possible
    uglify: {
      options : {
        //Uncomment the lines below for debug.
        //mangle: false,
        //beautify: true
      },
      app: {
        src: ['app/**/*.js'],
        dest: 'app/**/*.js'
      }
    },

    //regarde (instead of watch) watches for changes in file to fire tasks
    watch: {
      stylus: {
        files: ['app/**/*.styl'],
        tasks: ['stylus']
      },
      uglify : {
        files: ['app/**/*.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.registerTask('build', ['stylus', 'uglify']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('default','dev');
};

