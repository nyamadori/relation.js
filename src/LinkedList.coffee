class Cell
  constructor: (list, @data = null) ->
    @prev = null
    @next = null

    Object.defineProperty @, 'list',
      value: list


class LinkedList
  constructor: (array = []) ->
    Object.defineProperty @, 'head',
      value: @createCell(null)

    Object.defineProperty @, 'tail',
      value: @createCell(null)

    @head.next = @tail
    @tail.prev = @head
    @length = 0

    for ele in array
      @push(ele)


  createCell: (data) ->
    new Cell(@, data)


  each: (fn) ->
    cell = @head.next
    i = 0

    while cell != @tail
      fn(cell.data, i)
      i++
      cell = cell.next


  eachReverse: (fn) ->
    cell = @tail.prev
    i = @length

    while cell != @head
      i--
      fn(cell.data, i)
      cell = cell.prev


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