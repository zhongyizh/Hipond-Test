var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../rule/index.js")), u = require("../util");

var i = function(e, i, t, a, l) {
    var d = [];
    if (e.required || !e.required && a.hasOwnProperty(e.field)) {
        if ((0, u.isEmptyValue)(i) && !e.required) return t();
        r.default.required(e, i, a, d, l), (0, u.isEmptyValue)(i) || r.default.type(e, i, a, d, l);
    }
    t(d);
};

exports.default = i;