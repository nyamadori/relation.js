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

	Function.prototype.property = function(prop, desc) {
	  return Object.defineProperty(this.prototype, prop, desc);
	};
	
	module.exports = {
	  Graph: __webpack_require__(1),
	  Set: __webpack_require__(2),
	  OrderedSet: __webpack_require__(5),
	  LinkedList: __webpack_require__(3)
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Graph, OrderedSet;
	
	OrderedSet = __webpack_require__(5);
	
	module.exports = Graph = (function() {
	  function Graph() {
	    Object.defineProperty(this, '_nodes', {
	      value: new OrderedSet
	    });
	    this._adj = {};
	  }
	
	  Graph.prototype._addEdge = function(a, b) {
	    return this._adj[a].add(b);
	  };
	
	  Graph.prototype.addNode = function(name, data) {
	    if (data == null) {
	      data = null;
	    }
	    this._nodes[name] = data;
	    return this._adj[name] = new OrderedSet;
	  };
	
	  Graph.prototype.addEdge = function(a, b, isDirected) {
	    if (isDirected == null) {
	      isDirected = true;
	    }
	    this._addEdge(a, b);
	    if (!isDirected) {
	      return this._addEdge(b, a);
	    }
	  };
	
	  Graph.prototype.hasNode = function(node) {
	    return this._nodes.contains(node) !== void 0;
	  };
	
	  return Graph;
	
	})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Set,
	  slice = [].slice;
	
	Set = (function() {
	  function Set() {
	    var eles;
	    eles = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    this._hash = {};
	    this.addAll.apply(this, eles);
	  }
	
	  Set.prototype._each = function(fn) {
	    var i, key, ref, value;
	    i = 0;
	    ref = this._hash;
	    for (key in ref) {
	      value = ref[key];
	      if (!fn(value, i)) {
	        return;
	      }
	      i++;
	    }
	  };
	
	  Set.prototype.add = function(ele) {
	    return this._hash[ele] = ele;
	  };
	
	  Set.prototype.addAll = function() {
	    var e, eles, j, len, results;
	    eles = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    results = [];
	    for (j = 0, len = eles.length; j < len; j++) {
	      e = eles[j];
	      results.push(this.add(e));
	    }
	    return results;
	  };
	
	  Set.prototype.contains = function(ele) {
	    return this._hash[ele] !== void 0;
	  };
	
	  Set.prototype.each = function(fn) {
	    return this._each(function(value, i) {
	      fn(value, i);
	      return true;
	    });
	  };
	
	  Set.prototype.equals = function(other) {
	    var result;
	    result = true;
	    this._each(function(value) {
	      if (!other.contains(value)) {
	        return result = false;
	      }
	      return true;
	    });
	    return result;
	  };
	
	  Set.prototype.intersect = function(other) {
	    var set;
	    set = new Set;
	    this.each(function(value) {
	      if (other.contains(value)) {
	        return set.add(value);
	      }
	    });
	    return set;
	  };
	
	  Set.prototype.union = function(other) {
	    var set;
	    set = (function(func, args, ctor) {
	      ctor.prototype = func.prototype;
	      var child = new ctor, result = func.apply(child, args);
	      return Object(result) === result ? result : child;
	    })(Set, this.toArray(), function(){});
	    other.each(function(value) {
	      return set.add(value);
	    });
	    return set;
	  };
	
	  Set.prototype.remove = function(ele) {
	    var removed;
	    removed = this._hash[ele];
	    delete this._hash[ele];
	    return removed;
	  };
	
	  Set.prototype.size = function() {
	    return Object.keys(this._hash).length;
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
	    array = this.toArray();
	    if (array.length > 0) {
	      return "[ " + (this.toArray().join(', ')) + " ]";
	    } else {
	      return "[ ]";
	    }
	  };
	
	  return Set;
	
	})();
	
	module.exports = Set;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Cell, LinkedList;
	
	Cell = (function() {
	  function Cell(list, data1) {
	    this.data = data1 != null ? data1 : null;
	    this.prev = null;
	    this.next = null;
	    Object.defineProperty(this, 'list', {
	      value: list
	    });
	  }
	
	  return Cell;
	
	})();
	
	LinkedList = (function() {
	  function LinkedList(array) {
	    var ele, j, len;
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
	    for (j = 0, len = array.length; j < len; j++) {
	      ele = array[j];
	      this.push(ele);
	    }
	  }
	
	  LinkedList.prototype.createCell = function(data) {
	    return new Cell(this, data);
	  };
	
	  LinkedList.prototype.each = function(fn) {
	    var cell, i, results;
	    cell = this.head.next;
	    i = 0;
	    results = [];
	    while (cell !== this.tail) {
	      fn(cell.data, i);
	      i++;
	      results.push(cell = cell.next);
	    }
	    return results;
	  };
	
	  LinkedList.prototype.eachReverse = function(fn) {
	    var cell, i, results;
	    cell = this.tail.prev;
	    i = this.length;
	    results = [];
	    while (cell !== this.head) {
	      i--;
	      fn(cell.data, i);
	      results.push(cell = cell.prev);
	    }
	    return results;
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
	
	})();
	
	module.exports = LinkedList;


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var LinkedList, OrderedSet, Set,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice;
	
	Set = __webpack_require__(2);
	
	LinkedList = __webpack_require__(3);
	
	OrderedSet = (function(superClass) {
	  extend(OrderedSet, superClass);
	
	  function OrderedSet() {
	    var eles;
	    eles = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    this._list = new LinkedList;
	    OrderedSet.__super__.constructor.apply(this, arguments);
	  }
	
	  OrderedSet.prototype.add = function(ele) {
	    return this._hash[ele] = this._list.push(ele);
	  };
	
	  OrderedSet.prototype._each = function(fn) {
	    var i;
	    i = 0;
	    return this._list.each(function(data) {
	      fn(data, i);
	      return i++;
	    });
	  };
	
	  OrderedSet.prototype.remove = function(ele) {
	    var removeCell;
	    removeCell = OrderedSet.__super__.remove.apply(this, arguments);
	    this._list.remove(removeCell);
	    return removeCell.data;
	  };
	
	  return OrderedSet;
	
	})(Set);
	
	module.exports = OrderedSet;


/***/ }
/******/ ])
});

//# sourceMappingURL=relation.js.map