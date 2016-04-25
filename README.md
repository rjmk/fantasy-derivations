# fantasy-derivations

The [fantasy-land](fantasy-land) spec only requires ADTs to define the minimum
set of methods necessary for its type. Others can be derived. Fantasyland
gives the code necessary for the derivations, but leaves it up to either the
implementer or consumer to put them to use. `fantasy-derivations` allows you to
access methods on various ADTs that can support them without worrying whether
they are in fact defined.

## Example

```js
var fallback = require('fantasy-derivations')
var monad = require('some-monad-library-with-only-chain-defined')

var my_monad = monad.of(0)

fallback('map', my_monad)(function (n) { return n + 1 })
// monad.of(1)
```

## API

The exported function takes a string (a method name) and an ADT and does its
best to return a function for that ADT matching spec.
