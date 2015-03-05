property = (args...) ->
  Object.defineProperty args...

class Graph
  constructor: ->
    property @, 'nodes', value: []
    property @, 'edges', value: []

    @_adj = {}
    @_nodeObjs = {}


  # @private
  _addEdge: (u, v, isUndirected, obj) ->
    @_adj[u][v] =
      source: u
      target: v
      obj: obj


  # @private
  # Searches the graph in depth-first.
  #
  # @params node [String] The node that begin to search.
  # @params visited [Object] An object that set visited nodes.
  # @option callbacks preorder [Function] A function that call in preorder.
  # @option callbacks postorder [Function] A function that call in postorder.
  _depthFirstSearch: (node, visited, callbacks) ->
    visited[node] = true
    neighbors = @_adj[node]
    {preorder, postorder} = callbacks
    
    preorder?(node) 
    
    for dest of neighbors
      unless visited[dest]
        @_depthFirstSearch(dest, visited, callbacks)

    postorder?(node) 


  # Adds an edge (u, v).
  #
  # @param u [String] Node u.
  # @param v [String] Node v.
  # @param obj [Object] An ancillary data for the edge (e.g. weight of edge).
  # @param options isUndirected [Boolean] True if the edge is undirected. False if the edge is directed.
  #
  # @returns [Boolean] True if can add. False if already the graph has edge (u, v).
  addEdge: (u, v, isUndirected = false, obj = null) ->
    return false unless @_adj[u] && @_adj[v]
    return false if @_adj[u][v]

    a = @_addEdge(u, v, isUndirected, obj)
    b = @_addEdge(v, u, isUndirected, obj) if isUndirected

    return true


  # Adds edges.
  #
  # @param args... [Array] Arrays of a argument of #addEdge.
  addEdges: (args...) ->
    for arg in args
      @addEdge.apply(@, arg)


  # Adds a node u.
  #
  # @param u [String] Node u.
  # @param obj [Object] An ancillary data for the node.
  #
  # @returns [Boolean] True if can add. False if already the graph has node u.
  addNode: (u, obj = null) ->
    return false if @_adj[u]

    @_nodeObjs[u] = obj if obj
    @_adj[u] = {}
    
    return true


  # Adds all nodes in nodeArray.
  #
  # @param nodeArray [Array<String>] An array that contains nodes.
  addNodes: (nodeArray...) ->
    for u in nodeArray
      @addNode(u)


  # searches the graph in breadth first.
  #
  # @params node [String] The node that begin to search.
  # @option callbacks visit [Function] A function that call on visited.
  breadthFirstSearch: (node, callbacks = {}) ->
    { visit } = callbacks
    visited = {}
    queue = []

    visited[node] = true
    queue.push(node)

    while queue.length > 0
      v = queue.shift()
      neighbors = @_adj[v]
      
      visit?(v)

      for dest of neighbors
        unless visited[dest]
          visited[dest] = true
          queue.push(dest)


  # Searches the graph in depth first.
  #
  # @params node [String] The node that begin to search.
  # @option callbacks preorder [Function] A function that call on preorder.
  # @option callbacks postorder [Function] A function that call on postorder.
  depthFirstSearch: (node, callbacks = {}) ->
    @_depthFirstSearch(node, [], callbacks)


  # Gets adjacent nodes for node u.
  #
  # @params u [String] node u.
  #
  # @returns [Object]
  #   The object that contains pairs of adjacent nodes and edges, if the graph has node u.
  #   Undefined if the graph has no node u.
  getAdjacentNodes: (u) ->
    @_adj[u]


  # Checks whether the graph has edge (u, v).
  #
  # @param u [String] Node u.
  # @param v [String] Node v.
  # 
  # @returns [Boolean] True if the graph has edge (u, v). False if the graph has no edge (u, v).
  hasEdge: (u, v) ->
    if @_adj[u]?[v]
      true
    else
      false


  # Checks whether the graph has node u.
  #
  # @param u [Boolean] Node u.
  #
  # @returns [Boolean] True if the graph has node u. False if the graph has no node u.
  hasNode: (u) ->
    @_adj[u] != undefined

module.exports = Graph