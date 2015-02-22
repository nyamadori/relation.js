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
	  Graph: __webpack_require__(1),
	  Enumerable: __webpack_require__(2),
	  Set: __webpack_require__(3),
	  OrderedSet: __webpack_require__(4),
	  LinkedList: __webpack_require__(5)
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Graph, Module, OrderedSet, Set,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Module = __webpack_require__(6);
	
	Set = __webpack_require__(3);
	
	OrderedSet = __webpack_require__(4);
	
	Graph = (function(superClass) {
	  extend(Graph, superClass);
	
	  function Graph() {
	    this._nodes = new OrderedSet;
	    this._adj = {};
	  }
	
	  Graph.prototype._addEdge = function(a, b) {
	    if (!(this._nodes.contains(a) && this._nodes.contains(b))) {
	      throw new Error("cannot connect edge " + a + " to " + b);
	    }
	    return this._adj[a].add(b);
	  };
	
	  Graph.prototype.addEdge = function(a, b, undirected) {
	    if (undirected == null) {
	      undirected = false;
	    }
	    this._addEdge(a, b);
	    if (undirected) {
	      this._addEdge(b, a);
	    }
	    return this;
	  };
	
	  Graph.prototype.addNode = function(name) {
	    this._nodes.add(name);
	    this._adj[name] = new OrderedSet;
	    return this;
	  };
	
	  Graph.prototype.addNodeAll = function(nodes) {
	    nodes.forEach((function(_this) {
	      return function(node) {
	        return _this.addNode(node);
	      };
	    })(this));
	    return this;
	  };
	
	  Graph.prototype.getBipartiteCliquesA = function(targetNodes) {
	    var clique, cliques, foundNodes, key, nodes, result;
	    if (targetNodes == null) {
	      targetNodes = this._nodes;
	    }
	    cliques = {};
	    foundNodes = {};
	    nodes = targetNodes._list;
	    nodes.eachRange(nodes.head, nodes.tail.prev, (function(_this) {
	      return function(a, i, cellA) {
	        return nodes.eachRange(cellA, nodes.tail, function(b, j, cellB) {
	          var clique, found, key;
	          clique = _this._adj[a].intersect(_this._adj[b]);
	          key = clique.toString();
	          found = foundNodes[key] || new Set;
	          if (cliques[key] == null) {
	            cliques[key] = clique;
	          }
	          found.addAll([a, b]);
	          return foundNodes[key] != null ? foundNodes[key] : foundNodes[key] = found;
	        });
	      };
	    })(this));
	    result = [];
	    for (key in cliques) {
	      clique = cliques[key];
	      result.push({
	        clique: clique,
	        foundNodes: foundNodes[key]
	      });
	    }
	    return result;
	  };
	
	  Graph.prototype.getBipartiteCliquesB = function(targetNodes) {
	    var clique, cliques, foundNodes, key, result;
	    if (targetNodes == null) {
	      targetNodes = this._nodes;
	    }
	    cliques = {};
	    foundNodes = {};
	    targetNodes.each((function(_this) {
	      return function(r1, i) {
	        return _this._adj[r1].each(function(d1, m) {
	          return _this._adj[d1].each(function(r2, j) {
	            var clique, found, key;
	            if (!(i < j)) {
	              return;
	            }
	            clique = new Set([d1]);
	            _this._adj[r2].each(function(d2, n) {
	              if (_this._adj[d2].contains(r1)) {
	                return clique.add(d2);
	              }
	            });
	            key = clique.toString();
	            found = foundNodes[key] || new Set;
	            if (cliques[key] == null) {
	              cliques[key] = clique;
	            }
	            found.addAll([r1, r2]);
	            return foundNodes[key] != null ? foundNodes[key] : foundNodes[key] = found;
	          });
	        });
	      };
	    })(this));
	    result = [];
	    for (key in cliques) {
	      clique = cliques[key];
	      result.push({
	        clique: clique,
	        foundNodes: foundNodes[key]
	      });
	    }
	    return result;
	  };
	
	  Graph.prototype.getNeighbors = function(node) {
	    return this._adj[node];
	  };
	
	  Graph.prototype.hasEdge = function(a, b) {
	    if (this._adj[a] && this._adj[a].contains(b)) {
	      return true;
	    } else {
	      return false;
	    }
	  };
	
	  Graph.prototype.hasNode = function(node) {
	    return this._nodes.contains(node) !== false;
	  };
	
	  Graph.prototype._walk = function(node, visited, callbacks) {
	    var neighbors, postOrder, preOrder;
	    visited[node] = true;
	    neighbors = this._adj[node];
	    preOrder = callbacks.preOrder, postOrder = callbacks.postOrder;
	    if (preOrder) {
	      if (!preOrder(node)) {
	        return;
	      }
	    }
	    neighbors.each((function(_this) {
	      return function(dest) {
	        if (!visited[dest]) {
	          return _this._walk(dest, visited, callbacks);
	        }
	      };
	    })(this));
	    if (postOrder) {
	      return postOrder(node);
	    }
	  };
	
	  Graph.prototype.walk = function(node, callbacks) {
	    if (callbacks == null) {
	      callbacks = {};
	    }
	    return this._walk(node, [], callbacks);
	  };
	
	  return Graph;
	
	})(Module);
	
	module.exports = Graph;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Enumerable, Module;
	
	Module = __webpack_require__(6);
	
	Enumerable = {
	  all: function(fn) {
	    var result;
	    result = true;
	    this.eachWhile(function(item) {
	      if (!fn(item)) {
	        return result = false;
	      }
	    });
	    return result;
	  },
	  each: function(fn) {
	    return this.eachWhile(function(item) {
	      fn(item);
	      return true;
	    });
	  },
	  find: function(fn, ifnone) {
	    var foundItem;
	    foundItem = finone;
	    this.eachWhile(function(item) {
	      if (fn(item)) {
	        foundItem = item;
	        return false;
	      }
	      return true;
	    });
	    return foundItem;
	  },
	  findAll: function(fn) {
	    var foundItems;
	    foundItems = [];
	    this.each(function(item) {
	      if (fn(item)) {
	        return foundItems.push(item);
	      }
	    });
	    return foundItems;
	  }
	};
	
	module.exports = Enumerable;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Enumerable, LinkedList, Module, Set,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Module = __webpack_require__(6);
	
	Enumerable = __webpack_require__(2);
	
	LinkedList = __webpack_require__(5);
	
	Set = (function(superClass) {
	  extend(Set, superClass);
	
	  Set.include(Enumerable);
	
	  Set.prototype._calcKey = function(item) {
	    switch (Module.getPrimitiveType(item)) {
	      case 'String':
	      case 'Number':
	      case 'Boolean':
	      case 'Null':
	        return item;
	      default:
	        if (item instanceof Set) {
	          return item.toString();
	        } else {
	          return item;
	        }
	    }
	  };
	
	  function Set(eles) {
	    if (eles == null) {
	      eles = [];
	    }
	    this._hash = {};
	    this._size = 0;
	    Object.defineProperty(this, 'size', {
	      get: function() {
	        return this._size;
	      }
	    });
	    this.addAll(eles);
	  }
	
	  Set.prototype.add = function(item) {
	    var key;
	    key = this._calcKey(item);
	    if (this._hash[key]) {
	      return false;
	    }
	    this._hash[key] = item;
	    this._size++;
	    return true;
	  };
	
	  Set.prototype.addAll = function(items) {
	    return items.forEach((function(_this) {
	      return function(item) {
	        return _this.add(item);
	      };
	    })(this));
	  };
	
	  Set.prototype.clone = function() {
	    var set;
	    set = new Set;
	    this.each(function(item) {
	      return set.add(item);
	    });
	    return set;
	  };
	
	  Set.prototype.contains = function(item) {
	    return this.exist(item);
	  };
	
	  Set.prototype.each = function(fn) {
	    return this.eachWhile(function(item, i) {
	      fn(item, i);
	      return true;
	    });
	  };
	
	  Set.prototype.eachWhile = function(fn) {
	    var item, key, ref;
	    ref = this._hash;
	    for (key in ref) {
	      item = ref[key];
	      if (!fn(item)) {
	        return;
	      }
	    }
	  };
	
	  Set.prototype.equals = function(other) {
	    var item, key, ref;
	    ref = this._hash;
	    for (key in ref) {
	      item = ref[key];
	      if (!other.contains(item)) {
	        return false;
	      }
	    }
	    return true;
	  };
	
	  Set.prototype.exist = function(item) {
	    var key;
	    key = this._calcKey(item);
	    return this._hash[key] !== void 0;
	  };
	
	  Set.prototype.forEach = function(fn) {
	    return this.each(fn);
	  };
	
	  Set.prototype.intersect = function(other) {
	    var set;
	    set = new this.constructor;
	    if (this.size <= other.size) {
	      this.each(function(value) {
	        if (other.contains(value)) {
	          return set.add(value);
	        }
	      });
	    } else {
	      other.each((function(_this) {
	        return function(value) {
	          if (_this.contains(value)) {
	            return set.add(value);
	          }
	        };
	      })(this));
	    }
	    return set;
	  };
	
	  Set.prototype.remove = function(ele) {
	    var key, removeItem;
	    key = this._calcKey(ele);
	    removeItem = this._hash[key];
	    delete this._hash[key];
	    this._size--;
	    return removeItem;
	  };
	
	  Set.prototype.toArray = function() {
	    var array;
	    array = [];
	    this.each(function(value) {
	      return array.push(value);
	    });
	    return array;
	  };
	
	  Set.prototype.toString = function() {
	    var array;
	    array = this.toArray().sort();
	    if (array.length > 0) {
	      return "[ " + (array.join(', ')) + " ]";
	    } else {
	      return "[ ]";
	    }
	  };
	
	  Set.prototype.union = function(other) {
	    var set;
	    set = new this.constructor(this.toArray());
	    other.each(function(value) {
	      return set.add(value);
	    });
	    return set;
	  };
	
	  return Set;
	
	})(Module);
	
	module.exports = Set;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var LinkedList, OrderedSet, Set,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Set = __webpack_require__(3);
	
	LinkedList = __webpack_require__(5);
	
	OrderedSet = (function(superClass) {
	  extend(OrderedSet, superClass);
	
	  function OrderedSet(eles) {
	    if (eles == null) {
	      eles = [];
	    }
	    this._cells = {};
	    this._list = new LinkedList;
	    OrderedSet.__super__.constructor.apply(this, arguments);
	  }
	
	  OrderedSet.prototype.add = function(item) {
	    var key;
	    key = this._calcKey(item);
	    if (this._hash[key]) {
	      return false;
	    }
	    this._hash[key] = item;
	    this._size++;
	    this._cells[key] = this._list.push(item);
	    return true;
	  };
	
	  OrderedSet.prototype.eachWhile = function(fn) {
	    return this._list.eachWhile(function(item, i, cell) {
	      return fn(item, i, cell);
	    });
	  };
	
	  OrderedSet.prototype.remove = function(ele) {
	    var key, removeItem;
	    key = this._calcKey(ele);
	    removeItem = this._hash[key];
	    delete this._hash[key];
	    this._size--;
	    this._list.remove(this._cells[key]);
	    delete this._cells[key];
	    return removeItem;
	  };
	
	  return OrderedSet;
	
	})(Set);
	
	module.exports = OrderedSet;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Cell, Enumerable, LinkedList, Module,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Module = __webpack_require__(6);
	
	Enumerable = __webpack_require__(2);
	
	Cell = (function(superClass) {
	  extend(Cell, superClass);
	
	  function Cell(list, data1) {
	    this.data = data1 != null ? data1 : null;
	    this.prev = null;
	    this.next = null;
	    Object.defineProperty(this, 'list', {
	      value: list
	    });
	  }
	
	  return Cell;
	
	})(Module);
	
	LinkedList = (function(superClass) {
	  extend(LinkedList, superClass);
	
	  LinkedList.include(Enumerable);
	
	  LinkedList.alias('forEach', 'each');
	
	  function LinkedList(array) {
	    if (array == null) {
	      array = [];
	    }
	    Object.defineProperty(this, 'head', {
	      value: this.createCell(null)
	    });
	    Object.defineProperty(this, 'tail', {
	      value: this.createCell(null)
	    });
	    this.head.next = this.tail;
	    this.tail.prev = this.head;
	    this.length = 0;
	    array.forEach((function(_this) {
	      return function(ele) {
	        return _this.push(ele);
	      };
	    })(this));
	  }
	
	  LinkedList.prototype.clone = function() {
	    return new this.constructor(this);
	  };
	
	  LinkedList.prototype.createCell = function(data) {
	    return new Cell(this, data);
	  };
	
	  LinkedList.prototype.each = function(fn) {
	    return this.eachRange(this.head, this.tail, fn);
	  };
	
	  LinkedList.prototype.eachRange = function(startCell, endCell, fn) {
	    return this.eachWhile(function(item, i, cell) {
	      fn(item, i, cell);
	      return true;
	    }, startCell, endCell);
	  };
	
	  LinkedList.prototype.eachWhile = function(fn, startCell, endCell) {
	    var cell, i;
	    if (startCell == null) {
	      startCell = this.head;
	    }
	    if (endCell == null) {
	      endCell = this.tail;
	    }
	    cell = startCell.next;
	    i = 0;
	    while (cell !== endCell) {
	      if (!fn(cell.data, i, cell)) {
	        return;
	      }
	      cell = cell.next;
	      i++;
	    }
	  };
	
	  LinkedList.prototype.eachReverse = function(fn) {
	    var cell, results;
	    cell = this.tail.prev;
	    results = [];
	    while (cell !== this.head) {
	      fn(cell.data, cell);
	      results.push(cell = cell.prev);
	    }
	    return results;
	  };
	
	  LinkedList.prototype.forEach = function(fn) {
	    return this.each(fn);
	  };
	
	  LinkedList.prototype.insertAfter = function(cell, newData) {
	    return this.insertCellAfter(cell, this.createCell(newData));
	  };
	
	  LinkedList.prototype.insertBefore = function(cell, newData) {
	    return this.insertCellBefore(cell, this.createCell(newData));
	  };
	
	  LinkedList.prototype.insertCellAfter = function(cell, newCell) {
	    var origNext;
	    if (cell.list !== this) {
	      throw new Error(cell + " not exist in this list.");
	    }
	    if (newCell.list !== this && newCell.list) {
	      throw new Error(newCell + " already exist in other lists.");
	    }
	    origNext = cell.next;
	    origNext.prev = newCell;
	    cell.next = newCell;
	    newCell.next = origNext;
	    newCell.prev = cell;
	    return this.length++;
	  };
	
	  LinkedList.prototype.insertCellBefore = function(cell, newCell) {
	    var origPrev;
	    if (cell.list !== this) {
	      throw new Error(cell + " not exist in this list.");
	    }
	    if (newCell.list !== this && newCell.list) {
	      throw new Error(newCell + " already exist in other lists.");
	    }
	    origPrev = cell.prev;
	    origPrev.next = newCell;
	    cell.prev = newCell;
	    newCell.prev = origPrev;
	    newCell.next = cell;
	    return this.length++;
	  };
	
	  LinkedList.prototype.push = function(newData) {
	    var newCell;
	    newCell = this.createCell(newData);
	    this.insertCellBefore(this.tail, newCell);
	    return newCell;
	  };
	
	  LinkedList.prototype.unshift = function(newData) {
	    var newCell;
	    newCell = this.createCell(newData);
	    this.insertCellAfter(this.head, newCell);
	    return newCell;
	  };
	
	  LinkedList.prototype.remove = function(cell) {
	    if (cell === this.head || cell === this.tail) {
	      throw new Error('cannot remove a head or tail');
	    }
	    cell.prev.next = cell.next;
	    cell.next.prev = cell.prev;
	    return cell.prev = cell.next = cell.list = null;
	  };
	
	  LinkedList.prototype.toArray = function(reverse) {
	    var array;
	    if (reverse == null) {
	      reverse = false;
	    }
	    array = [];
	    if (!reverse) {
	      this.each(function(data) {
	        return array.push(data);
	      });
	    } else {
	      this.eachReverse(function(data) {
	        return array.push(data);
	      });
	    }
	    return array;
	  };
	
	  return LinkedList;
	
	})(Module);
	
	module.exports = LinkedList;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Module, moduleKeywords,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
	
	moduleKeywords = ['extended', 'included'];
	
	Module = (function() {
	  function Module() {}
	
	  Module.getPrimitiveType = function(obj) {
	    return Object.prototype.toString.call(obj).slice(8, -1);
	  };
	
	  Module.extend = function(obj) {
	    var key, ref, value;
	    for (key in obj) {
	      value = obj[key];
	      if (indexOf.call(moduleKeywords, key) < 0) {
	        this[key] = value;
	      }
	    }
	    if ((ref = obj.extended) != null) {
	      ref.apply(this);
	    }
	    return this;
	  };
	
	  Module.include = function(obj) {
	    var key, ref, value;
	    for (key in obj) {
	      value = obj[key];
	      if (indexOf.call(moduleKeywords, key) < 0) {
	        this.prototype[key] = value;
	      }
	    }
	    if ((ref = obj.included) != null) {
	      ref.apply(this);
	    }
	    return this;
	  };
	
	  Module.alias = function(newName, original) {
	    return this.prototype[newName] = this.prototype[original];
	  };
	
	  return Module;
	
	})();
	
	module.exports = Module;


/***/ }
/******/ ])
});

//# sourceMappingURL=relation.js.map