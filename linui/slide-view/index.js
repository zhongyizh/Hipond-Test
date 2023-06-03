var t = wx.getSystemInfoSync().windowWidth;

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        width: {
            type: Number,
            value: t
        },
        height: {
            type: Number,
            value: 100
        },
        slideWidth: {
            type: Number,
            value: 0
        },
        threshold: {
            type: Number,
            value: 0
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        autoClose: {
            type: Boolean,
            value: !1
        },
        close: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                t && (this.setData({
                    popup: !1,
                    x: 0
                }), this.onCloseTap());
            }
        }
    },
    data: {
        viewWidth: t,
        x: 0,
        out: !1
    },
    ready: function() {
        this.updateRight();
    },
    methods: {
        updateRight: function() {
            var e = this;
            wx.createSelectorQuery().in(this).select(".right").boundingClientRect(function(i) {
                e._slideWidth = i.width;
                var s = i.width <= 50 ? i.width : 50;
                e._threshold = e.properties.threshold ? e.properties.threshold : s, e._viewWidth = e.data.width + i.width * (750 / t), 
                e.setData({
                    viewWidth: e._viewWidth
                });
            }).exec();
        },
        onTouchStart: function(t) {
            this._startX = t.changedTouches[0].pageX;
        },
        onTouchEnd: function(t) {
            if (!this.properties.disabled) {
                this._endX = t.changedTouches[0].pageX, this._length = this._endX - this._startX;
                var e = this._endX, i = this._startX, s = this._threshold;
                this._length > s && (this.setData({
                    popup: !1,
                    x: 0
                }), this.onCloseTap()), e > i && !1 === this.data.out || (i - e >= s ? (this.setData({
                    x: -this._slideWidth,
                    popup: !0,
                    close: !1
                }), this.onOpenTap()) : i - e < s && i - e > 0 && !0 !== this.data.popup || e - i >= s ? (this.setData({
                    x: 0
                }), this.onCloseTap()) : e - i < s && e - i > 0 && (this.setData({
                    x: -this._slideWidth,
                    close: !1
                }), this.onOpenTap()));
            }
        },
        onChange: function(t) {
            !this.data.out && t.detail.x < -this._threshold ? this.setData({
                out: !0
            }) : this.data.out && t.detail.x >= -this._threshold && this.setData({
                out: !1
            });
        },
        onRightTap: function() {
            this.properties.autoClose && (this.setData({
                popup: !1,
                x: 0
            }), this.onCloseTap()), this.triggerEvent("lintap", "click right", {
                bubbles: !0,
                composed: !0
            });
        },
        onOpenTap: function() {
            this.triggerEvent("slideopen", !0, {
                bubbles: !0,
                composed: !0
            });
        },
        onCloseTap: function() {
            this.triggerEvent("slideclose", !1, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});