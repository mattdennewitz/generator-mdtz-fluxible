'use strict';
var path = require('path');
var chalk = require('chalk');
var mkdirp = require('mkdirp')
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('app_name', { type: String, required: true });
    this.argument('version', { type: String, required: true, default: "v1" });
  },

  writing: function () {
    var apiRoot = path.join(this.app_name, 'api');
    var apiVersionRoot = path.join(apiRoot, this.version);
    mkdirp.sync(apiVersionRoot);

    this.log(apiRoot);
    this.log(apiVersionRoot);

    // copy files to ./<app name>/api/v<version number>/
    ['serializers.py', 'views.py', 'urls.py', '__init__.py'].forEach(function(fn) {
      this.fs.copyTpl(
        this.templatePath(fn),
        this.destinationPath(path.join(apiVersionRoot, fn)),
        {
          name: this.name
        }
      );
    }.bind(this));

    // copy root __init__
    this.fs.copyTpl(
      this.templatePath('__init__.py'),
      this.destinationPath(path.join(apiRoot, '__init__.py'))
    );
  }
});
