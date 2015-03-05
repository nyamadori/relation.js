relation.js
===========

[![Circle CI](https://circleci.com/gh/nyamadori/relation.js.svg?style=svg)](https://circleci.com/gh/nyamadori/relation.js)

A JavaScript library for mathematical graphs.


Usage
-----

```coffee
{Graph} = require('relation.js')

# This example graph is:
#   http://ja.wikipedia.org/wiki/%E5%B9%85%E5%84%AA%E5%85%88%E6%8E%A2%E7%B4%A2#mediaviewer/File:Breadth-first-tree.png

graph = new relation.Graph
graph.addNodes('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')
graph.addEdges(
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

visitedNodes = []

graph.breadthFirstSearch '1',
  visit: (v) ->
    visitedNodes.push(v)

visitedNodes # => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
```

Plan to implement
-----------------

* Dijkstra's algorithm
* Enumerating cliques (http://research.nii.ac.jp/~uno/papers/0304comp.pdf)
