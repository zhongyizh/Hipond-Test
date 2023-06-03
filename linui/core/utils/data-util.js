Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../../../@babel/runtime/helpers/classCallCheck"), t = require("../../../@babel/runtime/helpers/createClass"), r = new (function() {
    function r() {
        e(this, r);
    }
    return t(r, [ {
        key: "setDiffData",
        value: function(e, t) {
            var r = {};
            Object.keys(t).forEach(function(a) {
                e.data[a] !== t[a] && (r[a] = t[a]);
            }), Object.keys(r).length && e.setData(r);
        }
    } ]), r;
}())();

exports.default = r;