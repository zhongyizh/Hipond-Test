var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), a = e(require("../../@babel/runtime/regenerator")), i = require("../../@babel/runtime/helpers/asyncToGenerator"), r = e(require("../core/utils/node-util")), s = e(require("../core/utils/data-util")), n = e(require("../core/utils/event-util")), o = e(require("../core/utils/pixel-util"));

Component({
    externalClasses: [ "l-tip-class", "l-tip-text-class", "l-sidebar-class", "l-selected-class", "l-unselected-class", "l-sidebar-item-class" ],
    relations: {
        "../index-anchor/index": {
            type: "child"
        }
    },
    options: {
        multipleSlots: !0,
        pureDataPattern: /^_/
    },
    lifetimes: {
        attached: function() {
            this.init();
        }
    },
    properties: {
        isStick: {
            type: Boolean,
            value: !1
        },
        scrollTop: {
            type: Number,
            value: 0
        },
        sidebarData: {
            type: Array,
            value: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]
        },
        showSidebar: {
            type: Boolean,
            value: !0
        },
        stickOffsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        _sidebar: {
            top: 0,
            height: 0,
            sidebarItemCenterPoints: [],
            isMoving: !1,
            sidebarItemRect: {}
        },
        _anchor: {
            anchorTopLocations: [],
            indexAnchorComponents: [],
            currentStickAnchorIndex: -1,
            anchorItemsHeight: []
        },
        _stickOffsetTopPx: 0,
        activeSidebarItem: 0,
        tipTop: 0,
        showTip: !1,
        tipHeight: 0
    },
    observers: {
        scrollTop: function(e) {
            this.setIndexListStyle(e);
        },
        stickOffsetTop: function(e) {
            this.setData({
                _stickOffsetTopPx: o.default.rpx2px(e)
            });
        }
    },
    methods: {
        init: function() {
            var e = this;
            return i(a.default.mark(function t() {
                return a.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, e.parseSidebarRect();

                      case 2:
                        return t.next = 4, e.parseSidebarItemRect();

                      case 4:
                        return t.next = 6, e.parseIndexAnchors();

                      case 6:
                        e.parseAnchorRect(), wx.lin = wx.lin || {}, wx.lin.setScrollTop = function(t) {
                            s.default.setDiffData(e, {
                                scrollTop: t
                            });
                        };

                      case 9:
                      case "end":
                        return t.stop();
                    }
                }, t);
            }))();
        },
        parseSidebarRect: function() {
            var e = this;
            return i(a.default.mark(function t() {
                var i;
                return a.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, r.default.getNodeRectFromComponent(e, ".sidebar");

                      case 2:
                        i = t.sent, e.setData({
                            "_sidebar.height": i.height,
                            "_sidebar.top": i.top
                        });

                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t);
            }))();
        },
        parseSidebarItemRect: function() {
            var e = this;
            return i(a.default.mark(function t() {
                var i, s, n, o, c, h, d, l, u, p;
                return a.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return i = e.data.sidebarData.length, t.next = 3, r.default.getNodeRectFromComponent(e, ".sidebar-item");

                      case 3:
                        return s = t.sent, n = e.data._sidebar.height / i, o = s.height, t.next = 8, r.default.getNodeFieldsFromComponent(e, ".sidebar-item", {
                            computedStyle: [ "margin-top" ]
                        });

                      case 8:
                        return c = t.sent, t.next = 11, r.default.getNodeFieldsFromComponent(e, ".tip", {
                            computedStyle: [ "height" ]
                        });

                      case 11:
                        for (h = t.sent, d = [], l = c["margin-top"].replace("px", ""), u = 1; u <= i; u++) d.push((2 * u - 1) * o / 2 + u * parseInt(l));
                        p = parseInt(h.height.replace("px", "")), e.setData({
                            tipHeight: p,
                            tipHeightOverflow: .205 * p,
                            "_sidebar.sidebarItemRect": s,
                            "_sidebar.sidebarItemHeight": n,
                            "_sidebar.sidebarItemRealHeight": o,
                            "_sidebar.sidebarItemCenterPoints": d
                        });

                      case 17:
                      case "end":
                        return t.stop();
                    }
                }, t);
            }))();
        },
        parseIndexAnchors: function() {
            var e = this.getRelationNodes("../index-anchor/index");
            if (e) {
                this.setData({
                    "_anchor.indexAnchorComponents": e
                });
                for (var t = 0; t < e.length; t++) e[t].setData({
                    anchorText: this.data.sidebarData[t]
                });
            } else console.error("获取 index-anchor 节点实例失败，请参考文档检查您的代码是否书写正确");
        },
        parseAnchorRect: function() {
            var e = this;
            return i(a.default.mark(function i() {
                var s, n, o, c, h, d, l;
                return a.default.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        s = [], n = [], o = e.data._anchor.indexAnchorComponents, c = t(o), a.prev = 2, 
                        c.s();

                      case 4:
                        if ((h = c.n()).done) {
                            a.next = 12;
                            break;
                        }
                        return d = h.value, a.next = 8, r.default.getNodeRectFromComponent(d, ".anchor");

                      case 8:
                        null !== (l = a.sent) && (s.push(l.top), n.push(l.height));

                      case 10:
                        a.next = 4;
                        break;

                      case 12:
                        a.next = 17;
                        break;

                      case 14:
                        a.prev = 14, a.t0 = a.catch(2), c.e(a.t0);

                      case 17:
                        return a.prev = 17, c.f(), a.finish(17);

                      case 20:
                        e.setData({
                            "_anchor.anchorTopLocations": s,
                            "_anchor.anchorItemsHeight": n
                        });

                      case 21:
                      case "end":
                        return a.stop();
                    }
                }, i, null, [ [ 2, 14, 17, 20 ] ]);
            }))();
        },
        switchTipShow: function(e) {
            s.default.setDiffData(this, {
                showTip: e
            });
        },
        switchSidebarIndex: function(e) {
            s.default.setDiffData(this, {
                activeSidebarItem: e
            });
        },
        switchIsMovingSidebar: function(e) {
            s.default.setDiffData(this, {
                "_sidebar.isMoving": e
            });
        },
        setIndexListStyle: function(e) {
            var t = this.countCurrentActiveIndex(e);
            void 0 !== t && (this.data.isStick && this.setAnchorStyle(e), this.data.showSidebar && !this.data._sidebar.isMoving && this.switchSidebarIndex(t));
        },
        setAnchorStyle: function(e) {
            var t = this.data._anchor, a = t.anchorTopLocations, i = t.anchorItemsHeight, r = t.indexAnchorComponents, s = this.countCurrentActiveIndex(e), n = r[s], o = a[s], c = i[s], h = a[s + 1], d = this.data._stickOffsetTopPx;
            if (e + d >= o && e + d <= h - c && !n.isFixed()) {
                n.setFixed(this.data.stickOffsetTop, c);
                for (var l = 0; l < r.length; l++) l !== s && r[l].clearStyle();
            } else if (e + d > h - c && e + d < h && !n.isRelative()) {
                n.setRelative(h - o - c);
                for (var u = 0; u < r.length; u++) u !== s && r[u].clearStyle();
            } else if (e + d < o) for (var p = 0; p < r.length; p++) r[p].clearStyle();
        },
        countCurrentActiveIndex: function(e) {
            for (var t = 0, a = this.data._anchor.anchorTopLocations, i = 0; i < a.length; i++) if (e + this.data._stickOffsetTopPx < a[i]) {
                t = i - 1;
                break;
            }
            return t < 0 && (t = 0), t;
        },
        onTouchMove: function(e) {
            this.switchTipShow(!0), this.switchIsMovingSidebar(!0);
            var t = this.data._sidebar, a = t.top, i = t.sidebarItemHeight, r = this.data.sidebarData.length, o = e.touches[0].clientY, c = Math.floor((o - a) / i);
            c < 0 ? c = 0 : c > r - 1 && (c = r - 1);
            var h = this.data.sidebarData[c];
            s.default.setDiffData(this, {
                tipText: h,
                activeSidebarItem: c,
                tipTop: this.data._sidebar.sidebarItemCenterPoints[c]
            });
            var d = this.data._anchor.anchorTopLocations[c] - this.data._stickOffsetTopPx;
            wx.pageScrollTo({
                duration: 0,
                scrollTop: d
            }), n.default.emit(this, "linselected", {
                index: c,
                tipText: h
            });
        },
        onTouchend: function() {
            var e = this;
            setTimeout(function() {
                e.switchTipShow(!1);
            }, 500), this.switchIsMovingSidebar(!1);
        },
        onTapSidebar: function(e) {
            this.onTouchMove(e);
        }
    }
});