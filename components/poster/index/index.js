var t = require("../../../@babel/runtime/helpers/objectSpread2"), i = {
    drawBlock: function(t) {
        var i = t.text, e = t.width, o = void 0 === e ? 0 : e, s = t.height, n = t.x, h = t.y, r = t.paddingLeft, a = void 0 === r ? 0 : r, c = t.paddingRight, x = void 0 === c ? 0 : c, d = t.borderWidth, l = t.backgroundColor, u = t.borderColor, f = t.borderRadius, g = void 0 === f ? 0 : f, P = t.opacity, v = void 0 === P ? 1 : P, p = 0, m = 0, w = 0;
        if (void 0 !== i) {
            var b = this._getTextWidth("string" == typeof i.text ? i : i.text);
            p = b > o ? b : o, p += a + a;
            var y = i.textAlign, I = void 0 === y ? "left" : y;
            i.text;
            w = s / 2 + h, m = "left" === I ? n + a : "center" === I ? p / 2 + n : n + p - x;
        } else p = o;
        l && (this.ctx.save(), this.ctx.setGlobalAlpha(v), this.ctx.setFillStyle(l), g > 0 ? (this._drawRadiusRect(n, h, p, s, g), 
        this.ctx.fill()) : this.ctx.fillRect(this.toPx(n), this.toPx(h), this.toPx(p), this.toPx(s)), 
        this.ctx.restore()), d && (this.ctx.save(), this.ctx.setGlobalAlpha(v), this.ctx.setStrokeStyle(u), 
        this.ctx.setLineWidth(this.toPx(d)), g > 0 ? (this._drawRadiusRect(n, h, p, s, g), 
        this.ctx.stroke()) : this.ctx.strokeRect(this.toPx(n), this.toPx(h), this.toPx(p), this.toPx(s)), 
        this.ctx.restore()), i && this.drawText(Object.assign(i, {
            x: m,
            y: w
        }));
    },
    drawText: function(i) {
        var e = this, o = i.x, s = i.y, n = (i.fontSize, i.color, i.baseLine), h = (i.textAlign, 
        i.text);
        i.opacity, i.width, i.lineNum, i.lineHeight;
        if ("[object Array]" === Object.prototype.toString.call(h)) {
            var r = {
                x: o,
                y: s,
                baseLine: n
            };
            h.forEach(function(i) {
                r.x += i.marginLeft || 0;
                var o = e._drawSingleText(Object.assign(i, t({}, r)));
                r.x += o + (i.marginRight || 0);
            });
        } else this._drawSingleText(i);
    },
    drawImage: function(t) {
        var i = t.imgPath, e = t.x, o = t.y, s = t.w, n = t.h, h = t.sx, r = t.sy, a = t.sw, c = t.sh, x = t.borderRadius, d = void 0 === x ? 0 : x, l = t.borderWidth, u = void 0 === l ? 0 : l, f = t.borderColor;
        this.ctx.save(), d > 0 ? (this._drawRadiusRect(e, o, s, n, d), this.ctx.strokeStyle = "rgba(255,255,255,0)", 
        this.ctx.stroke(), this.ctx.clip(), this.ctx.drawImage(i, this.toPx(h), this.toPx(r), this.toPx(a), this.toPx(c), this.toPx(e), this.toPx(o), this.toPx(s), this.toPx(n)), 
        u > 0 && (this.ctx.setStrokeStyle(f), this.ctx.setLineWidth(this.toPx(u)), this.ctx.stroke())) : this.ctx.drawImage(i, this.toPx(h), this.toPx(r), this.toPx(a), this.toPx(c), this.toPx(e), this.toPx(o), this.toPx(s), this.toPx(n)), 
        this.ctx.restore();
    },
    drawLine: function(t) {
        var i = t.startX, e = t.startY, o = t.endX, s = t.endY, n = t.color, h = t.width;
        this.ctx.save(), this.ctx.beginPath(), this.ctx.setStrokeStyle(n), this.ctx.setLineWidth(this.toPx(h)), 
        this.ctx.moveTo(this.toPx(i), this.toPx(e)), this.ctx.lineTo(this.toPx(o), this.toPx(s)), 
        this.ctx.stroke(), this.ctx.closePath(), this.ctx.restore();
    },
    downloadResource: function(t) {
        var i = this, e = t.images, o = void 0 === e ? [] : e, s = t.pixelRatio, n = void 0 === s ? 1 : s, h = [];
        return this.drawArr = [], o.forEach(function(t, e) {
            return h.push(i._downloadImageAndInfo(t, e, n));
        }), Promise.all(h);
    },
    initCanvas: function(t, i, e) {
        var o = this;
        return new Promise(function(s) {
            o.setData({
                pxWidth: o.toPx(t),
                pxHeight: o.toPx(i),
                debug: e
            }, s);
        });
    }
}, e = {
    _drawRadiusRect: function(t, i, e, o, s) {
        var n = s / 2;
        this.ctx.beginPath(), this.ctx.moveTo(this.toPx(t + n), this.toPx(i)), this.ctx.lineTo(this.toPx(t + e - n), this.toPx(i)), 
        this.ctx.arc(this.toPx(t + e - n), this.toPx(i + n), this.toPx(n), 2 * Math.PI * (3 / 4), 2 * Math.PI * 1), 
        this.ctx.lineTo(this.toPx(t + e), this.toPx(i + o - n)), this.ctx.arc(this.toPx(t + e - n), this.toPx(i + o - n), this.toPx(n), 0, 2 * Math.PI * (1 / 4)), 
        this.ctx.lineTo(this.toPx(t + n), this.toPx(i + o)), this.ctx.arc(this.toPx(t + n), this.toPx(i + o - n), this.toPx(n), 2 * Math.PI * (1 / 4), 2 * Math.PI * .5), 
        this.ctx.lineTo(this.toPx(t), this.toPx(i + n)), this.ctx.arc(this.toPx(t + n), this.toPx(i + n), this.toPx(n), 2 * Math.PI * .5, 2 * Math.PI * (3 / 4));
    },
    _getTextWidth: function(t) {
        var i = this, e = [];
        "[object Object]" === Object.prototype.toString.call(t) ? e.push(t) : e = t;
        var o = 0;
        return e.forEach(function(t) {
            var e = t.fontSize, s = t.text, n = t.marginLeft, h = void 0 === n ? 0 : n, r = t.marginRight, a = void 0 === r ? 0 : r;
            i.ctx.setFontSize(i.toPx(e)), o += i.ctx.measureText(s).width + h + a;
        }), this.toRpx(o);
    },
    _drawSingleText: function(t) {
        var i = this, e = t.x, o = t.y, s = t.fontSize, n = t.color, h = t.baseLine, r = t.textAlign, a = void 0 === r ? "left" : r, c = t.text, x = t.opacity, d = void 0 === x ? 1 : x, l = t.textDecoration, u = void 0 === l ? "none" : l, f = t.width, g = t.lineNum, P = void 0 === g ? 1 : g, v = t.lineHeight, p = void 0 === v ? 0 : v, m = t.fontWeight, w = void 0 === m ? "normal" : m, b = t.fontStyle, y = void 0 === b ? "normal" : b, I = t.fontFamily, R = void 0 === I ? "sans-serif" : I;
        this.ctx.save(), this.ctx.beginPath(), this.ctx.font = y + " " + w + " " + this.toPx(s, !0) + "px " + R, 
        this.ctx.setGlobalAlpha(d), this.ctx.setFillStyle(n), this.ctx.setTextBaseline(h), 
        this.ctx.setTextAlign(a);
        var T = this.toRpx(this.ctx.measureText(c).width), S = [];
        if (T > f) {
            for (var k = "", _ = 1, A = 0; A <= c.length - 1; A++) k += c[A], this.toRpx(this.ctx.measureText(k).width) >= f ? (_ === P && A !== c.length - 1 && (k = k.substring(0, k.length - 1) + "..."), 
            _ <= P && S.push(k), k = "", _++) : _ <= P && A === c.length - 1 && S.push(k);
            T = f;
        } else S.push(c);
        if (S.forEach(function(t, n) {
            i.ctx.fillText(t, i.toPx(e), i.toPx(o + (p || s) * n));
        }), this.ctx.restore(), "none" !== u) {
            var z = o;
            if ("line-through" === u) {
                z = o;
                switch (h) {
                  case "top":
                    z += s / 2 + 5;
                    break;

                  case "middle":
                    break;

                  case "bottom":
                    z -= s / 2 + 5;
                    break;

                  default:
                    z -= s / 2 - 5;
                }
            }
            this.ctx.save(), this.ctx.moveTo(this.toPx(e), this.toPx(z)), this.ctx.lineTo(this.toPx(e) + this.toPx(T), this.toPx(z)), 
            this.ctx.setStrokeStyle(n), this.ctx.stroke(), this.ctx.restore();
        }
        return T;
    }
}, o = {
    _downloadImageAndInfo: function(t, i, e) {
        var o = this;
        return new Promise(function(s, n) {
            var h = t.x, r = t.y, a = t.url, c = t.zIndex, x = a;
            o._downImage(x, i).then(function(t) {
                return o._getImageInfo(t, i);
            }).then(function(n) {
                var a, x, d = n.imgPath, l = n.imgInfo, u = t.borderRadius || 0, f = t.width, g = t.height, P = o.toRpx(l.width / e), v = o.toRpx(l.height / e);
                P / v <= f / g ? (a = 0, x = (v - P / f * g) / 2) : (x = 0, a = (P - v / g * f) / 2), 
                o.drawArr.push({
                    type: "image",
                    borderRadius: u,
                    borderWidth: t.borderWidth,
                    borderColor: t.borderColor,
                    zIndex: void 0 !== c ? c : i,
                    imgPath: d,
                    sx: a,
                    sy: x,
                    sw: P - 2 * a,
                    sh: v - 2 * x,
                    x: h,
                    y: r,
                    w: f,
                    h: g
                }), s();
            }).catch(function(t) {
                return n(t);
            });
        });
    },
    _downImage: function(t) {
        var i = this;
        return new Promise(function(e, o) {
            /^http/.test(t) && !new RegExp(wx.env.USER_DATA_PATH).test(t) ? wx.downloadFile({
                url: i._mapHttpToHttps(t),
                success: function(t) {
                    200 === t.statusCode ? e(t.tempFilePath) : o(t.errMsg);
                },
                fail: function(t) {
                    o(t);
                }
            }) : e(t);
        });
    },
    _getImageInfo: function(t, i) {
        return new Promise(function(e, o) {
            wx.getImageInfo({
                src: t,
                success: function(o) {
                    e({
                        imgPath: t,
                        imgInfo: o,
                        index: i
                    });
                },
                fail: function(t) {
                    o(t);
                }
            });
        });
    },
    toPx: function(t, i) {
        return i ? parseInt(t * this.factor * this.pixelRatio) : t * this.factor * this.pixelRatio;
    },
    toRpx: function(t, i) {
        return i ? parseInt(t / this.factor) : t / this.factor;
    },
    _mapHttpToHttps: function(t) {
        if (t.indexOf(":") < 0) return t;
        var i = t.split(":");
        return 2 === i.length && "http" === i[0] ? (i[0] = "https", "".concat(i[0], ":").concat(i[1])) : t;
    }
};

Component({
    properties: {},
    created: function() {
        var t = wx.getSystemInfoSync().screenWidth;
        this.factor = t / 750;
    },
    methods: Object.assign({
        getHeight: function(i) {
            var e = function(t) {
                var i = t.lineHeight || t.fontSize;
                return "top" === t.baseLine ? i : "middle" === t.baseLine ? i / 2 : 0;
            }, o = [];
            (i.blocks || []).forEach(function(t) {
                o.push(t.y + t.height);
            }), (i.texts || []).forEach(function(i) {
                var s;
                "[object Array]" === Object.prototype.toString.call(i.text) ? i.text.forEach(function(n) {
                    s = e(t(t({}, n), {}, {
                        baseLine: i.baseLine
                    })), o.push(i.y + s);
                }) : (s = e(i), o.push(i.y + s));
            }), (i.images || []).forEach(function(t) {
                o.push(t.y + t.height);
            }), (i.lines || []).forEach(function(t) {
                o.push(t.startY), o.push(t.endY);
            });
            var s = o.sort(function(t, i) {
                return i - t;
            }), n = 0;
            return s.length > 0 && (n = s[0]), i.height < n || !i.height ? n : i.height;
        },
        create: function(t) {
            var i = this;
            this.ctx = wx.createCanvasContext("canvasid", this), this.pixelRatio = t.pixelRatio || 1;
            var e = this.getHeight(t);
            this.initCanvas(t.width, e, t.debug).then(function() {
                t.backgroundColor && (i.ctx.save(), i.ctx.setFillStyle(t.backgroundColor), i.ctx.fillRect(0, 0, i.toPx(t.width), i.toPx(e)), 
                i.ctx.restore());
                var o = t.texts, s = void 0 === o ? [] : o, n = (t.images, t.blocks), h = void 0 === n ? [] : n, r = t.lines, a = void 0 === r ? [] : r, c = i.drawArr.concat(s.map(function(t) {
                    return t.type = "text", t.zIndex = t.zIndex || 0, t;
                })).concat(h.map(function(t) {
                    return t.type = "block", t.zIndex = t.zIndex || 0, t;
                })).concat(a.map(function(t) {
                    return t.type = "line", t.zIndex = t.zIndex || 0, t;
                }));
                c.sort(function(t, i) {
                    return t.zIndex - i.zIndex;
                }), c.forEach(function(t) {
                    "image" === t.type ? i.drawImage(t) : "text" === t.type ? i.drawText(t) : "block" === t.type ? i.drawBlock(t) : "line" === t.type && i.drawLine(t);
                });
                var x = wx.getSystemInfoSync().platform, d = 0;
                "android" === x && (d = 300), i.ctx.draw(!1, function() {
                    setTimeout(function() {
                        wx.canvasToTempFilePath({
                            canvasId: "canvasid",
                            success: function(t) {
                                i.triggerEvent("success", t.tempFilePath);
                            },
                            fail: function(t) {
                                i.triggerEvent("fail", t);
                            }
                        }, i);
                    }, d);
                });
            }).catch(function(t) {
                wx.showToast({
                    icon: "none",
                    title: t.errMsg || "生成失败"
                }), console.error(t);
            });
        }
    }, i, e, o)
});