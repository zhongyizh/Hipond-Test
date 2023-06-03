var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = require("../util"), u = e(require("../rule/index.js"));

var i = function(e, i, t, d, a) {
    var l = [];
    if (e.required || !e.required && d.hasOwnProperty(e.field)) {
        if ((0, r.isEmptyValue)(i) && !e.required) return t();
        u.default.required(e, i, d, l, a), void 0 !== i && u.default.type(e, i, d, l, a);
    }
    t(l);
};

exports.default = i;