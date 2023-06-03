var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../behaviors/computeOffset")), i = e(require("../behaviors/zIndex")), o = e(require("../behaviors/watchShow"));

Component({
    behaviors: [ t.default, i.default, o.default ],
    externalClasses: [ "l-bg-class", "l-icon-class", "l-class", "l-image-class", "l-title-class " ],
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        title: String,
        icon: String,
        iconSize: String,
        iconColor: String,
        image: String,
        placement: {
            type: String,
            value: "bottom"
        },
        duration: {
            type: Number,
            value: 1500
        },
        zIndex: {
            type: Number,
            value: 777
        },
        center: {
            type: Boolean,
            value: !0
        },
        mask: {
            type: Boolean,
            value: !1
        },
        openApi: {
            type: Boolean,
            value: !0
        },
        offsetX: Number,
        offsetY: Number
    },
    data: {
        status: !1,
        success: "",
        fail: "",
        complete: ""
    },
    observers: {
        icon: function() {}
    },
    attached: function() {
        this.data.openApi && this.initToast();
    },
    pageLifetimes: {
        show: function() {
            this.data.openApi && this.initToast(), this.offsetMargin();
        }
    },
    methods: {
        initToast: function() {
            var e = this;
            wx.lin = wx.lin || {}, wx.lin.showToast = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = t.title, o = void 0 === i ? "" : i, a = t.icon, n = void 0 === a ? "" : a, s = t.image, l = void 0 === s ? "" : s, r = t.placement, c = void 0 === r ? "bottom" : r, u = t.duration, f = void 0 === u ? 1500 : u, d = t.center, v = void 0 === d || d, h = t.mask, p = void 0 !== h && h, m = t.success, g = void 0 === m ? null : m, b = t.complete, S = void 0 === b ? null : b, x = t.offsetX, w = void 0 === x ? 0 : x, y = t.offsetY, C = void 0 === y ? 0 : y, T = t.iconSize, k = void 0 === T ? "60" : T, q = t.iconColor, z = void 0 === q ? "" : q;
                return e.setData({
                    title: o,
                    icon: n,
                    image: l,
                    placement: c,
                    duration: f,
                    center: v,
                    mask: p,
                    success: g,
                    complete: S,
                    offsetY: C,
                    offsetX: w,
                    iconSize: k,
                    iconColor: z
                }), e.changeStatus(), e;
            }, wx.lin.hideToast = function() {
                e.setData({
                    status: !1
                });
            };
        },
        strlen: function(e) {
            for (var t = 0, i = 0; i < e.length; i++) {
                var o = e.charCodeAt(i);
                o >= "0x0001" && o <= "0x007e" || "0xff60" <= o && o <= "0xff9f" ? t++ : t += 2;
            }
            return t;
        },
        doNothingMove: function() {},
        onMaskTap: function() {
            !0 !== this.data.locked && this.setData({
                fullScreen: "hide",
                status: "hide"
            }), this.triggerEvent("lintap", !0, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});