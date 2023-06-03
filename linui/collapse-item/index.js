var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../@babel/runtime/regenerator")), n = require("../../@babel/runtime/helpers/asyncToGenerator"), a = e(require("../core/utils/node-util"));

Component({
    externalClasses: [ "l-class", "l-title-class", "l-body-class" ],
    relations: {
        "../collapse/index": {
            type: "parent"
        }
    },
    options: {
        multipleSlots: !0,
        pureDataPattern: /^_/
    },
    properties: {
        itemId: {
            type: String,
            value: "default"
        },
        title: {
            type: String,
            value: "默认标题"
        },
        customTitle: {
            type: Boolean,
            value: !1
        },
        disable: {
            type: Boolean,
            value: !1
        },
        animationTime: {
            type: String,
            value: "0.3"
        }
    },
    data: {
        bodyHeight: "0",
        isExpandContent: !1,
        _idDefault: -1
    },
    methods: {
        onTapTitle: function() {
            var e = this;
            return n(t.default.mark(function n() {
                var a;
                return t.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (!e.data.disable) {
                            t.next = 2;
                            break;
                        }
                        return t.abrupt("return");

                      case 2:
                        return a = e.getRelationNodes("../collapse/index"), t.next = 5, a[0].onTapCollapseItem(e);

                      case 5:
                      case "end":
                        return t.stop();
                    }
                }, n);
            }))();
        },
        foldContent: function() {
            var e = this;
            return n(t.default.mark(function n() {
                var r;
                return t.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, a.default.getNodeRectFromComponent(e, ".container-body-wrapper");

                      case 2:
                        r = t.sent, e.data.isExpandContent ? (e.setData({
                            bodyHeight: r.height + "px"
                        }), setTimeout(function() {
                            e.setData({
                                isExpandContent: !1,
                                bodyHeight: "0px"
                            });
                        }, 20)) : e.setData({
                            isExpandContent: !1,
                            bodyHeight: "0px"
                        });

                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, n);
            }))();
        },
        expandContent: function() {
            var e = this;
            return n(t.default.mark(function n() {
                var r;
                return t.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, a.default.getNodeRectFromComponent(e, ".container-body-wrapper");

                      case 2:
                        r = t.sent, e.setData({
                            isExpandContent: !0,
                            bodyHeight: r.height + "px"
                        });

                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, n);
            }))();
        },
        onTransitionend: function() {
            this.data.isExpandContent && this.setData({
                bodyHeight: "auto"
            });
        }
    }
});