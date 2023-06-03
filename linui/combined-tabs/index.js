var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../@babel/runtime/regenerator")), a = require("../../@babel/runtime/helpers/asyncToGenerator"), n = require("../../@babel/runtime/helpers/defineProperty"), i = e(require("../core/utils/node-util"));

Component({
    externalClasses: [ "l-class-header", "l-class-active", "l-class-inactive", "l-class-line", "l-class-tabimage", "l-header-class", "l-active-class", "l-inactive-class", "l-line-class", "l-tabimage-class", "l-content-class" ],
    relations: {
        "../tabpanel/index": {
            type: "child"
        },
        linked: function() {
            this.initTabs();
        }
    },
    options: {
        multipleSlots: !0
    },
    properties: {
        activeKey: {
            type: String,
            value: "",
            observer: "changeCurrent"
        },
        placement: {
            type: String,
            value: "top"
        },
        aminmated: Boolean,
        scrollable: Boolean,
        swipeable: {
            type: Boolean,
            value: !0
        },
        hasLine: {
            type: Boolean,
            value: !0
        },
        activeColor: {
            type: String,
            value: "#333333"
        },
        inactiveColor: {
            type: String,
            value: "#bbbbbb"
        }
    },
    data: {
        tabList: [],
        currentIndex: 0,
        transformX: 0,
        transformY: 0
    },
    ready: function() {
        this.initTabs();
    },
    methods: {
        initTabs: function() {
            this.initTabList(), this.initActiveIndex();
        },
        initActiveIndex: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.activeKey, a = t, n = this.data.currentIndex;
            this.data.tabList.forEach(function(e, i) {
                a = t || 0 !== i ? a : e.key, n = e.key === a ? i : n;
            }), this.setData({
                activeKey: a,
                currentIndex: n
            }, function() {
                e.data.scrollable && e.queryMultipleNodes();
            });
        },
        initTabList: function() {
            var e = this, t = this.getRelationNodes("../tabpanel/index");
            if (t.length > 0) {
                var a = [];
                t.forEach(function(t) {
                    var n = a.findIndex(function(e) {
                        return e.tab === t.data.tab;
                    }), i = {};
                    -1 === n && (i = {
                        tab: t.data.tab,
                        key: t.data.key,
                        icon: t.data.icon,
                        iconStyle: t.data.iconStyle,
                        image: t.data.image,
                        subTabs: []
                    }, a.push(i));
                    var r = -1 === n ? i : a[n];
                    if (t.data.subTab) {
                        r.subTabs = r.subTabs || [];
                        var s = {
                            tab: t.data.subTab,
                            key: t.data.subKey
                        };
                        r.subTabs.push(s), r.activeSubKey = e.data.subActiveKey || r.subTabs[0].key, r.subCurrentIndex = 0;
                    }
                }), this.setData({
                    tabList: a
                });
            }
        },
        swiperChange: function(e) {
            var t = e.detail, a = t.source, n = t.current;
            if ("touch" === a) {
                var i = n, r = this.data.tabList[n].key, s = this.data.tabList[i].subCurrentIndex, u = this.data.tabList[i].activeSubKey;
                this._setChangeData({
                    activeKey: r,
                    currentIndex: i,
                    subCurrentIndex: s,
                    activeSubKey: u
                });
            }
        },
        subSwiperChange: function(e) {
            var t = e.detail, a = t.source, i = t.current;
            if ("touch" === a) {
                var r = this.data, s = r.currentIndex, u = r.activeKey, c = i, b = this.data.tabList[s].subTabs[c].key, l = this.data.tabList[s];
                l.activeSubKey = b, l.subCurrentIndex = c, this.setData(n({}, "tabList[".concat(s, "]"), l)), 
                this._setChangeData({
                    activeKey: u,
                    currentIndex: s,
                    activeSubKey: b,
                    subCurrentIndex: c
                });
            }
        },
        handleChange: function(e) {
            var t = "subTab" === e.currentTarget.dataset.headerType, a = this.data, i = a.currentIndex, r = a.activeKey, s = e.currentTarget.dataset.index, u = t ? s : this.data.tabList[s].subCurrentIndex, c = t ? this.data.tabList[i].subTabs[u].key : this.data.tabList[s].activeSubKey;
            if (t) {
                var b = this.data.tabList[i];
                b.activeSubKey = c, b.subCurrentIndex = u, this.setData(n({}, "tabList[".concat(i, "]"), b)), 
                this._setChangeData({
                    activeKey: r,
                    currentIndex: i,
                    activeSubKey: c,
                    subCurrentIndex: u
                });
            } else {
                var l = e.currentTarget.dataset.key;
                this._setChangeData({
                    activeKey: l,
                    currentIndex: s,
                    subCurrentIndex: u,
                    activeSubKey: c
                });
            }
        },
        _setChangeData: function(e) {
            var t = this, a = e.activeKey, n = e.currentIndex, i = e.activeSubKey, r = void 0 === i ? "" : i, s = e.subCurrentIndex, u = void 0 === s ? null : s;
            this.setData({
                activeKey: a,
                currentIndex: n
            }, function() {
                t.data.scrollable && t.queryMultipleNodes();
            }), this.triggerEvent("linchange", {
                activeKey: a,
                currentIndex: n,
                activeSubKey: r,
                subCurrentIndex: u
            });
        },
        queryMultipleNodes: function() {
            var e = this;
            return a(t.default.mark(function a() {
                var n, r, s, u, c, b, l;
                return t.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return n = e.data, r = n.placement, s = n.activeKey, u = n.tabList, t.next = 6, 
                        i.default.getNodeRectFromComponent(e, "#" + s);

                      case 6:
                        if (c = t.sent, -1 === [ "top", "bottom" ].indexOf(r)) {
                            t.next = 11;
                            break;
                        }
                        e.setData({
                            transformX: c.left - u.length / 2 * c.width,
                            transformY: 0
                        }), t.next = 16;
                        break;

                      case 11:
                        return t.next = 13, i.default.getNodeRectFromComponent(e, ".l-tabs-header");

                      case 13:
                        b = t.sent, l = c.top - b.top - b.height / 2, e.setData({
                            transformX: 0,
                            transformY: l
                        });

                      case 16:
                      case "end":
                        return t.stop();
                    }
                }, a);
            }))();
        }
    }
});