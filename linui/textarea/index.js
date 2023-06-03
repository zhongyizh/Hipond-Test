var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/defineProperty"), i = e(require("../behaviors/rules")), a = e(require("../core/utils/event-bus"));

Component({
    behaviors: [ "wx://form-field", i.default ],
    externalClasses: [ "l-class", "l-error-text", "l-error-text-class", "l-inner-class" ],
    properties: {
        placeholder: {
            type: String,
            value: ""
        },
        value: {
            type: String,
            value: ""
        },
        focus: {
            type: Boolean,
            value: !1
        },
        maxlength: {
            type: Number,
            value: 140
        },
        indicator: {
            type: Boolean,
            value: !0
        },
        autoHeight: {
            type: Boolean,
            value: !1
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        border: {
            type: Boolean,
            value: !0
        },
        rules: {
            type: Object
        },
        placeholderStyle: {
            type: String,
            value: ""
        },
        cursorSpacing: {
            type: Number,
            value: 0
        }
    },
    data: {},
    attached: function() {
        this.initRules();
    },
    methods: {
        handleInputChange: function(e) {
            var t = e.detail, i = (void 0 === t ? {} : t).value, l = void 0 === i ? "" : i;
            this.setData({
                value: l
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
            this.triggerEvent("linconfirm", e.detail);
        },
        getValues: function() {
            return this.data.value;
        },
        reset: function() {
            this.data.value = "";
        }
    }
});