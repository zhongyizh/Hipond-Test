var e = require("../../../../@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../util"));

var u = function(e, u, a, l, n) {
    var t = "number" == typeof e.len, m = "number" == typeof e.min, s = "number" == typeof e.max, i = u, f = null, o = "number" == typeof u, p = "string" == typeof u, d = Array.isArray(u);
    if (o ? f = "number" : p ? f = "string" : d && (f = "array"), !f) return !1;
    d && (i = u.length), p && (i = u.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "_").length), 
    t ? i !== e.len && l.push(r.format(n.messages[f].len, e.fullField, e.len)) : m && !s && i < e.min ? l.push(r.format(n.messages[f].min, e.fullField, e.min)) : s && !m && i > e.max ? l.push(r.format(n.messages[f].max, e.fullField, e.max)) : m && s && (i < e.min || i > e.max) && l.push(r.format(n.messages[f].range, e.fullField, e.min, e.max));
};

exports.default = u;