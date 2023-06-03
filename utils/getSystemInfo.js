Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../@babel/runtime/helpers/classCallCheck"), t = require("../@babel/runtime/helpers/createClass"), r = function() {
    function r() {
        e(this, r);
    }
    return t(r, null, [ {
        key: "fetchAllInfo",
        value: function() {
            var e = wx.getMenuButtonBoundingClientRect(), t = wx.getSystemInfoSync(), r = {
                source: {
                    menu: e,
                    system: t
                },
                statusBarHeight: t.statusBarHeight,
                headerHeight: 2 * (e.top - t.statusBarHeight) + e.height,
                headerRight: t.windowWidth - e.left
            };
            return wx.setStorageSync("SystemInfo", r), r;
        }
    }, {
        key: "getInfo",
        value: function() {
            var e = wx.getStorageSync("SystemInfo");
            return e || (e = this.fetchAllInfo()), e;
        }
    } ]), r;
}();

exports.default = r;