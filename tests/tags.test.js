var swig = require('swig'),
  expect = require('expect.js'),
  extras = require('../');

describe('Tags:', function () {

  describe('markdown', function () {
    extras.useTag(swig, 'markdown');
    it('{% markdown %}# This is an H1{% endmarkdown %}', function () {
      expect(swig.render('{% markdown %}# This is an H1{% endmarkdown %}'))
        .to.equal('<h1>This is an H1</h1>');
    });
  });

});
