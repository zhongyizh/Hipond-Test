var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../behaviors/zIndex")), i = e(require("../behaviors/watchShow")), a = e(require("../behaviors/validator"));

Component({
    behaviors: [ t.default, i.default, a.default ],
    externalClasses: [ "l-class", "l-image-class" ],
    properties: {
        show: Boolean,
        icon: String,
        iconColor: {
            type: String,
            value: "#fff"
        },
        iconSize: {
            type: String,
            value: "28"
        },
        image: String,
        content: String,
        type: {
            type: String,
            value: "primary",
            options: [ "primary", "warning", "success", "error" ]
        },
        duration: {
            type: Number,
            value: 1500
        },
        openApi: {
            type: Boolean,
            value: !0
        },
        top: {
            type: Number,
            value: 0
        }
    },
    data: {
        status: !1
    },
    observers: {
        icon: function() {}
    },
    attached: function() {
        this.initMessage();
    },
    pageLifetimes: {
        show: function() {
            this.initMessage();
        }
    },
    methods: {
        initMessage: function() {
            var e = this;
            wx.lin = wx.lin || {}, wx.lin.showMessage = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = t.content, a = void 0 === i ? "" : i, n = t.icon, o = void 0 === n ? "" : n, s = t.image, r = void 0 === s ? "" : s, u = t.type, l = void 0 === u ? "primary" : u, c = t.duration, p = void 0 === c ? 1500 : c, v = t.success, d = void 0 === v ? null : v, g = t.top, h = void 0 === g ? 0 : g;
                return e.data.success = d, e.setData({
                    content: a,
                    icon: o,
                    image: r,
                    duration: p,
                    type: l,
                    top: h
                }), e.changeStatus(), e;
            }, wx.lin.hideMessage = function() {
                e.setData({
                    status: !1
                });
            };
        }
    }
});