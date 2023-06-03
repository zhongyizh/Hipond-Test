var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../rule/index.js")), u = require("../util");

var i = function(e, i, t, d, a) {
    var l = [];
    if (e.required || !e.required && d.hasOwnProperty(e.field)) {
        if ((0, u.isEmptyValue)(i) && !e.required) return t();
        r.default.required(e, i, d, l, a), void 0 !== i && r.default.type(e, i, d, l, a);
    }
    t(l);
};

exports.default = i;