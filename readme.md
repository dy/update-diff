# update-diff [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges)

Update object by mapping differences with another object. Comes handy for updating state.

[![npm install update-diff](https://nodei.co/npm/update-diff.png?mini=true)](https://npmjs.org/package/update-diff/)

```js
let prop = require('update-diff')

let state = {id: 1, values: [1, 2, 3]}

updateDiff(state, {id: 5, values: ['1', '2']}, {
  values: v => {
    if (!v || v.length) throw 'values should be an array-like'
    return Array.from(v, v => parseFloat(v))
  },
  id: id => id
})

// {id: 5, values: [1, 2]}
```

If property mapper returns any value other than `undefined`, it is used for new value. `undefined` keeps state property unchanged. Only primitives get compared in diffing, to compare arrays you have to do it manually:

```js
update(state, opts, {
	positions: (p, state) => {
		if (p.length === state.positions.length) return
		return p
	}
})
```

To do multipass update, use array of mappers:

```js
let state = {}
let options = {propA: 0, propB: 1, propC: ['foo'], propD: 'bar'}

updateDiff(state, options, [
//first pass mapping
{
  propA: value => value,
  propB: true,
  propC: Array.isArray,
  propD: function () {}
},
//second pass mapping
{
  propX: (x, state) => state.propB + x
},
//third pass mapping
{
  propA: (value, state, options) => state.propA ? 'a' : 'b'
}
])

// {propA: 0, propB: 1, propC: ['foo']}
```

## Related

* [obj-map-prop](https://github.com/dfcreative/obj-map-prop) − map object properties by a dict
* [map-obj](https://github.com/sindresorhus/map-obj) − map properties by single function
* [filter-obj](https://github.com/sindresorhus/filter-obj) − filter properties by single function


## Credits

© 2017 Dima Yv. MIT License
