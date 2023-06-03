var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/validator"));

Component({
    externalClasses: [ "l-class", "l-img-class", "l-title-class" ],
    options: {
        multipleSlots: !0
    },
    behaviors: [ e.default ],
    properties: {
        image: String,
        title: String,
        describe: String,
        plaintext: Boolean,
        full: Boolean,
        position: {
            type: String,
            value: "left",
            options: [ "left", "right" ]
        },
        type: {
            type: String,
            value: "primary",
            options: [ "primary", "avatar", "cover" ]
        },
        imageMode: {
            type: String,
            value: "scaleToFill"
        }
    },
    data: {},
    methods: {}
});