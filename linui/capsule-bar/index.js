var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../@babel/runtime/regenerator")), a = require("../../@babel/runtime/helpers/asyncToGenerator"), i = e(require("../utils/device-util")), n = e(require("../behaviors/validator")), r = e(require("../core/utils/event-util"));

Component({
    behaviors: [ n.default ],
    externalClasses: [ "l-title-class" ],
    properties: {
        bgColor: {
            type: String,
            value: "white"
        },
        statusBarColor: {
            type: String,
            value: "transparent"
        },
        titleBarColor: {
            type: String,
            value: "transparent"
        },
        titleColor: {
            type: String,
            value: "black"
        },
        capsuleColor: {
            type: String,
            value: "black",
            options: [ "white", "black" ]
        },
        disableBack: {
            type: Boolean,
            value: !1
        },
        disableHome: {
            type: Boolean,
            value: !1
        },
        hiddenCapsule: {
            type: Boolean,
            value: !1
        },
        homePage: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        hasPadding: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        titleBarHeight: i.default.getTitleBarHeight(),
        statusBarHeight: i.default.getStatusBarHeight(),
        capsuleButtonInfo: null
    },
    lifetimes: {
        ready: function() {
            this.setData({
                capsuleButtonInfo: this.getCapsuleButtonInfo()
            });
        }
    },
    methods: {
        getCapsuleButtonInfo: function() {
            var e = wx.getSystemInfoSync().screenWidth, t = wx.getMenuButtonBoundingClientRect();
            return t.left = e - t.right, t.right = t.left + t.width, t;
        },
        onTapLeftButton: function() {
            r.default.emit(this, "linlefttap"), this.data.disableBack || wx.navigateBack();
        },
        onLongPressLeftButton: function() {
            r.default.emit(this, "linleftlongpress");
        },
        onTapRightButton: function() {
            var e = this;
            return a(t.default.mark(function a() {
                var i;
                return t.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        r.default.emit(e, "linrighttap"), i = e.data.homePage, e.data.disableHome || wx.switchTab({
                            url: i,
                            fail: function() {
                                wx.navigateTo({
                                    url: i
                                });
                            }
                        });

                      case 3:
                      case "end":
                        return t.stop();
                    }
                }, a);
            }))();
        },
        onLongPressRightButton: function() {
            r.default.emit(this, "linrightlongpress");
        }
    }
});