Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = Behavior({
    methods: {
        getRect: function(e) {
            var t = this, r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return new Promise(function(o, n) {
                var c = wx.createSelectorQuery().in(t);
                (r ? c.selectAll(e) : c.select(e)).boundingClientRect(function(e) {
                    if (!e) return n("找不到元素");
                    o(e);
                }).exec();
            });
        },
        queryScrollNode: function(e, t) {
            var r = this, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "width";
            if (!(t < 0)) {
                var n = e[t];
                this.getRect(".l-tabsscroll").then(function(c) {
                    if (!c) return console.error("找不到元素");
                    var i = c[o], s = e.slice(0, t).reduce(function(e, t) {
                        return e + t[o];
                    }, 0);
                    s += (n[o] - i) / 2, "width" === o ? r.setData({
                        transformX: s,
                        transformY: 0
                    }) : r.setData({
                        transformX: 0,
                        transformY: s
                    });
                }).catch(function(e) {
                    console.error(e);
                });
            }
        },
        queryMultipleNodes: function() {
            var e = this, t = this.data, r = t.placement, o = t.currentIndex;
            this.getRect(".l-tabs-item", !0).then(function(t) {
                -1 !== [ "top", "bottom" ].indexOf(r) ? e.queryScrollNode(t, o) : e.queryScrollNode(t, o, "height");
            }).catch(function(e) {
                console.error(e);
            });
        }
    }
});

exports.default = e;