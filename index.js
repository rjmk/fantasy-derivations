var fl = require('fantasy-land')


var fallback = module.exports = create_fallback([])

function create_fallback (methods) {
  return function fallback (method, adt) {
    if (adt[method]) return adt[method].bind(adt)
    return (derivations[method] || []).reduce(function (derived, derivation) {
      return derived || check_derivation(derivation, adt, methods.concat(method))
    }, undefined)
  }
}

var derivations =
  { map: [ [ [ fl.of, fl.ap ], applicative_map ], [ [ fl.of, fl.chain ], monad_map ] ]
  , ap: [ [ [ fl.of, fl.map ], chain_ap ] ]
  , of: [ [ [], of ] ]
  }

function check_derivation (derivation, adt, methods) {
  return derivation[0].every(adt_fallsback) && derivation[1](adt)

  function adt_fallsback (m) {
    return methods.indexOf(m) === -1 && Boolean(create_fallback(methods)(m, adt))
  }
}

function applicative_map (applicative) {
  return function (f) {
    return fallback(fl.ap, of(applicative)(f))(applicative)
  }
}

function monad_map (monad) {
  return function (f) {
    return fallback(fl.chain, monad)(function (a) {
      return of(monad)(f(a))
    })
  }
}

function chain_ap (chain) {
  return function (chain2) {
    var c2map = fallback('map', chain2)
    return fallback(fl.chain, chain)(c2map)
  }
}

function of (pointed) {
  return pointed[fl.of] || pointed.constructor[fl.of]
}
