OrderedSet = require('./OrderedSet')

module.exports = class Graph
  constructor: ->
    Object.defineProperty @, '_nodes',
      value: new OrderedSet

    @_adj = {}


  _addEdge: (a, b) ->
    @_adj[a].add(b)


  addNode: (name, data = null) ->
    @_nodes[name] = data
    @_adj[name] = new OrderedSet


  addEdge: (a, b, isDirected = true) ->
    @_addEdge(a, b)
    
    unless isDirected
      @_addEdge(b, a)


  hasNode: (node) ->
    @_nodes.contains(node) != undefined

