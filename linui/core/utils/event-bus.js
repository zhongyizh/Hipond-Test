Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var r = function() {}, t = [], e = [];

r.prototype = {
    obj: {
        set: function(r, e) {
            if (r && e) {
                var n = {};
                n.k = r, n.v = e;
                for (var o = 0, f = t.length; o < f; o++) t[o].k === r && t.splice(o, 1);
                t.push(n);
            }
        },
        get: function(r) {
            if (r) for (var e = 0, n = t.length; e < n; e++) {
                var o = t[e];
                if (o.k === r) return o.v();
            }
        }
    },
    emit: function(r, t) {
        if (r) for (var n = 0, o = e.length; n < o; n++) {
            var f = e[n];
            if (f.k === r) return f.v(t);
        }
        return new Promise(function(r) {
            r();
        });
    },
    on: function(r, t) {
        if (r && t) {
            var n = {};
            n.k = r, n.v = t, e.push(n);
        }
    },
    arr: {
        push: function(r, t) {
            if (r && t) {
                var n = {};
                n.k = r, n.v = t, e.push(n);
            }
        },
        pop: function(r) {
            if (r) for (var t = 0, n = e.length; t < n; t++) {
                var o = e[t];
                o.k === r && o.v();
            }
        }
    }
};

var n = new r();

exports.default = n;