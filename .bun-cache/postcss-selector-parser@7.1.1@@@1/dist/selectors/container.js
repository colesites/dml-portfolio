exports.__esModule = true;
exports["default"] = void 0;
var _node = _interopRequireDefault(require("./node"));
var types = _interopRequireWildcard(require("./types"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop,
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.hasOwn(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it =
    (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (
    Array.isArray(o) ||
    (it = _unsupportedIterableToArray(o)) ||
    (allowArrayLike && o && typeof o.length === "number")
  ) {
    if (it) o = it;
    var i = 0;
    return () => {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError(
    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
}
var Container = /*#__PURE__*/ ((_Node) => {
  _inheritsLoose(Container, _Node);
  function Container(opts) {
    var _this;
    _this = _Node.call(this, opts) || this;
    if (!_this.nodes) {
      _this.nodes = [];
    }
    return _this;
  }
  var _proto = Container.prototype;
  _proto.append = function append(selector) {
    selector.parent = this;
    this.nodes.push(selector);
    return this;
  };
  _proto.prepend = function prepend(selector) {
    selector.parent = this;
    this.nodes.unshift(selector);
    for (var id in this.indexes) {
      this.indexes[id]++;
    }
    return this;
  };
  _proto.at = function at(index) {
    return this.nodes[index];
  };
  _proto.index = function index(child) {
    if (typeof child === "number") {
      return child;
    }
    return this.nodes.indexOf(child);
  };
  _proto.removeChild = function removeChild(child) {
    child = this.index(child);
    this.at(child).parent = undefined;
    this.nodes.splice(child, 1);
    var index;
    for (var id in this.indexes) {
      index = this.indexes[id];
      if (index >= child) {
        this.indexes[id] = index - 1;
      }
    }
    return this;
  };
  _proto.removeAll = function removeAll() {
    for (
      var _iterator = _createForOfIteratorHelperLoose(this.nodes), _step;
      !(_step = _iterator()).done;
    ) {
      var node = _step.value;
      node.parent = undefined;
    }
    this.nodes = [];
    return this;
  };
  _proto.empty = function empty() {
    return this.removeAll();
  };
  _proto.insertAfter = function insertAfter(oldNode, newNode) {
    var _this$nodes;
    newNode.parent = this;
    var oldIndex = this.index(oldNode);
    var resetNode = [];
    for (var i = 2; i < arguments.length; i++) {
      resetNode.push(arguments[i]);
    }
    (_this$nodes = this.nodes).splice.apply(
      _this$nodes,
      [oldIndex + 1, 0, newNode].concat(resetNode),
    );
    newNode.parent = this;
    var index;
    for (var id in this.indexes) {
      index = this.indexes[id];
      if (oldIndex < index) {
        this.indexes[id] = index + arguments.length - 1;
      }
    }
    return this;
  };
  _proto.insertBefore = function insertBefore(oldNode, newNode) {
    var _this$nodes2;
    newNode.parent = this;
    var oldIndex = this.index(oldNode);
    var resetNode = [];
    for (var i = 2; i < arguments.length; i++) {
      resetNode.push(arguments[i]);
    }
    (_this$nodes2 = this.nodes).splice.apply(
      _this$nodes2,
      [oldIndex, 0, newNode].concat(resetNode),
    );
    newNode.parent = this;
    var index;
    for (var id in this.indexes) {
      index = this.indexes[id];
      if (index >= oldIndex) {
        this.indexes[id] = index + arguments.length - 1;
      }
    }
    return this;
  };
  _proto._findChildAtPosition = function _findChildAtPosition(line, col) {
    var found;
    this.each((node) => {
      if (node.atPosition) {
        var foundChild = node.atPosition(line, col);
        if (foundChild) {
          found = foundChild;
          return false;
        }
      } else if (node.isAtPosition(line, col)) {
        found = node;
        return false;
      }
    });
    return found;
  };

  /**
   * Return the most specific node at the line and column number given.
   * The source location is based on the original parsed location, locations aren't
   * updated as selector nodes are mutated.
   *
   * Note that this location is relative to the location of the first character
   * of the selector, and not the location of the selector in the overall document
   * when used in conjunction with postcss.
   *
   * If not found, returns undefined.
   * @param {number} line The line number of the node to find. (1-based index)
   * @param {number} col  The column number of the node to find. (1-based index)
   */
  _proto.atPosition = function atPosition(line, col) {
    if (this.isAtPosition(line, col)) {
      return this._findChildAtPosition(line, col) || this;
    } else {
      return undefined;
    }
  };
  _proto._inferEndPosition = function _inferEndPosition() {
    if (this.last && this.last.source && this.last.source.end) {
      this.source = this.source || {};
      this.source.end = this.source.end || {};
      Object.assign(this.source.end, this.last.source.end);
    }
  };
  _proto.each = function each(callback) {
    if (!this.lastEach) {
      this.lastEach = 0;
    }
    if (!this.indexes) {
      this.indexes = {};
    }
    this.lastEach++;
    var id = this.lastEach;
    this.indexes[id] = 0;
    if (!this.length) {
      return undefined;
    }
    var index, result;
    while (this.indexes[id] < this.length) {
      index = this.indexes[id];
      result = callback(this.at(index), index);
      if (result === false) {
        break;
      }
      this.indexes[id] += 1;
    }
    delete this.indexes[id];
    if (result === false) {
      return false;
    }
  };
  _proto.walk = function walk(callback) {
    return this.each((node, i) => {
      var result = callback(node, i);
      if (result !== false && node.length) {
        result = node.walk(callback);
      }
      if (result === false) {
        return false;
      }
    });
  };
  _proto.walkAttributes = function walkAttributes(callback) {
    return this.walk((selector) => {
      if (selector.type === types.ATTRIBUTE) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.walkClasses = function walkClasses(callback) {
    return this.walk((selector) => {
      if (selector.type === types.CLASS) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.walkCombinators = function walkCombinators(callback) {
    return this.walk((selector) => {
      if (selector.type === types.COMBINATOR) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.walkComments = function walkComments(callback) {
    return this.walk((selector) => {
      if (selector.type === types.COMMENT) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.walkIds = function walkIds(callback) {
    return this.walk((selector) => {
      if (selector.type === types.ID) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.walkNesting = function walkNesting(callback) {
    return this.walk((selector) => {
      if (selector.type === types.NESTING) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.walkPseudos = function walkPseudos(callback) {
    return this.walk((selector) => {
      if (selector.type === types.PSEUDO) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.walkTags = function walkTags(callback) {
    return this.walk((selector) => {
      if (selector.type === types.TAG) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.walkUniversals = function walkUniversals(callback) {
    return this.walk((selector) => {
      if (selector.type === types.UNIVERSAL) {
        return callback.call(this, selector);
      }
    });
  };
  _proto.split = function split(callback) {
    var current = [];
    return this.reduce((memo, node, index) => {
      var split = callback.call(this, node);
      current.push(node);
      if (split) {
        memo.push(current);
        current = [];
      } else if (index === this.length - 1) {
        memo.push(current);
      }
      return memo;
    }, []);
  };
  _proto.map = function map(callback) {
    return this.nodes.map(callback);
  };
  _proto.reduce = function reduce(callback, memo) {
    return this.nodes.reduce(callback, memo);
  };
  _proto.every = function every(callback) {
    return this.nodes.every(callback);
  };
  _proto.some = function some(callback) {
    return this.nodes.some(callback);
  };
  _proto.filter = function filter(callback) {
    return this.nodes.filter(callback);
  };
  _proto.sort = function sort(callback) {
    return this.nodes.sort(callback);
  };
  _proto.toString = function toString() {
    return this.map(String).join("");
  };
  _createClass(Container, [
    {
      key: "first",
      get: function get() {
        return this.at(0);
      },
    },
    {
      key: "last",
      get: function get() {
        return this.at(this.length - 1);
      },
    },
    {
      key: "length",
      get: function get() {
        return this.nodes.length;
      },
    },
  ]);
  return Container;
})(_node["default"]);
exports["default"] = Container;
module.exports = exports.default;
