var swig = require('swig'),
  expect = require('expect.js'),
  extras = require('../');

describe('Filters:', function () {

  describe('markdown', function () {
    extras.useFilter(swig, 'markdown');
    it('{{ foo|markdown|raw }}', function () {
      expect(swig.render('{{ foo|markdown|raw }}', { locals: { foo: '# This is an H1' }}))
        .to.equal('<h1>This is an H1</h1>');
    });
  });

});
