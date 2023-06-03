Component({
    properties: {
        lowerThreshold: {
            type: Number,
            value: 100
        },
        loading: {
            type: Boolean,
            value: !1
        },
        refreshLoading: {
            type: Boolean,
            value: !1,
            observer: function(e, t) {
                this.setData({
                    showRefresh: e
                });
            }
        }
    },
    data: {
        showRefresh: !1,
        forceRefresh: !1,
        nowScrollTop: 0
    },
    methods: {
        refreshStart: function(e) {
            var t = this;
            e.setTimeout ? setTimeout(function() {
                t.refresh();
            }, e.setTimeout) : this.refresh();
        },
        refreshMaxDown: function() {
            wx.vibrateShort();
        },
        refreshCancel: function() {
            this.setData({
                showRefresh: !1
            });
        },
        refresh: function() {
            this.setData({
                showRefresh: !0
            }), this.triggerEvent("refresh");
        },
        forceRefresh: function() {
            var e = this;
            this.setData({
                forceRefresh: !0
            }), wx.nextTick(function() {
                e.setData({
                    forceRefresh: !1
                });
            });
        },
        loadmore: function() {
            this.triggerEvent("loadmore");
        },
        onscroll: function(e) {
            var t = e.detail.scrollTop;
            this.setData({
                nowScrollTop: t
            });
        }
    }
});