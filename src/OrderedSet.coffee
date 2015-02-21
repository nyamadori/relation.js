Set = require('./Set')
LinkedList = require('./LinkedList')

class OrderedSet extends Set
  constructor: (eles...) ->
    @_list = new LinkedList
    super


  add: (ele) ->
    @_hash[ele] = @_list.push(ele)


  _each: (fn) ->
    i = 0

    @_list.each (data) ->
      fn(data, i)
      i++


  remove: (ele) ->
    removeCell = super
    @_list.remove(removeCell)
    removeCell.data


module.exports = OrderedSet