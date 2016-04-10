'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var classToFilename = require('../util').classToFilename;

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function () {
    this.log('name', this.name);
    var outputFilename = classToFilename(this.name) + '.js';

    this.fs.copyTpl(
      this.templatePath('base-store.js'),
      this.destinationPath('stores/' + outputFilename),
      {
        name: this.name
      }
    );
  }
});
