describe 'Graph', ->
  describe '#addEdge', ->
    before ->
      @graph = new relation.Graph
      @graph
        .addNode('a')
        .addNode('b')

    it 'should have edge between a and b', ->
      @graph.addEdge('a', 'b')
      expect(@graph.hasEdge('a', 'b')).to.be.true

    it 'throw /cannot/', ->
      expect(=>
        @graph.addEdge('a', 'c')
      ).to.throw(/cannot/)

      expect(=>
        @graph.addEdge('c', 'a')
      ).to.throw(/cannot/)

    it 'returns this', ->
      expect(@graph.addEdge('a', 'b')).to.equal(@graph)


  describe '#hasEdge', ->
    before ->
      @graph = new relation.Graph
      @graph
        .addNode('a')
        .addNode('b')
        .addNode('c')
        .addEdge('a', 'b')
        .addEdge('a', 'c')

    it 'returns true', ->
      expect(@graph.hasEdge('a', 'b')).to.be.true
      expect(@graph.hasEdge('a', 'c')).to.be.true

    it 'returns false', ->
      expect(@graph.hasEdge('b', 'c')).to.be.false
      expect(@graph.hasEdge('b', 'a')).to.be.false


  describe '#hasNode', ->
    before ->
      @graph = new relation.Graph
      @graph
        .addNode('a')
        .addNode('b')

    it 'returns true', ->
      expect(@graph.hasNode('a')).to.be.true
      expect(@graph.hasNode('b')).to.be.true

    it 'returns false', ->
      expect(@graph.hasNode('c')).to.be.false
      expect(@graph.hasNode(null)).to.be.false


  describe '#getNeighbors', ->
    before ->
      @graph = new relation.Graph
      @graph
        .addNode('a')
        .addNode('b')
        .addNode('c')
        .addEdge('a', 'b')
        .addEdge('a', 'c')
        .addEdge('b', 'c')

    it 'return value instanceof OrderedSet', ->
      expect(@graph.getNeighbors('a')).to.be.instanceof(relation.OrderedSet)

    it 'return correct values', ->
      expect(@graph.getNeighbors('a').toArray()).to.deep.equal(['b', 'c'])
      expect(@graph.getNeighbors('b').toArray()).to.deep.equal(['c'])
      expect(@graph.getNeighbors('c').toArray()).to.deep.equal([])


  describe '#walk', ->
    before ->
      @graph = new relation.Graph
      @graph
        .addNode('a')
        .addNode('b')
        .addNode('c')
        .addNode('d')
        .addEdge('a', 'b').addEdge('b', 'a')
        .addEdge('a', 'c').addEdge('c', 'a')
        .addEdge('b', 'c').addEdge('c', 'b')
        .addEdge('b', 'd').addEdge('b', 'd')

    it 'should correct nodes exactly', ->
      preOrderNodes = []
      postOrderNodes = []

      @graph.walk 'a', 
        preOrder: (node) ->
          preOrderNodes.push(node)

        postOrder: (node) ->
          postOrderNodes.push(node)

      expect(preOrderNodes).to.deep.equal(['a', 'b', 'c', 'd'])
      expect(postOrderNodes).to.deep.equal(['c', 'd', 'b', 'a'])

  ['getBipartiteCliquesA', 'getBipartiteCliquesB'].forEach (fn) ->
    describe "##{fn}", ->
      beforeEach ->
        @nodesA = new relation.OrderedSet(['r1', 'r2', 'r3'])
        @nodesB = new relation.OrderedSet(['d1', 'd2', 'd3'])
        @nodes = @nodesA.union(@nodesB)
        @graph = new relation.Graph
        @graph
          .addNodeAll(@nodes)
          .addEdge('r1', 'd1', true)
          .addEdge('r1', 'd2', true)
          .addEdge('r1', 'd3', true)
          .addEdge('r2', 'd1', true)
          .addEdge('r2', 'd2', true)
          .addEdge('r2', 'd3', true)
          .addEdge('r3', 'd2', true)
          .addEdge('r3', 'd3', true)

        @cliques = @graph[fn](@nodesA)
        @expectCliques = 
          [
            { clique: new relation.Set(['d1', 'd2', 'd3']), foundNodes: new relation.Set(['r1', 'r2']) }
            { clique: new relation.Set(['d2', 'd3']), foundNodes: new relation.Set(['r1', 'r2', 'r3']) }
          ]

      it 'should have correct cliques', ->
        @expectCliques.forEach (expectClique, i) =>
          expect(@cliques[i].clique.equals(expectClique.clique)).to.be.true

      it 'should have correct foundNodes', ->
        @expectCliques.forEach (expectClique, i) =>
          expect(@cliques[i].foundNodes.equals(expectClique.foundNodes)).to.be.true

      it 'should have 2 cliques', ->
        expect(@cliques.length).to.equal(@expectCliques.length)

