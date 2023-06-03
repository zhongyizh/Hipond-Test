Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.px2rpx = exports.promisic = void 0;

exports.px2rpx = function(e) {
    return 750 / wx.getSystemInfoSync().screenWidth * e;
}, exports.promisic = function(e) {
    return function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new Promise(function(n, r) {
            var o = Object.assign(t, {
                success: function(e) {
                    n(e);
                },
                fail: function(e) {
                    r(e);
                }
            });
            e(o);
        });
    };
};