exports.tags = require('./lib/tags');
exports.filters = require('./lib/filters');

exports.useFilter = function (swig, filter) {
  var f = exports.filters[filter];
  if (!f) {
    throw new Error('Filter "' + filter + '" does not exist.');
  }
  swig.setFilter(filter, f);
};

exports.useTag = function (swig, tag) {
  var t = exports.tags[tag];
  if (!t) {
    throw new Error('Tag "' + tag + '" does not exist.');
  }
  swig.setTag(tag, t.parse, t.compile, t.ends, t.blockLevel);
  if (t.ext) {
    swig.setExtension(t.ext.name, t.ext.obj);
  }
};
