describe 'Graph', ->
  describe '#addEdge', ->
    beforeEach ->
      @graph = new relation.Graph
      @graph.addNodes(1, 2, 3, 4)

    it 'should have edge between a and b', ->
      @graph.addEdge(1, 2)
      expect(@graph.hasEdge(1, 2)).to.be.true

    it 'should have undirected edge (1, 2)', ->
      @graph.addEdge(1, 2, true)
      expect(@graph.hasEdge(1, 2)).to.be.true
      expect(@graph.hasEdge(2, 1)).to.be.true

    it 'returns false', ->
      @graph.addEdge(1, 2)
      expect(@graph.addEdge(1, 0)).to.be.false
      expect(@graph.addEdge(0, 1)).to.be.false
      expect(@graph.addEdge(0, 0)).to.be.false
      expect(@graph.addEdge(1, 2)).to.be.false

    it 'returns true', ->
      expect(@graph.addEdge(1, 2)).to.be.true
      expect(@graph.addEdge(2, 1)).to.be.true


  describe '#addEdges', ->
    beforeEach ->
      @graph = new relation.Graph
      @graph.addNodes(1, 2, 3, 4, 5)
      @graph.addEdges(
        [1, 2]
        [1, 3]
      )

    it 'should have edge (1, 2) and (1, 3)', ->
      expect(@graph.hasEdge(1, 2)).to.be.true
      expect(@graph.hasEdge(1, 3)).to.be.true

    it 'should have no edge (2, 1) and (3, 1)', ->
      expect(@graph.hasEdge(2, 1)).to.be.false
      expect(@graph.hasEdge(3, 1)).to.be.false


  describe '#addNode', ->
    beforeEach ->
      @graph = new relation.Graph
      @graph.addNodes(1, 2)

    it 'returns false', ->
      expect(@graph.addNode(1)).to.be.false

    it 'returns true', ->
      expect(@graph.addNode(3)).to.be.true

    it 'should have an object for a node', ->
      @graph.addNode(3, { name: 'Tokyo' })
      expect(@graph._nodeObjs[3]).to.deep.equal({ name: 'Tokyo' })


  describe '#breadthFirstSearch', ->
    before ->
      @graph = new relation.Graph
      @graph.addNodes('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')
      @graph.addEdges(
        ['1', '2']
        ['1', '3']
        ['1', '4']
        ['2', '5']
        ['2', '6']
        ['4', '7']
        ['4', '8']
        ['5', '9']
        ['5', '10']
        ['7', '11']
        ['7', '12']
      )

    it 'should correct nodes exactly', ->
      visitedNodes = []

      @graph.breadthFirstSearch '1',
        visit: (v) ->
          visitedNodes.push(v)

      expect(visitedNodes).to.deep.equal(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])


  describe '#depthFirstSearch', ->
    before ->
      @graph = new relation.Graph
      @graph.addNodes('a', 'b', 'c', 'd')
      @graph.addEdges(
        ['a', 'b']
        ['a', 'c']
        ['b', 'c']
        ['b', 'd']
      )

    it 'should correct nodes exactly', ->
      preOrderNodes = []
      postOrderNodes = []

      @graph.depthFirstSearch 'a', 
        preorder: (node) ->
          preOrderNodes.push(node)

        postorder: (node) ->
          postOrderNodes.push(node)

      expect(preOrderNodes).to.deep.equal(['a', 'b', 'c', 'd'])
      expect(postOrderNodes).to.deep.equal(['c', 'd', 'b', 'a'])


  describe '#hasEdge', ->
    before ->
      @graph = new relation.Graph
      @graph.addNodes('a', 'b', 'c')
      @graph.addEdge('a', 'b')
      @graph.addEdge('a', 'c')

    it 'returns true', ->
      expect(@graph.hasEdge('a', 'b')).to.be.true
      expect(@graph.hasEdge('a', 'c')).to.be.true

    it 'returns false', ->
      expect(@graph.hasEdge('b', 'c')).to.be.false
      expect(@graph.hasEdge('b', 'a')).to.be.false


  describe '#hasNode', ->
    before ->
      @graph = new relation.Graph
      @graph.addNodes('a', 'b')

    it 'returns true', ->
      expect(@graph.hasNode('a')).to.be.true
      expect(@graph.hasNode('b')).to.be.true

    it 'returns false', ->
      expect(@graph.hasNode('c')).to.be.false
      expect(@graph.hasNode(null)).to.be.false


  describe '#getAdjacentNodes', ->
    before ->
      @graph = new relation.Graph
      @graph.addNodes('a', 'b', 'c')
      @graph.addEdges(
        ['a', 'b']
        ['a', 'c']
        ['b', 'c']
      )

    it 'return correct values', ->
      expect(@graph.getAdjacentNodes('a')).to.deep.equal
        b: { source: 'a', target: 'b', obj: null }
        c: { source: 'a', target: 'c', obj: null }

      expect(@graph.getAdjacentNodes('b')).to.deep.equal
        c: { source: 'b', target: 'c', obj: null }

      expect(@graph.getAdjacentNodes('c')).to.deep.equal({})

    it 'returns undefined', ->
      expect(@graph.getAdjacentNodes('d')).to.be.undefined




