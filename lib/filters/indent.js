var utils = require('../utils');

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

  var out = utils.iterateFilter.apply(exports.indent, [input, numIndent, indentChar]),
    indentString = utils.repeat(indentChar, numIndent);

  if (out !== undefined) {
    return out;
  }

  return indentString + input.replace(/\n/g, '\n' + indentString);
};