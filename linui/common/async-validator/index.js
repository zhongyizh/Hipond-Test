var e = require("../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = require("../../../@babel/runtime/helpers/objectSpread2"), t = require("../../../@babel/runtime/helpers/typeof"), s = require("./util.js"), a = e(require("./validator/index.js")), i = require("./messages.js");

function n(e) {
    this.rules = null, this._messages = i.messages, this.define(e);
}

n.prototype = {
    messages: function(e) {
        return e && (this._messages = (0, s.deepMerge)((0, i.newMessages)(), e)), this._messages;
    },
    define: function(e) {
        if (!e) throw new Error("Cannot configure a schema with no rules");
        if ("object" != t(e) || Array.isArray(e)) throw new Error("Rules must be an object");
        var r, s;
        for (r in this.rules = {}, e) e.hasOwnProperty(r) && (s = e[r], this.rules[r] = Array.isArray(s) ? s : [ s ]);
    },
    validate: function(e) {
        var a, o, l = this, u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, f = arguments.length > 2 ? arguments[2] : void 0, d = e, c = u, p = f;
        if ("function" == typeof c && (p = c, c = {}), this.rules && 0 !== Object.keys(this.rules).length) {
            if (c.messages) {
                var g = this.messages();
                g === i.messages && (g = (0, i.newMessages)()), (0, s.deepMerge)(g, c.messages), 
                c.messages = g;
            } else c.messages = this.messages();
            var h = {};
            (c.keys || Object.keys(this.rules)).forEach(function(t) {
                a = l.rules[t], o = d[t], a.forEach(function(s) {
                    var a = s;
                    "function" == typeof a.transform && (d === e && (d = r({}, d)), o = d[t] = a.transform(o)), 
                    (a = "function" == typeof a ? {
                        validator: a
                    } : r({}, a)).validator = l.getValidationMethod(a), a.field = t, a.fullField = a.fullField || t, 
                    a.type = l.getType(a), a.validator && (h[t] = h[t] || [], h[t].push({
                        rule: a,
                        value: o,
                        source: d,
                        field: t
                    }));
                });
            });
            var y = {};
            (0, s.asyncMap)(h, c, function(e, a) {
                var i = e.rule, o = !("object" !== i.type && "array" !== i.type || "object" != t(i.fields) && "object" != t(i.defaultField));
                function l(e, t) {
                    return r(r({}, t), {}, {
                        fullField: "".concat(i.fullField, ".").concat(e)
                    });
                }
                function u() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], u = t;
                    if (Array.isArray(u) || (u = [ u ]), u.length && (0, s.warning)("async-validator:", u), 
                    u.length && i.message && (u = [].concat(i.message)), u = u.map((0, s.complementError)(i)), 
                    c.first && u.length) return y[i.field] = 1, a(u);
                    if (o) {
                        if (i.required && !e.value) return u = i.message ? [].concat(i.message).map((0, 
                        s.complementError)(i)) : c.error ? [ c.error(i, (0, s.format)(c.messages.required, i.field)) ] : [], 
                        a(u);
                        var f = {};
                        if (i.defaultField) for (var d in e.value) e.value.hasOwnProperty(d) && (f[d] = i.defaultField);
                        for (var p in f = r(r({}, f), e.rule.fields)) if (f.hasOwnProperty(p)) {
                            var g = Array.isArray(f[p]) ? f[p] : [ f[p] ];
                            f[p] = g.map(l.bind(null, p));
                        }
                        var h = new n(f);
                        h.messages(c.messages), e.rule.options && (e.rule.options.messages = c.messages, 
                        e.rule.options.error = c.error), h.validate(e.value, e.rule.options || c, function(e) {
                            a(e && e.length ? u.concat(e) : e);
                        });
                    } else a(u);
                }
                o = o && (i.required || !i.required && e.value), i.field = e.field;
                var f = i.validator(i, e.value, u, e.source, c);
                f && f.then && f.then(function() {
                    return u();
                }, function(e) {
                    return u(e);
                });
            }, function(e) {
                !function(e) {
                    var r, t, s, a = [], i = {};
                    for (r = 0; r < e.length; r++) s = e[r], Array.isArray(s) ? a = a.concat.apply(a, s) : a.push(s);
                    if (a.length) for (r = 0; r < a.length; r++) i[t = a[r].field] = i[t] || [], i[t].push(a[r]); else a = null, 
                    i = null;
                    p(a, i);
                }(e);
            });
        } else p && p();
    },
    getType: function(e) {
        if (void 0 === e.type && e.pattern instanceof RegExp && (e.type = "pattern"), "function" != typeof e.validator && e.type && !a.default.hasOwnProperty(e.type)) throw new Error((0, 
        s.format)("Unknown rule type %s", e.type));
        return e.type || "string";
    },
    getValidationMethod: function(e) {
        if ("function" == typeof e.validator) return e.validator;
        var r = Object.keys(e), t = r.indexOf("message");
        return -1 !== t && r.splice(t, 1), 1 === r.length && "required" === r[0] ? a.default.required : a.default[this.getType(e)] || !1;
    }
}, n.register = function(e, r) {
    if ("function" != typeof r) throw new Error("Cannot register a validator by type, validator is not a function");
    a.default[e] = r;
}, n.messages = i.messages;

var o = n;

exports.default = o;