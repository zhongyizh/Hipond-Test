var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-class", "l-container-class", "l-placeholder-class", "l-icon-class", "l-input-class", "l-cancel-class" ],
    behaviors: [ e.default ],
    options: {
        multipleSlots: !0
    },
    properties: {
        confirmType: {
            type: String,
            value: "search"
        },
        placeholder: String,
        cancelText: {
            type: String,
            value: "取消"
        },
        frontText: String,
        custom: Boolean,
        value: String,
        type: String,
        icon: {
            type: String,
            value: "research"
        },
        iconColor: {
            type: String,
            value: "#bdbdbd"
        },
        iconSize: {
            type: String,
            value: "28"
        },
        bgColor: {
            type: String,
            value: "#f3f3f3"
        },
        showCancel: {
            type: Boolean,
            value: !0
        },
        shape: {
            type: String,
            value: "primary",
            options: [ "circle", "primary" ]
        },
        textAlign: {
            type: String,
            value: "left",
            options: [ "left", "right" ]
        },
        focus: Boolean,
        clear: {
            type: Boolean,
            value: !0
        },
        maxlength: {
            type: Number,
            value: 140
        },
        disabled: Boolean,
        placeholderStyle: String
    },
    data: {},
    methods: {
        onCancel: function() {
            this.triggerEvent("lincancel", {}, {
                bubbles: !0,
                composed: !0
            });
        },
        handleInputChange: function(e) {
            var t = e.detail, l = void 0 === t ? {} : t, n = l.value, i = void 0 === n ? "" : n;
            this.setData({
                value: i
            }), this.triggerEvent("linchange", l);
        },
        handleInputFocus: function(e) {
            this.triggerEvent("linfocus", e.detail);
        },
        handleInputBlur: function(e) {
            this.triggerEvent("linblur", e.detail);
        },
        handleInputConfirm: function(e) {
            var t = e.detail, l = void 0 === t ? {} : t, n = l.value, i = void 0 === n ? "" : n;
            this.setData({
                value: i
            }), this.triggerEvent("linconfirm", l);
        },
        onClearTap: function(e) {
            this.setData({
                value: ""
            }), this.triggerEvent("linclear", e.detail, {
                bubbles: !0,
                composed: !0
            });
        },
        handleTapFrontText: function(e) {
            this.triggerEvent("linfronttap", e.detail);
        }
    }
});