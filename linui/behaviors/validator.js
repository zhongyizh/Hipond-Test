Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0, require("../../@babel/runtime/helpers/Arrayincludes");

var e = Behavior({
    definitionFilter: function(e) {
        var r = e.properties;
        Object.keys(r).forEach(function(e) {
            var t = r[e].options;
            t && (r[e].observer = function(r) {
                !t.includes(r) && r && console.error("".concat(e, ": ").concat(r, " must be in the [").concat(t, "]"));
            });
        });
    }
});

exports.default = e;