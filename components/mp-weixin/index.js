var e = require("./parser"), t = [];

Component({
    data: {
        nodes: []
    },
    properties: {
        containerStyle: String,
        content: {
            type: String,
            value: "",
            observer: function(e) {
                this.setContent(e);
            }
        },
        copyLink: {
            type: Boolean,
            value: !0
        },
        domain: String,
        errorImg: String,
        lazyLoad: Boolean,
        loadingImg: String,
        pauseVideo: {
            type: Boolean,
            value: !0
        },
        previewImg: {
            type: Boolean,
            value: !0
        },
        scrollTable: Boolean,
        selectable: null,
        setTitle: {
            type: Boolean,
            value: !0
        },
        showImgMenu: {
            type: Boolean,
            value: !0
        },
        tagStyle: Object,
        useAnchor: null
    },
    created: function() {
        this.plugins = [];
        for (var e = t.length; e--; ) this.plugins.push(new t[e](this));
    },
    detached: function() {
        clearInterval(this._timer), this._hook("onDetached");
    },
    methods: {
        in: function(e, t, n) {
            e && t && n && (this._in = {
                page: e,
                selector: t,
                scrollTop: n
            });
        },
        navigateTo: function(e, t) {
            var n = this;
            return new Promise(function(o, i) {
                if (n.data.useAnchor) {
                    var r = wx.createSelectorQuery().in(n._in ? n._in.page : n).select((n._in ? n._in.selector : "._root") + (e ? "".concat(">>>", "#").concat(e) : "")).boundingClientRect();
                    n._in ? r.select(n._in.selector).scrollOffset().select(n._in.selector).boundingClientRect() : r.selectViewport().scrollOffset(), 
                    r.exec(function(e) {
                        if (e[0]) {
                            var r = e[1].scrollTop + e[0].top - (e[2] ? e[2].top : 0) + (t || parseInt(n.data.useAnchor) || 0);
                            n._in ? n._in.page.setData(function(e, t, n) {
                                return t in e ? Object.defineProperty(e, t, {
                                    value: n,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : e[t] = n, e;
                            }({}, n._in.scrollTop, r)) : wx.pageScrollTo({
                                scrollTop: r,
                                duration: 300
                            }), o();
                        } else i(Error("Label not found"));
                    });
                } else i(Error("Anchor is disabled"));
            });
        },
        getText: function(e) {
            var t = "";
            return function e(n) {
                for (var o = 0; o < n.length; o++) {
                    var i = n[o];
                    if ("text" === i.type) t += i.text.replace(/&amp;/g, "&"); else if ("br" === i.name) t += "\n"; else {
                        var r = "p" === i.name || "div" === i.name || "tr" === i.name || "li" === i.name || "h" === i.name[0] && i.name[1] > "0" && i.name[1] < "7";
                        r && t && "\n" !== t[t.length - 1] && (t += "\n"), i.children && e(i.children), 
                        r && "\n" !== t[t.length - 1] ? t += "\n" : "td" !== i.name && "th" !== i.name || (t += "\t");
                    }
                }
            }(e || this.data.nodes), t;
        },
        getRect: function() {
            var e = this;
            return new Promise(function(t, n) {
                wx.createSelectorQuery().in(e).select("._root").boundingClientRect().exec(function(e) {
                    return e[0] ? t(e[0]) : n(Error("Root label not found"));
                });
            });
        },
        setContent: function(t, n) {
            var o = this;
            this.imgList && n || (this.imgList = []), this._videos = [];
            var i, r = {}, a = new e(this).parse(t);
            if (n) for (var l = this.data.nodes.length, s = a.length; s--; ) r["nodes[".concat(l + s, "]")] = a[s]; else r.nodes = a;
            this.setData(r, function() {
                o._hook("onLoad"), o.triggerEvent("load");
            }), clearInterval(this._timer), this._timer = setInterval(function() {
                o.getRect().then(function(e) {
                    e.height === i && (o.triggerEvent("ready", e), clearInterval(o._timer)), i = e.height;
                }).catch(function() {});
            }, 350);
        },
        _hook: function(e) {
            for (var n = t.length; n--; ) this.plugins[n][e] && this.plugins[n][e]();
        },
        _add: function(e) {
            e.detail.root = this;
        }
    }
});