module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            frontend: {
                options: {
                    paths: ["css"]
                },
                files: {"build/style.css": "less/style.less"}
            }
        },

        cssmin: {
            combine: {
                files: {
                    'build/style.min.css': ['build/style.css']
                }
            }
        },

        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/spin.js/spin.js',
                    'bower_components/spin.js/jquery.spin.js',
                    'bower_components/fotorama/fotorama.js',
                    'bower_components/jquery-validate/dist/jquery.validate.js',
                    'bower_components/typed.js/js/typed.js',
                    'js/bg-loaded.js',
                    'bower_components/wow/dist/wow.js',
                    'js/desktop-mobile.js',
                    'js/script.js'
                ],
                dest: 'build/script.js'
            }
        },

        uglify: {
            build: {
                src: 'build/script.js',
                dest: 'build/script.min.js'
            }
        },

        sprite:{
            less: {
                src: 'img/sprites/*.png',
                dest: 'build/spritesheet.png',
                destCss: 'build/sprites-vars.less'
            }
        },

        watch: {
            frontend: {
                files: ['js/**/*.js', 'images/sprites/*', 'less/**/*.less'],
                tasks: ['sprite', 'less', 'cssmin', 'concat', 'uglify'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sprite', 'less', 'cssmin', 'concat', 'uglify', 'watch']);

};