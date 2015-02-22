['Set', 'OrderedSet'].forEach (klass) ->
  Set = relation[klass]

  describe klass, ->
    describe '#_calcKey', ->
      before ->
        @set = new Set

      it 'returns "a"', ->
        expect(@set._calcKey('a')).to.equal('a')

      it 'returns 10', ->
        expect(@set._calcKey(10)).to.equal(10)

      it 'returns false', ->
        expect(@set._calcKey(false)).to.equal(false)

      it 'returns set.toString()', ->
        calcSet = new Set([1, 2, 3])
        expect(@set._calcKey(calcSet)).to.equal(calcSet.toString())

      it 'returns null', ->
        expect(@set._calcKey(null)).to.equal(null)


    describe '#constructor(array)', ->
      before ->
        @set = new Set(['a', 'b', 'c'])

      it 'should contains "a"', ->
        expect(@set.contains('a')).to.be.true

      it 'should contains "d"', ->
        expect(@set.contains('d')).to.be.false


    describe '#constructor(set)', ->
      it 'should contain ["a", "b", "c"]', ->
        array = ['a', 'b', 'c']
        set = new Set(new Set(array))
        expect(set.toArray()).to.deep.equal(array)
      

    describe '#add', ->
      before ->
        @set = new Set(['a', 'b', 'c'])

      it 'cannot add same data', ->
        @set.add('a')
        expect(@set.toArray()).to.deep.equal(['a', 'b', 'c'])
        expect(@set.size).to.equal(3)


    describe '#clone', ->
      it 'returns same set', ->
        origSet = new Set(['a', 'b', 'c'])
        cloneSet = origSet.clone()
        expect(cloneSet.toArray()).to.deep.equals(origSet.toArray())
        expect(cloneSet).to.not.equal(origSet)


    describe '#equals', ->
      before -> 
        @set = new Set(['a', 'b', 'c'])

      it 'returns true', ->
        result = @set.equals(new Set(['a', 'b', 'c']))
        expect(result).to.be.true

      it 'returns true', ->
        result = @set.equals(new Set(['a', 'b']))
        expect(result).to.be.false


    describe '#exist', ->
      before ->
        @set = new Set(['a', 'b', 'c'])

      it 'returns true', ->
        expect(@set.exist('a')).to.be.true

      it 'returns false', ->
        expect(@set.exist(null)).to.be.false


    describe '#intersect', -> 
      before ->
        @set = new Set(['a', 'b', 'c'])

      it 'returns [ "b" ]', ->
        result = @set.intersect(new Set(['b', 'e']))
        expect(result.toArray()).to.deep.equal(['b'])

      it 'returns [ ]', ->
        result = @set.intersect(new Set)
        expect(result.toArray()).to.deep.equal([])

      it 'returns [ "b", "c" ]', ->
        result = @set.intersect(new Set(['x', 'y', 'b', 'c']))
        expect(result.toArray()).to.deep.equal(['b', 'c'])


    describe '#remove', ->
      beforeEach ->
        @set = new Set(['a', 'b', 'c'])

      it 'should contains "a" and "b" after remove "c"', ->
        @set = new Set(['a', 'b', 'c'])
        @set.remove('c')
        expect(@set.toArray()).to.deep.equal(['a', 'b'])
        expect(@set.size).to.equal(2)

      it 'returns a removed element', ->
        expect(@set.remove('c')).to.equal('c')


    describe '#size', ->
      it 'returns 3', ->
        set = new Set(['a', 'b', 'c'])
        expect(set.size).to.equal(3)

      it 'returns 0', ->
        set = new Set
        expect(set.size).to.equal(0)
    

    describe '#union', ->
      before ->
        @set = new Set(['a', 'b', 'c'])

      it 'returns [ "a", "b", "c", "e" ]', ->
        result = @set.union(new Set(['c', 'e']))
        expect(result.toArray()).to.deep.equal(['a', 'b', 'c', 'e'])
    
      it 'returns [ "a", "b", "c", "e" ]', ->
        result = @set.union(new Set(['a', 'b']))
        expect(result.toArray()).to.deep.equal(['a', 'b', 'c'])
    

    describe '#toString', ->
      it 'returns "[ a, b, c ]"', ->
        set = new Set(['a', 'b', 'c'])
        expect(set.toString()).to.equal("[ a, b, c ]")

      it 'returns "[ ]"', ->
        set = new Set
        expect(set.toString()).to.equal("[ ]")


describe 'OrderedSet', ->
  describe '.constructor', ->
    it 'should arrange by insertion order', ->
      set = new relation.OrderedSet([3, 2, 1])

      expect(set.toArray()).to.deep.equal([3, 2, 1])


describe 'Set', ->
  describe '.constructor', ->
    it 'should contain [ 1, 2, 3 ]', ->
      set = new relation.OrderedSet([3, 2, 1])

      expect(set.toArray().sort()).to.deep.equal([1, 2, 3])
  