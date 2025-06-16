// import grunt = require('grunt');

export = function(grunt: any) {
  grunt.initConfig({
    nodeunit: {
      all: ['test/{grunt,tasks,util}/**/*.js'],
      tap: {
        src: '<%= nodeunit.all %>',
        options: {
          reporter: 'tap',
          reporterOutput: 'tests.tap'
        }
      }
    },
    eslint: {
      gruntfileTasks: ['Gruntfile.ts', 'internal-tasks/*.ts'],
      libsAndTests: ['lib/**/*.ts', '<%= nodeunit.all %>'],
      subgrunt: ['<%= subgrunt.all %>']
    },
    watch: {
      gruntfileTasks: {
        files: ['<%= eslint.gruntfileTasks %>'],
        tasks: ['eslint:gruntfileTasks']
      },
      libsAndTests: {
        files: ['<%= eslint.libsAndTests %>'],
        tasks: ['eslint:libsAndTests', 'nodeunit']
      },
      subgrunt: {
        files: ['<%= subgrunt.all %>'],
        tasks: ['eslint:subgrunt', 'subgrunt']
      }
    },
    subgrunt: {
      all: ['test/gruntfile/*.ts']
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadTasks('internal-tasks');

  grunt.registerTask('test', '', function(reporter: string) {
    grunt.task.run(['eslint', 'nodeunit:' + (reporter || 'all'), 'subgrunt']);
  });

  grunt.registerTask('default', ['test']);
};
