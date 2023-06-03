var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/scrollCenter"));

Component({
    behaviors: [ e.default ],
    externalClasses: [ "l-class-tabs", "l-class-header", "l-class-active", "l-class-content", "l-class-inactive", "l-class-line", "l-class-tabimage", "l-class-header-line", "l-class-icon", "l-tabs-class", "l-header-class", "l-active-class", "l-content-class", "l-inactive-class", "l-line-class", "l-tabimage-class", "l-header-line-class", "l-icon-class" ],
    relations: {
        "../tabpanel/index": {
            type: "child",
            linked: function() {
                this.initTabs();
            }
        }
    },
    options: {
        multipleSlots: !0
    },
    properties: {
        activeKey: {
            type: String,
            value: ""
        },
        placement: {
            type: String,
            value: "top"
        },
        animated: Boolean,
        swipeable: Boolean,
        scrollable: Boolean,
        hasLine: {
            type: Boolean,
            value: !0
        },
        animatedForLine: Boolean,
        activeColor: {
            type: String,
            value: "#333333"
        },
        inactiveColor: {
            type: String,
            value: "#bbbbbb"
        },
        equalWidth: {
            type: Boolean,
            value: !0
        },
        contentHeight: Number
    },
    data: {
        tabList: [],
        currentIndex: 0,
        transformX: 0,
        transformY: 0
    },
    observers: {
        activeKey: function(e) {
            var a = this;
            if (e) {
                var t = this.data.tabList.findIndex(function(a) {
                    return a.key === e;
                });
                this.setData({
                    currentIndex: t
                }, function() {
                    a.data.scrollable && a.queryMultipleNodes();
                });
            }
        }
    },
    ready: function() {
        this.initTabs();
    },
    methods: {
        initTabs: function() {
            var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.activeKey, t = this.getRelationNodes("../tabpanel/index");
            if (t.length > 0) {
                var n = a, i = this.data.currentIndex, l = t.map(function(e, t) {
                    return n = a || 0 !== t ? n : e.data.key, i = e.data.key === n ? t : i, {
                        tab: e.data.tab,
                        key: e.data.key,
                        icon: e.data.icon,
                        iconSize: e.data.iconSize,
                        image: e.data.image,
                        picPlacement: e.data.picPlacement
                    };
                });
                this.setData({
                    tabList: l,
                    activeKey: n,
                    currentIndex: i
                }, function() {
                    e.data.scrollable && e.queryMultipleNodes();
                });
            }
        },
        swiperChange: function(e) {
            var a = e.detail, t = a.source, n = a.current;
            if ("touch" === t) {
                var i = n, l = this.data.tabList[n].key;
                this._setChangeData({
                    activeKey: l,
                    currentIndex: i
                });
            }
        },
        handleChange: function(e) {
            var a = e.currentTarget.dataset.key, t = e.currentTarget.dataset.index;
            this._setChangeData({
                activeKey: a,
                currentIndex: t
            });
        },
        _setChangeData: function(e) {
            var a = this, t = e.activeKey, n = e.currentIndex;
            this.setData({
                activeKey: t,
                currentIndex: n
            }, function() {
                a.data.scrollable && a.queryMultipleNodes();
            }), this.triggerEvent("linchange", {
                activeKey: t,
                currentIndex: n
            });
        }
    }
});