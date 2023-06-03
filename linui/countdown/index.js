var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/countdown"));

Component({
    externalClasses: [ "l-class", "l-class-time", "l-time-class" ],
    behaviors: [ e.default ],
    properties: {
        doneText: {
            type: String,
            value: "已结束"
        }
    },
    methods: {}
});