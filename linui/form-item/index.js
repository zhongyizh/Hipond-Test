var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/rules"));

Component({
    options: {
        multipleSlots: !0
    },
    externalClasses: [ "l-form-item-class", "l-form-label-class", "l-form-content-class", "l-error-text-class" ],
    behaviors: [ e.default ],
    relations: {
        "../form/index": {
            type: "parent",
            linked: function() {},
            linkChanged: function() {},
            unlinked: function() {}
        }
    },
    properties: {
        label: String,
        labelPlacement: {
            type: String,
            value: "row"
        },
        alignItems: {
            type: String,
            value: "start"
        },
        labelWidth: {
            type: String,
            value: "200rpx"
        },
        labelSlot: {
            type: Boolean,
            value: !1
        },
        name: {
            type: String,
            value: ""
        }
    },
    data: {
        isRequired: !1
    },
    attached: function() {
        this.initRules(), this.isRequired();
    },
    methods: {
        isRequired: function() {
            var e = this;
            this.data.rules.forEach(function(t) {
                t.required && e.setData({
                    isRequired: !0
                });
            });
        }
    }
});