Component({
    properties: {
        config: {
            type: Object,
            value: {}
        },
        preload: {
            type: Boolean,
            value: !1
        },
        hideLoading: {
            type: Boolean,
            value: !1
        }
    },
    ready: function() {
        var t = this;
        if (this.data.preload) {
            var o = this.selectComponent("#poster");
            this.downloadStatus = "doing", o.downloadResource(this.data.config).then(function() {
                t.downloadStatus = "success", t.trigger("downloadSuccess");
            }).catch(function(o) {
                t.downloadStatus = "fail", t.trigger("downloadFail", o);
            });
        }
    },
    methods: {
        trigger: function(t, o) {
            this.listener && "function" == typeof this.listener[t] && this.listener[t](o);
        },
        once: function(t, o) {
            void 0 === this.listener && (this.listener = {}), this.listener[t] = o;
        },
        downloadResource: function(t) {
            var o = this;
            return new Promise(function(e, n) {
                t && (o.downloadStatus = null);
                var i = o.selectComponent("#poster");
                o.downloadStatus && "fail" !== o.downloadStatus ? "success" === o.downloadStatus ? e() : (o.once("downloadSuccess", function() {
                    return e();
                }), o.once("downloadFail", function(t) {
                    return n(t);
                })) : i.downloadResource(o.data.config).then(function() {
                    o.downloadStatus = "success", e();
                }).catch(function(t) {
                    return n(t);
                });
            });
        },
        onCreate: function() {
            var t = this, o = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return !this.data.hideLoading && wx.showLoading({
                mask: !0,
                title: "生成中"
            }), this.downloadResource("boolean" == typeof o && o).then(function() {
                !t.data.hideLoading && wx.hideLoading(), t.selectComponent("#poster").create(t.data.config);
            }).catch(function(o) {
                !t.data.hideLoading && wx.hideLoading(), wx.showToast({
                    icon: "none",
                    title: o.errMsg || "生成失败"
                }), console.error(o), t.triggerEvent("fail", o);
            });
        },
        onCreateSuccess: function(t) {
            var o = t.detail;
            this.triggerEvent("success", o);
        },
        onCreateFail: function(t) {
            console.error(t), this.triggerEvent("fail", t);
        }
    }
});