Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../../../@babel/runtime/helpers/classCallCheck"), r = require("../../../@babel/runtime/helpers/createClass"), t = new (function() {
    function t() {
        e(this, t);
    }
    return r(t, [ {
        key: "emit",
        value: function(e, r, t) {
            e.triggerEvent(r, t, {
                bubbles: !0,
                composed: !0,
                capturePhase: !0
            });
        }
    } ]), t;
}())();

exports.default = t;