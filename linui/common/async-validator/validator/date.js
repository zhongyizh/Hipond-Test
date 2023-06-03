var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../rule/index.js")), t = require("../util");

var u = function(e, u, i, a, l) {
    var d = [];
    if (e.required || !e.required && a.hasOwnProperty(e.field)) {
        if ((0, t.isEmptyValue)(u) && !e.required) return i();
        var f;
        if (r.default.required(e, u, a, d, l), !(0, t.isEmptyValue)(u)) f = "number" == typeof u ? new Date(u) : u, 
        r.default.type(e, f, a, d, l), f && r.default.range(e, f.getTime(), a, d, l);
    }
    i(d);
};

exports.default = u;