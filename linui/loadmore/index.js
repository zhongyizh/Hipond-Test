var e = require("../../@babel/runtime/helpers/interopRequireDefault"), i = require("../../@babel/runtime/helpers/objectSpread2"), o = e(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-class", "l-loading-class", "l-end-class", "l-line-class" ],
    options: {
        multipleSlots: !0
    },
    behaviors: [ o.default ],
    properties: {
        show: Boolean,
        custom: Boolean,
        line: Boolean,
        color: String,
        size: {
            type: String,
            value: "28"
        },
        type: {
            type: String,
            value: "loading",
            options: [ "loading", "end" ]
        },
        endText: {
            type: String,
            value: "我是有底线的~"
        },
        loadingText: {
            type: String,
            value: "加载中..."
        }
    },
    data: {},
    attached: function() {
        this._init();
    },
    pageLifetimes: {
        show: function() {
            this._init();
        }
    },
    methods: {
        _init: function() {
            var e = this;
            wx.lin = wx.lin || {}, wx.lin.showLoadmore = function(o) {
                var t = i({}, o), n = t.custom, l = void 0 !== n && n, a = t.line, s = void 0 !== a && a, r = t.color, d = void 0 === r ? "" : r, u = t.size, c = void 0 === u ? "28" : u, p = t.type, v = void 0 === p ? "loading" : p, h = t.endText, g = void 0 === h ? "我是有底线的" : h, m = t.loadingText, x = void 0 === m ? "加载中..." : m;
                e.setData({
                    custom: l,
                    line: s,
                    color: d,
                    size: c,
                    type: v,
                    endText: g,
                    loadingText: x,
                    show: !0
                });
            }, wx.lin.hideLoadmore = function() {
                e.setData({
                    show: !1
                });
            };
        },
        onLoadmore: function() {
            this.triggerEvent("lintap", {}, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});