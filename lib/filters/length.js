var utils = require('../utils');

/**
 * Returns the length of an array or string.
 *
 * @example
 * {{ "foobar"|length }}
 * // => 6
 *
 * @example
 * {{ [1, 2, 3, 4]|length }}
 * // => 4
 *
 * @example
 * {{ obj|length }}
 * // => 3
 */
module.exports = function (input) {
  if (utils.isArray(input) || (typeof input === 'string' || input instanceof String)) {
    return input.length;
  }

  return utils.keys(input).length;
};
