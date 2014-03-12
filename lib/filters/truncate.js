var each = require('../utils').each;

/**
 * Truncate input strings to the given length;
 *
 * @example
 * // foo = 'This is some text.';
 * {{ foo|truncate(5) }}
 * // => This ...
 *
 * @param  {*}      input
 * @param  {number} len   Number of characters to truncate to.
 * @param  {boolean} [entireEndingWord=true]   Text should end with an entire word
 * @param  {string} [end="..."]   Text that will be appended if the string was truncated
 * @return {*}
 */
module.exports = function (input, len, entireEndingWord, end) {
    entireEndingWord = (typeof entireEndingWord === 'undefined') ? true : entireEndingWord;
    end = (typeof end === 'undefined') ? '...' : end;

    if (typeof input === 'object') {
        each(input, function (value, key) {
            input[key] = module.exports(value, len, entireEndingWord, end);
        });
        return input;
    }

    if (typeof input === 'string') {
        input = input.substring(0, len);

        if (entireEndingWord) {
            var lastSpace = input.lastIndexOf(' ');
            len = lastSpace !== -1 ? lastSpace : len;
            input = input.substring(0, len);
        }

        return input + ((input.length >= len) ? end : '');
    }

    return input;
};