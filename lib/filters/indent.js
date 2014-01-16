var utils = require('../utils');

/**
 * Helper method to recursively run a filter across an object/array and apply it to all of the object/array's values.
 * @param  {*} input
 * @return {*}
 * @private
 */
function iterateFilter(input) {
  var self = this,
    out = {};

  if (utils.isArray(input)) {
    return utils.map(input, function (value) {
      return self.apply(null, arguments);
    });
  }

  if (typeof input === 'object') {
    utils.each(input, function (value, key) {
      out[key] = self.apply(null, arguments);
    });
    return out;
  }

  return;
}

/**
 * Indent of block of text, usefull when using subtemplates
 *
 * @example
 * {{ "foo"|indent(4) }}
 * // =>     foo
 *
 * @param  {*}  input
 * @param  {*}  numIndent     Number of time to reapeat the indentation character (default: 4)
 * @param  {*}  indentChar    Character to be used for indentation (default: space)
 * @return {*}          `input` or `def` value.
 */

module.exports = function (input, numIndent, indentChar) {
  if (typeof indentChar === 'undefined') {
    indentChar = ' ';
  }

  if (typeof numIndent === 'undefined') {
    numIndent = 4;
  }

  if (numIndent <= 0) {
    return input;
  }

  var out = iterateFilter.apply(exports.indent, [input, numIndent, indentChar]);

  if (out !== undefined) {
    return out;
  }

  return utils.repeat(indentChar, numIndent) + input;
};
