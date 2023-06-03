var e, t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/regenerator")), a = require("../../@babel/runtime/helpers/defineProperty"), r = require("../../@babel/runtime/helpers/asyncToGenerator");

Component({
    relations: {
        "../image-clipper/index": {
            type: "parent"
        }
    },
    externalClasses: [ "l-class" ],
    properties: {
        zIndex: {
            type: Number,
            value: 999
        },
        lockWidth: {
            type: Boolean,
            value: !1
        },
        lockHeight: {
            type: Boolean,
            value: !1
        },
        lockRatio: {
            type: Boolean,
            value: !1
        },
        disableScale: {
            type: Number,
            value: !1
        },
        disableRotate: {
            type: Number,
            value: !1
        },
        limitMove: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        formColor: "#3963bc",
        lockWidthValue: !1,
        lockHeightValue: !1,
        lockRatioValue: !0,
        disableScaleValue: !1,
        disableRotateValue: !1,
        limitMoveValue: !1
    },
    methods: {
        bindSwitchChange: (e = r(t.default.mark(function e(r) {
            var l, i, o;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return l = r.detail.value, i = r.currentTarget.dataset.type, o = this.getRelationNodes("../image-clipper/index")[0], 
                    e.next = 5, o.setData(a({}, i, l));

                  case 5:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function(t) {
            return e.apply(this, arguments);
        })
    }
});