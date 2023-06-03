var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../rule/index.js")), t = require("../util");

var i = function(e, i, u, a, l) {
    var d = [];
    if (e.required || !e.required && a.hasOwnProperty(e.field)) {
        if ((0, t.isEmptyValue)(i, "string") && !e.required) return u();
        r.default.required(e, i, a, d, l), (0, t.isEmptyValue)(i, "string") || r.default.pattern(e, i, a, d, l);
    }
    u(d);
};

exports.default = i;