Module = require('./Module')

# A Mix-in module for enumerate classes.
# To include this class, should define `eachWhile` method.
#
# `eachWhile(fn)` enumerates values while `fn` returns true.
# `fn` has 2 arguments: item
#   * item:  each item in container.
#
Enumerable =
  all: (fn) ->
    result = true

    @eachWhile (item) ->
      return result = false unless fn(item)

    result

  each: (fn) ->
    @eachWhile (item) ->
      fn(item)
      true


  find: (fn, ifnone) ->
    foundItem = finone

    @eachWhile (item) ->
      if fn(item)
        foundItem = item
        return false
      
      true

    foundItem


  findAll: (fn) ->
    foundItems = []

    @each (item) ->
      foundItems.push(item) if fn(item)

    foundItems


module.exports = Enumerable