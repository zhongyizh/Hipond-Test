var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/objectSpread2"), i = e(require("../behaviors/computeOffset")), o = e(require("../behaviors/validator"));

Component({
    behaviors: [ i.default, o.default ],
    externalClasses: [ "l-container-class", "l-class" ],
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        opacity: {
            type: String,
            value: "1"
        },
        bgColor: String,
        zIndex: {
            type: String,
            value: "776"
        },
        type: {
            type: String,
            value: "rotate",
            options: [ "flash", "flip", "change", "rotate", "circle" ]
        },
        color: {
            type: String,
            value: ""
        },
        size: {
            type: String,
            value: "medium"
        },
        custom: Boolean,
        fullScreen: Boolean
    },
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
            wx.lin = wx.lin || {}, wx.lin.showLoading = function(i) {
                var o = t({}, i), a = o.custom, n = void 0 !== a && a, r = o.fullScreen, l = void 0 !== r && r, s = o.color, u = void 0 === s ? "" : s, c = o.type, p = void 0 === c ? "rotate" : c, v = o.size, d = void 0 === v ? "medium" : v, h = o.opacity, f = void 0 === h ? "1" : h;
                e.setData({
                    custom: n,
                    fullScreen: l,
                    color: u,
                    type: p,
                    size: d,
                    opacity: f,
                    show: !0
                });
            }, wx.lin.hideLoading = function() {
                e.setData({
                    show: !1
                });
            };
        },
        doNothingMove: function() {}
    }
});