/**
 * Extracts a slice of an array or a string.
 *
 * @example
 * {{ "12345"|slice(1,3) }}
 * // => 23
 *
 * @example
 * {{ [1, 2, 3, 4, 5]|slice(1, 3) }}
 * // => [2, 3]
 */
module.exports = function (input, start, end) {
  return input.slice(start, end);
}
