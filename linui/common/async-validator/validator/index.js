var e = require("../../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("./string")), u = e(require("./method")), t = e(require("./number")), a = e(require("./boolean")), l = e(require("./regexp")), i = e(require("./integer")), d = e(require("./float")), f = e(require("./array")), q = e(require("./object")), o = e(require("./enum")), n = e(require("./pattern")), p = e(require("./date")), b = e(require("./required")), s = e(require("./type")), m = {
    string: r.default,
    method: u.default,
    number: t.default,
    boolean: a.default,
    regexp: l.default,
    integer: i.default,
    float: d.default,
    array: f.default,
    object: q.default,
    enum: o.default,
    pattern: n.default,
    date: p.default,
    url: s.default,
    hex: s.default,
    email: s.default,
    required: b.default
};

exports.default = m;