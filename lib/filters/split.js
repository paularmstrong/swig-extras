/**
 * Split a string with the given delimiter, returning a list of string.
 *
 * @example
 * {{ "one,two,three"|split(',') }}
 * // => ['one', 'two', 'three']
 *
 * @example
 * // Alternatively, just use JavaScript's built-in `split`:
 * {% set foo = "one,two,three" %}
 * {{ foo.split(',') }}
 *
 * @param  {string} input
 * @param  {string} delimiter String to split with.
 * @return {array}            List of strings.
 */
module.exports = function (input, delimiter) {
  if (typeof input !== 'string') {
    return input;
  }

  return input.split(delimiter);
};
