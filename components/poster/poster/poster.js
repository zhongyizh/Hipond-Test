var e = require("../../../@babel/runtime/helpers/objectSpread2"), r = {
    selector: "#poster"
};

function t() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments.length > 1 ? arguments[1] : void 0;
    t = e(e({}, r), t);
    var n = getCurrentPages(), l = n[n.length - 1];
    o && (l = o);
    var s = l.selectComponent(t.selector);
    return delete t.selector, s;
}

t.create = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r = arguments.length > 1 ? arguments[1] : void 0, o = t({}, r);
    if (o) return t({}, r).onCreate(e);
    console.error('请设置组件的id="poster"!!!');
}, module.exports = t;