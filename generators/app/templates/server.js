require('babel-register');

var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var render = require('./rendering/render').render;

var app = express();

if(process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');

  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(morgan('combined'));
app.use(render);

app.listen(3000, function() {
  console.log('Running at http://localhost:3000');
})
