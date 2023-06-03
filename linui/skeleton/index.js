var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-class", "l-title-class", "l-avatar-class", "l-row-class" ],
    behaviors: [ t.default ],
    properties: {
        loading: {
            type: Boolean,
            value: !0
        },
        title: {
            type: Boolean,
            value: !0
        },
        paragraph: {
            type: Boolean,
            value: !0
        },
        active: {
            type: Boolean,
            value: !0
        },
        avatar: Boolean,
        titleWidth: String,
        avatarSize: String,
        avatarShape: {
            type: String,
            value: "circle",
            options: [ "circle", "square" ]
        },
        rowsWidth: {
            type: Array,
            optionalTypes: [ Array, String ],
            value: "60%"
        },
        rowsHeight: {
            type: Array,
            optionalTypes: [ Array, String ],
            value: "34rpx"
        },
        rows: Number
    },
    observers: {
        "rows,rowsWidth,rowsHeight": function(t, e, a) {
            this._getResult(t, e, "rowsW", "100%"), this._getResult(t, a, "rowsH", "34rpx"), 
            this._toRows(t);
        }
    },
    data: {},
    methods: {
        _arrRepeat: function(t, e) {
            for (var a = [], r = 0; r < e - 1; r++) a.push(t);
            return a;
        },
        _getResult: function(t, e, a, r) {
            if (Array.isArray(e)) this.data[a] = e; else {
                var s = this._arrRepeat(r, t);
                s.push(e), this.data[a] = s;
            }
        },
        _toRows: function(t) {
            for (var e = [], a = 0; a < t; a++) e.push({
                width: this.data.rowsW[a],
                height: this.data.rowsH[a]
            });
            this.setData({
                r: e
            });
        }
    }
});