var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/hover"));

Component({
    behaviors: [ t.default ],
    externalClasses: [ "l-class", "l-symbol-class", "l-count-class", "l-disabled-class" ],
    properties: {
        count: {
            type: Number,
            value: 1
        },
        max: {
            type: Number,
            value: 9999
        },
        min: {
            type: Number,
            value: 1
        },
        step: {
            type: Number,
            value: 1
        },
        disabled: Boolean,
        iconSize: String,
        iconColor: String
    },
    data: {
        focus: !1,
        result: 1
    },
    observers: {
        "count,min,max": function() {
            this.valueRange(this.data.count, "parameter");
        }
    },
    methods: {
        doNothing: function(t) {
            var e = t.currentTarget.dataset.type;
            this.triggerEvent("linout", {
                type: e,
                way: "icon"
            }, {
                bubbles: !0,
                composed: !0
            });
        },
        onCount: function() {
            this.setData({
                focus: !0
            });
        },
        onBlur: function(t) {
            var e = this;
            this.setData({
                focus: !1
            });
            var s = t.detail.value;
            setTimeout(function() {
                e.blurCount(Number(s), function() {
                    e.data.count = e.data.result, e.triggerEvent("lintap", {
                        count: e.data.result,
                        type: "blur"
                    }, {
                        bubbles: !0,
                        composed: !0
                    });
                });
            }, 50);
        },
        blurCount: function(t, e) {
            t ? this.valueRange(t) : this.setData({
                result: this.properties.count
            }), e && e();
        },
        valueRange: function(t) {
            var e = this, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "input";
            t > this.properties.max ? this.setData({
                result: this.properties.max
            }, function() {
                e.triggerEvent("linout", {
                    type: "overflow_max",
                    way: s
                }, {
                    bubbles: !0,
                    composed: !0
                });
            }) : t < this.properties.min ? this.setData({
                result: this.properties.min
            }, function() {
                e.triggerEvent("linout", {
                    type: "overflow_min",
                    way: s
                }, {
                    bubbles: !0,
                    composed: !0
                });
            }) : this.setData({
                result: t
            });
        },
        reduceTap: function() {
            this.data.count - this.properties.step <= this.properties.min ? this.data.count = this.properties.min : this.data.count -= this.properties.step, 
            this.setData({
                result: this.data.count
            }), this.triggerEvent("lintap", {
                count: this.data.result,
                type: "reduce"
            }, {
                bubbles: !0,
                composed: !0
            });
        },
        addTap: function() {
            this.data.count + this.properties.step >= this.properties.max ? this.data.count = this.properties.max : this.data.count += this.properties.step, 
            this.setData({
                result: this.data.count
            }), this.triggerEvent("lintap", {
                count: this.data.result,
                type: "add"
            }, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});