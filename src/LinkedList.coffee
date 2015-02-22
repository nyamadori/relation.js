Module = require('./Module')
Enumerable = require('./Enumerable')

class Cell extends Module
  constructor: (list, @data = null) ->
    @prev = null
    @next = null

    Object.defineProperty @, 'list',
      value: list


class LinkedList extends Module
  @include Enumerable
  @alias 'forEach', 'each'

  constructor: (array = []) ->
    Object.defineProperty @, 'head',
      value: @createCell(null)

    Object.defineProperty @, 'tail',
      value: @createCell(null)

    @head.next = @tail
    @tail.prev = @head
    @length = 0

    array.forEach (ele) =>
      @push(ele)


  clone: ->
    new @constructor(@)


  createCell: (data) ->
    new Cell(@, data)


  each: (fn) ->
    @eachRange(@head, @tail, fn)


  eachRange: (startCell, endCell, fn) ->
    @eachWhile (item, i, cell) ->
      fn(item, i, cell)
      true
    , startCell, endCell


  eachWhile: (fn, startCell = @head, endCell = @tail) ->
    cell = startCell.next
    i = 0

    while cell != endCell
      return unless fn(cell.data, i, cell)
      cell = cell.next
      i++


  eachReverse: (fn) ->
    cell = @tail.prev

    while cell != @head
      fn(cell.data, cell)
      cell = cell.prev


  forEach: (fn) ->
    @each(fn)


  insertAfter: (cell, newData) ->
    @insertCellAfter(cell, @createCell(newData))


  insertBefore: (cell, newData) ->
    @insertCellBefore(cell, @createCell(newData))


  insertCellAfter: (cell, newCell) ->
    if cell.list != @
      throw new Error("#{cell} not exist in this list.")

    if newCell.list != @ && newCell.list
      throw new Error("#{newCell} already exist in other lists.")

    origNext = cell.next
    origNext.prev = newCell
    cell.next = newCell
    newCell.next = origNext
    newCell.prev = cell
    @length++;


  insertCellBefore: (cell, newCell) ->
    if cell.list != @
      throw new Error("#{cell} not exist in this list.")
      
    if newCell.list != @ && newCell.list
      throw new Error("#{newCell} already exist in other lists.")

    origPrev = cell.prev
    origPrev.next = newCell
    cell.prev = newCell
    newCell.prev = origPrev
    newCell.next = cell
    @length++;


  push: (newData) ->
    newCell = @createCell(newData)
    @insertCellBefore(@tail, newCell)
    newCell


  unshift: (newData) ->
    newCell = @createCell(newData)
    @insertCellAfter(@head, newCell)
    newCell


  remove: (cell) ->
    if cell == @head || cell == @tail
      throw new Error('cannot remove a head or tail')

    cell.prev.next = cell.next
    cell.next.prev = cell.prev
    cell.prev = cell.next = cell.list = null


  toArray: (reverse = false) ->
    array = []

    unless reverse
      @each (data) ->
        array.push(data)
    else
      @eachReverse (data) ->
        array.push(data)

    array


module.exports = LinkedList