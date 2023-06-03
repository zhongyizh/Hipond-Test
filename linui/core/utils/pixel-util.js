Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../../../@babel/runtime/helpers/classCallCheck"), t = require("../../../@babel/runtime/helpers/createClass"), r = new (function() {
    function r(t) {
        e(this, r), this.systemInfo = t;
    }
    return t(r, [ {
        key: "px2rpx",
        value: function(e) {
            return 750 / this.systemInfo.screenWidth * e;
        }
    }, {
        key: "rpx2px",
        value: function(e) {
            return e / 750 * this.systemInfo.screenWidth;
        }
    } ]), r;
}())(wx.getSystemInfoSync());

exports.default = r;