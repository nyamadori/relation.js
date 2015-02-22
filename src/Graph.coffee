Module = require('./Module')
Set = require('./Set')
OrderedSet = require('./OrderedSet')

class Graph extends Module
  constructor: ->
    @_nodes = new OrderedSet
    @_adj = {}


  _addEdge: (a, b) ->
    unless @_nodes.contains(a) && @_nodes.contains(b)
      throw new Error("cannot connect edge #{a} to #{b}")

    @_adj[a].add(b)


  addEdge: (a, b, undirected = false) ->
    @_addEdge(a, b)
    @_addEdge(b, a) if undirected
    @
    

  addNode: (name) ->
    @_nodes.add(name)
    @_adj[name] = new OrderedSet
    @


  addNodeAll: (nodes) ->
    nodes.forEach (node) =>
      @addNode(node)
    @


  getBipartiteCliquesA: (targetNodes = @_nodes) ->
    cliques = {}
    foundNodes = {}
    nodes = targetNodes._list

    nodes.eachRange nodes.head, nodes.tail.prev, (a, i, cellA) =>
      nodes.eachRange cellA, nodes.tail, (b, j, cellB) =>
        clique = @_adj[a].intersect(@_adj[b])
        key = clique.toString()
        found = foundNodes[key] || new Set
        cliques[key] ?= clique
        found.addAll([a, b])
        foundNodes[key] ?= found
    
    result = []

    for key, clique of cliques
      result.push({ clique: clique, foundNodes: foundNodes[key] })

    result


  getBipartiteCliquesB: (targetNodes = @_nodes) ->
    cliques = {}
    foundNodes = {}

    targetNodes.each (r1, i) =>

      @_adj[r1].each (d1, m) =>
        @_adj[d1].each (r2, j) =>
          return unless i < j
          #console.log r1, d1, r2

          clique = new Set([d1])

          # explore circles
          @_adj[r2].each (d2, n) =>
            #return unless m < n

            if @_adj[d2].contains(r1)
              clique.add(d2)

          key = clique.toString()
          found = foundNodes[key] || new Set
          cliques[key] ?= clique
          found.addAll([r1, r2])
          foundNodes[key] ?= found

    result = []

    for key, clique of cliques
      result.push({ clique: clique, foundNodes: foundNodes[key] })

    result


  getNeighbors: (node) ->
    @_adj[node]


  hasEdge: (a, b) ->
    if @_adj[a] && @_adj[a].contains(b)
      true
    else
      false


  hasNode: (node) ->
    @_nodes.contains(node) != false


  _walk: (node, visited, callbacks) ->
    visited[node] = true
    neighbors = @_adj[node]
    {preOrder, postOrder} = callbacks
    
    if preOrder
      return unless preOrder(node) 
    
    neighbors.each (dest) =>
      unless visited[dest]
        @_walk(dest, visited, callbacks)

    if postOrder
      postOrder(node) 


  walk: (node, callbacks = {}) ->
    @_walk(node, [], callbacks)

module.exports = Graph