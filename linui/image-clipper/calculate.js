Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.determineDirection = function(t, e, i, c, h, r) {
    var a, n = [ t + i / 2, e + c / 2 ], o = [ h, r ];
    o[0] <= n[0] && o[1] <= n[1] ? a = 3 : o[0] >= n[0] && o[1] <= n[1] ? a = 2 : o[0] <= n[0] && o[1] >= n[1] ? a = 4 : o[0] >= n[0] && o[1] >= n[1] && (a = 1);
    return a;
}, exports.calcImageOffset = function(t, e) {
    var i = t.imageLeft, c = t.imageTop;
    e = e || t.scale;
    var h = t.imageWidth, r = t.imageHeight;
    t.angle / 90 % 2 && (h = t.imageHeight, r = t.imageWidth);
    var a = t.cutX, n = t.clipWidth, o = t.cutY, u = t.clipHeight, g = function(t) {
        return t * e / 2;
    }, l = g(h), d = g(r);
    return {
        left: i = a + n - l <= (i = a + l >= i ? i : a + l) ? i : a + n - l,
        top: c = o + u - d <= (c = o + d >= c ? c : o + d) ? c : o + u - d,
        scale: e
    };
}, exports.calcImageScale = function(t, e) {
    e = e || t.scale;
    var i = t.imageWidth, c = t.imageHeight;
    t.angle / 90 % 2 && (i = t.imageHeight, c = t.imageWidth);
    i * e < t.clipWidth && (e = t.clipWidth / i);
    c * e < t.clipHeight && (e = Math.max(e, t.clipHeight / c));
    return e;
}, exports.calcImageSize = function(t, e, i) {
    var c = t, h = e;
    if (c && h) c / h > (i.clipWidth || i.width) / (i.clipWidth || i.height) ? (h = i.clipHeight || i.height, 
    c = t / e * h) : (c = i.clipWidth || i.width, h = e / t * c); else {
        var r = i._SYS_INFO || wx.getSystemInfoSync();
        c = r.windowWidth, h = 0;
    }
    return {
        imageWidth: c,
        imageHeight: h
    };
}, exports.calcPythagoreanTheorem = function(t, e) {
    return Math.sqrt(Math.pow(t, 2) + Math.pow(e, 2));
}, exports.clipTouchMoveOfCalculate = function(t, e) {
    var i = e.touches[0].clientX, c = e.touches[0].clientY, h = t.clipWidth, r = t.clipHeight, a = t.cutY, n = t.cutX, o = t._CUT_START, u = t.lockRatio, g = t.maxWidth, l = t.minWidth, d = t.maxHeight, p = t.minHeight;
    g /= 2, l /= 2, p /= 2, d /= 2;
    var f = h, s = r, m = a, x = n, v = function() {
        f = f <= g ? f >= l ? f : l : g, s = s <= d ? s >= p ? s : p : d;
    }, w = function() {
        return (f > g || f < l || s > d || s < p) && u ? (v(), !1) : (v(), !0);
    };
    switch (s = o.height + (o.corner > 1 && o.corner < 4 ? 1 : -1) * (o.y - c), o.corner) {
      case 1:
        if (f = o.width - o.x + i, u && (s = f / (h / r)), !w()) return;
        break;

      case 2:
        if (f = o.width - o.x + i, u && (s = f / (h / r)), !w()) return;
        m = o.cutY - (s - o.height);
        break;

      case 3:
        if (f = o.width + o.x - i, u && (s = f / (h / r)), !w()) return;
        m = o.cutY - (s - o.height), x = o.cutX - (f - o.width);
        break;

      case 4:
        if (f = o.width + o.x - i, u && (s = f / (h / r)), !w()) return;
        x = o.cutX - (f - o.width);
    }
    return {
        width: f,
        height: s,
        cutX: x,
        cutY: m
    };
}, exports.imageTouchMoveOfCalcOffset = function(t, e, i) {
    var c = e - t._touchRelative[0].x, h = i - t._touchRelative[0].y;
    return {
        left: c,
        top: h
    };
};