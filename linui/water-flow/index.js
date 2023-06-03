var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../core/utils/event-util"));

Component({
    properties: {
        columnGap: {
            type: String,
            value: "20rpx"
        }
    },
    data: {
        data: [],
        leftData: [],
        rightData: []
    },
    attached: function() {
        this._init();
    },
    pageLifetimes: {
        show: function() {
            this._init();
        }
    },
    methods: {
        _init: function() {
            var t = this;
            wx.lin = wx.lin || {}, wx.lin.renderWaterFlow = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = arguments.length > 2 ? arguments[2] : void 0;
                if ("[object Array]" !== Object.prototype.toString.call(e)) return console.error("[data]参数类型错误，渲染失败"), 
                !1;
                t.setData({
                    data: e
                }), a && (t.data.leftData = [], t.data.rightData = []), t._select(e, a).then(function() {
                    i && i();
                }).catch(function(t) {
                    console.error(t);
                });
            };
        },
        _select: function(t, e) {
            var a = this, i = wx.createSelectorQuery().in(this);
            return this.columnNodes = i.selectAll("#left, #right"), new Promise(function(i) {
                a._render(t, 0, e, function() {
                    i();
                });
            });
        },
        _render: function(t, e, a, i) {
            var n = this;
            (t.length > e || a) && 0 !== this.data.data.length ? this.columnNodes.boundingClientRect().exec(function(r) {
                var o = r[0];
                n.data.leftHeight = o[0].height, n.data.rightHeight = o[1].height, n.data.leftHeight <= n.data.rightHeight || a ? n.data.leftData.push(t[e]) : n.data.rightData.push(t[e]), 
                n.setData({
                    leftData: n.data.leftData,
                    rightData: n.data.rightData
                }, function() {
                    n._render(t, ++e, !1, i);
                });
            }) : i && i();
        },
        onTapItem: function(e) {
            t.default.emit(this, "linitemtap", {
                item: e.currentTarget.dataset.item
            });
        }
    }
});