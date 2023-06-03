var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), i = t(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-class" ],
    behaviors: [ i.default ],
    relations: {
        "../sticky-item/index": {
            type: "child",
            linked: function() {
                var t = this;
                this.checkSupportCssSticky().then(function(e) {
                    e || t.updateStickyItemsSizeData();
                }).catch(function(t) {
                    console.error(t);
                });
            },
            linkChanged: function() {
                var t = this;
                this.checkSupportCssSticky().then(function(e) {
                    e || t.updateStickyItemsSizeData();
                }).catch(function(t) {
                    console.error(t);
                });
            },
            unlinked: function() {
                var t = this;
                this.checkSupportCssSticky().then(function(e) {
                    e || t.updateStickyItemsSizeData();
                }).catch(function(t) {
                    console.error(t);
                });
            }
        }
    },
    properties: {
        mode: {
            type: String,
            value: "js",
            options: [ "js", "css" ]
        },
        scrollTop: Number
    },
    observers: {
        scrollTop: function() {
            var t = this;
            this.checkSupportCssSticky().then(function(e) {
                e || t.updateStickyItemsPosition();
            }).catch(function(t) {
                console.error(t);
            });
        }
    },
    lifetimes: {
        attached: function() {
            var t = this;
            this.checkSupportCssSticky().then(function(e) {
                e || t.initSticky();
            }).catch(function(t) {
                console.error(t);
            });
        }
    },
    methods: {
        initSticky: function() {
            var t = this;
            wx.lin = wx.lin || {}, wx.lin.flushSticky = function() {
                t.updateStickyItemsSizeData();
            }, wx.lin.setScrollTop = function(e) {
                t.data.scrollTop = e, t.checkSupportCssSticky().then(function(e) {
                    e || t.updateStickyItemsPosition();
                }).catch(function(t) {
                    console.error(t);
                });
            };
        },
        updateStickyItemsPosition: function() {
            var t, i = this.getStickyItemNodes(), c = e(i);
            try {
                for (c.s(); !(t = c.n()).done; ) {
                    t.value.updateStickyItemPosition(this.data.scrollTop);
                }
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                c.e(t);
            } finally {
                c.f();
            }
        },
        updateStickyItemsSizeData: function() {
            this.getStickyItemNodes().forEach(function(t, e) {
                t.updateStickyItemBaseData(e);
            });
        },
        getStickyItemNodes: function() {
            return this.getRelationNodes("../sticky-item/index");
        },
        checkSupportCssSticky: function() {
            var t = this;
            return new Promise(function(e) {
                var i = t.getStickyItemNodes();
                0 === i.length && e(!1), wx.createSelectorQuery().in(i[0]).select(".l-sticky-item-header").fields({
                    computedStyle: [ "position" ]
                }).exec(function(t) {
                    null === t[0] ? e(!1) : e("sticky" === t[0].position);
                });
            });
        }
    }
});