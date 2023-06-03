var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../@babel/runtime/helpers/objectSpread2"), i = t(require("../core/utils/data-util")), a = t(require("../core/utils/event-util")), o = require("./calculate"), s = "base64";

Component({
    externalClasses: [ "l-class" ],
    relations: {
        "../image-clipper-tools/index": {
            type: "child"
        }
    },
    options: {
        pureDataPattern: /^_/
    },
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        zIndex: {
            type: Number,
            value: 99
        },
        imageUrl: {
            type: String
        },
        type: {
            type: String,
            options: [ "url", "base64" ],
            value: "url"
        },
        quality: {
            type: Number,
            value: 1
        },
        width: {
            type: Number,
            value: 400
        },
        height: {
            type: Number,
            value: 400
        },
        minWidth: {
            type: Number,
            value: 200
        },
        maxWidth: {
            type: Number,
            value: 600
        },
        minHeight: {
            type: Number,
            value: 200
        },
        maxHeight: {
            type: Number,
            value: 600
        },
        lockWidth: {
            type: Boolean,
            value: !1
        },
        lockHeight: {
            type: Boolean,
            value: !1
        },
        lockRatio: {
            type: Boolean,
            value: !0
        },
        scaleRatio: {
            type: Number,
            value: 1
        },
        minRatio: {
            type: Number,
            value: .5
        },
        maxRatio: {
            type: Number,
            value: 2
        },
        disableScale: {
            type: Number,
            value: !1
        },
        disableRotate: {
            type: Number,
            value: !1
        },
        limitMove: {
            type: Boolean,
            value: !1
        },
        checkImage: {
            type: Boolean,
            value: !0
        },
        checkImageIcon: {
            type: String,
            value: "./images/photo.png"
        },
        rotateAlong: {
            type: Boolean,
            value: !0
        },
        rotateAlongIcon: {
            type: String,
            value: "./images/rotate-along.png"
        },
        rotateInverse: {
            type: Boolean,
            value: !0
        },
        rotateInverseIcon: {
            type: String,
            value: "./images/rotate-inverse.png"
        },
        sure: {
            type: Boolean,
            value: !0
        },
        sureIcon: {
            type: String,
            value: "./images/sure.png"
        },
        close: {
            type: Boolean,
            value: !0
        },
        closeIcon: {
            type: String,
            value: "./images/close.png"
        },
        rotateAngle: {
            type: Number,
            value: 90
        }
    },
    data: {
        CANVAS_WIDTH: 0,
        CANVAS_HEIGHT: 0,
        cutX: 0,
        cutY: 0,
        clipWidth: 0,
        clipHeight: 0,
        cutAnimation: !1,
        imageWidth: 0,
        imageHeight: 0,
        imageTop: 0,
        imageLeft: 0,
        scale: 1,
        angle: 0,
        _SYS_INFO: {},
        _MOVE_THROTTLE: null,
        _MOVE_THROTTLE_FLAG: !0,
        _TIME_CUT_CENTER: null,
        _flagCutTouch: !1,
        _flagEndTouch: !1,
        _CUT_START: {},
        _cutAnimationTime: null,
        _touchRelative: [ {
            x: 0,
            y: 0
        } ],
        _hypotenuseLength: 0,
        _ctx: null
    },
    observers: {
        imageUrl: function(t) {
            var e = this;
            t && (this.imageReset(), wx.showLoading({
                title: "请稍候...",
                mask: !0
            }), wx.getImageInfo({
                src: t,
                success: function(t) {
                    e.imgComputeSize(t.width, t.height), e.properties.limitMove && (e.imgMarginDetectionScale(), 
                    a.default.emit(e, "linimageready", t));
                },
                fail: function() {
                    e.imgComputeSize(), e.properties.limitMove && e.imgMarginDetectionScale();
                }
            }));
        },
        "clipWidth, clipHeight": function(t, e) {
            var a = this.data, o = a.minWidth, s = a.minHeight;
            s /= 2, t < (o /= 2) && i.default.setDiffData(this, {
                clipWidth: o
            }), e < s && i.default.setDiffData(this, {
                clipHeight: s
            }), this.computeCutSize();
        },
        rotateAngle: function(t) {
            i.default.setDiffData(this, {
                cutAnimation: !0,
                angle: t
            });
        },
        angle: function(t) {
            this.moveStop(), this.properties.limitMove && t % 90 && i.default.setDiffData(this, {
                angle: 90 * Math.round(t / 90)
            }), this.imgMarginDetectionScale();
        },
        cutAnimation: function(t) {
            var e = this;
            if (clearTimeout(this.data._cutAnimationTime), t) {
                var a = setTimeout(function() {
                    i.default.setDiffData(e, {
                        cutAnimation: !1
                    });
                }, 260);
                i.default.setDiffData(this, {
                    _cutAnimationTime: a
                });
            }
        },
        limitMove: function(t) {
            t && (this.data.angle % 90 && i.default.setDiffData(this, {
                angle: 90 * Math.round(this.data.angle / 90)
            }), this.imgMarginDetectionScale());
        },
        "cutY, cutX": function() {
            this.cutDetectionPosition();
        },
        "width, height": function(t, e) {
            t !== this.width && i.default.setDiffData(this, {
                clipWidth: t / 2
            }), e !== this.height && i.default.setDiffData(this, {
                clipHeight: e / 2
            });
        }
    },
    methods: {
        setCutInfo: function() {
            var t = this.properties, e = t.width, i = t.height, a = this.data._SYS_INFO, o = e / 2, s = i / 2, n = (a.windowHeight - s) / 2, h = (a.windowWidth - o) / 2, l = a.windowWidth / 2, u = a.windowHeight / 2, c = wx.createCanvasContext("image-clipper", this);
            this.setData({
                clipWidth: o,
                clipHeight: s,
                cutX: h,
                cutY: n,
                CANVAS_HEIGHT: s,
                CANVAS_WIDTH: o,
                _ctx: c,
                imageLeft: l,
                imageTop: u
            });
        },
        setCutCenter: function() {
            var t = this.data, e = t.sysInfo, i = t.clipHeight, a = t.clipWidth, o = t.imageTop, s = t.imageLeft, n = e || wx.getSystemInfoSync(), h = .5 * (n.windowHeight - i), l = .5 * (n.windowWidth - a);
            this.setData({
                imageTop: o - this.data.cutY + h,
                imageLeft: s - this.data.cutX + l,
                cutY: h,
                cutX: l
            });
        },
        clipTouchStart: function(t) {
            if (this.properties.imageUrl) {
                var e = t.touches[0].clientX, i = t.touches[0].clientY, a = this.data, s = a.cutX, n = a.cutY, h = a.clipWidth, l = a.clipHeight, u = (0, 
                o.determineDirection)(s, n, h, l, e, i);
                this.moveDuring();
                var c = {
                    width: h,
                    height: l,
                    x: e,
                    y: i,
                    cutY: n,
                    cutX: s,
                    corner: u
                };
                this.setData({
                    _flagCutTouch: !0,
                    _flagEndTouch: !0,
                    _CUT_START: c
                });
            } else wx.showToast({
                title: "请选择图片",
                icon: "none"
            });
        },
        clipTouchMove: function(t) {
            if (this.properties.imageUrl) {
                if (1 === t.touches.length) {
                    var e = this.data, a = e._flagCutTouch, s = e._MOVE_THROTTLE_FLAG;
                    if (a && s) {
                        var n = this.properties, h = n.lockRatio, l = n.lockHeight, u = n.lockWidth;
                        if (h && (u || l)) return;
                        i.default.setDiffData(this, {
                            _MOVE_THROTTLE_FLAG: !1
                        }), this.moveThrottle();
                        var c = (0, o.clipTouchMoveOfCalculate)(this.data, t);
                        if (c) {
                            var r = c.width, f = c.height, g = c.cutX, d = c.cutY;
                            u || l ? u ? l || i.default.setDiffData(this, {
                                clipHeight: f,
                                cutY: d
                            }) : i.default.setDiffData(this, {
                                clipWidth: r,
                                cutX: g
                            }) : i.default.setDiffData(this, {
                                clipWidth: r,
                                clipHeight: f,
                                cutX: g,
                                cutY: d
                            }), this.imgMarginDetectionScale();
                        }
                    }
                }
            } else wx.showToast({
                title: "请选择图片",
                icon: "none"
            });
        },
        clipTouchEnd: function() {
            this.moveStop(), this.setData({
                _flagCutTouch: !1
            });
        },
        moveDuring: function() {
            clearTimeout(this.data._TIME_CUT_CENTER);
        },
        moveStop: function() {
            var t = this;
            clearTimeout(this.data._TIME_CUT_CENTER);
            var e = setTimeout(function() {
                t.data.cutAnimation || i.default.setDiffData(t, {
                    cutAnimation: !0
                }), t.setCutCenter();
            }, 800);
            i.default.setDiffData(this, {
                _TIME_CUT_CENTER: e
            });
        },
        moveThrottle: function() {
            var t = this;
            if ("android" === this.data._SYS_INFO.platform) {
                clearTimeout(this.data._MOVE_THROTTLE);
                var e = setTimeout(function() {
                    i.default.setDiffData(t, {
                        _MOVE_THROTTLE_FLAG: !0
                    });
                }, 20);
                i.default.setDiffData(this, {
                    _MOVE_THROTTLE: e
                });
            } else i.default.setDiffData(this, {
                _MOVE_THROTTLE_FLAG: !0
            });
        },
        imageReset: function() {
            var t = this.data._SYS_INFO || wx.getSystemInfoSync();
            this.setData({
                scale: 1,
                angle: 0,
                imageTop: t.windowHeight / 2,
                imageLeft: t.windowWidth / 2
            });
        },
        imageLoad: function() {
            this.imageReset(), wx.hideLoading(), a.default.emit(this, "linimageload", !0);
        },
        imgComputeSize: function(t, e) {
            var i = (0, o.calcImageSize)(t, e, this.data), a = i.imageWidth, s = i.imageHeight;
            this.setData({
                imageWidth: a,
                imageHeight: s
            });
        },
        imgMarginDetectionScale: function(t) {
            if (this.properties.limitMove) {
                var e = (0, o.calcImageScale)(this.data, t);
                this.imgMarginDetectionPosition(e);
            }
        },
        imgMarginDetectionPosition: function(t) {
            if (this.properties.limitMove) {
                var e = (0, o.calcImageOffset)(this.data, t), a = e.scale, s = e.left, n = e.top;
                i.default.setDiffData(this, {
                    imageLeft: s,
                    imageTop: n,
                    scale: a
                });
            }
        },
        imageTouchStart: function(t) {
            this.setData({
                _flagEndTouch: !1
            });
            var e = this.data, i = e.imageLeft, a = e.imageTop, s = t.touches[0].clientX, n = t.touches[0].clientY, h = [];
            if (1 === t.touches.length) h[0] = {
                x: s - i,
                y: n - a
            }, this.setData({
                _touchRelative: h
            }); else {
                var l = t.touches[1].clientX, u = t.touches[1].clientY, c = Math.abs(s - l), r = Math.abs(n - u), f = (0, 
                o.calcPythagoreanTheorem)(c, r);
                h = [ {
                    x: s - i,
                    y: n - a
                }, {
                    x: l - i,
                    y: u - a
                } ], this.setData({
                    _touchRelative: h,
                    _hypotenuseLength: f
                });
            }
        },
        imageTouchMove: function(t) {
            var e = this.data, s = e._flagEndTouch, n = e._MOVE_THROTTLE_FLAG;
            if (!s && n) {
                var h = t.touches[0].clientX, l = t.touches[0].clientY;
                if (i.default.setDiffData(this, {
                    _MOVE_THROTTLE_FLAG: !1
                }), this.moveThrottle(), this.moveDuring(), 1 === t.touches.length) {
                    var u = (0, o.imageTouchMoveOfCalcOffset)(this.data, h, l), c = u.left, r = u.top;
                    i.default.setDiffData(this, {
                        imageLeft: c,
                        imageTop: r
                    }), this.imgMarginDetectionPosition();
                } else {
                    var f = t.touches[1].clientX, g = t.touches[1].clientY, d = Math.abs(h - f), m = Math.abs(l - g), p = (0, 
                    o.calcPythagoreanTheorem)(d, m), D = this.data.scale * (p / this.data._hypotenuseLength);
                    this.properties.disableScale ? D = 1 : (D = (D = D <= this.properties.minRatio ? this.properties.minRatio : D) >= this.properties.maxRatio ? this.properties.maxRatio : D, 
                    a.default.emit(this, "linsizechange", {
                        imageWidth: this.data.imageWidth * D,
                        imageHeight: this.data.imageHeight * D
                    })), this.imgMarginDetectionScale(D), i.default.setDiffData(this, {
                        _hypotenuseLength: Math.sqrt(Math.pow(d, 2) + Math.pow(m, 2)),
                        scale: D
                    });
                }
            }
        },
        imageTouchEnd: function() {
            i.default.setDiffData(this, {
                _flagEndTouch: !0
            }), this.moveStop();
        },
        cutDetectionPosition: function() {
            var t = this, e = this.data, a = e.cutX, o = e.cutY, s = e._SYS_INFO, n = e.clipHeight, h = e.clipWidth, l = function() {
                o < 0 && i.default.setDiffData(t, {
                    cutY: 0
                }), o > s.windowHeight - n && i.default.setDiffData(t, {
                    cutY: s.windowHeight - n
                });
            }, u = function() {
                a < 0 && i.default.setDiffData(t, {
                    cutX: 0
                }), a > s.windowWidth - h && i.default.setDiffData(t, {
                    cutX: s.windowWidth - h
                });
            };
            if (null === o && null === a) {
                var c = .5 * (s.windowHeight - n), r = .5 * (s.windowWidth - h);
                i.default.setDiffData(this, {
                    cutX: r,
                    cutY: c
                });
            } else null !== o && null !== a ? (l(), u()) : null !== o && null === a ? (l(), 
            i.default.setDiffData(this, {
                cutX: (s.windowWidth - h) / 2
            })) : null === o && null !== a && (u(), i.default.setDiffData(this, {
                cutY: (s.windowHeight - n) / 2
            }));
        },
        computeCutSize: function() {
            var t = this.data, e = t.clipHeight, a = t.clipWidth, o = t._SYS_INFO, s = t.cutX, n = t.cutY;
            a > o.windowWidth ? i.default.setDiffData(this, {
                clipWidth: o.windowWidth
            }) : a + s > o.windowWidth && i.default.setDiffData(this, {
                cutX: o.windowWidth - s
            }), e > o.windowHeight ? i.default.setDiffData(this, {
                clipHeight: o.windowHeight
            }) : e + n > o.windowHeight && i.default.setDiffData(this, {
                cutY: o.windowHeight - n
            });
        },
        getImageData: function() {
            var t = this;
            if (this.properties.imageUrl) {
                wx.showLoading({
                    title: "加载中"
                });
                var i = this.data, o = i.clipHeight, n = i.clipWidth, h = i._ctx, l = i.scale, u = i.imageLeft, c = i.imageTop, r = i.cutX, f = i.cutY, g = i.angle, d = this.data, m = d.CANVAS_HEIGHT, p = d.CANVAS_WIDTH, D = this.properties, T = D.scaleRatio, v = D.imageUrl, w = D.quality, _ = D.type, y = function() {
                    var i = t.data.imageWidth * l * T, d = t.data.imageHeight * l * T, m = u - r, p = c - f;
                    h.translate(m * T, p * T), h.rotate(g * Math.PI / 180), h.drawImage(v, -i / 2, -d / 2, i, d), 
                    h.draw(!1, function() {
                        var i = {
                            width: n * T,
                            height: Math.round(o * T),
                            destWidth: n * T,
                            destHeight: Math.round(o) * T,
                            fileType: "png",
                            quality: w
                        }, h = {
                            url: "",
                            base64: "",
                            width: n * T,
                            height: o * T
                        };
                        s === _ ? wx.canvasGetImageData({
                            canvasId: "image-clipper",
                            x: 0,
                            y: 0,
                            width: n * T,
                            height: Math.round(o * T),
                            success: function(e) {
                                var i = new Uint8Array(e.data), o = wx.arrayBufferToBase64(i);
                                h.url = o, h.base64 = o, wx.hideLoading(), a.default.emit(t, "linclip", h);
                            }
                        }) : wx.canvasToTempFilePath(e(e({}, i), {}, {
                            canvasId: "image-clipper",
                            success: function(e) {
                                h.url = e.tempFilePath, h.base64 = e.tempFilePath, wx.hideLoading(), a.default.emit(t, "linclip", h);
                            },
                            fail: function(t) {
                                throw t;
                            }
                        }), t);
                    });
                };
                p !== n || m !== o ? (p = n, m = o, h.draw(), setTimeout(function() {
                    y();
                }, 100)) : y();
            } else wx.showToast({
                title: "请选择图片",
                icon: "none"
            });
        },
        uploadImage: function() {
            var t = this;
            wx.chooseImage({
                count: 1,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    var i = e.tempFilePaths;
                    t.setData({
                        imageUrl: i
                    });
                }
            });
        },
        rotate: function(t) {
            if (!this.properties.disableRotate) if (this.properties.imageUrl) {
                var e = this.properties.rotateAngle, i = this.data.angle;
                "along" === t.currentTarget.dataset.type ? this.setData({
                    angle: i + e
                }) : this.setData({
                    angle: i - e
                }), a.default.emit(this, "linrotate", {
                    currentDeg: this.data.angle
                });
            } else wx.showToast({
                title: "请选择图片",
                icon: "none"
            });
        },
        close: function() {
            this.setData({
                show: !1
            });
        },
        doNothing: function() {}
    },
    lifetimes: {
        ready: function() {
            var t = wx.getSystemInfoSync();
            this.setData({
                _SYS_INFO: t
            }), this.setCutInfo(), this.setCutCenter(), this.computeCutSize(), this.cutDetectionPosition();
        }
    }
});