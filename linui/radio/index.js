Component({
    externalClasses: [ "l-class", "l-disabled-class" ],
    behaviors: [ "wx://form-field" ],
    relations: {
        "../radio-group/index": {
            type: "parent"
        }
    },
    properties: {
        key: String,
        cell: Object,
        size: {
            type: String,
            value: "38rpx"
        },
        disabled: {
            type: Boolean
        },
        custom: Boolean,
        color: {
            type: String,
            value: "#ccc"
        },
        selectColor: {
            type: String,
            value: "#3963BC"
        },
        disabledColor: {
            type: String,
            value: "#ccc"
        },
        placement: {
            type: String,
            value: "left"
        },
        transition: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        checked: !1
    },
    methods: {
        setChecked: function(e) {
            this.setData({
                checked: e
            });
        },
        onRadioChangeTap: function() {
            if (!this.properties.disabled) {
                var e = this.getRelationNodes("../radio-group/index")[0], t = e.properties.noneChecked, i = !0;
                if (!this.isCurrentSelectedKey(e) || (i = !1, t)) {
                    var r = !this.data.checked;
                    this.data.checked = r;
                    var s = {
                        checked: r,
                        key: this.properties.key,
                        cell: this.properties.cell
                    };
                    e && e.onEmitEventHandle(s, i);
                }
            }
        },
        isCurrentSelectedKey: function(e) {
            return e.properties.current === this.properties.key;
        }
    }
});