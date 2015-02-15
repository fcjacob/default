module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    browserSync: {
        bsFiles: {
            src : ['css/global.css', 'scripts/min/global-min.js', 'svgs/svg-defs.svg', 'pages/*.html', 'index.html']
        },
        options: {
            server: {
                baseDir: "./",
                watchTask: true,
                open: "external",
                browser: "google chrome",
                // online: false,
                // proxy: "local.dev" // if external server
            }
        }
    },

    uglify: {
      global: {
        files: {
          "scripts/min/global-min.js": ["scripts/modernizr.js","scripts/jquery-1.11.1.min.js","scripts/TweenMax.min.js","scripts/main.js"]
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: "compressed",
          sourcemap: 'none'
        },
        files: {
          "css/global-unprefixed.css": "sass/styles.scss"
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'] 
      },
      files: {
        src: "css/global-unprefixed.css",
        dest: "css/global.css"
      }
    },

    svgstore: {
      options: {
        cleanup: false,
        prefix: '',
        svg: {
          style: "display:none;",
          xmlns: "http://www.w3.org/2000/svg",
          'xmlns:xlink': "http://www.w3.org/1999/xlink"
        }
      },
      default: {
        files: {
          "defs.svg": ["svg/*.svg"]
        }
      }
    },

    imagemin: {                           
      dynamic: {                         
        files: [{
          expand: true,                   
          cwd: 'images/',                
          src: ['**/*.{png,jpg,gif}'],  
          dest: 'opt-images/'             
        }]
      }
    },

    watch: {

      js: {
        files: ["scripts/*.js"],
        tasks: ["uglify"]
      },
      css: {
        files: ["sass/*.scss"],
        tasks: ["sass", "autoprefixer"]
      },
      svgIcons: {
        files: ["svg/*.svg"],
        tasks: ["svgstore"]
      },
      imagemin: {
        files: ["images/*.{png,jpg,gif}"],
        tasks: ["imagemin"]
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgstore');

  grunt.registerTask("serve", ["browserSync"]);
  grunt.registerTask("default", ["imagemin", "sass", "autoprefixer", "svgstore", "watch"]);

};