var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = e(require("../../@babel/runtime/regenerator")), r = require("../../@babel/runtime/helpers/asyncToGenerator"), n = e(require("../core/utils/node-util"));

Component({
    externalClasses: [ "l-anchor-class" ],
    options: {
        multipleSlots: !0,
        pureDataPattern: /^_/
    },
    relations: {
        "../index-list/index": {
            type: "parent"
        }
    },
    data: {
        anchorSlot: {
            height: -1
        },
        anchor: {
            height: 0
        },
        anchorText: "",
        anchorStyle: "",
        anchorWrapperStyle: ""
    },
    lifetimes: {
        attached: function() {
            this.parseAnchorSlotRect();
        }
    },
    methods: {
        parseAnchorSlotRect: function() {
            var e = this;
            return r(t.default.mark(function r() {
                var a;
                return t.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, n.default.getNodeRectFromComponent(e, ".anchor-slot");

                      case 2:
                        (a = t.sent) ? e.setData({
                            "anchorSlot.height": a.height
                        }) : e.setData({
                            "anchorSlot.height": 0
                        });

                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, r);
            }))();
        },
        parseAnchorRect: function() {
            var e = this;
            return r(t.default.mark(function r() {
                var a;
                return t.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, n.default.getNodeRectFromComponent(e, ".anchor");

                      case 2:
                        (a = t.sent) && e.setData({
                            "anchor.height": a.height
                        });

                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, r);
            }))();
        },
        setFixed: function(e, t) {
            var r = "\n        position:fixed;\n        top:".concat(e, "rpx;\n      "), n = "height:".concat(t, "px;");
            this.setData({
                anchorStyle: r,
                anchorWrapperStyle: n
            });
        },
        setRelative: function(e) {
            var t = "\n        position:relative;\n        transform: translate3d(0, ".concat(e, "px, 0);\n       ");
            this.setData({
                anchorStyle: t
            });
        },
        clearStyle: function() {
            this.setData({
                anchorStyle: "",
                anchorWrapperStyle: ""
            });
        },
        isRelative: function() {
            return this.data.anchorStyle.indexOf("relative") > 0;
        },
        isFixed: function() {
            return this.data.anchorStyle.indexOf("fixed") > 0;
        }
    }
});