var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../@babel/runtime/helpers/objectSpread2"), o = t(require("../behaviors/zIndex")), i = t(require("../behaviors/validator"));

Component({
    behaviors: [ o.default, i.default ],
    externalClasses: [ "l-bg-class", "l-panel-class", "l-class" ],
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        animation: {
            type: Boolean,
            value: !0
        },
        transition: {
            type: Boolean,
            value: null
        },
        contentAlign: {
            type: String,
            value: "center",
            options: [ "top", "right", "left", "bottom", "center" ]
        },
        direction: {
            type: String,
            value: null,
            options: [ "top", "right", "left", "bottom", "center" ]
        },
        locked: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {
        this._init();
    },
    pageLifetimes: {
        show: function() {
            this._init();
        }
    },
    data: {
        status: "show"
    },
    methods: {
        _init: function() {
            var t = this;
            wx.lin = wx.lin || {}, wx.lin.showPopup = function(o) {
                var i = e({}, o), n = i.zIndex, a = void 0 === n ? 99 : n, s = i.animation, l = void 0 === s || s, u = i.contentAlign, r = void 0 === u ? "center" : u, h = i.locked, c = void 0 !== h && h;
                t.setData({
                    zIndex: a,
                    animation: l,
                    contentAlign: r,
                    locked: c,
                    show: !0
                });
            }, wx.lin.hidePopup = function() {
                t.setData({
                    status: "hide"
                }), setTimeout(function() {
                    t.setData({
                        show: !1
                    });
                }, 300);
            };
        },
        doNothingMove: function() {},
        doNothingTap: function() {},
        onPopupTap: function() {
            var t = this;
            !0 !== this.data.locked && (this.data.show ? (this.setData({
                status: "hide"
            }), setTimeout(function() {
                t.setData({
                    show: !1,
                    status: "show"
                });
            }, 300)) : this.setData({
                show: !0,
                status: "show"
            })), this.triggerEvent("lintap", !0, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});