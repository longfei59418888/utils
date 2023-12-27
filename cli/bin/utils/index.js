"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProgressBar = exports.exit = void 0;
var process = _interopRequireWildcard(require("process"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ProgressBar = require("progress");
var chalk = require("chalk");
var getProgressBar = exports.getProgressBar = function getProgressBar(message, callback) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var outTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 60000;
  var total = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;
  var bar = new ProgressBar("".concat(message, ":[:percent] [:bar]"), {
    total: total,
    width: 60
  });
  var timer;
  var timer2;
  if (type && callback !== false) {
    timer = setInterval(function () {
      bar.tick((total - bar.curr) / (Math.random() * 20 + 10));
    }, 1000);
    timer2 = setTimeout(function () {
      callback === null || callback === void 0 || callback();
      timer && clearInterval(timer);
      bar.terminate();
      console.log(chalk.red("".concat(message, ": timeout error!")));
      process.exit(0);
    }, outTime);
  }
  return {
    end: function end() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      type && bar.tick(100);
      timer && clearInterval(timer);
      timer2 && clearTimeout(timer2);
    }
  };
};
var exit = exports.exit = function exit() {
  for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }
  messages.forEach(function (message) {
    return console.log(chalk.green(message));
  });
  process.exit(0);
};