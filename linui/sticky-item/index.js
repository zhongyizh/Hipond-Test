var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../@babel/runtime/regenerator")), i = require("../../@babel/runtime/helpers/asyncToGenerator"), a = e(require("../core/utils/node-util"));

Component({
    externalClasses: [ "l-class", "l-header-wrapper-class", "l-header-class", "l-header-sticky-class", "l-body-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../sticky/index": {
            type: "parent"
        }
    },
    properties: {
        top: {
            type: Number,
            value: 0
        }
    },
    data: {
        mode: void 0,
        index: void 0,
        isFixedTop: !1,
        stickyItemTop: 0,
        stickyItemHeight: 0,
        stickyItemWrapperHeight: void 0
    },
    lifetimes: {
        ready: function() {
            var e = this.getParentComponent().data.mode;
            this.setData({
                mode: e
            });
        }
    },
    methods: {
        updateStickyItemPosition: function(e) {
            var t = this.getParentComponent(), i = this.data, a = i.index, r = i.stickyItemTop, n = i.stickyItemHeight, s = i.top, o = e > r - s && e < n + r - s;
            this.data.isFixedTop !== o && (o ? t.triggerEvent("linsticky", {
                index: a
            }) : t.triggerEvent("linunsticky", {
                index: a
            }), this.setData({
                isFixedTop: o
            }));
        },
        updateStickyItemBaseData: function(e) {
            var r = this;
            return i(t.default.mark(function i() {
                var n, s, o;
                return t.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return r.setData({
                            index: e
                        }), n = r.getParentComponent().data.scrollTop, t.next = 4, a.default.getNodeRectFromComponent(r, ".l-sticky-item");

                      case 4:
                        return s = t.sent, r.setData({
                            stickyItemTop: s.top + n,
                            stickyItemHeight: s.height
                        }), t.next = 8, a.default.getNodeRectFromComponent(r, ".l-sticky-item-header");

                      case 8:
                        o = t.sent, r.setData({
                            stickyItemWrapperHeight: o.height
                        });

                      case 10:
                      case "end":
                        return t.stop();
                    }
                }, i);
            }))();
        },
        getParentComponent: function() {
            var e = this.getRelationNodes("../sticky/index");
            if (0 !== e.length) return e[0];
        }
    }
});