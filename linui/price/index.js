var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-deleted-class", "l-unit-class", "l-value-class", "l-class" ],
    behaviors: [ e.default ],
    properties: {
        unit: {
            type: String,
            value: "￥"
        },
        size: {
            type: String,
            value: "28"
        },
        color: {
            type: String,
            value: "#3963BC"
        },
        bold: {
            type: String,
            value: "500"
        },
        unitColor: String,
        unitSize: String,
        unitBold: String,
        value: {
            type: String,
            value: "0.00"
        },
        mode: {
            type: String,
            value: "number",
            options: [ "number", "text" ]
        },
        valueColor: String,
        valueSize: String,
        valueBold: String,
        deleted: Boolean,
        delColor: String,
        reserveDigit: {
            type: Number,
            value: 2
        },
        autofix: Boolean
    },
    data: {},
    observers: {
        value: function() {
            this.reserveNumber();
        }
    },
    methods: {
        reserveNumber: function() {
            var e = Number(this.data.value);
            if (!isNaN(Number(e)) && "text" !== this.data.mode && this.data.autofix) {
                var t = e.toFixed(this.data.reserveDigit);
                this.setData({
                    result: t
                });
            } else this.setData({
                result: this.data.value
            });
        }
    }
});