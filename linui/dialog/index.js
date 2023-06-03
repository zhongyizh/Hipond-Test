var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../behaviors/computeOffset")), o = e(require("../behaviors/zIndex")), i = e(require("../behaviors/hover")), a = e(require("../behaviors/validator"));

Component({
    behaviors: [ t.default, o.default, i.default, a.default ],
    externalClasses: [ "l-class", "l-title-class", "l-content-class", "l-confirm-class", "l-cancel-class", "l-bg-class" ],
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        type: {
            type: String,
            value: "alert",
            options: [ "alert", "confirm" ]
        },
        title: {
            type: String,
            value: "提示"
        },
        showTitle: {
            type: Boolean,
            value: !0
        },
        content: {
            type: String,
            value: ""
        },
        locked: {
            type: Boolean,
            value: !0
        },
        confirmText: {
            type: String,
            value: "确定"
        },
        confirmColor: {
            type: String,
            value: "#3683d6"
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        cancelColor: {
            type: String,
            value: "#45526b"
        },
        titleColor: String,
        contentColor: {
            type: String,
            value: "rgba(89,108,142,1)"
        },
        openApi: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        success: null,
        fail: null
    },
    attached: function() {
        this.data.openApi && this.initDialog();
    },
    pageLifetimes: {
        show: function() {
            this.data.openApi && this.initDialog();
        }
    },
    methods: {
        initDialog: function() {
            var e = this;
            wx.lin = wx.lin || {}, wx.lin.showDialog = function(t) {
                var o = t.type, i = void 0 === o ? "alert" : o, a = t.title, l = void 0 === a ? "提示" : a, n = t.showTitle, s = void 0 === n || n, c = t.content, r = void 0 === c ? "" : c, u = t.locked, h = void 0 === u || u, v = t.confirmText, d = void 0 === v ? "确定" : v, p = t.contentColor, f = void 0 === p ? "rgba(89,108,142,1)" : p, g = t.cancelColor, b = void 0 === g ? "#45526b" : g, m = t.cancelText, w = void 0 === m ? "取消" : m, y = t.confirmColor, C = void 0 === y ? "#3683d6" : y, D = t.success, T = void 0 === D ? null : D, x = t.fail, S = void 0 === x ? null : x;
                return e.setData({
                    type: i,
                    title: l,
                    showTitle: s,
                    content: r,
                    locked: h,
                    confirmText: d,
                    cancelColor: b,
                    cancelText: w,
                    confirmColor: C,
                    contentColor: f,
                    show: !0,
                    fail: S,
                    success: T
                }), e;
            };
        },
        onConfirmTap: function() {
            var e = this.data.success;
            e && e({
                confirm: !0,
                cancel: !1,
                errMsg: "showDialog: success"
            }), this.setData({
                show: !this.data.show
            }), this.triggerEvent("linconfirm", "confirm", {
                bubbles: !0,
                composed: !0
            });
        },
        onCancelTap: function() {
            var e = this.data.success;
            e && e({
                confirm: !1,
                cancel: !0,
                errMsg: "showDialog: success"
            }), this.setData({
                show: !this.data.show
            }), this.triggerEvent("lincancel", "cancel", {
                bubbles: !0,
                composed: !0
            });
        },
        onDialogTap: function() {
            !0 !== this.data.locked && this.setData({
                show: !this.data.show
            }), this.triggerEvent("lintap", !0, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});