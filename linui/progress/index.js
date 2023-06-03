var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../utils/util.js"), r = t(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-class", "l-text-class", "l-active-class", "l-background-class" ],
    behaviors: [ r.default ],
    properties: {
        percent: {
            type: Number,
            value: 0
        },
        strokeWidth: {
            type: Number,
            value: 12
        },
        borderRadius: {
            type: Number,
            value: 6
        },
        activeColor: {
            type: String
        },
        backgroundColor: {
            type: String,
            value: "#EBEBEB"
        },
        showInfo: {
            type: Boolean,
            value: !1
        },
        textPosition: {
            type: String,
            value: "right",
            options: [ "left", "right" ]
        },
        textColor: {
            type: String
        },
        interval: {
            type: Number,
            value: 20
        },
        active: {
            type: Boolean,
            value: !1
        },
        duration: {
            type: Number,
            value: 30
        }
    },
    options: {
        multipleSlots: !0,
        pureDataPattern: /^_/
    },
    data: {
        _slotWidth: 0,
        _slotHeight: 0,
        _progressWidth: 0,
        _progressHeight: 0,
        _marginBottom: 0,
        marginLeft: 0,
        marginTop: 0,
        _useSlot: !1
    },
    observers: {
        "_slotWidth, _slotHeight, _progressWidth, _progressHeight, percent,_useSlot": function(t, e, r, i, a, s) {
            if (s) {
                var o = -(e - i) / 2, l = (r - t) * a / 100;
                this.setData({
                    marginTop: o,
                    marginLeft: l
                });
            }
        }
    },
    lifetimes: {
        attached: function() {
            var t = this;
            this.data.percent > 100 && this.setData({
                percent: 100
            }), wx.createSelectorQuery().in(this).select(".slot").boundingClientRect(function(r) {
                var i = t.data._useSlot;
                r.width && (i = !0), t.setData({
                    _useSlot: i,
                    _slotWidth: (0, e.px2rpx)(r.width),
                    _slotHeight: (0, e.px2rpx)(r.height)
                });
            }).exec(), wx.createSelectorQuery().in(this).select(".progress").boundingClientRect(function(r) {
                t.setData({
                    _progressHeight: (0, e.px2rpx)(r.height),
                    _progressWidth: (0, e.px2rpx)(r.width)
                });
            }).exec();
            var r = this.data.percent, i = 0;
            this.data.active && setInterval(function() {
                i < r && (i += 1, t.setData({
                    percent: i
                }));
            }, this.data.duration);
        }
    },
    methods: {}
});