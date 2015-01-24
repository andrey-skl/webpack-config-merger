var merger = require('../src/merger');

describe('mergerSpec', function() {
  var defaultConfig;
  var any = jasmine.any;
  var firstConfig;
  var secondConfig;

  beforeEach(function() {
    defaultConfig = {
      context: any(String),
      output: {
        path: any(String)
      },
      progress: true,
      stats: {},
      failOnError: true
    };

    firstConfig = {};
    secondConfig = {};
  });

  it('should default config if no pass arguments', function() {
    expect(merger())
      .toEqual(defaultConfig);
  });

  it('should correct merge string property', function() {
    firstConfig.prop = 'foo';
    secondConfig.prop = 'bar';

    expect(merger(firstConfig, secondConfig).prop)
      .toEqual('bar');
  });

  it('should correct merge arrays property', function() {
    firstConfig.list = ['foo'];
    secondConfig.list = ['bar'];

    expect(merger(firstConfig, secondConfig).list)
      .toEqual(['foo', 'bar']);
  });

  it('should correct merge object property', function() {
    firstConfig.stats = {};
    firstConfig.stats.prop1 = 'foo';

    secondConfig.stats = {};
    secondConfig.stats.prop2 = 'bar';

    var resultConfig = merger(firstConfig, secondConfig);

    expect(resultConfig.stats)
      .toEqual({
        prop1: 'foo',
        prop2: 'bar'
      });
  });

  it('should merge more then two configs', function() {
    firstConfig.list = ['foo'];
    secondConfig.list = ['bar'];

    expect(merger(firstConfig, secondConfig, {
      list: ['zoo']
    }).list).toEqual(['foo', 'bar', 'zoo']);
  });
});
