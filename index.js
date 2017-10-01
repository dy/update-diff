/**
 * @module update-diff
 */

'use strict'

var cache = new WeakMap;

module.exports = function updateDiff (obj, diff, mappers) {
	var raw = cache.get(obj) || {}

	cache.set(obj, diff)

	if (!Array.isArray(mappers)) mappers = [].slice.call(arguments, 2)

	for (var i = 0, l = mappers.length; i < l; i++) {
		var dict = mappers[i]
		for (var prop in dict) {
			if (prop in raw && !Array.isArray(diff[prop]) && (raw[prop] === diff[prop] || obj[prop] === diff[prop])) continue

			if (prop in diff) {
				var result

				if (dict[prop] === true) result = diff[prop]
				else if (dict[prop] === false) continue
				else if (typeof dict[prop] === 'function') {
					result = dict[prop](diff[prop], diff, obj)
					if (result === undefined) continue
				}

				obj[prop] = result
			}
		}
	}

	return obj
}
