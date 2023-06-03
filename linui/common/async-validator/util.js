Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.format = function() {
    for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++) e[n] = arguments[n];
    var i = 1, u = e[0], f = e.length;
    if ("function" == typeof u) return u.apply(null, e.slice(1));
    if ("string" == typeof u) {
        for (var o = String(u).replace(t, function(r) {
            if ("%%" === r) return "%";
            if (i >= f) return r;
            switch (r) {
              case "%s":
                return String(e[i++]);

              case "%d":
                return Number(e[i++]);

              case "%j":
                try {
                    return JSON.stringify(e[i++]);
                } catch (r) {
                    r = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(r);
                    return "[Circular]";
                }

              default:
                return r;
            }
        }), a = e[i]; i < f; a = e[++i]) o += " " + a;
        return o;
    }
    return u;
}, exports.isEmptyValue = function(r, e) {
    return null == r || !("array" !== e || !Array.isArray(r) || r.length) || !(!function(r) {
        return "string" === r || "url" === r || "hex" === r || "email" === r || "pattern" === r;
    }(e) || "string" != typeof r || r);
}, exports.isEmptyObject = function(r) {
    return 0 === Object.keys(r).length;
}, exports.asyncMap = function(r, e, t, i) {
    if (e.first) return n(function(r) {
        var e = [];
        return Object.keys(r).forEach(function(t) {
            e.push.apply(e, r[t]);
        }), e;
    }(r), t, i);
    var u = e.firstFields || [];
    !0 === u && (u = Object.keys(r));
    var f = Object.keys(r), o = f.length, a = 0, s = [], c = function(r) {
        s.push.apply(s, r), ++a === o && i(s);
    };
    f.forEach(function(e) {
        var i = r[e];
        -1 !== u.indexOf(e) ? n(i, t, c) : function(r, e, t) {
            var n = [], i = 0, u = r.length;
            function f(r) {
                n.push.apply(n, r), ++i === u && t(n);
            }
            r.forEach(function(r) {
                e(r, f);
            });
        }(i, t, c);
    });
}, exports.complementError = function(r) {
    return function(e) {
        return e && e.message ? (e.field = e.field || r.fullField, e) : {
            message: e,
            field: e.field || r.fullField
        };
    };
}, exports.deepMerge = function(t, n) {
    if (n) for (var i in n) if (n.hasOwnProperty(i)) {
        var u = n[i];
        "object" == e(u) && "object" == e(t[i]) ? t[i] = r(r({}, t[i]), u) : t[i] = u;
    }
    return t;
}, exports.warning = void 0;

var r = require("../../../@babel/runtime/helpers/objectSpread2"), e = require("../../../@babel/runtime/helpers/typeof"), t = /%[sdj%]/g;

function n(r, e, t) {
    var n = 0, i = r.length;
    !function u(f) {
        if (f && f.length) t(f); else {
            var o = n;
            n += 1, o < i ? e(r[o], u) : t([]);
        }
    }([]);
}

exports.warning = function() {};