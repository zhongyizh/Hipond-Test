var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/typeof"), a = e(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-class", "l-item-class" ],
    behaviors: [ "wx://form-field", a.default ],
    properties: {
        urls: {
            type: Array,
            value: []
        },
        count: {
            type: [ String, Number ],
            value: 9
        },
        clear: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                e && this.handleClear();
            }
        },
        size: {
            type: [ String, Number ],
            value: 3,
            options: [ 3, 4, "3", "4" ]
        },
        sizeType: {
            type: String,
            value: "original",
            options: [ "original", "compressed" ]
        },
        mode: {
            type: String,
            value: "aspectFit",
            options: [ "scaleToFill", "aspectFit", "aspectFill", "widthFix", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right" ]
        },
        custom: {
            type: Boolean,
            value: !1
        },
        preview: {
            type: Boolean,
            value: !0
        },
        maxImageSize: {
            type: Number,
            value: 1e7
        }
    },
    data: {
        showBtn: !0,
        tempFilePath: ""
    },
    lifetimes: {
        attached: function() {
            var e = this.judgeNewOrOld();
            this.setData({
                newOrOld: e
            }), "old" === e && console.warn("image-picker组件已经升级，建议使用最新版本，当前用法会在后续版本中暂停支持");
        }
    },
    methods: {
        handleClear: function() {
            var e = this.data.urls;
            this.setData({
                urls: [],
                clear: !1,
                showBtn: !0
            });
            var t = {
                all: e,
                current: e
            };
            this.triggerEvent("linclear", t, {});
        },
        onPreviewTap: function(e) {
            var t = e.currentTarget.dataset.index, a = this.data.urls, r = "", i = [];
            if ("old" === this.data.newOrOld) r = this.data.urls[t], i = this.data.urls; else {
                r = this.data.urls[t].url;
                for (var l = 0; l < a.length; l++) i.push(a[l].url);
            }
            var s = {
                index: t,
                current: a[t],
                all: a
            };
            !0 === this.data.preview && wx.previewImage({
                current: r,
                urls: i
            }), this.triggerEvent("linpreview", s, {});
        },
        onAddTap: function() {
            var e = this, t = this.data.count - this.data.urls.length;
            if (0 !== t) {
                var a = this.data.newOrOld;
                wx.chooseImage({
                    count: t,
                    sizeType: this.data.sizeType,
                    sourceType: [ "album", "camera" ],
                    success: function(t) {
                        var r = [];
                        if ("old" === a) r = t.tempFilePaths; else for (var i = 0; i < t.tempFilePaths.length; i++) r.push({
                            url: t.tempFilePaths[i],
                            imageSize: t.tempFiles[i].size
                        }), r[i].overSize = t.tempFiles[i].size > e.data.maxImageSize;
                        var l = e.data.urls.concat(r);
                        l.length === parseInt(e.data.count) && e.setData({
                            showBtn: !1
                        }), e.setData({
                            urls: l,
                            value: l,
                            tempFilePath: r
                        });
                        var s = {
                            current: r,
                            all: l
                        }, n = {};
                        e.triggerEvent("linchange", s, n), e.triggerEvent("linpush", s, n);
                        for (var o = [], u = 0; u < l.length; u++) l[u].overSize && o.push(l[u]);
                        if (o.length > 0) {
                            var h = {
                                current: r,
                                all: l,
                                overSizeList: o
                            };
                            e.triggerEvent("linoversize", h, n);
                        }
                    }
                });
            }
        },
        onDelTap: function(e) {
            var t = e.currentTarget.dataset.index, a = this.data.urls, r = a[t], i = this.handleSplice(a, r);
            i.length < parseInt(this.data.count) && this.setData({
                showBtn: !0
            }), this.setData({
                tempFilePath: r,
                urls: i,
                value: i
            });
            var l = {
                index: t,
                current: r,
                all: i
            };
            this.triggerEvent("linremove", l, {});
        },
        handleSplice: function(e, t) {
            return e.filter(function(e) {
                return e !== t;
            });
        },
        judgeNewOrOld: function() {
            var e = this.data.urls;
            return 0 !== e.length && "object" != t(e[0]) ? "old" : "new";
        }
    }
});