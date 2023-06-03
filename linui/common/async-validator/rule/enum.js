var e = require("../../../../@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../util"));

var u = function(e, u, i, t, n) {
    e.enum = Array.isArray(e.enum) ? e.enum : [], -1 === e.enum.indexOf(u) && t.push(r.format(n.messages.enum, e.fullField, e.enum.join(", ")));
};

exports.default = u;