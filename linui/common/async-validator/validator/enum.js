var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../rule/index.js")), u = require("../util");

var i = function(e, i, t, a, d) {
    var l = [];
    if (e.required || !e.required && a.hasOwnProperty(e.field)) {
        if ((0, u.isEmptyValue)(i) && !e.required) return t();
        r.default.required(e, i, a, l, d), i && r.default.enum(e, i, a, l, d);
    }
    t(l);
};

exports.default = i;