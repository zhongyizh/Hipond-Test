Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = require("../../@babel/runtime/helpers/classCallCheck"), e = require("../../@babel/runtime/helpers/createClass"), i = new (function() {
    function i(e) {
        t(this, i), this.systemInfo = e;
    }
    return e(i, [ {
        key: "px2rpx",
        value: function(t) {
            return 750 / this.systemInfo.windowWidth * t;
        }
    }, {
        key: "rpx2px",
        value: function(t) {
            return this.systemInfo.windowWidth / 750 * t;
        }
    }, {
        key: "getNavigationBarHeight",
        value: function() {
            return this.getTitleBarHeight() + this.getStatusBarHeight();
        }
    }, {
        key: "getStatusBarHeight",
        value: function() {
            return this.px2rpx(this.systemInfo.statusBarHeight);
        }
    }, {
        key: "getTitleBarHeight",
        value: function() {
            var t = this.systemInfo.statusBarHeight, e = wx.getMenuButtonBoundingClientRect(), i = e.top - t;
            return this.px2rpx(2 * i + e.height);
        }
    } ]), i;
}())(wx.getSystemInfoSync());

exports.default = i;