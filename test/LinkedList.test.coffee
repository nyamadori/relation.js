# check link connections whether correct
checkConnection = (list, array) ->
  expect(list.toArray()).to.deep.equal(array)
  expect(list.toArray(true)).to.deep.equal(array.concat().reverse())


describe 'LinkedList', ->
  describe '.constructor', ->
    it 'should set #_head and #_tail', ->
      list = new relation.LinkedList
      checkConnection(list, [])

    it 'should connect links correctly', ->
      array = ['a', 'b', 'c']
      list = new relation.LinkedList(array)
      checkConnection(list, array)

    it 'can pass LinkedList', ->
      orig = new relation.LinkedList([1, 2, 3])
      list = new relation.LinkedList(orig)
      checkConnection(list, [1, 2, 3])


  [ 'insertCellAfter', 'insertCellBefore' ].forEach (fn) ->
    describe "#{fn}", ->
      before ->
        @list = new relation.LinkedList
        @newCell = @list.createCell('newCell')
        @otherList = new relation.LinkedList
        @otherCell = @otherList.createCell('otherCell')
        
        if /After/.test(fn)
          @pivot = @list.head
        else
          @pivot = @list.tail


      it 'should connect links correctly', ->
        @list[fn](@pivot, @newCell)
        checkConnection(@list, [ 'newCell' ])

      it 'should to throw /already/', ->
        expect(
          => @list[fn](@list.head, @otherCell)
        ).to.throw(/already/)


      it 'should to throw /not exist/', ->
        expect(
          => @list[fn](@otherCell, @list.head)
        ).to.throw(/not exist/)


  describe '#insertAfter', ->
    it 'should set newData to newCell', ->
      list = new relation.LinkedList
      list.insertAfter(list.head, "newCell")

      expect(list.head.next.data).to.equal("newCell")


  describe '#insertBefore', ->
    it 'should set newData to newCell', ->
      list = new relation.LinkedList
      list.insertBefore(list.tail, "newCell")

      expect(list.head.next.data).to.equal("newCell")


  describe '#push', ->
    it 'should insert data to tail', ->
      list = new relation.LinkedList([ 'a', 'b', 'c' ])
      list.push('x')

      expect(list.tail.prev.data).to.equal("x")


  describe '#remove', ->
    beforeEach ->
      @list = new relation.LinkedList
      @removeData = @list.push('remove data')

    it 'should connect links correctly', ->
      @list.remove(@removeData)
      checkConnection(@list, [])


    it 'should throw /cannot/ try to remove @list.head', ->
      expect(
        => @list.remove(@list.head)
      ).to.throw(/cannot/)

    it 'should throw /cannot/ try to remove @list.tail', ->
      expect(
        => @list.remove(@list.tail)
      ).to.throw(/cannot/)


  describe '#toArray', ->
    beforeEach ->
      @array = [ 1, 2, 3 ]
      @list = new relation.LinkedList(@array)

    it 'should equal @array and @list deeply (reverse = false)', ->
      expect(@list.toArray()).to.deep.equal(@array)

    it 'should equal @array and @list deeply (reverse = true)', ->
      expect(@list.toArray(true)).to.deep.equal(@array.reverse())


  describe '#unshift', ->
    it 'should insert data to head', ->
      list = new relation.LinkedList([ 'a', 'b', 'c' ])
      list.unshift('x')

      expect(list.head.next.data).to.equal("x")