(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["relation"] = factory();
	else
		root["relation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  Graph: __webpack_require__(1)
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Graph, property,
	  slice = [].slice;
	
	property = function() {
	  var args;
	  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  return Object.defineProperty.apply(Object, args);
	};
	
	Graph = (function() {
	  function Graph() {
	    property(this, 'nodes', {
	      value: []
	    });
	    property(this, 'edges', {
	      value: []
	    });
	    this._adj = {};
	    this._nodeObjs = {};
	  }
	
	  Graph.prototype._addEdge = function(u, v, isUndirected, obj) {
	    return this._adj[u][v] = {
	      source: u,
	      target: v,
	      obj: obj
	    };
	  };
	
	  Graph.prototype._depthFirstSearch = function(node, visited, callbacks) {
	    var dest, neighbors, postorder, preorder;
	    visited[node] = true;
	    neighbors = this._adj[node];
	    preorder = callbacks.preorder, postorder = callbacks.postorder;
	    if (typeof preorder === "function") {
	      preorder(node);
	    }
	    for (dest in neighbors) {
	      if (!visited[dest]) {
	        this._depthFirstSearch(dest, visited, callbacks);
	      }
	    }
	    return typeof postorder === "function" ? postorder(node) : void 0;
	  };
	
	  Graph.prototype.addEdge = function(u, v, isUndirected, obj) {
	    var a, b;
	    if (isUndirected == null) {
	      isUndirected = false;
	    }
	    if (obj == null) {
	      obj = null;
	    }
	    if (!(this._adj[u] && this._adj[v])) {
	      return false;
	    }
	    if (this._adj[u][v]) {
	      return false;
	    }
	    a = this._addEdge(u, v, isUndirected, obj);
	    if (isUndirected) {
	      b = this._addEdge(v, u, isUndirected, obj);
	    }
	    return true;
	  };
	
	  Graph.prototype.addEdges = function() {
	    var arg, args, i, len, results;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    results = [];
	    for (i = 0, len = args.length; i < len; i++) {
	      arg = args[i];
	      results.push(this.addEdge.apply(this, arg));
	    }
	    return results;
	  };
	
	  Graph.prototype.addNode = function(u, obj) {
	    if (obj == null) {
	      obj = null;
	    }
	    if (this._adj[u]) {
	      return false;
	    }
	    if (obj) {
	      this._nodeObjs[u] = obj;
	    }
	    this._adj[u] = {};
	    return true;
	  };
	
	  Graph.prototype.addNodes = function() {
	    var i, len, nodeArray, results, u;
	    nodeArray = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    results = [];
	    for (i = 0, len = nodeArray.length; i < len; i++) {
	      u = nodeArray[i];
	      results.push(this.addNode(u));
	    }
	    return results;
	  };
	
	  Graph.prototype.breadthFirstSearch = function(node, callbacks) {
	    var dest, neighbors, queue, results, v, visit, visited;
	    if (callbacks == null) {
	      callbacks = {};
	    }
	    visit = callbacks.visit;
	    visited = {};
	    queue = [];
	    visited[node] = true;
	    queue.push(node);
	    results = [];
	    while (queue.length > 0) {
	      v = queue.shift();
	      neighbors = this._adj[v];
	      if (typeof visit === "function") {
	        visit(v);
	      }
	      results.push((function() {
	        var results1;
	        results1 = [];
	        for (dest in neighbors) {
	          if (!visited[dest]) {
	            visited[dest] = true;
	            results1.push(queue.push(dest));
	          } else {
	            results1.push(void 0);
	          }
	        }
	        return results1;
	      })());
	    }
	    return results;
	  };
	
	  Graph.prototype.depthFirstSearch = function(node, callbacks) {
	    if (callbacks == null) {
	      callbacks = {};
	    }
	    return this._depthFirstSearch(node, [], callbacks);
	  };
	
	  Graph.prototype.getAdjacentNodes = function(u) {
	    return this._adj[u];
	  };
	
	  Graph.prototype.hasEdge = function(u, v) {
	    var ref;
	    if ((ref = this._adj[u]) != null ? ref[v] : void 0) {
	      return true;
	    } else {
	      return false;
	    }
	  };
	
	  Graph.prototype.hasNode = function(u) {
	    return this._adj[u] !== void 0;
	  };
	
	  return Graph;
	
	})();
	
	module.exports = Graph;


/***/ }
/******/ ])
});

//# sourceMappingURL=relation.js.map