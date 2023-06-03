var e = require("../../../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = e(require("../../../@babel/runtime/regenerator")), t = require("../../../@babel/runtime/helpers/asyncToGenerator"), n = require("../../../@babel/runtime/helpers/classCallCheck"), u = require("../../../@babel/runtime/helpers/createClass"), a = new (function() {
    function e() {
        n(this, e);
    }
    var a, c, o;
    return u(e, [ {
        key: "getNodeRectFromComponent",
        value: (o = t(r.default.mark(function e(t, n) {
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, new Promise(function(e) {
                        t.createSelectorQuery().select(n).boundingClientRect(function(r) {
                            e(r);
                        }).exec();
                    });

                  case 2:
                    return e.abrupt("return", e.sent);

                  case 3:
                  case "end":
                    return e.stop();
                }
            }, e);
        })), function(e, r) {
            return o.apply(this, arguments);
        })
    }, {
        key: "getNodesRectFromComponent",
        value: (c = t(r.default.mark(function e(t, n) {
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, new Promise(function(e) {
                        t.createSelectorQuery().selectAll(n).boundingClientRect(function(r) {
                            e(r);
                        }).exec();
                    });

                  case 2:
                    return e.abrupt("return", e.sent);

                  case 3:
                  case "end":
                    return e.stop();
                }
            }, e);
        })), function(e, r) {
            return c.apply(this, arguments);
        })
    }, {
        key: "getNodeFieldsFromComponent",
        value: (a = t(r.default.mark(function e(t, n, u) {
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, new Promise(function(e) {
                        t.createSelectorQuery().select(n).fields(u, function(r) {
                            e(r);
                        }).exec();
                    });

                  case 2:
                    return e.abrupt("return", e.sent);

                  case 3:
                  case "end":
                    return e.stop();
                }
            }, e);
        })), function(e, r, t) {
            return a.apply(this, arguments);
        })
    } ]), e;
}())();

exports.default = a;