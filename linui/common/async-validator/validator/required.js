var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = require("../../../../@babel/runtime/helpers/typeof"), t = e(require("../rule/index.js"));

var u = function(e, u, a, i, l) {
    var s = [], o = Array.isArray(u) ? "array" : r(u);
    t.default.required(e, u, i, s, l, o), a(s);
};

exports.default = u;