var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../rule/index.js")), u = require("../util");

var a = function(e, a, t, i, l) {
    var d = [];
    if (e.required || !e.required && i.hasOwnProperty(e.field)) {
        if ((0, u.isEmptyValue)(a, "array") && !e.required) return t();
        r.default.required(e, a, i, d, l, "array"), (0, u.isEmptyValue)(a, "array") || (r.default.type(e, a, i, d, l), 
        r.default.range(e, a, i, d, l));
    }
    t(d);
};

exports.default = a;