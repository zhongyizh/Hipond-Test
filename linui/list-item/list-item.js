var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../utils/getSystemInfo.js"));

Component({
    properties: {},
    data: {
        height: 0,
        showSlot: !0,
        itemId: ""
    },
    created: function() {
        this.extData = {
            listItemContainer: null
        };
    },
    detached: function() {
        try {
            this.extData.listItemContainer.disconnect();
        } catch (t) {}
        this.extData = null;
    },
    ready: function() {
        var e = this;
        this.setData({
            itemId: this.randomString(8)
        }), wx.nextTick(function() {
            var i = t.default.getInfo().source.system.windowHeight, o = void 0 === i ? 667 : i;
            try {
                e.extData.listItemContainer = e.createIntersectionObserver(), e.extData.listItemContainer.relativeToViewport({
                    top: 2 * o,
                    bottom: 2 * o
                }).observe("#list-item-".concat(e.data.itemId), function(t) {
                    0 === t.intersectionRatio ? (console.log("【卸载】", e.data.itemId, "超过预定范围，从页面卸载"), 
                    e.setData({
                        showSlot: !1
                    })) : (console.log("【进入】", e.data.itemId, "达到预定范围，渲染进页面"), e.setData({
                        showSlot: !0,
                        height: t.boundingClientRect.height
                    }));
                });
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                console.log(t);
            }
        });
    },
    methods: {
        randomString: function(t) {
            t = t || 32;
            for (var e = "abcdefhijkmnprstwxyz2345678", i = e.length, o = "", a = 0; a < t; a++) o += e.charAt(Math.floor(Math.random() * i));
            return o;
        }
    }
});