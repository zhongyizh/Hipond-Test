var e = require("../../../../@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../util"));

var t = function(e, t, s, i, u) {
    (/^\s+$/.test(t) || "" === t) && i.push(r.format(u.messages.whitespace, e.fullField));
};

exports.default = t;