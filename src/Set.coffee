class Set
  constructor: (eles...) ->
    @_hash = {}
    @addAll(eles...)


  _each: (fn) ->
    i = 0

    for key, value of @_hash
      return unless fn(value, i)
      i++
      

  add: (ele) ->
    @_hash[ele] = ele


  addAll: (eles...) ->
    for e in eles
      @add(e)


  contains: (ele) ->
    @_hash[ele] != undefined


  each: (fn) ->
    @_each (value, i) ->
      fn(value, i)
      true


  equals: (other) ->
    result = true

    @_each (value) ->
      return result = false unless other.contains(value)
      true

    return result


  intersect: (other) ->
    set = new Set

    @each (value) ->
      set.add(value) if other.contains(value)

    set


  union: (other) ->
    set = new Set(@toArray()...)

    other.each (value) ->
      set.add(value)

    set


  remove: (ele) ->
    removed = @_hash[ele]
    delete @_hash[ele]
    removed

  size: ->
    Object.keys(@_hash).length


  toArray: ->
    array = []

    @each (value) ->
      array.push(value)

    array


  toString: ->
    array = @toArray()

    if array.length > 0
      "[ #{@toArray().join(', ')} ]"
    else
      "[ ]"

module.exports = Set