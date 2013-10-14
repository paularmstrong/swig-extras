var swig = require('swig'),
  expect = require('expect.js'),
  extras = require('../');

describe('Filters:', function () {

  describe('batch', function () {
    extras.useFilter(swig, 'batch');
    it('batches', function () {
      var opts = { locals: { items: ['a', 'b', 'c', 'd', 'e', 'f', 'g'] }};
      expect(swig.render('{% for row in items|batch(3, "no item") %}{{ row }} : {% endfor %}', opts))
        .to.equal('a,b,c : d,e,f : g,no item,no item : ');
    });
  });

  describe('groupby', function () {
    extras.useFilter(swig, 'groupby');
    it('groups arrays by a key', function () {
      var opts = { locals: {
        foo: [{ name: 'a', a: 1 }, { name: 'a', a: 2 }, { name: 'b', a: 3 }]
      }};
      expect(swig.render('{% for r in foo|groupby("name") %}{{ loop.key }} = {% for val in r %}{{ val["a"] }}, {% endfor %}{% endfor %}', opts))
        .to.equal('a = 1, 2, b = 3, ');
    });
  });

  describe('length', function () {
    extras.useFilter(swig, 'length');
    it('{{ "foobar"|length }}', function () {
      expect(swig.render('{{ "foobar"|length }}'))
        .to.equal('6');
    });

    it('{{ [1, 2, 3, 4, 5, 6]|length }}', function () {
      expect(swig.render('{{ [1, 2, 3, 4, 5, 6]|length }}'))
        .to.equal('6');
    });

    it('{{ obj|length }}', function () {
      expect(swig.render('{{ foo|length }}', { locals: { foo: { 'a': 1, 'b': 2, 'c': 3 } }}))
        .to.equal('3');
    });
  });

  describe('markdown', function () {
    extras.useFilter(swig, 'markdown');
    it('{{ foo|markdown }}', function () {
      expect(swig.render('{{ foo|markdown }}', { locals: { foo: '# This is an H1' }}))
        .to.equal('<h1>This is an H1</h1>');
    });
  });

  describe('nl2br', function () {
    extras.useFilter(swig, 'nl2br');
    it('{{ foo|nl2br }}', function () {
      expect(swig.render('{{ foo|nl2br }}', { locals: { foo: "a\nb" }}))
        .to.equal('a<br>b');
    });

    it('{{ bar|nl2br }}', function () {
      expect(swig.render('{{ bar|nl2br }}', { locals: { bar: ["a\nb"] }}))
        .to.equal('a<br>b');
    });
  });

  describe('pluck', function () {
    extras.useFilter(swig, 'pluck');
    it('{{ people|pluck("name") }}', function () {
      var opts = { locals: { people: [{ age: 30, name: 'Paul' }, { age: 28, name: 'Nicole'}] }};
      expect(swig.render('{{ people|pluck("name") }}', opts))
        .to.equal('Paul,Nicole');
    });
  });

  describe('slice', function () {
    extras.useFilter(swig, 'slice');
    it('{{ "12345"|slice(1,3) }}', function () {
      expect(swig.render('{{ "12345"|slice(1,3) }}'))
        .to.equal('23');
    });

    it('{{ "12345"|slice(1) }}', function () {
      expect(swig.render('{{ "12345"|slice(1) }}'))
        .to.equal('2345');
    });

    it('{{ [1, 2, 3, 4, 5]|slice(1,3) }}', function () {
      expect(swig.render('{{ [1, 2, 3, 4, 5]|slice(1,3) }}'))
        .to.equal('2,3');
    });

    it('{{ [1, 2, 3, 4, 5]|slice(1) }}', function () {
      expect(swig.render('{{ [1, 2, 3, 4, 5]|slice(1) }}'))
        .to.equal('2,3,4,5');
    });
  });

  describe('split', function () {
    extras.useFilter(swig, 'split');
    it('{{ foo|split(",")|join(" & ") }}', function () {
      expect(swig.render('{{ "one,two,three"|split(",")|join(" & ")|raw }}'))
        .to.equal('one & two & three');
    });
  });

  describe('trim', function () {
    extras.useFilter(swig, 'trim');
    it('{{ foo|trim }}', function () {
      expect(swig.render('{{ foo|trim }}', { locals: { foo: " trim me  " }}))
        .to.equal('trim me');
    });

    it('{{ bar|trim }}', function () {
      expect(swig.render('{{ bar|trim }}', { locals: { bar: [" trim me "] }}))
        .to.equal('trim me');
    });
  });

  describe('truncate', function () {
    extras.useFilter(swig, 'truncate');
    it('{{ foo|truncate(3) }}', function () {
      expect(swig.render('{{ foo|truncate(3) }}', { locals: { foo: "truncate me" }}))
        .to.equal('tru...');
    });

    it('{{ foo|truncate(3, "") }}', function () {
      expect(swig.render('{{ foo|truncate(3, "") }}', { locals: { foo: "truncate me" }}))
        .to.equal('tru');
    });

    it('{{ bar|truncate(3) }}', function () {
      expect(swig.render('{{ bar|truncate(3) }}', { locals: { bar: ["truncate me"] }}))
        .to.equal('tru...');
    });
  });

});
