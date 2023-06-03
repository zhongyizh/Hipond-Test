var e = require("../../../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../../../@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = require("../../../../@babel/runtime/helpers/typeof"), u = t(require("../util")), n = e(require("./required")), f = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i"),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, i = {
    integer: function(e) {
        return i.number(e) && parseInt(e, 10) === e;
    },
    float: function(e) {
        return i.number(e) && !i.integer(e);
    },
    array: function(e) {
        return Array.isArray(e);
    },
    regexp: function(e) {
        if (e instanceof RegExp) return !0;
        try {
            return !!new RegExp(e);
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            return !1;
        }
    },
    date: function(e) {
        return "function" == typeof e.getTime && "function" == typeof e.getMonth && "function" == typeof e.getYear;
    },
    number: function(e) {
        return !isNaN(e) && "" !== e;
    },
    object: function(e) {
        return "object" == r(e) && !i.array(e);
    },
    method: function(e) {
        return "function" == typeof e;
    },
    email: function(e) {
        return "string" == typeof e && !!e.match(f.email) && e.length < 255;
    },
    url: function(e) {
        return "string" == typeof e && !!e.match(f.url);
    },
    hex: function(e) {
        return "string" == typeof e && !!e.match(f.hex);
    }
};

var a = function(e, t, f, a, o) {
    if (e.required && void 0 === t) (0, n.default)(e, t, f, a, o); else {
        var l = e.type;
        [ "integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex" ].indexOf(l) > -1 ? i[l](t) || a.push(u.format(o.messages.types[l], e.fullField, e.type)) : l && r(t) !== e.type && a.push(u.format(o.messages.types[l], e.fullField, e.type));
    }
};

exports.default = a;