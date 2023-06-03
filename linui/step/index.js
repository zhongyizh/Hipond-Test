var e = require("../../@babel/runtime/helpers/objectSpread2");

Component({
    externalClasses: [ "l-class", "l-step-class", "l-title-class", "l-describe-class", "l-line-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../steps/index": {
            type: "parent"
        }
    },
    properties: {
        icon: String,
        title: String,
        describe: String,
        iconSize: {
            type: Number,
            value: 24
        },
        iconColor: String,
        custom: Boolean
    },
    data: {},
    methods: {
        updateDataChange: function(t) {
            this.setData(e({}, t));
        }
    }
});