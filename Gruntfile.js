module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //config
  grunt.initConfig({
     copy: {
      main: {
        files: [
          {expand: true, flatten: true, cwd :'components/', src: ['**/*.png','**/*.jpg','**/*.gif'], dest: 'rel/styles/img/'},
          {expand: true, flatten: true, cwd :'plugins/', src: ['**/*.png','**/*.jpg','**/*.gif'], dest: 'rel/styles/img/'}
        ]
      }
    },
    //stylus css
    stylus: {
      compile: {
        files : {
          'rel/styles/banner.css' : ['components/banner/banner.styl' ],
          'rel/styles/contextMenu.css' : ['components/contextMenu/contextMenu.styl','components/contextMenu/menus.styl'],
          'rel/styles/modal.css' : ['components/modal/modal.styl'],
          'rel/styles/loading.css' : ['plugins/loading/loading.styl']
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
        files : {
          'rel/js/fw-min.js' : ['fw.js'],
          'rel/js/banner-min.js' : ['components/banner/banner.js' ],
          'rel/js/contextMenu-min.js' : ['components/contextMenu/contextMenu-min.js','components/contextMenu/menus.js'],
          'rel/js/modal-min.js' : ['components/modal/modal.js'],
          'rel/js/fwLoading-min.js' : ['plugins/loading/fwLoading.js'],
          'rel/js/fwRotateIE8-min.js' : ['plugins/rotateIE8/fwRotateIE8.js'],
          'rel/js/fwXmlAndJson-min.js' : ['plugins/xmlAndJson/fwXmlAndJson.js']
        }
      }
    },

    //regarde (instead of watch) watches for changes in file to fire tasks
    watch: {
      copy : {
        files: ['components/**/*.png','plugins/**/*.png','components/**/*.jpg','plugins/**/*.jpg','components/**/*.gif','plugins/**/*.gif'],
        tasks: ['copy']
      },
      stylus: {
        files: ['components/**/*.styl','plugins/**/*.styl'],
        tasks: ['stylus']
      },
      uglify : {
        files: ['components/**/*.js','plugins/**/*.js','fw.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.registerTask('build', ['stylus', 'copy', 'uglify']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('default','dev');
};

