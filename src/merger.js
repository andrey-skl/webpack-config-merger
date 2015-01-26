var _ = require('lodash');
var path = require("path");

var mergeFunction = function(a, b) {
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
};


/**
 * @param {...Object} config The webpack configs which will be merged
 * @return {Object} The webpack config object
 */
var mergeWebpackConfig = function() {
  var defaultConfig = {
    context: ".",
    output: {
      path: "."
    },
    progress: true,
    stats: {},
    failOnError: true
  };
  var configsList = Array.prototype.slice.call(arguments);

  var mergeConfigsList = [defaultConfig]
    .concat(configsList)
    .map(function(config) {

      /**
       * Create special merge object
       */
      return {
        x: config
      };
    });

  /**
   * Add merge function to the end of the configs
   * list
   */
  mergeConfigsList.push(mergeFunction);

  var options = _.merge.apply(_, mergeConfigsList).x;

  [].concat(options).forEach(function(options) {
    options.context = path.resolve(process.cwd(), options.context);
    options.output.path = path.resolve(process.cwd(), options.output.path);
  });

  return options;
};

module.exports = mergeWebpackConfig;
