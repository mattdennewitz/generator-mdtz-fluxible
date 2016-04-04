'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-mdtz-fluxible') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: function(value) {
        return !!value;
      }
    }];

    this.prompt(prompts, function (props) {
      this.name = props.projectName;
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    var singles = [
      '.editorconfig',
      '.babelrc',
      'client.js',
      'const.js',
      'fluxible-app.js',
      'index.js',
      'package.json',
      'routes.js',
      'server.js',
      'webpack.config.js'
    ];

    singles.forEach(function(fn) {
      this.fs.copyTpl(
        this.templatePath(fn),
        this.destinationPath(fn),
        {
          name: this.name
        }
      );
    }.bind(this));

    var folders = [
      'actions',
      'components',
      'containers',
      'rendering',
      'static',
      'stores'
    ];

    folders.forEach(function(folder) {
      this.fs.copyTpl(
        this.templatePath(path.join(folder, '**')),
        this.destinationPath(folder),
        {
          name: this.name
        }
      );
    }.bind(this));
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: false
    });
  }
});
