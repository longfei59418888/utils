"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _path = _interopRequireDefault(require("path"));
var _process = _interopRequireDefault(require("process"));
var _shelljs = _interopRequireDefault(require("shelljs"));
var _utils = require("../../../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var download = require('download-git-repo');
var tmp = require('tmp');
var chalk = require('chalk');
var cp = require('child_process');
var cwd = _process["default"].cwd();
var initProject = function initProject(name) {
  var projectName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'react-webpack';
  var dir = tmp.dirSync();
  var targetDir = _path["default"].join(cwd, name);
  var progressPull = (0, _utils.getProgressBar)('pull code', function () {
    return dir.removeCallback();
  });
  download('longfei59418888/templates', dir.name, function (err) {
    try {
      if (err) chalk.red('pull longfei59418888/templates error!');else {
        _shelljs["default"].mkdir('-p', targetDir);
        cp.execSync("cp -rf ".concat(_path["default"].join(dir.name, 'init/' + projectName, '/'), " ").concat(targetDir));
        progressPull.end();
      }
    } catch (e) {}
    dir.removeCallback();
    (0, _utils.exit)('创建项目已成功，你可以执行一下步骤启动项目：', "  1. cd ".concat(name), '  2. yarn install', '  3. yun run start');
  });
};
var _default = exports["default"] = initProject;