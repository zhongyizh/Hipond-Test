var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/defineProperty"), a = e(require("../core/utils/event-bus.js")), l = e(require("../behaviors/validator")), i = e(require("../behaviors/rules"));

Component({
    options: {
        multipleSlots: !0
    },
    behaviors: [ "wx://form-field", l.default, i.default ],
    externalClasses: [ "l-class", "l-label-class", "l-error-text", "l-error-text-class", "l-input-class" ],
    properties: {
        label: String,
        hideLabel: Boolean,
        labelCustom: Boolean,
        showRow: {
            type: Boolean,
            value: !0
        },
        required: Boolean,
        placeholder: String,
        type: {
            type: String,
            value: "text",
            options: [ "text", "idcard", "digit", "password", "number" ]
        },
        value: String,
        colon: Boolean,
        focus: Boolean,
        clear: Boolean,
        maxlength: {
            type: Number,
            value: 140
        },
        width: {
            type: Number,
            value: null
        },
        labelWidth: {
            type: Number,
            value: 200
        },
        labelLayout: {
            type: String,
            value: "left",
            options: [ "left", "right" ]
        },
        disabled: Boolean,
        placeholderStyle: String,
        showEye: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    attached: function() {},
    methods: {
        handleInputChange: function(e) {
            var t = e.detail, l = (void 0 === t ? {} : t).value, i = void 0 === l ? "" : l;
            this.setData({
                value: i
            }), a.default.emit("lin-form-change-" + this.id, this.id), this.triggerEvent("lininput", e.detail);
        },
        handleInputFocus: function(e) {
            this.triggerEvent("linfocus", e.detail);
        },
        handleInputBlur: function(e) {
            this.validatorData(t({}, this.data.name, e.detail.value)), a.default.emit("lin-form-blur-" + this.id, this.id), 
            this.triggerEvent("linblur", e.detail);
        },
        handleInputConfirm: function(e) {
            var t = e.detail, a = (void 0 === t ? {} : t).value, l = void 0 === a ? "" : a;
            this.setData({
                value: l
            }), this.triggerEvent("linconfirm", e.detail);
        },
        onClearTap: function(e) {
            this.setData({
                value: ""
            }), this.triggerEvent("linclear", e.detail);
        },
        getValues: function() {
            return this.data.value;
        },
        reset: function() {
            this.setData({
                value: ""
            });
        },
        onTapEyeIcon: function() {
            var e = this.data.type;
            "text" === e ? this.setData({
                type: "password"
            }) : "password" === e && this.setData({
                type: "text"
            });
        }
    }
});