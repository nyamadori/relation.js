Set = require('./Set')
LinkedList = require('./LinkedList')

class OrderedSet extends Set
  constructor: (eles = []) ->
    @_cells = {}
    @_list = new LinkedList

    super


  add: (item) ->
    key = @_calcKey(item)
    return false if @_hash[key]

    @_hash[key] = item
    @_size++
    @_cells[key] = @_list.push(item)

    true


  eachWhile: (fn) ->
    @_list.eachWhile (item, i, cell) ->
      return fn(item, i, cell)


  remove: (ele) ->
    key = @_calcKey(ele)
    removeItem = @_hash[key]
    delete @_hash[key]
    @_size--

    @_list.remove(@_cells[key])
    delete @_cells[key]

    removeItem

module.exports = OrderedSet