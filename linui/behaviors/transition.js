Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../../@babel/runtime/helpers/typeof"), t = function(t) {
    var n = e(t);
    return null !== t && ("object" === n || "function" === n);
}, n = function(e) {
    return {
        enter: "l-".concat(e, "-enter l-").concat(e, "-enter-active l-enter-class l-enter-active-class"),
        "enter-to": "l-".concat(e, "-enter-to l-").concat(e, "-enter-active l-enter-to-class l-enter-active-class"),
        leave: "l-".concat(e, "-leave l-").concat(e, "-leave-active l-leave-class l-leave-active-class"),
        "leave-to": "l-".concat(e, "-leave-to l-").concat(e, "-leave-active l-leave-to-class l-leave-active-class")
    };
}, a = function() {
    return new Promise(function(e) {
        return setTimeout(e, 1e3 / 30);
    });
};

exports.default = function(e) {
    return Behavior({
        properties: {
            customStyle: String,
            show: {
                type: Boolean,
                value: e,
                observer: "observeShow"
            },
            duration: {
                type: null,
                value: 300,
                observer: "observeDuration"
            },
            name: {
                type: String,
                value: "fade"
            }
        },
        data: {
            type: "",
            inited: !1,
            display: !1
        },
        attached: function() {
            this.data.show && this.enter();
        },
        methods: {
            observeShow: function(e) {
                e ? this.enter() : this.leave();
            },
            enter: function() {
                var e = this, s = this.data, i = s.duration, r = s.name, o = n(r), c = t(i) ? i.enter : i;
                this.status = "enter", this.triggerEvent("linbeforeenter"), Promise.resolve().then(a).then(function() {
                    e.checkStatus("enter"), e.triggerEvent("linenter"), e.setData({
                        inited: !0,
                        display: !0,
                        classes: o.enter,
                        currentDuration: c
                    });
                }).then(a).then(function() {
                    e.checkStatus("enter"), e.transitionEnded = !1, e.setData({
                        classes: o["enter-to"]
                    });
                }).catch(function() {});
            },
            leave: function() {
                var e = this;
                if (this.data.display) {
                    var s = this.data, i = s.duration, r = s.name, o = n(r), c = t(i) ? i.leave : i;
                    this.status = "leave", this.triggerEvent("linbeforeleave"), Promise.resolve().then(a).then(function() {
                        e.checkStatus("leave"), e.triggerEvent("linleave"), e.setData({
                            classes: o.leave,
                            currentDuration: c
                        });
                    }).then(a).then(function() {
                        e.checkStatus("leave"), e.transitionEnded = !1, setTimeout(function() {
                            return e.onTransitionEnd();
                        }, c), e.setData({
                            classes: o["leave-to"]
                        });
                    }).catch(function() {});
                }
            },
            checkStatus: function(e) {
                if (e !== this.status) throw new Error("incongruent status: " + e);
            },
            onTransitionEnd: function() {
                if (!this.transitionEnded) {
                    this.transitionEnded = !0, this.triggerEvent("linafter" + this.status);
                    var e = this.data, t = e.show, n = e.display;
                    !t && n && this.setData({
                        display: !1
                    });
                }
            }
        }
    });
};