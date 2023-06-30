Component({
    options: {
        multipleSlots: !0,
        addGlobalClass: !0
    },
    properties: {
        extClass: {
            type: String,
            value: ""
        },
        background: {
            type: String,
            observer: "_showChange"
        },
        backgroundColorTop: {
            type: String,
            observer: "_showChangeBackgroundColorTop"
        },
        color: {
            type: String,
            value: "rgba(255, 255, 255, 1)"
        },
        title: {
            type: String,
            value: ""
        },
        searchText: {
            type: Array,
            value: [ "搜索" ]
        },
        searchBar: {
            type: Boolean,
            value: !1
        },
        back: {
            type: Boolean,
            value: !1
        },
        home: {
            type: Boolean,
            value: !1
        },
        iconTheme: {
            type: String,
            value: ""
        },
        animated: {
            type: Boolean,
            value: !0
        },
        show: {
            type: Boolean,
            value: !0,
            observer: "_showChange"
        },
        delta: {
            type: Number,
            value: 1
        }
    },
    created: function() {
        this.getSystemInfo();
    },
    attached: function() {
        this.setStyle();
    },
    data: {},
    pageLifetimes: {
        show: function() {
            getApp().globalSystemInfo.ios && (this.getSystemInfo(), this.setStyle());
        },
        hide: function() {}
    },
    methods: {
        setStyle: function(t) {
            var e = getApp().globalSystemInfo, n = e.statusBarHeight, i = e.navBarHeight, a = e.capsulePosition, o = e.navBarExtendHeight, r = e.ios, s = e.windowWidth, h = this.data, g = h.back, l = h.home, u = h.title, c = s - a.right, d = s - a.left, p = [ "color: " + this.data.color, "background: " + this.data.background, "height:" + (i + o) + "px", "padding-top:" + n + "px", "padding-right:" + d + "px", "padding-bottom:" + o + "px" ].join(";"), B = [];
            B = g && l || u ? [ "width:" + a.width + "px", "height:" + a.height + "px", "margin-left:" + c + "px" ].join(";") : g && !l || !g && l ? [ "width:" + a.width + "px", "height:" + a.height + "px" ].join(";") : [ "width:auto", "margin-left:" + c + "px" ].join(";"), 
            "created" === t ? this.data = {
                navigationbarinnerStyle: p,
                navBarLeft: B,
                navBarHeight: i,
                capsulePosition: a,
                navBarExtendHeight: o,
                ios: r
            } : this.setData({
                navigationbarinnerStyle: p,
                navBarLeft: B,
                navBarHeight: i,
                capsulePosition: a,
                navBarExtendHeight: o,
                ios: r
            });
        },
        _showChange: function() {
            this.setStyle();
        },
        back: function() {
            wx.navigateBack();
        },
        home: function() {
            wx.switchTab({
                url: "/pages/tabbar/index/index"
            });
        },
        search: function() {
            this.triggerEvent("search", {});
        },
        checkRect: function(t) {
            return !(t.width && t.top && t.left && t.height);
        },
        getMenuButtonBoundingClientRect: function(t) {
            var e = !!(t.system.toLowerCase().search("ios") + 1), n = void 0;
            try {
                if (null === (n = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null)) throw new Error("getMenuButtonBoundingClientRect error");
                if (this.checkRect(n)) throw new Error("getMenuButtonBoundingClientRect error");
            } catch (o) {
                o = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(o);
                var i = "", a = 96;
                "android" === t.platform ? (i = 8, a = 96) : "devtools" === t.platform ? i = e ? 5.5 : 7.5 : (i = 4, 
                a = 88), t.statusBarHeight || (t.statusBarHeight = t.screenHeight - t.windowHeight - 20), 
                n = {
                    bottom: t.statusBarHeight + i + 32,
                    height: 32,
                    left: t.windowWidth - a - 10,
                    right: t.windowWidth - 10,
                    top: t.statusBarHeight + i,
                    width: a
                };
            }
            return n;
        },
        getSystemInfo: function() {
            var t = getApp();
            if (t.globalSystemInfo && !t.globalSystemInfo.ios) return t.globalSystemInfo;
            var e, n = wx.getSystemInfoSync(), i = !!(n.system.toLowerCase().search("ios") + 1), a = this.getMenuButtonBoundingClientRect(n), o = "";
            return n.statusBarHeight ? (e = a.top - n.statusBarHeight, o = n.statusBarHeight + 2 * e + a.height, 
            n.navBarExtendHeight = i ? 4 : 0) : (n.statusBarHeight = n.screenHeight - n.windowHeight - 20, 
            o = 2 * (a.top - n.statusBarHeight) + a.height, n.statusBarHeight = 0, n.navBarExtendHeight = 0), 
            n.navBarHeight = o, n.capsulePosition = a, n.ios = i, t.globalSystemInfo = n, n;
        }
    }
});