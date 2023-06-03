require("../../@babel/runtime/helpers/Objectvalues"), Component({
    behaviors: [ "wx://form-field" ],
    externalClasses: [ "l-class", "l-disabled-class" ],
    relations: {
        "../checkbox-group/index": {
            type: "parent"
        }
    },
    options: {
        multipleSlots: !0
    },
    properties: {
        placement: {
            type: String,
            value: "left"
        },
        custom: {
            type: Boolean,
            value: !1
        },
        key: {
            type: String,
            value: ""
        },
        cell: {
            type: Object,
            value: {}
        },
        size: {
            type: String,
            value: "38rpx"
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        selectColor: {
            type: String,
            value: "#3963BC"
        },
        disabledColor: {
            type: String,
            value: "#ccc"
        },
        color: {
            type: String,
            value: "#ccc"
        },
        checked: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        parentPlacement: ""
    },
    ready: function() {
        var e = this.getRelationNodes("../checkbox-group/index")[0].properties.placement;
        this.setData({
            parentPlacement: e
        });
    },
    methods: {
        onCheckboxChangeTap: function() {
            if (!this.properties.disabled && !this.data.parentDisabled) {
                var e = this.getRelationNodes("../checkbox-group/index")[0];
                if (this.properties.checked) {
                    if (this.isOverflow("minSelected")) return;
                } else if (this.isOverflow("maxSelected")) return;
                var t = {
                    checked: !this.properties.checked,
                    key: this.properties.key,
                    cell: this.properties.cell
                };
                e && e.onEmitEventHandle(t);
            }
        },
        isOverflow: function(e) {
            var t = this.getRelationNodes("../checkbox-group/index")[0], i = t.properties[e];
            if (!i) return !1;
            var l = Object.values(t._selected).length, r = "minSelected" === e ? l <= i : l >= i;
            if (r) {
                var o = "minSelected" === e ? "min_selected" : "max_selected";
                t.onEmitOverflowHandle && t.onEmitOverflowHandle({
                    key: this.properties.key,
                    limitNumber: i,
                    type: "overflow_" + o
                });
            }
            return r;
        }
    }
});