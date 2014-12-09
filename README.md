webpack-config-merger
=====================

A simple module for merging webpack configs. Inspired by `grunt-webpack`.

Usage:

```javascript
var mergeWebpackConfig = require('webpack-config-merger');

mergeWebpackConfig(require('./node_modules/packageToBuild/webpack.config.js'), {
  entry: 'path/to/entry.js',
  output: {
    path: 'path/to/dest',
    filename: 'dest.js'
  }
})
```
