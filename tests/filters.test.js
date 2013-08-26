var swig = require('swig'),
  expect = require('expect.js'),
  extras = require('../');

describe('Filters:', function () {

  describe.only('groupby', function () {
    extras.useFilter(swig, 'groupby');
    it('groups arrays by a key', function () {
      var opts = { locals: {
        foo: [{ name: 'a', a: 1 }, { name: 'a', a: 2 }, { name: 'b', a: 3 }]
      }};
      expect(swig.render('{% for r in foo|groupby("name") %}{{ loop.key }} = {% for val in r %}{{ val["a"] }}, {% endfor %}{% endfor %}', opts))
        .to.equal('a = 1, 2, b = 3, ');
    });
  });

  describe('markdown', function () {
    extras.useFilter(swig, 'markdown');
    it('{{ foo|markdown|raw }}', function () {
      expect(swig.render('{{ foo|markdown|raw }}', { locals: { foo: '# This is an H1' }}))
        .to.equal('<h1>This is an H1</h1>');
    });
  });

});
