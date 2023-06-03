var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../rule/index.js")), u = require("../util");

var t = function(e, t, i, a, l) {
    var d = e.type, p = [];
    if (e.required || !e.required && a.hasOwnProperty(e.field)) {
        if ((0, u.isEmptyValue)(t, d) && !e.required) return i();
        r.default.required(e, t, a, p, l, d), (0, u.isEmptyValue)(t, d) || r.default.type(e, t, a, p, l);
    }
    i(p);
};

exports.default = t;