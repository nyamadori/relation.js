Module = require('./Module')
Enumerable = require('./Enumerable')
LinkedList = require('./LinkedList')

class Set extends Module
  @include Enumerable

  _calcKey: (item) ->
    switch Module.getPrimitiveType(item)
      when 'String', 'Number', 'Boolean', 'Null'
        item

      else
        if item instanceof Set
          item.toString()
        else
          item


  constructor: (eles = []) ->
    @_hash = {}
    @_size = 0

    Object.defineProperty @, 'size',
      get: -> @_size

    @addAll(eles)


  add: (item) ->
    key = @_calcKey(item)
    return false if @_hash[key]

    @_hash[key] = item
    @_size++

    true


  addAll: (items) ->
    items.forEach (item) =>
      @add(item)


  clone: ->
    set = new Set
    @each (item) ->
      set.add(item)

    return set


  contains: (item) -> @exist(item)


  each: (fn) ->
    @eachWhile (item, i) ->
      fn(item, i)
      true


  eachWhile: (fn) ->
    for key, item of @_hash
      return unless fn(item)


  equals: (other) ->
    for key, item of @_hash
      return false unless other.contains(item)

    true


  exist: (item) ->
    key = @_calcKey(item)
    @_hash[key] != undefined


  forEach: (fn) -> @each(fn)


  intersect: (other) ->
    set = new @constructor

    if @size <= other.size
      @each (value) ->
        set.add(value) if other.contains(value)
    else
      other.each (value) =>
        set.add(value) if @contains(value)

    set


  remove: (ele) ->
    key = @_calcKey(ele)
    removeItem = @_hash[key]
    delete @_hash[key]
    @_size--

    removeItem


  toArray: ->
    array = []

    @each (value) ->
      array.push(value)

    array


  toString: ->
    array = @toArray().sort()

    if array.length > 0
      "[ #{array.join(', ')} ]"
    else
      "[ ]"


  union: (other) ->
    set = new @constructor(@toArray())

    other.each (value) ->
      set.add(value)

    set


module.exports = Set