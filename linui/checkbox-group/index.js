var e = require("../../@babel/runtime/helpers/interopRequireDefault");

require("../../@babel/runtime/helpers/Objectvalues");

var t = require("../../@babel/runtime/helpers/objectWithoutProperties"), i = require("../../@babel/runtime/helpers/defineProperty"), r = require("../../@babel/runtime/helpers/objectSpread2"), l = e(require("../core/utils/event-bus")), n = e(require("../behaviors/rules"));

Component({
    behaviors: [ "wx://form-field", n.default ],
    externalClasses: [ "l-class", "l-error-text", "l-error-text-class" ],
    relations: {
        "../checkbox/index": {
            type: "child",
            linked: function(e) {
                this.init(e);
            },
            linkChanged: function() {},
            unlinked: function() {}
        }
    },
    properties: {
        placement: {
            type: String,
            value: "column"
        },
        maxSelected: {
            type: [ Number, null ],
            value: null
        },
        minSelected: {
            type: [ Number, null ],
            value: null
        }
    },
    data: {},
    attached: function() {
        var e = this.properties, t = e.minSelected, i = e.maxSelected;
        this.checkMax(t, i);
    },
    methods: {
        init: function(e) {
            void 0 === this._keys && (this._keys = {}), void 0 === this._selected && (this._selected = {}), 
            this.checkDefaultItem(e), this.checkedKeyRepeat(e);
        },
        checkedKeyRepeat: function(e) {
            var t = e.properties.key;
            if (this._keys[t]) throw new Error("keys有重复元素, checkbox的key属性不能重复：" + t);
            this._keys[t] = !0;
        },
        checkDefaultItem: function(e) {
            var t = e.properties, i = t.key, l = t.checked, n = t.cell;
            l && (this._selected[i] = r(r({}, n), {}, {
                checked: !0,
                value: i
            }));
        },
        checkMax: function(e, t) {
            if (null !== e && e < 0) throw new Error("最小选择个数必须大于等于0");
            if (null !== t && t < 0) throw new Error("最多选择个数必须大于0");
            if (null !== t && null !== e && e >= t) throw new Error("最多选择个数必须大于最小选择个数");
        },
        onEmitEventHandle: function(e) {
            e.checked ? this.addSelect(e) : this.removeSelect(e.key), this.validatorData(i({}, this.data.name, Object.values(this._selected))), 
            this.triggerEvent("linchange", e, {
                bubbles: !0,
                composed: !0
            }), l.default.emit("lin-form-change-" + this.id, this.id);
        },
        onEmitOverflowHandle: function(e) {
            this.triggerEvent("linout", e, {
                bubbles: !0,
                composed: !0
            });
        },
        removeSelect: function(e) {
            delete this._selected[e];
        },
        addSelect: function(e) {
            var i = e.key, l = t(e, [ "key" ]);
            this._selected[i] = r(r({}, l), {}, {
                value: i
            });
        },
        getValues: function() {
            return Object.values(this._selected);
        },
        reset: function() {
            return this._selected = {}, this.getRelationNodes("../checkbox/index").forEach(function(e) {
                return e.setData({
                    checked: !1
                });
            });
        }
    }
});