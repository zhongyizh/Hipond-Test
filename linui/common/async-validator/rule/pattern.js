var e = require("../../../../@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = e(require("../util"));

var r = function(e, r, a, p, s) {
    e.pattern && (e.pattern instanceof RegExp ? (e.pattern.lastIndex = 0, e.pattern.test(r) || p.push(t.format(s.messages.pattern.mismatch, e.fullField, r, e.pattern))) : "string" == typeof e.pattern && (new RegExp(e.pattern.replace(/^\/|\/$/g, "")).test(r) || p.push(t.format(s.messages.pattern.mismatch, e.fullField, r, e.pattern))));
};

exports.default = r;