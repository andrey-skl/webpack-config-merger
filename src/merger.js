var _ = require('lodash');
var path = require("path");

var mergeConfigFunction = function(grunt) {

  function mergeFunction(a, b) {
    if(_.isArray(a) && _.isArray(b)) {
      return a.concat(b);
    }
    if(_.isArray(a) && !_.isArray(b)) {
      return a.map(function(item) {
        return _.merge({}, {x:item}, {x:b}, mergeFunction).x;
      });
    }
    if(_.isArray(b) && !_.isArray(a)) {
      return b.map(function(item) {
        return _.merge({}, {x:a}, {x:item}, mergeFunction).x;
      });
    }
  }
  
  return mergeFunction;

};


var mergeWebpackConfig = function(configToOverride, config) {
  var _ = require('grunt-webpack/node_modules/lodash');
  var mergeWebpackConfigFn = require('grunt-webpack/lib/mergeFunction')(grunt);
  var path = require("path");

  var options = _.merge(
    {x: {
      context: ".",
      output: {
        path: "."
      },
      progress: true,
      stats: {},
      failOnError: true
    }},
    {x: configToOverride},
    {x: config},
    mergeWebpackConfigFn
  ).x;

  [].concat(options).forEach(function(options) {
    options.context = path.resolve(process.cwd(), options.context);
    options.output.path = path.resolve(process.cwd(), options.output.path);
  });

  return options;
};

module.exports = mergeWebpackConfig;